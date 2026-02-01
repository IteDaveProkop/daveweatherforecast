# Weather Forecast App 🌤️

Web application for weather forecast display using Open-Meteo API.

## ✨ Features

- ✅ Current weather with emoji icons
- ✅ Hourly forecast (today + tomorrow)
- ✅ 14-day weather forecast
- ✅ Search cities, addresses and GPS coordinates
- ✅ Manage multiple saved locations
- ✅ Compare 7 forecast models
- ✅ Dual geocoding (Open-Meteo + Nominatim OSM)
- ✅ Czech localization
- ✅ Responsive design
- ✅ LocalStorage persistence
- ✅ No API key required

## 🚀 Quick Start

```bash
# Install dependencies
npm install --legacy-peer-deps

# Start dev server
npm start

# Opens at http://localhost:3000
```

## 🛠️ Technologies

- **Frontend**: React 18.2.0 (web version)
- **State Management**: Redux 4.2.1 + localStorage
- **Build Tool**: Webpack 5 + Babel
- **APIs**: 
  - Open-Meteo Forecast API (weather data)
  - Open-Meteo Geocoding (cities)
  - Nominatim OSM (addresses)
- **Styling**: Inline styles with gradient backgrounds

## 📁 Project Structure

```
DaveWeatherForecast/
├── public/
│   └── index.html              # HTML template
├── src/
│   ├── api/
│   │   └── weather.js          # API calls (weather + geocoding)
│   ├── components/
│   │   ├── common/
│   │   │   └── LoadingSpinner.js
│   │   └── weather/
│   │       ├── CurrentWeather.js    # Current weather
│   │       ├── HourlyForecast.js    # Hourly forecast with model comparison
│   │       └── DailyForecast.js     # Daily forecast (14 days) with comparison
│   ├── screens/
│   │   └── HomeScreen.js       # Main screen with UI logic
│   ├── store/
│   │   └── weatherStore.js     # Redux store + localStorage
│   ├── utils/
│   │   ├── weatherCodes.js     # WMO weather codes → emoji
│   │   └── weatherModels.js    # Definition of 7 forecast models
│   ├── index.js                # Entry point
│   └── styles.css              # Global CSS
├── AI-BOT-GUIDE.md             # 🤖 Main guide for AI assistants
├── DEVELOPMENT.md              # 📚 Complete developer documentation
├── API.md                      # 📡 API reference and examples
├── CONTRIBUTING.md             # 🤝 Contributor guide
├── package.json
├── webpack.config.js
└── babel.config.js
```

## 📚 Documentation for AI and Developers

### For AI assistants (start here!):
- **[AI-BOT-GUIDE.md](AI-BOT-GUIDE.md)** - ⭐ Main entry point, workflow, quick examples

### For developers:
- **[DEVELOPMENT.md](DEVELOPMENT.md)** - Complete technical documentation, architecture
- **[API.md](API.md)** - Open-Meteo API reference, weather codes
- **[CONTRIBUTING.md](CONTRIBUTING.md)** - Git workflow, code style

### What you'll find in the documentation:
- ✅ Detailed architecture description
- ✅ Redux state + localStorage management
- ✅ Dual geocoding strategy
- ✅ Multi-model weather comparison
- ✅ API endpoints and parameters
- ✅ WMO Weather Codes reference (80+ codes)
- ✅ Code examples for common tasks
- ✅ Debugging tips and common issues
- ✅ Performance optimization
- ✅ Code style guide

## 🌦️ Forecast Models

Application supports 7 meteorological models:

1. **DWD ICON** (default) - German service, recommended for Europe
2. **ECMWF IFS** - European centre, high accuracy
3. **GFS NOAA** - American global model
4. **Météo-France** - French model
5. **JMA** - Japanese agency
6. **GEM** - Canadian model
7. **Automatic selection** - API selects the best model

**Model comparison**: Select multiple models and the application will display their forecasts side by side with averages.

## 🎯 Common Tasks

### Clear saved locations
```javascript
// In browser console (F12)
localStorage.removeItem('weatherLocations');
localStorage.removeItem('currentLocationIndex');
location.reload();
```

### Change default model
```javascript
// src/store/weatherStore.js, line 26
return saved ? JSON.parse(saved) : ['icon_seamless']; // Change to different model
```

### Add new weather parameter
```javascript
// src/api/weather.js, lines 15 and 36
hourly: 'temperature_2m,precipitation,weathercode,windspeed_10m,relativehumidity_2m,uv_index'
```

More examples in [DEVELOPMENT.md](DEVELOPMENT.md#common-tasks-for-ai)

## 🌍 API

Application uses **3 APIs**:

### 1. Open-Meteo Forecast API
- 🆓 Free without API key
- 🌐 Global coverage
- ⚡ 7 different forecast models
- 📊 14-day forward forecast

### 2. Open-Meteo Geocoding API
- 🏙️ City and town search
- 🇨🇿 Czech localization
- ⚡ Fast, clean data

### 3. Nominatim OSM
- 🏠 Address search with house numbers
- 🗺️ GPS coordinates parsing
- 📍 Detailed location metadata

Details in [API.md](API.md)

## 🎨 Usage Example

```javascript
// Get weather for multiple models
const data = await getWeatherData(50.0755, 14.4378, ['icon_seamless', 'ecmwf_ifs025']);
console.log(data[0].model); // "icon_seamless"
console.log(data[0].data.current_weather.temperature); // 15.2°C

// Search for a city or address
const results = await searchLocation('Prague');
console.log(results[0].name); // "Prague"
console.log(results[0].display_name); // "Prague, Czech Republic..."

// GPS coordinates
const gps = await searchLocation('50.08, 14.43');
console.log(gps[0].latitude); // 50.08
```

## 🐛 Debugging

```bash
# Check compilation
npm start

# Watch webpack output
tail -f webpack-output.log

# Build for production
npm run build

# Open in browser
# F12 → Console (errors)
# F12 → Network (API calls)
# F12 → Application → Local Storage (saved data)
```

### Common Issues

**Port 3000 already running:**
```bash
# Windows
Get-NetTCPConnection -LocalPort 3000 | Select -ExpandProperty OwningProcess
Stop-Process -Id <PID>
```

**Old saved location:**
- Delete localStorage (see above)
- Remove location in UI and add again

More in [DEVELOPMENT.md#debugging](DEVELOPMENT.md#🐛-debugging)

## 🤝 Contributing

Contributions are welcome! Read [CONTRIBUTING.md](CONTRIBUTING.md) for details about:
- Git workflow
- Commit conventions
- Code style guide
- Testing guidelines

## 📋 TODO

- [ ] Add unit tests (Jest)
- [ ] TypeScript migration
- [ ] Dark mode toggle
- [ ] PWA support (offline mode)
- [ ] Weather charts (Recharts)
- [ ] Export forecast (PDF/CSV)
- [ ] Weather alerts/warnings

## 📄 License

MIT License

## 🙏 Acknowledgments

- [Open-Meteo](https://open-meteo.com/) - Free weather API
- [OpenStreetMap Nominatim](https://nominatim.org/) - Geocoding
- [React](https://react.dev/) - UI framework
- [Redux](https://redux.js.org/) - State management

---

## 🤖 For AI Assistants

**IMPORTANT: Before any changes, read [AI-BOT-GUIDE.md](AI-BOT-GUIDE.md)!**

**Quick links:**
1. [AI-BOT-GUIDE.md](AI-BOT-GUIDE.md) - ⭐ Start here!
2. [DEVELOPMENT.md](DEVELOPMENT.md) - Complete tech docs
3. [API.md](API.md) - API reference
4. [CONTRIBUTING.md](CONTRIBUTING.md) - Code standards

**When debugging:**
- Check Redux state in DevTools
- Check Network tab for API calls
- localStorage persistence (weatherLocations, selectedModels)
- Details in [AI-BOT-GUIDE.md#debugging](AI-BOT-GUIDE.md#🐛-debugging)

**Key files:**
- `src/screens/HomeScreen.js` (24KB) - all UI logic
- `src/store/weatherStore.js` (6.5KB) - Redux + localStorage
- `src/api/weather.js` (3.5KB) - multi-model + dual geocoding

---

**Created**: 2026-02-01  
**Last update**: 2026-02-01  
**Status**: ✅ Production Ready  
**Features**: 14-day forecast, Multi-model comparison, Location management  
**Live**: http://localhost:3000/

