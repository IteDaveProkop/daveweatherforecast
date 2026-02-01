# AI BOT INSTRUCTIONS

## 🤖 Welcome AI Assistant!

This project is fully documented for easy work with AI bots (GitHub Copilot, ChatGPT, Claude, etc.)

---

## 📚 Documentation Structure

### Required Reading Before Any Changes:

1. **[README.md](README.md)** - Basic Project Overview
   - Quick start
   - Project structure
   - Basic commands

2. **[DEVELOPMENT.md](DEVELOPMENT.md)** ⭐ MAIN DOCUMENTATION
   - Complete technical documentation
   - Architecture and design patterns
   - Redux state management
   - Code examples for common tasks
   - Debugging guide
   - Performance tips
   - Code conventions

3. **[API.md](API.md)** - API Reference
   - Open-Meteo API documentation
   - Request/Response examples
   - WMO Weather Codes reference
   - Error handling
   - Rate limits

4. **[CONTRIBUTING.md](CONTRIBUTING.md)** - Development workflow
   - Git workflow and commit conventions
   - Code style guide
   - Testing guidelines
   - Pull request checklist

---

## 🎯 Workflow for AI Bots

### When Adding a New Feature:

```
1. Read DEVELOPMENT.md section "Common Tasks"
2. Analyze existing code structure
3. Follow the same pattern as existing components
4. Test changes at http://localhost:3000
5. Check console for errors
6. Update documentation if relevant
```

### When Fixing a Bug:

```
1. Reproduce the problem in dev environment
2. Check Network tab (API calls)
3. Check Redux state in DevTools
4. Add console.log for debugging
5. Fix minimally (only what's needed)
6. Test the fix
7. Remove debug console.log
```

### When Refactoring:

```
1. Make a backup or new branch
2. Change in small parts
3. Test after each change
4. Preserve original functionality
5. Update documentation
6. Atomic commits
```

---

## 📖 Quick Reference

### Running the Application
```bash
npm install --legacy-peer-deps
npm start
# Opens http://localhost:3000
```

### File Structure
```
src/
├── api/weather.js          # API calls
├── components/             # React components
├── screens/HomeScreen.js   # Main screen
├── store/weatherStore.js   # Redux store
├── utils/weatherCodes.js   # Weather codes mapping
└── index.js                # Entry point
```

### Redux State
```javascript
{
  currentWeather: { temperature, weathercode, windspeed },
  dailyForecast: { time[], temperature_2m_max[], ... },
  location: { name, latitude, longitude },
  loading: boolean,
  error: string | null
}
```

### API Endpoints
```javascript
// Weather data
getWeatherData(latitude, longitude)

// Location search
searchLocation(query)
```

---

## 🚨 Important Rules

### ✅ DO:
- Read documentation before changes
- Use the same code style as existing code
- Test all changes locally
- Commit small, atomic changes
- Update documentation when making bigger changes
- Use console.log for debugging (but remove before committing)

### ❌ DON'T:
- Don't do large refactoring without reason
- Don't ignore existing patterns
- Don't commit console.log to production
- Don't change API structure without reason
- Don't add unnecessary dependencies
- Don't ignore TypeScript/PropTypes (TODO)

---

## 🔍 Debugging Quick Tips

### API not working?
```javascript
// Check Network tab in DevTools
// Check parameters in src/api/weather.js
console.log('API params:', { latitude, longitude });
```

### Redux state not updating?
```javascript
// Check dispatch
console.log('Dispatching:', action);
dispatch(setWeatherData(data));

// Check Redux DevTools
```

### Component not rendering?
```javascript
// Check props
console.log('Props:', { weather, location, forecast });

// Check conditions
if (!weather) return null; // Early return?
```

### Webpack error?
```bash
# Restart dev server
Ctrl+C
npm start
```

---

## 📝 Code Snippets

### New Component
```javascript
import React from 'react';

const MyComponent = ({ prop1, prop2 }) => {
  // State
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
  container: { padding: '20px' }
};

export default MyComponent;
```

### API Call
```javascript
try {
  const data = await getWeatherData(lat, lon);
  dispatch(setWeatherData(data));
} catch (error) {
  console.error('API Error:', error);
  dispatch(setError('Error loading data'));
}
```

### Redux Action
```javascript
export const myAction = (payload) => ({
  type: 'ACTION_TYPE',
  payload: payload,
});
```

---

## 🎨 Style Guide

### Components
- PascalCase: `CurrentWeather.js`
- Default export: `export default CurrentWeather`
- Props destructuring: `({ weather, location })`

### Functions
- camelCase: `getWeatherData`, `handleClick`
- Async/await instead of promises
- Try/catch for error handling

### Styles
- Inline style objects at the end of component
- Naming: `styles.container`, `styles.button`
- Gradient backgrounds for effect

---

## 📊 Testing Checklist

Before committing, check:
- [ ] `npm start` works without errors
- [ ] Application displays correctly
- [ ] API calls work (Network tab)
- [ ] Redux state updates (Redux DevTools)
- [ ] No console.log in code
- [ ] Console without errors/warnings
- [ ] Documentation up to date

---

## 🆘 When Something Doesn't Work

1. **Restart server**: `Ctrl+C` → `npm start`
2. **Delete node_modules**: `rm -rf node_modules && npm install --legacy-peer-deps`
3. **Check documentation**: DEVELOPMENT.md
4. **Check console**: F12 → Console
5. **Check Network**: F12 → Network
6. **Check Redux**: Redux DevTools

---

## 📞 Support

- **Technical documentation**: [DEVELOPMENT.md](DEVELOPMENT.md)
- **API documentation**: [API.md](API.md)
- **Contribution guide**: [CONTRIBUTING.md](CONTRIBUTING.md)
- **Issues**: GitHub Issues (TODO: add link)

---

## 🎓 Learning Resources

- **React**: https://react.dev/
- **Redux**: https://redux.js.org/
- **Webpack**: https://webpack.js.org/
- **Open-Meteo API**: https://open-meteo.com/en/docs

---

## ⚡ Quick Commands

```bash
# Development
npm start                    # Start dev server
npm run build               # Production build

# Debugging
npm start                    # Check http://localhost:3000
                            # F12 → Console/Network/Redux

# Installation
npm install --legacy-peer-deps
```

---

**Last Updated**: 2026-02-01  
**For**: AI Assistants (GitHub Copilot, ChatGPT, Claude, etc.)  
**Purpose**: Facilitate development with AI using complete documentation

---

## 🎯 TL;DR

1. Read **DEVELOPMENT.md** before any changes
2. Follow existing code patterns
3. Test all changes locally
4. Commit small, atomic changes
5. Update documentation when relevant

**Happy coding! 🚀**
