# Weather Forecast Application - AI Development Guide

## 📋 Project Overview

This is a web application for displaying weather forecasts built on **React**, **Redux**, and **Open-Meteo API**.

### Technologies
- **Frontend**: React 18.2.0
- **State Management**: Redux 4.2.1 + React-Redux 8.1.3
- **Build Tool**: Webpack 5
- **API**: Open-Meteo (https://api.open-meteo.com)
- **Styling**: Inline styles with gradient backgrounds

### Key Features
- ✅ Display current weather
- ✅ 7-day forecast
- ✅ Global city search
- ✅ No API key required
- ✅ Czech localization
- ✅ Responsive design

---

## 🏗️ Project Architecture

```
DaveWeatherForecast/
├── public/
│   └── index.html              # HTML template
├── src/
│   ├── api/
│   │   └── weather.js          # API calls (Open-Meteo)
│   ├── components/
│   │   ├── common/
│   │   │   └── LoadingSpinner.js   # Loading indicator
│   │   └── weather/
│   │       ├── CurrentWeather.js   # Current weather widget
│   │       └── DailyForecast.js    # 7-day forecast
│   ├── screens/
│   │   └── HomeScreen.js       # Main screen
│   ├── store/
│   │   └── weatherStore.js     # Redux store
│   ├── utils/
│   │   └── weatherCodes.js     # WMO weather codes + icons
│   ├── index.js                # Entry point
│   └── styles.css              # Global styles
├── package.json                # Dependencies
├── webpack.config.js           # Webpack configuration
├── babel.config.js             # Babel configuration
└── README.md                   # Basic documentation
```

---

## 🔧 Technical Details for AI

### 1. State Management (Redux)

**Store structure** (`src/store/weatherStore.js`):
```javascript
{
  currentWeather: {
    temperature: number,
    windspeed: number,
    weathercode: number
  },
  hourlyForecast: {
    time: string[],
    temperature_2m: number[],
    // more data...
  },
  dailyForecast: {
    time: string[],
    weathercode: number[],
    temperature_2m_max: number[],
    temperature_2m_min: number[],
    precipitation_sum: number[]
  },
  location: {
    name: string,
    latitude: number,
    longitude: number
  },
  loading: boolean,
  error: string | null
}
```

**Actions**:
- `setWeatherData(data)` - Saves data from API
- `setLocation(location)` - Sets location
- `setLoading(boolean)` - Sets loading state
- `setError(error)` - Sets error message

### 2. API Endpoints

**Weather API** (`src/api/weather.js`):

```javascript
// Get weather forecast
getWeatherData(latitude, longitude)
// Returns: { current_weather, hourly, daily, timezone }
// Endpoint: https://api.open-meteo.com/v1/forecast

// Search location
searchLocation(query)
// Returns: [{ id, name, latitude, longitude, country, ... }]
// Endpoint: https://geocoding-api.open-meteo.com/v1/search
```

**Weather API Parameters**:
- `latitude`, `longitude` - GPS coordinates
- `current_weather=true` - Current state
- `hourly` - Hourly data (temperature, precipitation, wind, humidity)
- `daily` - Daily data (max/min temperature, precipitation, weathercode)
- `timezone=auto` - Automatic time zone

### 3. Weather Codes (WMO)

Mapping of WMO codes to English descriptions and emoji icons in `src/utils/weatherCodes.js`:

| Code | Description | Icon |
|------|-------------|------|
| 0 | Clear sky | ☀️ |
| 1-3 | Clear/Partly cloudy/Overcast | 🌤️⛅☁️ |
| 45-48 | Fog | 🌫️ |
| 51-65 | Rain | 🌧️⛈️ |
| 71-77 | Snow | ❄️🌨️ |
| 80-86 | Showers | 🌦️ |
| 95-99 | Thunderstorm | ⛈️ |

**Functions**:
- `getWeatherDescription(code, lang='en')` - Returns weather description
- `getWeatherIcon(code)` - Returns emoji icon

---

## 💻 Common Tasks for AI

### Adding a new feature

**Example: Add hourly forecast**

1. **Update API call** (`src/api/weather.js`):
```javascript
// Add hourly parameters to getWeatherData
hourly: 'temperature_2m,precipitation,weathercode,windspeed_10m,relativehumidity_2m'
```

2. **Create component** (`src/components/weather/HourlyForecast.js`):
```javascript
import React from 'react';

const HourlyForecast = ({ forecast }) => {
  // Render hourly forecast...
};
export default HourlyForecast;
```

3. **Add to store** (already in `hourlyForecast`):
```javascript
// Store already contains hourlyForecast from API
```

4. **Display in HomeScreen**:
```javascript
import HourlyForecast from '../components/weather/HourlyForecast';
// ...
<HourlyForecast forecast={hourlyForecast} />
```

### Changing the default location

In `src/store/weatherStore.js`:
```javascript
location: {
  name: 'Brno',  // Change here
  latitude: 49.1951,
  longitude: 16.6068,
}
```

### Adding a new weather parameter

**Example: UV Index**

1. Update API request:
```javascript
hourly: 'temperature_2m,precipitation,uv_index'  // Add uv_index
```

2. Display in component:
```javascript
<div>☀️ UV: {hourlyData.uv_index[0]}</div>
```

### Changing language

In `src/utils/weatherCodes.js` it's ready for multilingual support:
```javascript
weatherCodeMap = {
  0: { en: 'Clear sky', cs: 'Jasno', de: 'Klar', ... }
}
```

To switch: `getWeatherDescription(code, 'en')`

---

## 🎨 Styling Guide

The application uses **inline styles** with gradient backgrounds.

**Main colors**:
- Primary blue: `#4A90E2`
- Dark blue: `#357ABD`
- Background gradient: `linear-gradient(135deg, #667eea 0%, #764ba2 100%)`
- White cards: `rgba(255,255,255,0.95)`

**Typical styles**:
```javascript
// Card style
{
  background: 'rgba(255,255,255,0.95)',
  borderRadius: '15px',
  padding: '20px',
  boxShadow: '0 4px 10px rgba(0,0,0,0.2)',
}

// Button style
{
  padding: '15px 30px',
  background: '#fff',
  color: '#4A90E2',
  border: 'none',
  borderRadius: '25px',
  cursor: 'pointer',
  fontWeight: 'bold',
}
```

---

## 🐛 Debugging

### Common Issues

**1. API not responding**
```javascript
// Check CORS - Open-Meteo has CORS enabled
// Check network in DevTools
```

**2. Redux state not updating**
```javascript
// Check dispatch actions
console.log('Dispatching:', action);
dispatch(setWeatherData(data));
```

**3. Component not rendering**
```javascript
// Check props
console.log('Props:', { weather, location, forecast });
```

### Webpack dev tools

Open in browser:
- F12 → Console (errors)
- F12 → Network (API calls)
- F12 → Components (React DevTools)

---

## 📦 Dependencies

### Production Dependencies
```json
{
  "react": "^18.2.0",           // UI framework
  "react-dom": "^18.2.0",       // DOM renderer
  "axios": "^1.6.0",            // HTTP client
  "redux": "^4.2.1",            // State management
  "react-redux": "^8.1.3"       // React-Redux bindings
}
```

### Dev Dependencies
```json
{
  "@babel/core": "^7.23.0",
  "@babel/preset-react": "^7.23.0",
  "webpack": "^5.89.0",
  "webpack-dev-server": "^4.15.1",
  "babel-loader": "^9.1.3",
  "css-loader": "^6.8.1",
  "style-loader": "^3.3.3",
  "html-webpack-plugin": "^5.5.3"
}
```

---

## 🚀 Build & Deploy

### Development
```bash
npm start           # Runs dev server at http://localhost:3000
```

### Production Build
```bash
npm run build       # Creates optimized build in dist/
```

### Deploy
```bash
# Build application
npm run build

# Upload dist/ contents to hosting (Netlify, Vercel, GitHub Pages...)
# Or use:
npx serve dist     # Local preview
```

---

## 🔐 Environment Variables

Open-Meteo API **does not require an API key** 🎉

For other APIs you can create `.env`:
```env
REACT_APP_API_KEY=your_key_here
```

And use:
```javascript
const API_KEY = process.env.REACT_APP_API_KEY;
```

---

## 📝 Code Conventions

### File Naming
- Components: `PascalCase.js` (e.g. `CurrentWeather.js`)
- Utilities: `camelCase.js` (e.g. `weatherCodes.js`)
- Screens: `PascalCase.js` (e.g. `HomeScreen.js`)

### Component Structure
```javascript
import React from 'react';

const ComponentName = ({ prop1, prop2 }) => {
  // Hooks
  const [state, setState] = useState();
  
  // Handlers
  const handleClick = () => {};
  
  // Render
  return (
    <div style={styles.container}>
      {/* Content */}
    </div>
  );
};

const styles = {
  container: {
    // styles...
  }
};

export default ComponentName;
```

### Redux Actions
```javascript
export const actionName = (payload) => ({
  type: 'ACTION_TYPE',
  payload: payload,
});
```

---

## 🧪 Testing (TODO)

To add tests:
```bash
npm install --save-dev jest @testing-library/react
```

Example test:
```javascript
import { render, screen } from '@testing-library/react';
import CurrentWeather from './CurrentWeather';

test('renders weather data', () => {
  const mockWeather = { temperature: 20, weathercode: 0 };
  render(<CurrentWeather weather={mockWeather} />);
  expect(screen.getByText('20°C')).toBeInTheDocument();
});
```

---

## 📚 Additional Resources

- **Open-Meteo API Docs**: https://open-meteo.com/en/docs
- **React Docs**: https://react.dev/
- **Redux Docs**: https://redux.js.org/
- **Webpack Docs**: https://webpack.js.org/

---

## 🤖 For AI Assistants

### When developing new features:

1. **Analyze existing code** before making changes
2. **Use the same style** as existing components
3. **Test in browser** at http://localhost:3000
4. **Check console** for errors
5. **Commit small changes** not large refactors

### When fixing bugs:

1. **Reproduce the issue** in dev environment
2. **Check Network tab** (API calls)
3. **Check Redux DevTools** (state)
4. **Add console.log** for debugging
5. **Test fix** before committing

### When refactoring:

1. **Make a backup** or new branch
2. **Change incrementally** not all at once
3. **Test after each change**
4. **Keep original functionality**
5. **Update documentation**

---

## 📞 Support

For questions or problems:
- Check this documentation
- Search issues in the project
- Create a new issue with details

---

**Created**: 2026-02-01  
**Last update**: 2026-02-01  
**Version**: 1.0.0  
**Status**: ✅ Production Ready
