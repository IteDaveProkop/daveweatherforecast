import React, { useState } from 'react';
import { getModelName } from '../../utils/weatherModels';
import { getWeatherIcon } from '../../utils/weatherCodes';

const ModelComparison = ({ weatherData }) => {
  const [selectedDay, setSelectedDay] = useState(0);
  const [selectedHour, setSelectedHour] = useState(12);
  
  if (!weatherData || weatherData.length === 0) return null;
  if (weatherData.length === 1) return null;

  const today = new Date();
  const getDayLabel = (dayOffset) => {
    const date = new Date(today);
    date.setDate(date.getDate() + dayOffset);
    const days = ['Ne', 'Po', 'Út', 'St', 'Čt', 'Pá', 'So'];
    return `${days[date.getDay()]} ${date.getDate()}.${date.getMonth() + 1}.`;
  };

  return (
    <div style={{ padding: '20px' }}>
      <h3 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '15px', color: '#fff' }}>
        📊 Porovnání modelů ({weatherData.length})
      </h3>
      
      {/* Aktuální počasí */}
      <div style={{
        background: 'rgba(255,255,255,0.95)',
        borderRadius: '15px',
        padding: '20px',
        marginBottom: '15px',
        boxShadow: '0 4px 10px rgba(0,0,0,0.2)',
      }}>
        <h4 style={{ margin: '0 0 15px 0', color: '#333' }}>Aktuální podmínky</h4>
        <div style={{ display: 'flex', gap: '10px', overflowX: 'auto' }}>
          {weatherData.map((item) => (
            <div key={item.model} style={{
              flex: '1',
              minWidth: '120px',
              textAlign: 'center',
              padding: '12px',
              background: '#f5f5f5',
              borderRadius: '8px',
            }}>
              <div style={{ fontSize: '11px', color: '#666', marginBottom: '5px' }}>
                {getModelName(item.model)}
              </div>
              <div style={{ fontSize: '36px', fontWeight: 'bold', color: '#4A90E2' }}>
                {Math.round(item.data.current_weather.temperature)}°
              </div>
              <div style={{ fontSize: '11px', color: '#666', marginTop: '5px' }}>
                💨 {Math.round(item.data.current_weather.windspeed)} km/h
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Hodinová předpověď - výběr hodiny */}
      <div style={{
        background: 'rgba(255,255,255,0.95)',
        borderRadius: '15px',
        padding: '20px',
        marginBottom: '15px',
        boxShadow: '0 4px 10px rgba(0,0,0,0.2)',
      }}>
        <h4 style={{ margin: '0 0 10px 0', color: '#333' }}>Hodinová předpověď</h4>
        
        {/* Výběr hodiny */}
        <div style={{ marginBottom: '15px', overflowX: 'auto' }}>
          <div style={{ display: 'flex', gap: '5px', minWidth: 'fit-content' }}>
            {[0, 3, 6, 9, 12, 15, 18, 21].map((hour) => (
              <button
                key={hour}
                onClick={() => setSelectedHour(hour)}
                style={{
                  padding: '8px 12px',
                  background: selectedHour === hour ? '#4A90E2' : '#f5f5f5',
                  color: selectedHour === hour ? '#fff' : '#333',
                  border: 'none',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontSize: '13px',
                  fontWeight: selectedHour === hour ? 'bold' : 'normal',
                }}
              >
                {hour}:00
              </button>
            ))}
          </div>
        </div>
        
        {/* Porovnání hodinových teplot */}
        <div style={{ display: 'flex', gap: '10px', overflowX: 'auto' }}>
          {weatherData.map((item) => {
            const temp = item.data.hourly.temperature_2m[selectedHour];
            const weathercode = item.data.hourly.weathercode[selectedHour];
            const precipitation = item.data.hourly.precipitation[selectedHour];
            
            return (
              <div key={item.model} style={{
                flex: '1',
                minWidth: '110px',
                textAlign: 'center',
                padding: '12px',
                background: '#f5f5f5',
                borderRadius: '8px',
              }}>
                <div style={{ fontSize: '11px', color: '#666', marginBottom: '5px' }}>
                  {getModelName(item.model)}
                </div>
                <div style={{ fontSize: '32px', marginBottom: '5px' }}>
                  {getWeatherIcon(weathercode)}
                </div>
                <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#333' }}>
                  {Math.round(temp)}°
                </div>
                {precipitation > 0 && (
                  <div style={{ fontSize: '11px', color: '#4A90E2', marginTop: '5px' }}>
                    💧 {precipitation.toFixed(1)} mm
                  </div>
                )}
              </div>
            );
          })}
        </div>
        
        {/* Průměr hodinových teplot */}
        <div style={{ 
          marginTop: '15px', 
          padding: '10px', 
          background: '#e3f2fd', 
          borderRadius: '8px',
          textAlign: 'center',
        }}>
          <span style={{ fontSize: '13px', color: '#666' }}>Průměrná teplota v {selectedHour}:00: </span>
          <span style={{ fontSize: '18px', fontWeight: 'bold', color: '#1976d2' }}>
            {Math.round(
              weatherData.reduce((sum, item) => sum + item.data.hourly.temperature_2m[selectedHour], 0) / weatherData.length
            )}°C
          </span>
        </div>
      </div>

      {/* Denní předpověď - výběr dne */}
      <div style={{
        background: 'rgba(255,255,255,0.95)',
        borderRadius: '15px',
        padding: '20px',
        boxShadow: '0 4px 10px rgba(0,0,0,0.2)',
      }}>
        <h4 style={{ margin: '0 0 10px 0', color: '#333' }}>Denní předpověď</h4>
        
        {/* Výběr dne */}
        <div style={{ marginBottom: '15px', overflowX: 'auto' }}>
          <div style={{ display: 'flex', gap: '5px', minWidth: 'fit-content' }}>
            {[0, 1, 2, 3, 4, 5, 6].map((day) => (
              <button
                key={day}
                onClick={() => setSelectedDay(day)}
                style={{
                  padding: '8px 12px',
                  background: selectedDay === day ? '#4A90E2' : '#f5f5f5',
                  color: selectedDay === day ? '#fff' : '#333',
                  border: 'none',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontSize: '12px',
                  fontWeight: selectedDay === day ? 'bold' : 'normal',
                  whiteSpace: 'nowrap',
                }}
              >
                {day === 0 ? 'Dnes' : day === 1 ? 'Zítra' : getDayLabel(day)}
              </button>
            ))}
          </div>
        </div>
        
        {/* Porovnání denních teplot */}
        <div style={{ display: 'flex', gap: '10px', overflowX: 'auto' }}>
          {weatherData.map((item) => {
            const maxTemp = item.data.daily.temperature_2m_max[selectedDay];
            const minTemp = item.data.daily.temperature_2m_min[selectedDay];
            const weathercode = item.data.daily.weathercode[selectedDay];
            const precipitation = item.data.daily.precipitation_sum[selectedDay];
            
            return (
              <div key={item.model} style={{
                flex: '1',
                minWidth: '110px',
                textAlign: 'center',
                padding: '12px',
                background: '#f5f5f5',
                borderRadius: '8px',
              }}>
                <div style={{ fontSize: '11px', color: '#666', marginBottom: '5px' }}>
                  {getModelName(item.model)}
                </div>
                <div style={{ fontSize: '32px', marginBottom: '5px' }}>
                  {getWeatherIcon(weathercode)}
                </div>
                <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#ff6b6b' }}>
                  {Math.round(maxTemp)}°
                </div>
                <div style={{ fontSize: '16px', color: '#666' }}>
                  {Math.round(minTemp)}°
                </div>
                {precipitation > 0 && (
                  <div style={{ fontSize: '11px', color: '#4A90E2', marginTop: '5px' }}>
                    💧 {precipitation.toFixed(1)} mm
                  </div>
                )}
              </div>
            );
          })}
        </div>
        
        {/* Průměr denních teplot */}
        <div style={{ 
          marginTop: '15px', 
          padding: '10px', 
          background: '#e3f2fd', 
          borderRadius: '8px',
          textAlign: 'center',
        }}>
          <span style={{ fontSize: '13px', color: '#666' }}>Průměr: </span>
          <span style={{ fontSize: '18px', fontWeight: 'bold', color: '#ff6b6b' }}>
            {Math.round(
              weatherData.reduce((sum, item) => sum + item.data.daily.temperature_2m_max[selectedDay], 0) / weatherData.length
            )}°
          </span>
          <span style={{ fontSize: '16px', color: '#666', margin: '0 5px' }}>/</span>
          <span style={{ fontSize: '18px', fontWeight: 'bold', color: '#4A90E2' }}>
            {Math.round(
              weatherData.reduce((sum, item) => sum + item.data.daily.temperature_2m_min[selectedDay], 0) / weatherData.length
            )}°
          </span>
        </div>
      </div>
    </div>
  );
};

export default ModelComparison;
