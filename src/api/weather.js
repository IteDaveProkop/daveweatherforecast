import axios from 'axios';

const BASE_URL = 'https://api.open-meteo.com/v1/forecast';

export const getWeatherData = async (latitude, longitude, models = ['best_match']) => {
  try {
    // Pokud je více modelů, zavolej API pro každý model zvlášť
    if (models.length > 1) {
      const promises = models.map(async (model) => {
        const response = await axios.get(BASE_URL, {
          params: {
            latitude,
            longitude,
            current_weather: true,
            hourly: 'temperature_2m,precipitation,weathercode,windspeed_10m,relativehumidity_2m',
            daily: 'weathercode,temperature_2m_max,temperature_2m_min,precipitation_sum',
            timezone: 'auto',
            forecast_days: 14,
            models: model,
          },
        });
        return {
          model,
          data: response.data,
        };
      });
      
      const results = await Promise.all(promises);
      return results;
    } else {
      // Jeden model
      const response = await axios.get(BASE_URL, {
        params: {
          latitude,
          longitude,
          current_weather: true,
          hourly: 'temperature_2m,precipitation,weathercode,windspeed_10m,relativehumidity_2m',
          daily: 'weathercode,temperature_2m_max,temperature_2m_min,precipitation_sum',
          timezone: 'auto',
          forecast_days: 14,
          models: models[0],
        },
      });
      return [{
        model: models[0],
        data: response.data,
      }];
    }
  } catch (error) {
    console.error('Weather API Error:', error);
    throw error;
  }
};

export const searchLocation = async (query) => {
  try {
    // Zkus nejdřív Open-Meteo API (města a obce)
    const response = await axios.get('https://geocoding-api.open-meteo.com/v1/search', {
      params: {
        name: query,
        count: 15,
        language: 'cs',
        format: 'json',
      },
    });
    
    let results = response.data.results || [];
    
    // Pokud je dotaz specifický (obsahuje čísla nebo více slov), zkus i Nominatim
    if (query.match(/\d/) || query.split(' ').length > 1) {
      try {
        const nominatimResponse = await axios.get('https://nominatim.openstreetmap.org/search', {
          params: {
            q: query,
            format: 'json',
            addressdetails: 1,
            limit: 10,
            'accept-language': 'cs',
          },
          headers: {
            'User-Agent': 'WeatherForecastApp/1.0'
          }
        });
        
        // Přidej Nominatim výsledky
        const nominatimResults = nominatimResponse.data.map(item => {
          // Vytvoř hezké jméno podle dostupných dat
          let name = '';
          
          // Název obce/města
          const locality = item.address?.village || item.address?.town || item.address?.city;
          
          if (item.address?.road && item.address?.house_number) {
            // Ulice s číslem popisným: "Hlavní 123, Praha"
            name = `${item.address.road} ${item.address.house_number}`;
            if (locality) {
              name += `, ${locality}`;
            }
          } else if (item.address?.house_number && locality) {
            // Číslo popisné v obci bez ulice: "Dobrá 1055"
            name = `${locality} ${item.address.house_number}`;
          } else if (locality) {
            // Jen obec bez čísla: "Dobrá"
            name = locality;
          } else if (item.name) {
            // Použij název z API
            name = item.name;
          } else {
            // Fallback na první část display_name
            name = item.display_name.split(',')[0];
          }
          
          return {
            id: `nominatim-${item.place_id}`,
            name: name,
            latitude: parseFloat(item.lat),
            longitude: parseFloat(item.lon),
            country: item.address?.country || 'Neznámá země',
            admin1: item.address?.county || item.address?.state || locality,
            display_name: item.display_name,
            source: 'nominatim'
          };
        });
        
        // Slouč výsledky (Nominatim první pro přesnější adresy)
        results = [...nominatimResults, ...results];
      } catch (nominatimError) {
        console.warn('Nominatim search failed:', nominatimError);
        // Pokračuj s Open-Meteo výsledky
      }
    }
    
    return results;
  } catch (error) {
    console.error('Geocoding API Error:', error);
    throw error;
  }
};
