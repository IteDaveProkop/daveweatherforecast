import React from 'react';
import { getWeatherIcon } from '../../utils/weatherCodes';
import { getModelName } from '../../utils/weatherModels';

const HourlyForecast = ({ weatherData, day = 0 }) => {
  if (!weatherData || weatherData.length === 0) return null;
  
  // Pokud je jen jeden model, použij jednoduchý zobrazení
  const multiModel = weatherData.length > 1;
  const primaryForecast = weatherData[0].data.hourly;

  const now = new Date();
  const targetDate = new Date(now);
  targetDate.setDate(targetDate.getDate() + day);
  
  const targetDateStr = targetDate.toISOString().split('T')[0];
  
  // Filtruj hodiny pro daný den (z primárního modelu)
  const hourlyData = primaryForecast.time
    .map((time, index) => ({
      time: new Date(time),
      timeStr: time,
      index: index,
    }))
    .filter(item => item.timeStr.startsWith(targetDateStr));

  // Pro dnešek zobraz od aktuální hodiny (max 12 hodin)
  // Pro zítra zobraz celý den (24 hodin)
  let displayData;
  if (day === 0) {
    const startIndex = hourlyData.findIndex(item => item.time >= now);
    displayData = hourlyData.slice(startIndex, startIndex + 12);
  } else {
    displayData = hourlyData; // Celý den (24 hodin)
  }

  const getDayName = () => {
    const days = ['Neděle', 'Pondělí', 'Úterý', 'Středa', 'Čtvrtek', 'Pátek', 'Sobota'];
    return day === 0 ? 'Dnes' : day === 1 ? 'Zítra' : days[targetDate.getDay()];
  };

  return (
    <div style={{ padding: '20px', marginBottom: '10px' }}>
      <h3 style={{ fontSize: '22px', fontWeight: 'bold', marginBottom: '15px', color: '#fff' }}>
        {getDayName()} - hodinová předpověď
      </h3>
      <div style={{ display: 'flex', overflowX: 'auto', gap: '8px', paddingBottom: '10px' }}>
        {displayData.map((item) => {
          const hour = item.time.getHours();
          const idx = item.index;
          
          return (
            <div
              key={idx}
              style={{
                background: 'rgba(255,255,255,0.95)',
                borderRadius: '12px',
                padding: '12px 8px',
                minWidth: multiModel ? '140px' : '80px',
                textAlign: 'center',
                boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
              }}
            >
              <div style={{ fontSize: '14px', fontWeight: 'bold', color: '#333', marginBottom: '8px' }}>
                {hour}:00
              </div>
              
              {!multiModel ? (
                // Jeden model - klasické zobrazení
                <>
                  <div style={{ fontSize: '32px', margin: '8px 0' }}>
                    {getWeatherIcon(primaryForecast.weathercode[idx])}
                  </div>
                  <div style={{ fontSize: '18px', fontWeight: 'bold', color: '#333' }}>
                    {Math.round(primaryForecast.temperature_2m[idx])}°
                  </div>
                  <div style={{ fontSize: '11px', color: '#4A90E2', marginTop: '6px' }}>
                    💧 {primaryForecast.precipitation[idx].toFixed(1)} mm
                  </div>
                  <div style={{ fontSize: '11px', color: '#666', marginTop: '4px' }}>
                    💨 {Math.round(primaryForecast.windspeed_10m[idx])} km/h
                  </div>
                  <div style={{ fontSize: '11px', color: '#666', marginTop: '2px' }}>
                    💦 {primaryForecast.relativehumidity_2m[idx]}%
                  </div>
                </>
              ) : (
                // Více modelů - porovnání
                <>
                  {weatherData.map((modelData, modelIdx) => {
                    const forecast = modelData.data.hourly;
                    return (
                      <div 
                        key={modelData.model}
                        style={{
                          padding: '6px 0',
                          borderBottom: modelIdx < weatherData.length - 1 ? '1px solid #eee' : 'none',
                        }}
                      >
                        <div style={{ fontSize: '10px', color: '#999', marginBottom: '4px' }}>
                          {getModelName(modelData.model)}
                        </div>
                        <div style={{ fontSize: '24px' }}>
                          {getWeatherIcon(forecast.weathercode[idx])}
                        </div>
                        <div style={{ fontSize: '16px', fontWeight: 'bold', color: '#333' }}>
                          {Math.round(forecast.temperature_2m[idx])}°
                        </div>
                        {forecast.precipitation[idx] > 0 && (
                          <div style={{ fontSize: '10px', color: '#4A90E2', marginTop: '2px' }}>
                            💧 {forecast.precipitation[idx].toFixed(1)}
                          </div>
                        )}
                      </div>
                    );
                  })}
                  {/* Průměr */}
                  <div style={{
                    marginTop: '8px',
                    padding: '6px',
                    background: '#e3f2fd',
                    borderRadius: '6px',
                    fontSize: '11px',
                  }}>
                    <div style={{ color: '#666' }}>Ø</div>
                    <div style={{ fontSize: '15px', fontWeight: 'bold', color: '#1976d2' }}>
                      {Math.round(
                        weatherData.reduce((sum, md) => sum + md.data.hourly.temperature_2m[idx], 0) / weatherData.length
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

export default HourlyForecast;
