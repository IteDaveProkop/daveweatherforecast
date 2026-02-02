# Copilot Instructions - Weather Forecast App

## Build & Run Commands

```bash
# Install dependencies (required flag)
npm install --legacy-peer-deps

# Development server (opens http://localhost:3000)
npm start
# or
npm run dev

# Production build
npm run build

# Deploy to GitHub Pages
npm run deploy
```

No tests or linters configured yet (see TODO in README).

## Architecture Overview

### Multi-Model Weather Comparison System
The app's unique feature is comparing 7 different meteorological models side-by-side:
- User can select multiple models from `WEATHER_MODELS` array (weatherModels.js)
- `getWeatherData()` makes parallel API calls if multiple models selected
- Returns array of `{ model, data }` objects
- Components average and compare predictions across models

### Dual Geocoding Strategy
Location search uses two APIs in sequence:
1. **Open-Meteo Geocoding** - Fast, clean city/town data
2. **Nominatim OSM** - Triggered only if query contains numbers or multiple words
   - Handles street addresses with house numbers
   - GPS coordinate parsing (e.g., "50.08, 14.43")
   - Results merged with Nominatim first for specificity

Implementation in `src/api/weather.js` `searchLocation()`.

### Redux + localStorage Sync Pattern
All Redux actions that modify locations or settings synchronously update localStorage:
```javascript
case 'ADD_LOCATION':
  const newLocations = [...state.locations, action.payload];
  localStorage.setItem('weatherLocations', JSON.stringify(newLocations)); // ← Immediate sync
  return { ...state, locations: newLocations };
```

State keys synced to localStorage:
- `weatherLocations` - Array of saved locations
- `currentLocationIndex` - Active location index
- `selectedModels` - Array of model IDs for comparison

### Component Structure
- **HomeScreen.js** (24KB) - All application logic, state management, and UI orchestration
- **Weather components** - Pure presentational components receiving props
- **No component-level state** except UI toggles in HomeScreen

## Key Conventions

### WMO Weather Code Handling
Weather codes (0-99) map to Czech/English descriptions and emoji icons:
```javascript
getWeatherIcon(weathercode)      // Returns emoji: ☀️ 🌧️ ❄️
getWeatherDescription(code, 'cs') // Returns Czech text
```
Always validate codes exist before rendering - use fallback '☁️' for undefined.

### Inline Styles Pattern
All styles defined as objects at component bottom:
```javascript
const styles = {
  container: {
    background: 'rgba(255,255,255,0.95)',
    borderRadius: '15px',
    padding: '20px',
    boxShadow: '0 4px 10px rgba(0,0,0,0.2)',
  },
};
```
Main gradient: `linear-gradient(135deg, #667eea 0%, #764ba2 100%)`

### File Naming
- Components: `PascalCase.js` (CurrentWeather.js)
- Utilities: `camelCase.js` (weatherCodes.js)
- Screens: `PascalCase.js` (HomeScreen.js)

### API Response Structure
`getWeatherData()` always returns array, even for single model:
```javascript
[
  {
    model: 'icon_seamless',
    data: {
      current_weather: { temperature, weathercode, ... },
      hourly: { time[], temperature_2m[], ... },
      daily: { time[], temperature_2m_max[], ... }
    }
  }
]
```

## Important Context

### Mobile Build (Capacitor)
Project includes Android build via Capacitor (capacitor.config.json). When modifying:
- Webpack publicPath changes for production (see webpack.config.js line 10)
- PWA manifest in public/ directory
- Build outputs to dist/ for web, android/ for mobile

### Czech Localization
App uses Czech language in UI and weather descriptions. When adding features:
- Default language parameter: `lang = 'cs'`
- Use Czech text in UI elements
- Maintain bilingual weather code descriptions

### Open-Meteo API Specifics
- **No API key required** - free tier, fair use policy
- **14-day forecast** via `forecast_days: 14` parameter
- **Timezone auto-detection** - always use `timezone: 'auto'`
- **Model parameter** - different from model ID in some cases (see weatherModels.js)

## Related Documentation

- **AI-BOT-GUIDE.md** - Original AI assistant guide (comprehensive)
- **DEVELOPMENT.md** - Complete technical documentation
- **API.md** - Open-Meteo API reference with all weather codes
- **CONTRIBUTING.md** - Git workflow and code style guide

When unsure about implementation details, check DEVELOPMENT.md first - it contains worked examples for common tasks.
