// Exercise 2: OpenWeatherMap API - Node.js Script
// Fetches coordinates from Wikidata, then gets weather using those coordinates

// Your OpenWeatherMap API key
const API_KEY = '95dbc4aaf267efe18f95981c5539dbd7';

// Function to fetch entity data from Wikibase API and extract coordinates
async function getCityCoordinates(cityName) {
  const queryParams = `action=wbgetentities&sites=enwiki&titles=${encodeURIComponent(cityName)}&props=labels|claims&languages=en&format=json`;
  const url = `https://www.wikidata.org/w/api.php?${queryParams}`;

  const response = await fetch(url, {
    headers: {
      'User-Agent': 'WikibaseAPIExercise/1.0 (Educational purpose)'
    }
  });

  const data = await response.json();
  const entity = Object.values(data.entities)[0];
  
  if (!entity || entity.missing) {
    throw new Error(`City "${cityName}" not found in Wikidata`);
  }
  
  // Extract coordinates from property P625
  if (!entity.claims || !entity.claims.P625) {
    throw new Error(`No coordinates found for "${cityName}"`);
  }
  
  const coordClaim = entity.claims.P625[0];
  const coordValue = coordClaim.mainsnak.datavalue.value;
  
  return {
    latitude: coordValue.latitude,
    longitude: coordValue.longitude,
    cityName: entity.labels.en ? entity.labels.en.value : cityName
  };
}

// Function to fetch weather data using coordinates
// lat: latitude
// lon: longitude
// units: temperature units - "metric" (Celsius), "imperial" (Fahrenheit), or "standard" (Kelvin)
async function getWeatherData(lat, lon, units = 'metric') {
  // Build the query string using coordinates
  const queryParams = `lat=${lat}&lon=${lon}&appid=${API_KEY}&units=${units}`;
  const url = `https://api.openweathermap.org/data/2.5/weather?${queryParams}`;

  const response = await fetch(url);
  const data = await response.json();
  
  if (data.cod && data.cod !== 200) {
    throw new Error(data.message || 'API error');
  }
  
  return data;
}

// Function to display weather information
function displayWeatherInfo(data, units) {
  console.log('\n=== Weather Information ===');
  console.log(`Location: ${data.name}, ${data.sys.country}`);
  console.log(`Coordinates: ${data.coord.lat}°N, ${data.coord.lon}°E`);
  console.log(`Weather: ${data.weather[0].main} (${data.weather[0].description})`);
  
  const tempUnit = units === 'metric' ? '°C' : (units === 'imperial' ? '°F' : 'K');
  console.log(`Temperature: ${data.main.temp}${tempUnit}`);
  console.log(`Feels like: ${data.main.feels_like}${tempUnit}`);
  console.log(`Min/Max: ${data.main.temp_min}${tempUnit} / ${data.main.temp_max}${tempUnit}`);
  
  console.log(`Humidity: ${data.main.humidity}%`);
  console.log(`Pressure: ${data.main.pressure} hPa`);
  
  if (data.wind) {
    console.log(`Wind Speed: ${data.wind.speed} ${units === 'metric' ? 'm/s' : 'mph'}`);
    if (data.wind.deg) {
      console.log(`Wind Direction: ${data.wind.deg}°`);
    }
  }
  
  if (data.clouds) {
    console.log(`Cloudiness: ${data.clouds.all}%`);
  }
  
  console.log('===========================\n');
}

// Main code - runs when you execute the script
const cityName = process.argv[2] || 'Bologna';
const units = process.argv[3] || 'metric';

console.log(`Step 1: Fetching coordinates for ${cityName} from Wikidata...`);

// First get coordinates from Wikidata, then fetch weather
getCityCoordinates(cityName)
  .then(coords => {
    console.log(`Found: ${coords.cityName} at ${coords.latitude}°N, ${coords.longitude}°E`);
    console.log(`\nStep 2: Fetching weather data...`);
    return getWeatherData(coords.latitude, coords.longitude, units);
  })
  .then(weatherData => {
    displayWeatherInfo(weatherData, units);
  })
  .catch(error => {
    console.error('Error:', error.message);
  });
