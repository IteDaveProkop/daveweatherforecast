# Contributing Guide - Weather Forecast Application

## 🤝 Welcome!

Thank you for your interest in contributing to the project! This guide will help you get started.

---

## 🚀 Quick Start for contributors

### 1. Fork & Clone

```bash
# Fork repository on GitHub, then:
git clone https://github.com/YOUR_USERNAME/DaveWeatherForecast.git
cd DaveWeatherForecast
npm install --legacy-peer-deps
npm start
```

### 2. Create a branch

```bash
git checkout -b feature/my-new-feature
# or
git checkout -b fix/bug-fix
```

### 3. Commit changes

```bash
git add .
git commit -m "feat: add hourly forecast"
git push origin feature/my-new-feature
```

### 4. Create a Pull Request

Open a PR on GitHub with a description of your changes.

---

## 📋 Git Commit Conventions

We use **Conventional Commits**:

### Format
```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types

| Type | Usage | Example |
|------|-------|---------|
| `feat` | New feature | `feat: add UV index` |
| `fix` | Bug fix | `fix: loading spinner on refresh` |
| `docs` | Documentation | `docs: update README` |
| `style` | Formatting | `style: fix indentation` |
| `refactor` | Refactoring | `refactor: simplify API calls` |
| `test` | Tests | `test: add unit tests` |
| `chore` | Maintenance | `chore: update dependencies` |

### Examples

```bash
# Good commit
feat(weather): add hourly forecast with charts

Implements:
- HourlyChart component
- Temperature and precipitation chart
- Responsive design

Closes #23

# Bad commit
update stuff
```

---

## 🏗️ Project Structure Rules

### Folders

```
src/
├── api/           # API calls (axios)
├── components/    # React components
│   ├── common/    # Shared components
│   └── weather/   # Weather-specific components
├── screens/       # Full screens
├── store/         # Redux store
├── utils/         # Helper functions
└── styles.css     # Global styles
```

### Naming Conventions

**Components**:
```javascript
// PascalCase for components
CurrentWeather.js
DailyForecast.js
LoadingSpinner.js
```

**Utility functions**:
```javascript
// camelCase for utilities
weatherCodes.js
dateFormatter.js
unitConverter.js
```

**Constants**:
```javascript
// UPPER_SNAKE_CASE
const API_BASE_URL = 'https://...';
const MAX_RESULTS = 10;
```

---

## 🎨 Code Style Guide

### React Components

```javascript
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types'; // TODO: add

const MyComponent = ({ prop1, prop2 }) => {
  // 1. State hooks
  const [state, setState] = useState(initialValue);
  
  // 2. Effect hooks
  useEffect(() => {
    // Effect logic
  }, [dependencies]);
  
  // 3. Event handlers
  const handleClick = () => {
    // Handler logic
  };
  
  // 4. Helper functions
  const formatData = (data) => {
    return data.map(/* ... */);
  };
  
  // 5. Early returns
  if (!prop1) return null;
  
  // 6. Render
  return (
    <div style={styles.container}>
      {/* JSX */}
    </div>
  );
};

// 7. PropTypes (TODO)
MyComponent.propTypes = {
  prop1: PropTypes.string.isRequired,
  prop2: PropTypes.number,
};

// 8. Default props
MyComponent.defaultProps = {
  prop2: 0,
};

// 9. Styles
const styles = {
  container: {
    padding: '20px',
  },
};

export default MyComponent;
```

### Redux Actions

```javascript
// Action types
const SET_WEATHER_DATA = 'SET_WEATHER_DATA';

// Action creators
export const setWeatherData = (data) => ({
  type: SET_WEATHER_DATA,
  payload: data,
});
```

### API Calls

```javascript
import axios from 'axios';

export const fetchData = async (param) => {
  try {
    const response = await axios.get(url, { params });
    return response.data;
  } catch (error) {
    console.error('API Error:', error);
    throw error; // Re-throw for error handling in component
  }
};
```

---

## ✅ Checklist before Pull Request

- [ ] Code compiles without errors (`npm start`)
- [ ] Code follows the style guide
- [ ] Commit messages follow conventions
- [ ] Documentation is up to date
- [ ] Tested in browser
- [ ] No console.log in production code
- [ ] README.md updated (if relevant)

---

## 🧪 Testing (TODO)

We plan to add tests using Jest and React Testing Library.

### Test Structure

```javascript
// MyComponent.test.js
import { render, screen, fireEvent } from '@testing-library/react';
import MyComponent from './MyComponent';

describe('MyComponent', () => {
  test('renders correctly', () => {
    render(<MyComponent prop1="test" />);
    expect(screen.getByText('test')).toBeInTheDocument();
  });
  
  test('handles click events', () => {
    const handleClick = jest.fn();
    render(<MyComponent onClick={handleClick} />);
    fireEvent.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
```

---

## 📝 Documentation Standards

### Component Documentation

```javascript
/**
 * CurrentWeather Component
 * 
 * Displays current weather for a given location.
 * 
 * @param {Object} weather - Object with current weather
 * @param {number} weather.temperature - Temperature in °C
 * @param {number} weather.weathercode - WMO weather code
 * @param {Object} location - Location object
 * @param {string} location.name - Location name
 * 
 * @example
 * <CurrentWeather 
 *   weather={{ temperature: 20, weathercode: 0 }}
 *   location={{ name: "Prague" }}
 * />
 */
const CurrentWeather = ({ weather, location }) => {
  // ...
};
```

### API Documentation

```javascript
/**
 * Gets weather data from Open-Meteo API
 * 
 * @param {number} latitude - Latitude
 * @param {number} longitude - Longitude
 * @returns {Promise<Object>} Weather data object
 * @throws {Error} If API call fails
 * 
 * @example
 * const data = await getWeatherData(50.0755, 14.4378);
 * console.log(data.current_weather.temperature);
 */
export const getWeatherData = async (latitude, longitude) => {
  // ...
};
```

---

## 🐛 Reporting Bugs

### Bug Report Template

```markdown
**Bug Description**
Brief description of what's wrong.

**Steps to Reproduce**
1. Go to '...'
2. Click on '...'
3. Scroll down to '...'
4. You see the error

**Expected Behavior**
What should have happened.

**Actual Behavior**
What happened.

**Screenshots**
If relevant.

**Environment**
- OS: [e.g. Windows 11]
- Browser: [e.g. Chrome 120]
- Version: [e.g. 1.0.0]

**Additional Context**
Any additional information.
```

---

## 💡 Feature Requests

### Feature Request Template

```markdown
**Is your feature request related to a problem?**
Clear description of the problem. E.g. "It's frustrating when..."

**Proposed Solution**
What should be implemented in your opinion.

**Alternatives**
What alternative solutions have you considered.

**Additional Context**
Screenshots, mockups, examples from other applications.
```

---

## 🎯 Priority Areas

### High Priority
- [ ] Add unit tests
- [ ] TypeScript migration
- [ ] Accessibility (ARIA labels)
- [ ] Performance optimization

### Medium Priority
- [ ] Dark mode
- [ ] PWA support
- [ ] Offline mode with Service Workers
- [ ] Localization (other languages)

### Low Priority
- [ ] Weather charts/graphs
- [ ] Weather alerts
- [ ] Historical data
- [ ] Social sharing

---

## 📚 Useful Resources

### For AI Bots
- `DEVELOPMENT.md` - Complete developer documentation
- `API.md` - API reference and examples
- `ARCHITECTURE.md` - Project architecture (TODO)

### External Resources
- [React Docs](https://react.dev/)
- [Redux Docs](https://redux.js.org/)
- [Open-Meteo API](https://open-meteo.com/en/docs)
- [Conventional Commits](https://www.conventionalcommits.org/)

---

## 🤖 Tips for AI Assistants

### When adding features:
1. Analyze existing code structure
2. Follow existing patterns
3. Test changes locally
4. Update documentation
5. Create small, atomic commits

### When doing code review:
1. Check style guide compliance
2. Test functionality
3. Check performance
4. Validate documentation
5. Provide constructive feedback

### When refactoring:
1. Keep functionality the same
2. Proceed in small steps
3. Test after each change
4. Update tests
5. Document changes

---

## 📞 Contact

For questions or discussion:
- **Issues**: Create an issue on GitHub
- **Discussions**: Use GitHub Discussions
- **Email**: [TODO: add email]

---

## 🙏 Thanks

Thank you to all contributors for their time and effort!

### Main Contributors
- [List will be added]

---

**Happy Contributing! 🎉**

*Last updated: 2026-02-01*
