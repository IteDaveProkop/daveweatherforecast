import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './store/weatherStore';
import HomeScreen from './screens/HomeScreen';
import './styles.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <HomeScreen />
  </Provider>
);
