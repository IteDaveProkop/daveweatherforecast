# API Reference - Weather Forecast Application

## 📡 Open-Meteo API

The application uses **Open-Meteo API** - a free, open-source weather API.

### Benefits
- ✅ Free with no limits for fair use
- ✅ Doesn't require API key
- ✅ Fast and reliable
- ✅ Global coverage
- ✅ CORS support

---

## 🌤️ Weather Forecast API

### Endpoint
```
GET https://api.open-meteo.com/v1/forecast
```

### Request Parameters

| Parameter | Type | Required | Description |
|----------|------|----------|-------------|
| `latitude` | float | ✅ | Geographic latitude (-90 to 90) |
| `longitude` | float | ✅ | Geographic longitude (-180 to 180) |
| `current_weather` | boolean | ❌ | Current weather |
| `hourly` | string | ❌ | Hourly parameters (CSV) |
| `daily` | string | ❌ | Daily parameters (CSV) |
| `timezone` | string | ❌ | Time zone (e.g., "auto", "Europe/Prague") |

### Hourly Parameters

Available parameters for `hourly`:
- `temperature_2m` - Temperature 2m above ground (°C)
- `relativehumidity_2m` - Relative humidity (%)
- `precipitation` - Precipitation (mm)
- `weathercode` - WMO Weather Code
- `windspeed_10m` - Wind speed 10m above ground (km/h)
- `winddirection_10m` - Wind direction (°)
- `cloudcover` - Cloud cover (%)
- `uv_index` - UV index

### Daily Parameters

Available parameters for `daily`:
- `weathercode` - WMO Weather Code
- `temperature_2m_max` - Maximum temperature (°C)
- `temperature_2m_min` - Minimum temperature (°C)
- `precipitation_sum` - Total precipitation (mm)
- `sunrise` - Sunrise time
- `sunset` - Sunset time
- `uv_index_max` - Maximum UV index

### Example Request

```javascript
const params = {
  latitude: 50.0755,
  longitude: 14.4378,
  current_weather: true,
  hourly: 'temperature_2m,precipitation,weathercode,windspeed_10m,relativehumidity_2m',
  daily: 'weathercode,temperature_2m_max,temperature_2m_min,precipitation_sum',
  timezone: 'auto'
};

const url = `https://api.open-meteo.com/v1/forecast?${new URLSearchParams(params)}`;
```

### Response Structure

```json
{
  "latitude": 50.08,
  "longitude": 14.44,
  "elevation": 191.0,
  "timezone": "Europe/Prague",
  "timezone_abbreviation": "CET",
  "current_weather": {
    "temperature": 15.2,
    "windspeed": 12.5,
    "winddirection": 230,
    "weathercode": 3,
    "time": "2026-02-01T12:00"
  },
  "hourly": {
    "time": ["2026-02-01T00:00", "2026-02-01T01:00", ...],
    "temperature_2m": [14.5, 14.2, 14.0, ...],
    "precipitation": [0.0, 0.1, 0.2, ...],
    "weathercode": [2, 3, 3, ...],
    "windspeed_10m": [10.5, 11.2, 12.5, ...],
    "relativehumidity_2m": [75, 77, 80, ...]
  },
  "daily": {
    "time": ["2026-02-01", "2026-02-02", ...],
    "weathercode": [3, 61, 2, ...],
    "temperature_2m_max": [18.5, 16.2, 17.8, ...],
    "temperature_2m_min": [12.0, 10.5, 11.2, ...],
    "precipitation_sum": [0.0, 5.2, 0.3, ...]
  }
}
```

---

## 🌍 Geocoding API

### Endpoint
```
GET https://geocoding-api.open-meteo.com/v1/search
```

### Request Parameters

| Parameter | Type | Required | Description |
|----------|------|----------|-------------|
| `name` | string | ✅ | City or address name |
| `count` | integer | ❌ | Number of results (default: 10) |
| `language` | string | ❌ | Language of results (cs, en, de...) |

### Example Request

```javascript
const params = {
  name: 'Praha',
  count: 5,
  language: 'cs'
};

const url = `https://geocoding-api.open-meteo.com/v1/search?${new URLSearchParams(params)}`;
```

### Response Structure

```json
{
  "results": [
    {
      "id": 3067696,
      "name": "Praha",
      "latitude": 50.08804,
      "longitude": 14.42076,
      "elevation": 191.0,
      "feature_code": "PPLC",
      "country_code": "CZ",
      "country": "Czechia",
      "country_id": 3077311,
      "timezone": "Europe/Prague",
      "population": 1165581,
      "admin1": "Prague",
      "admin1_id": 3067695
    },
    // more results...
  ],
  "generationtime_ms": 1.234
}
```

---

## 🎯 Implementation in Application

### Weather Data Fetching

```javascript
// src/api/weather.js
import axios from 'axios';

const BASE_URL = 'https://api.open-meteo.com/v1/forecast';

export const getWeatherData = async (latitude, longitude) => {
  try {
    const response = await axios.get(BASE_URL, {
      params: {
        latitude,
        longitude,
        current_weather: true,
        hourly: 'temperature_2m,precipitation,weathercode,windspeed_10m,relativehumidity_2m',
        daily: 'weathercode,temperature_2m_max,temperature_2m_min,precipitation_sum',
        timezone: 'auto',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Weather API Error:', error);
    throw error;
  }
};
```

### Location Search

```javascript
// src/api/weather.js
export const searchLocation = async (query) => {
  try {
    const response = await axios.get('https://geocoding-api.open-meteo.com/v1/search', {
      params: {
        name: query,
        count: 5,
        language: 'cs',
      },
    });
    return response.data.results || [];
  } catch (error) {
    console.error('Geocoding API Error:', error);
    throw error;
  }
};
```

### Usage in Component

```javascript
// src/screens/HomeScreen.js
const fetchWeather = async () => {
  try {
    dispatch(setLoading(true));
    const data = await getWeatherData(location.latitude, location.longitude);
    dispatch(setWeatherData(data));
  } catch (err) {
    dispatch(setError('Failed to load weather data'));
  }
};

const handleSearch = async () => {
  if (searchQuery.length < 2) return;
  try {
    const results = await searchLocation(searchQuery);
    setSearchResults(results);
  } catch (err) {
    console.error('Search error:', err);
  }
};
```

---

## 🔢 WMO Weather Codes

Weather codes according to World Meteorological Organization:

| Code | Description (EN) | Icon |
|------|------------------|------|
| 0 | Clear sky | ☀️ |
| 1 | Mainly clear | 🌤️ |
| 2 | Partly cloudy | ⛅ |
| 3 | Overcast | ☁️ |
| 45 | Fog | 🌫️ |
| 48 | Rime fog | 🌫️ |
| 51 | Light drizzle | 🌦️ |
| 53 | Moderate drizzle | 🌦️ |
| 55 | Dense drizzle | 🌧️ |
| 61 | Slight rain | 🌧️ |
| 63 | Moderate rain | 🌧️ |
| 65 | Heavy rain | ⛈️ |
| 71 | Slight snow | 🌨️ |
| 73 | Moderate snow | ❄️ |
| 75 | Heavy snow | ❄️ |
| 77 | Snow grains | 🌨️ |
| 80 | Slight rain showers | 🌦️ |
| 81 | Moderate rain showers | 🌧️ |
| 82 | Violent rain showers | ⛈️ |
| 85 | Slight snow showers | 🌨️ |
| 86 | Heavy snow showers | ❄️ |
| 95 | Thunderstorm | ⛈️ |
| 96 | Thunderstorm with hail | ⛈️ |
| 99 | Heavy thunderstorm with hail | ⛈️ |

### Using Weather Codes

```javascript
// src/utils/weatherCodes.js
export const getWeatherDescription = (code, lang = 'cs') => {
  return weatherCodeMap[code]?.[lang] || 'Unknown';
};

export const getWeatherIcon = (code) => {
  return weatherCodeMap[code]?.icon || '❓';
};
```

---

## ⚠️ Error Handling

### API Errors

```javascript
try {
  const data = await getWeatherData(lat, lon);
} catch (error) {
  if (error.response) {
    // Server responded with error
    console.error('Server error:', error.response.status);
  } else if (error.request) {
    // No response received
    console.error('Network error:', error.request);
  } else {
    // Request setup error
    console.error('Error:', error.message);
  }
}
```

### Common Error Codes

| Status | Meaning | Solution |
|--------|---------|----------|
| 400 | Bad Request | Check parameters |
| 404 | Not Found | Wrong endpoint |
| 429 | Too Many Requests | Rate limit exceeded |
| 500 | Server Error | Try later |

---

## 🚀 Rate Limits

Open-Meteo API:
- **No hard limits** for fair use
- Recommended: Max 10,000 requests/day per IP
- For higher usage: Consider commercial plan

---

## 📊 Performance Tips

1. **Cache responses** - Store data for 10-15 minutes
2. **Debounce search** - Wait 300ms before searching
3. **Limit hourly data** - Load only 24-48 hours
4. **Compress requests** - Use gzip encoding

### Caching Example

```javascript
const CACHE_DURATION = 15 * 60 * 1000; // 15 minutes
let weatherCache = { data: null, timestamp: 0 };

export const getWeatherDataCached = async (lat, lon) => {
  const now = Date.now();
  if (weatherCache.data && (now - weatherCache.timestamp) < CACHE_DURATION) {
    return weatherCache.data;
  }
  
  const data = await getWeatherData(lat, lon);
  weatherCache = { data, timestamp: now };
  return data;
};
```

---

## 📝 Examples

### Get Prague Weather

```javascript
const data = await getWeatherData(50.0755, 14.4378);
console.log(data.current_weather.temperature); // 15.2
```

### Search for Cities

```javascript
const cities = await searchLocation('Brno');
console.log(cities[0].name); // "Brno"
console.log(cities[0].latitude); // 49.1951
```

### Get 7-Day Forecast

```javascript
const data = await getWeatherData(50.0755, 14.4378);
data.daily.time.forEach((date, i) => {
  console.log(
    date,
    data.daily.temperature_2m_max[i],
    data.daily.temperature_2m_min[i]
  );
});
```

---

## 🔗 External Links

- **API Documentation**: https://open-meteo.com/en/docs
- **Geocoding API**: https://open-meteo.com/en/docs/geocoding-api
- **Weather Variables**: https://open-meteo.com/en/docs#hourly
- **GitHub**: https://github.com/open-meteo/open-meteo

---

**Last Updated**: 2026-02-01  
**API Version**: v1

