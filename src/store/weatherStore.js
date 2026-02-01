import { createStore } from 'redux';

// Načti uložená místa z localStorage
const loadLocations = () => {
  try {
    const saved = localStorage.getItem('weatherLocations');
    return saved ? JSON.parse(saved) : [];
  } catch (error) {
    console.error('Error loading locations:', error);
    return [];
  }
};

const loadCurrentLocationIndex = () => {
  try {
    const saved = localStorage.getItem('currentLocationIndex');
    return saved !== null ? parseInt(saved, 10) : null;
  } catch (error) {
    return null;
  }
};

const loadSelectedModels = () => {
  try {
    const saved = localStorage.getItem('selectedModels');
    return saved ? JSON.parse(saved) : ['icon_seamless']; // Výchozí model: DWD ICON
  } catch (error) {
    return ['icon_seamless'];
  }
};

const initialState = {
  weatherData: [], // Array of { model, data } objects
  locations: loadLocations(),
  currentLocationIndex: loadCurrentLocationIndex(),
  selectedModels: loadSelectedModels(),
  loading: false,
  error: null,
};

const weatherReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_WEATHER_DATA':
      return {
        ...state,
        weatherData: action.payload,
        loading: false,
        error: null,
      };
    case 'SET_SELECTED_MODELS':
      localStorage.setItem('selectedModels', JSON.stringify(action.payload));
      return {
        ...state,
        selectedModels: action.payload,
      };
    case 'ADD_LOCATION':
      const newLocations = [...state.locations, action.payload];
      localStorage.setItem('weatherLocations', JSON.stringify(newLocations));
      const newIndex = newLocations.length - 1;
      localStorage.setItem('currentLocationIndex', newIndex);
      return {
        ...state,
        locations: newLocations,
        currentLocationIndex: newIndex,
      };
    case 'REMOVE_LOCATION':
      const filteredLocations = state.locations.filter((_, index) => index !== action.payload);
      localStorage.setItem('weatherLocations', JSON.stringify(filteredLocations));
      let newCurrentIndex = state.currentLocationIndex;
      if (action.payload === state.currentLocationIndex) {
        newCurrentIndex = filteredLocations.length > 0 ? 0 : null;
      } else if (action.payload < state.currentLocationIndex) {
        newCurrentIndex = state.currentLocationIndex - 1;
      }
      if (newCurrentIndex !== null) {
        localStorage.setItem('currentLocationIndex', newCurrentIndex);
      } else {
        localStorage.removeItem('currentLocationIndex');
      }
      return {
        ...state,
        locations: filteredLocations,
        currentLocationIndex: newCurrentIndex,
      };
    case 'SET_CURRENT_LOCATION':
      localStorage.setItem('currentLocationIndex', action.payload);
      return {
        ...state,
        currentLocationIndex: action.payload,
      };
    case 'SET_LOADING':
      return {
        ...state,
        loading: action.payload,
      };
    case 'SET_ERROR':
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    default:
      return state;
  }
};

export const store = createStore(weatherReducer);

export const setWeatherData = (data) => ({
  type: 'SET_WEATHER_DATA',
  payload: data,
});

export const setSelectedModels = (models) => ({
  type: 'SET_SELECTED_MODELS',
  payload: models,
});

export const addLocation = (location) => ({
  type: 'ADD_LOCATION',
  payload: location,
});

export const removeLocation = (index) => ({
  type: 'REMOVE_LOCATION',
  payload: index,
});

export const setCurrentLocation = (index) => ({
  type: 'SET_CURRENT_LOCATION',
  payload: index,
});

export const setLoading = (loading) => ({
  type: 'SET_LOADING',
  payload: loading,
});

export const setError = (error) => ({
  type: 'SET_ERROR',
  payload: error,
});
