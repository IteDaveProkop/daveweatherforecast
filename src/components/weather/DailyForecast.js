import React from 'react';
import { getWeatherIcon } from '../../utils/weatherCodes';
import { getModelName } from '../../utils/weatherModels';

const DailyForecast = ({ weatherData }) => {
  if (!weatherData || weatherData.length === 0) return null;
  
  const multiModel = weatherData.length > 1;
  const primaryForecast = weatherData[0].data.daily;

  const getDayName = (dateString, index) => {
    const date = new Date(dateString);
    const days = ['Ne', 'Po', 'Út', 'St', 'Čt', 'Pá', 'So'];
    const dayName = days[date.getDay()];
    const dayNum = date.getDate();
    const month = date.getMonth() + 1;
    
    if (index === 0) return 'Dnes';
    if (index === 1) return 'Zítra';
    
    return `${dayName} ${dayNum}.${month}.`;
  };

  // Zobraz dny 3-14 (skipni první 2 dny, které jsou hodinové)
  const startDay = 2;
  const endDay = Math.min(14, primaryForecast.time.length);
  
  const dailyData = primaryForecast.time.slice(startDay, endDay).map((date, index) => ({
    date,
    index: index + startDay,
  }));

  return (
    <div style={{ padding: '20px' }}>
      <h3 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '15px', color: '#fff' }}>
        Denní předpověď (14 dní)
      </h3>
      <div style={{ display: 'flex', overflowX: 'auto', gap: '10px', paddingBottom: '10px' }}>
        {dailyData.map((item) => {
          const idx = item.index;
          
          return (
            <div
              key={item.date}
              style={{
                background: 'rgba(255,255,255,0.95)',
                borderRadius: '15px',
                padding: '20px',
                minWidth: multiModel ? '160px' : '120px',
                textAlign: 'center',
                boxShadow: '0 4px 10px rgba(0,0,0,0.2)',
              }}
            >
              <div style={{ fontSize: '16px', fontWeight: 'bold', color: '#333', marginBottom: '10px' }}>
                {getDayName(item.date, idx)}
              </div>
              
              {!multiModel ? (
                // Jeden model - klasické zobrazení
                <>
                  <div style={{ fontSize: '40px', margin: '10px 0' }}>
                    {getWeatherIcon(primaryForecast.weathercode[idx])}
                  </div>
                  <div style={{ fontSize: '22px', fontWeight: 'bold', color: '#333' }}>
                    {Math.round(primaryForecast.temperature_2m_max[idx])}°
                  </div>
                  <div style={{ fontSize: '16px', color: '#666' }}>
                    {Math.round(primaryForecast.temperature_2m_min[idx])}°
                  </div>
                  {primaryForecast.precipitation_sum[idx] > 0 && (
                    <div style={{ fontSize: '14px', color: '#4A90E2', marginTop: '10px' }}>
                      💧 {primaryForecast.precipitation_sum[idx].toFixed(1)} mm
                    </div>
                  )}
                </>
              ) : (
                // Více modelů - porovnání
                <>
                  {weatherData.map((modelData, modelIdx) => {
                    const forecast = modelData.data.daily;
                    return (
                      <div 
                        key={modelData.model}
                        style={{
                          padding: '8px 0',
                          borderBottom: modelIdx < weatherData.length - 1 ? '1px solid #eee' : 'none',
                        }}
                      >
                        <div style={{ fontSize: '10px', color: '#999', marginBottom: '4px' }}>
                          {getModelName(modelData.model)}
                        </div>
                        <div style={{ fontSize: '28px' }}>
                          {getWeatherIcon(forecast.weathercode[idx])}
                        </div>
                        <div style={{ fontSize: '18px', fontWeight: 'bold', color: '#ff6b6b' }}>
                          {Math.round(forecast.temperature_2m_max[idx])}°
                        </div>
                        <div style={{ fontSize: '14px', color: '#666' }}>
                          {Math.round(forecast.temperature_2m_min[idx])}°
                        </div>
                        {forecast.precipitation_sum[idx] > 0 && (
                          <div style={{ fontSize: '10px', color: '#4A90E2', marginTop: '2px' }}>
                            💧 {forecast.precipitation_sum[idx].toFixed(1)}
                          </div>
                        )}
                      </div>
                    );
                  })}
                  {/* Průměr */}
                  <div style={{
                    marginTop: '10px',
                    padding: '8px',
                    background: '#e3f2fd',
                    borderRadius: '8px',
                    fontSize: '12px',
                  }}>
                    <div style={{ color: '#666', marginBottom: '4px' }}>Průměr</div>
                    <div style={{ fontSize: '16px', fontWeight: 'bold', color: '#ff6b6b' }}>
                      {Math.round(
                        weatherData.reduce((sum, md) => sum + md.data.daily.temperature_2m_max[idx], 0) / weatherData.length
                      )}°
                    </div>
                    <div style={{ fontSize: '14px', color: '#4A90E2' }}>
                      {Math.round(
                        weatherData.reduce((sum, md) => sum + md.data.daily.temperature_2m_min[idx], 0) / weatherData.length
                      )}°
                    </div>
                  </div>
                </>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DailyForecast;
