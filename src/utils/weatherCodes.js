export const weatherCodeMap = {
  0: { cs: 'Jasno', en: 'Clear sky', icon: '☀️' },
  1: { cs: 'Převážně jasno', en: 'Mainly clear', icon: '🌤️' },
  2: { cs: 'Polojasno', en: 'Partly cloudy', icon: '⛅' },
  3: { cs: 'Zataženo', en: 'Overcast', icon: '☁️' },
  45: { cs: 'Mlha', en: 'Fog', icon: '🌫️' },
  48: { cs: 'Námraza', en: 'Rime fog', icon: '🌫️' },
  51: { cs: 'Mrholení', en: 'Light drizzle', icon: '🌦️' },
  53: { cs: 'Mrholení', en: 'Moderate drizzle', icon: '🌦️' },
  55: { cs: 'Silné mrholení', en: 'Dense drizzle', icon: '🌧️' },
  61: { cs: 'Slabý déšť', en: 'Slight rain', icon: '🌧️' },
  63: { cs: 'Déšť', en: 'Moderate rain', icon: '🌧️' },
  65: { cs: 'Silný déšť', en: 'Heavy rain', icon: '⛈️' },
  71: { cs: 'Slabé sněžení', en: 'Slight snow', icon: '🌨️' },
  73: { cs: 'Sněžení', en: 'Moderate snow', icon: '❄️' },
  75: { cs: 'Silné sněžení', en: 'Heavy snow', icon: '❄️' },
  77: { cs: 'Sněhové krupky', en: 'Snow grains', icon: '🌨️' },
  80: { cs: 'Přeháňky', en: 'Slight rain showers', icon: '🌦️' },
  81: { cs: 'Přeháňky', en: 'Moderate rain showers', icon: '🌧️' },
  82: { cs: 'Silné přeháňky', en: 'Violent rain showers', icon: '⛈️' },
  85: { cs: 'Sněhové přeháňky', en: 'Slight snow showers', icon: '🌨️' },
  86: { cs: 'Silné sněhové přeháňky', en: 'Heavy snow showers', icon: '❄️' },
  95: { cs: 'Bouřka', en: 'Thunderstorm', icon: '⛈️' },
  96: { cs: 'Bouřka s kroupami', en: 'Thunderstorm with hail', icon: '⛈️' },
  99: { cs: 'Silná bouřka s kroupami', en: 'Heavy thunderstorm with hail', icon: '⛈️' },
};

export const getWeatherDescription = (code, lang = 'cs') => {
  return weatherCodeMap[code]?.[lang] || 'Neznámo';
};

export const getWeatherIcon = (code) => {
  // Pokud je code undefined, null nebo není číslo
  if (code === undefined || code === null || isNaN(code)) {
    console.warn(`Invalid weather code: ${code} (type: ${typeof code})`);
    return '☁️'; // Default ikona pro neznámé počasí
  }
  
  if (!weatherCodeMap[code]) {
    console.warn(`Unknown weather code: ${code}`);
    return '☁️'; // Default ikona pro nemapované kódy
  }
  
  return weatherCodeMap[code].icon;
};
