import React from 'react';
import { getWeatherDescription, getWeatherIcon } from '../../utils/weatherCodes';

const CurrentWeather = ({ weather, location }) => {
  if (!weather) return null;

  return (
    <div style={{
      background: 'linear-gradient(135deg, #4A90E2 0%, #357ABD 100%)',
      padding: '40px',
      borderRadius: '20px',
      margin: '20px',
      textAlign: 'center',
      color: '#fff',
      boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
    }}>
      <h2 style={{ fontSize: '28px', fontWeight: 'bold', marginBottom: '10px' }}>
        {location?.name || 'Neznámá lokace'}
      </h2>
      <div style={{ fontSize: '80px', margin: '20px 0' }}>
        {getWeatherIcon(weather.weathercode)}
      </div>
      <div style={{ fontSize: '60px', fontWeight: 'bold' }}>
        {Math.round(weather.temperature)}°C
      </div>
      <div style={{ fontSize: '24px', marginTop: '10px' }}>
        {getWeatherDescription(weather.weathercode)}
      </div>
      <div style={{ marginTop: '30px', fontSize: '18px' }}>
        💨 {weather.windspeed} km/h
      </div>
    </div>
  );
};

export default CurrentWeather;
