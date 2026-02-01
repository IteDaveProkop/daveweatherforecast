import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getWeatherData, searchLocation } from '../api/weather';
import {
  setWeatherData,
  addLocation,
  removeLocation,
  setCurrentLocation,
  setSelectedModels,
  setLoading,
  setError,
} from '../store/weatherStore';
import CurrentWeather from '../components/weather/CurrentWeather';
import HourlyForecast from '../components/weather/HourlyForecast';
import DailyForecast from '../components/weather/DailyForecast';
import LoadingSpinner from '../components/common/LoadingSpinner';
import { WEATHER_MODELS } from '../utils/weatherModels';

const HomeScreen = () => {
  const dispatch = useDispatch();
  const { weatherData, locations, currentLocationIndex, selectedModels, loading, error } = useSelector(
    (state) => state
  );
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [showSearch, setShowSearch] = useState(false);
  const [showLocations, setShowLocations] = useState(false);
  const [showModels, setShowModels] = useState(false);
  const [countryFilter, setCountryFilter] = useState('all');

  const currentLocation = currentLocationIndex !== null ? locations[currentLocationIndex] : null;
  
  // První model data (pro zobrazení primary počasí)
  const primaryWeather = weatherData && weatherData.length > 0 ? weatherData[0].data : null;

  const fetchWeather = async () => {
    if (!currentLocation) return;
    
    try {
      dispatch(setLoading(true));
      const data = await getWeatherData(currentLocation.latitude, currentLocation.longitude, selectedModels);
      dispatch(setWeatherData(data));
    } catch (err) {
      dispatch(setError('Nepodařilo se načíst data o počasí'));
    }
  };

  useEffect(() => {
    if (currentLocation) {
      fetchWeather();
    }
  }, [currentLocationIndex, selectedModels]);

  const handleSearch = async () => {
    if (searchQuery.length < 2) return;
    try {
      // Zkontroluj jestli není dotaz GPS souřadnice (např. "50.08, 14.43" nebo "50.08 14.43")
      const coordMatch = searchQuery.match(/^(-?\d+\.?\d*)[,\s]+(-?\d+\.?\d*)$/);
      if (coordMatch) {
        const lat = parseFloat(coordMatch[1]);
        const lon = parseFloat(coordMatch[2]);
        if (lat >= -90 && lat <= 90 && lon >= -180 && lon <= 180) {
          // Platné GPS souřadnice - přidej lokaci
          dispatch(addLocation({
            name: `${lat.toFixed(4)}, ${lon.toFixed(4)}`,
            latitude: lat,
            longitude: lon,
          }));
          setShowSearch(false);
          setSearchQuery('');
          return;
        }
      }
      
      let results = await searchLocation(searchQuery);
      
      // Filtruj podle země
      if (countryFilter !== 'all') {
        results = results.filter(r => {
          if (countryFilter === 'cz') return r.country === 'Česko' || r.country === 'Czechia';
          if (countryFilter === 'sk') return r.country === 'Slovensko' || r.country === 'Slovakia';
          return false;
        });
      }
      
      setSearchResults(results);
    } catch (err) {
      console.error('Search error:', err);
    }
  };

  const selectLocation = (result) => {
    dispatch(
      addLocation({
        name: result.name,
        latitude: result.latitude,
        longitude: result.longitude,
        display_name: result.display_name || null,
      })
    );
    setShowSearch(false);
    setSearchQuery('');
    setSearchResults([]);
  };

  const switchLocation = (index) => {
    dispatch(setCurrentLocation(index));
    setShowLocations(false);
  };

  const deleteLocation = (index) => {
    if (window.confirm(`Opravdu smazat "${locations[index].name}"?`)) {
      dispatch(removeLocation(index));
    }
  };

  const toggleModel = (modelId) => {
    let newModels;
    if (selectedModels.includes(modelId)) {
      // Odstraň model (ale minimálně jeden musí zůstat)
      if (selectedModels.length > 1) {
        newModels = selectedModels.filter(m => m !== modelId);
      } else {
        return; // Nelze odebrat poslední model
      }
    } else {
      // Přidej model
      newModels = [...selectedModels, modelId];
    }
    dispatch(setSelectedModels(newModels));
  };

  // Pokud nejsou žádná místa, zobraz vyhledávání
  if (locations.length === 0) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: '20px' }}>
        <div style={{ textAlign: 'center', marginBottom: '30px' }}>
          <h1 style={{ fontSize: '48px', marginBottom: '10px' }}>🌤️</h1>
          <h2 style={{ color: '#fff', fontSize: '28px', marginBottom: '10px' }}>Vítejte!</h2>
          <p style={{ color: 'rgba(255,255,255,0.9)', fontSize: '18px' }}>
            Pro začátek přidejte své první místo
          </p>
        </div>
        
        <div style={{
          background: '#fff',
          padding: '30px',
          borderRadius: '20px',
          maxWidth: '500px',
          width: '100%',
          boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
        }}>
          <div style={{ marginBottom: '10px' }}>
            <select
              value={countryFilter}
              onChange={(e) => setCountryFilter(e.target.value)}
              style={{
                width: '100%',
                padding: '10px',
                fontSize: '14px',
                border: '2px solid #e0e0e0',
                borderRadius: '8px',
                marginBottom: '10px',
              }}
            >
              <option value="all">🌍 Všechny země</option>
              <option value="cz">🇨🇿 Pouze Česko</option>
              <option value="sk">🇸🇰 Pouze Slovensko</option>
            </select>
            <div style={{
              fontSize: '12px',
              color: '#666',
              marginBottom: '10px',
              padding: '8px',
              background: '#f0f8ff',
              borderRadius: '5px',
            }}>
              💡 Tip: Můžete zadat i GPS souřadnice (např. 49.67, 18.39)
            </div>
          </div>
          <input
            type="text"
            placeholder="Město, adresa (Dobrá 979) nebo GPS (50.08, 14.43)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
            autoFocus
            style={{
              width: '100%',
              padding: '15px',
              fontSize: '16px',
              border: '2px solid #e0e0e0',
              borderRadius: '8px',
              marginBottom: '10px',
            }}
          />
          <button
            onClick={handleSearch}
            style={{
              width: '100%',
              padding: '15px',
              background: '#4A90E2',
              color: '#fff',
              border: 'none',
              borderRadius: '8px',
              fontSize: '18px',
              cursor: 'pointer',
              fontWeight: 'bold',
            }}
          >
            🔍 Hledat
          </button>
          {searchResults.length > 0 && (
            <div style={{ marginTop: '20px', maxHeight: '300px', overflowY: 'auto' }}>
              {searchResults.map((result) => (
                <div
                  key={result.id}
                  onClick={() => selectLocation(result)}
                  style={{
                    padding: '12px',
                    borderBottom: '1px solid #eee',
                    cursor: 'pointer',
                    transition: 'background 0.2s',
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.background = '#f5f5f5'}
                  onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                >
                  <div style={{ fontWeight: 'bold', fontSize: '16px' }}>
                    {result.name}
                    {result.source === 'nominatim' && (
                      <span style={{ 
                        fontSize: '11px', 
                        background: '#4A90E2', 
                        color: '#fff', 
                        padding: '2px 6px', 
                        borderRadius: '3px',
                        marginLeft: '8px'
                      }}>
                        📍 Přesná adresa
                      </span>
                    )}
                  </div>
                  <div style={{ fontSize: '13px', color: '#666', marginTop: '4px' }}>
                    {result.display_name || (
                      <>
                        {result.admin1 && `${result.admin1}, `}
                        {result.country}
                        {result.population && ` • ${result.population.toLocaleString('cs-CZ')} obyvatel`}
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  }

  if (loading && !primaryWeather) {
    return <LoadingSpinner message="Načítání počasí..." />;
  }

  return (
    <div style={{ minHeight: '100vh', paddingBottom: '40px' }}>
      <div style={{
        background: 'rgba(255,255,255,0.15)',
        padding: '20px',
        backdropFilter: 'blur(10px)',
      }}>
        <div style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
          <button
            onClick={() => setShowLocations(!showLocations)}
            style={{
              flex: 1,
              padding: '15px',
              background: '#fff',
              border: 'none',
              borderRadius: '10px',
              fontSize: '16px',
              cursor: 'pointer',
              fontWeight: 'bold',
              color: '#4A90E2',
            }}
          >
            📍 Místa ({locations.length})
          </button>
          <button
            onClick={() => setShowModels(!showModels)}
            style={{
              flex: 1,
              padding: '15px',
              background: '#fff',
              border: 'none',
              borderRadius: '10px',
              fontSize: '16px',
              cursor: 'pointer',
              fontWeight: 'bold',
              color: '#4A90E2',
            }}
          >
            📊 Modely ({selectedModels.length})
          </button>
          <button
            onClick={() => setShowSearch(!showSearch)}
            style={{
              flex: 1,
              padding: '15px',
              background: '#fff',
              border: 'none',
              borderRadius: '10px',
              fontSize: '16px',
              cursor: 'pointer',
              fontWeight: 'bold',
              color: '#4A90E2',
            }}
          >
            ➕ Přidat místo
          </button>
        </div>
      </div>

      {showLocations && (
        <div style={{
          background: '#fff',
          padding: '20px',
          margin: '0 20px 20px 20px',
          borderRadius: '15px',
          boxShadow: '0 4px 10px rgba(0,0,0,0.2)',
        }}>
          <h3 style={{ marginTop: 0, marginBottom: '15px', color: '#333' }}>Uložená místa</h3>
          {locations.map((loc, index) => (
            <div
              key={index}
              style={{
                padding: '12px',
                borderBottom: index < locations.length - 1 ? '1px solid #eee' : 'none',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <div
                onClick={() => switchLocation(index)}
                style={{
                  flex: 1,
                  cursor: 'pointer',
                  fontWeight: index === currentLocationIndex ? 'bold' : 'normal',
                  color: index === currentLocationIndex ? '#4A90E2' : '#333',
                }}
              >
                {index === currentLocationIndex && '✓ '}
                <div style={{ fontSize: '16px', marginBottom: '4px' }}>
                  {loc.name}
                </div>
                {loc.display_name && (
                  <div style={{ fontSize: '12px', color: '#999', fontWeight: 'normal' }}>
                    {loc.display_name}
                  </div>
                )}
                {!loc.display_name && (
                  <div style={{ fontSize: '12px', color: '#999', fontWeight: 'normal' }}>
                    {loc.latitude.toFixed(4)}, {loc.longitude.toFixed(4)}
                  </div>
                )}
              </div>
              <button
                onClick={() => deleteLocation(index)}
                style={{
                  padding: '5px 10px',
                  background: '#ff4444',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '5px',
                  cursor: 'pointer',
                  fontSize: '12px',
                }}
              >
                🗑️ Smazat
              </button>
            </div>
          ))}
        </div>
      )}

      {showModels && (
        <div style={{
          background: '#fff',
          padding: '20px',
          margin: '0 20px 20px 20px',
          borderRadius: '15px',
          boxShadow: '0 4px 10px rgba(0,0,0,0.2)',
        }}>
          <h3 style={{ marginTop: 0, marginBottom: '10px', color: '#333' }}>Předpovědní modely</h3>
          <p style={{ fontSize: '13px', color: '#666', marginBottom: '15px' }}>
            Vyberte jeden nebo více modelů pro porovnání předpovědí
          </p>
          {WEATHER_MODELS.map((model) => (
            <div
              key={model.id}
              onClick={() => toggleModel(model.id)}
              style={{
                padding: '12px',
                borderBottom: '1px solid #eee',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                transition: 'background 0.2s',
              }}
              onMouseEnter={(e) => e.currentTarget.style.background = '#f5f5f5'}
              onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
            >
              <input
                type="checkbox"
                checked={selectedModels.includes(model.id)}
                onChange={() => {}} // Handled by parent onClick
                style={{
                  marginRight: '10px',
                  width: '18px',
                  height: '18px',
                  cursor: 'pointer',
                }}
              />
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 'bold', fontSize: '15px', color: '#333' }}>
                  {model.nameCz}
                </div>
                <div style={{ fontSize: '12px', color: '#666', marginTop: '2px' }}>
                  {model.description}
                </div>
              </div>
            </div>
          ))}
          {selectedModels.length > 1 && (
            <div style={{
              marginTop: '15px',
              padding: '10px',
              background: '#e3f2fd',
              borderRadius: '8px',
              fontSize: '13px',
              color: '#1976d2',
            }}>
              ℹ️ Vybráno {selectedModels.length} modelů - zobrazí se porovnání
            </div>
          )}
        </div>
      )}

      {showSearch && (
        <div style={{
          background: '#fff',
          padding: '20px',
          margin: '0 20px 20px 20px',
          borderRadius: '15px',
          boxShadow: '0 4px 10px rgba(0,0,0,0.2)',
        }}>
          <div style={{ marginBottom: '10px' }}>
            <select
              value={countryFilter}
              onChange={(e) => setCountryFilter(e.target.value)}
              style={{
                width: '100%',
                padding: '10px',
                fontSize: '14px',
                border: '2px solid #e0e0e0',
                borderRadius: '8px',
                marginBottom: '10px',
              }}
            >
              <option value="all">🌍 Všechny země</option>
              <option value="cz">🇨🇿 Pouze Česko</option>
              <option value="sk">🇸🇰 Pouze Slovensko</option>
            </select>
            <div style={{
              fontSize: '12px',
              color: '#666',
              marginBottom: '10px',
              padding: '8px',
              background: '#f0f8ff',
              borderRadius: '5px',
            }}>
              💡 Tip: Můžete zadat i GPS souřadnice (např. 49.67, 18.39)
            </div>
          </div>
          <input
            type="text"
            placeholder="Město, adresa (Dobrá 979) nebo GPS (50.08, 14.43)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
            style={{
              width: '100%',
              padding: '12px',
              fontSize: '16px',
              border: '2px solid #e0e0e0',
              borderRadius: '8px',
              marginBottom: '10px',
            }}
          />
          <button
            onClick={handleSearch}
            style={{
              width: '100%',
              padding: '12px',
              background: '#4A90E2',
              color: '#fff',
              border: 'none',
              borderRadius: '8px',
              fontSize: '16px',
              cursor: 'pointer',
              fontWeight: 'bold',
            }}
          >
            🔍 Hledat
          </button>
          {searchResults.length > 0 && (
            <div style={{ 
              marginTop: '10px', 
              fontSize: '12px', 
              color: '#666',
              padding: '8px',
              background: '#f0f0f0',
              borderRadius: '5px',
            }}>
              Nalezeno: {searchResults.length} {searchResults.length === 1 ? 'výsledek' : searchResults.length < 5 ? 'výsledky' : 'výsledků'}
            </div>
          )}
          {searchResults.map((result) => (
            <div
              key={result.id}
              onClick={() => selectLocation(result)}
              style={{
                padding: '12px',
                borderBottom: '1px solid #eee',
                cursor: 'pointer',
                transition: 'background 0.2s',
              }}
              onMouseEnter={(e) => e.currentTarget.style.background = '#f5f5f5'}
              onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
            >
              <div style={{ fontWeight: 'bold', fontSize: '16px' }}>
                {result.name}
                {result.source === 'nominatim' && (
                  <span style={{ 
                    fontSize: '11px', 
                    background: '#4A90E2', 
                    color: '#fff', 
                    padding: '2px 6px', 
                    borderRadius: '3px',
                    marginLeft: '8px'
                  }}>
                    📍 Přesná adresa
                  </span>
                )}
              </div>
              <div style={{ fontSize: '13px', color: '#666', marginTop: '4px' }}>
                {result.display_name || (
                  <>
                    {result.admin1 && `${result.admin1}, `}
                    {result.country}
                    {result.population && ` • ${result.population.toLocaleString('cs-CZ')} obyvatel`}
                  </>
                )}
              </div>
            </div>
          ))}
          {searchResults.length === 0 && searchQuery.length >= 2 && (
            <div style={{
              padding: '20px',
              textAlign: 'center',
              color: '#999',
              fontSize: '14px',
            }}>
              Žádné výsledky pro "{searchQuery}"
            </div>
          )}
        </div>
      )}

      <div>
        {primaryWeather && (
          <>
            <CurrentWeather weather={primaryWeather.current_weather} location={currentLocation} />
            
            {/* Hodinová předpověď pro dnes */}
            <HourlyForecast weatherData={weatherData} day={0} />
            
            {/* Hodinová předpověď pro zítra */}
            <HourlyForecast weatherData={weatherData} day={1} />
            
            {/* Denní předpověď 3-14 dní */}
            <DailyForecast weatherData={weatherData} />
          </>
        )}
      </div>

      <div style={{ textAlign: 'center', marginTop: '20px' }}>
        <button
          onClick={fetchWeather}
          disabled={loading}
          style={{
            padding: '15px 30px',
            background: loading ? '#ccc' : '#fff',
            color: loading ? '#666' : '#4A90E2',
            border: 'none',
            borderRadius: '25px',
            fontSize: '16px',
            cursor: loading ? 'not-allowed' : 'pointer',
            fontWeight: 'bold',
            boxShadow: '0 4px 10px rgba(0,0,0,0.2)',
          }}
        >
          {loading ? 'Načítám...' : '🔄 Obnovit'}
        </button>
      </div>
    </div>
  );
};

export default HomeScreen;
