// Exercise 3: Combined API - Node.js Script
// Fetches Wikipedia description AND weather information using coordinates from Wikidata

// Your OpenWeatherMap API key
const API_KEY = '95dbc4aaf267efe18f95981c5539dbd7';

// Function to fetch entity data from Wikibase API
async function getWikibaseEntity(title, site = 'enwiki', language = 'en') {
  // Request labels, descriptions, AND claims (for coordinates)
  const queryParams = `action=wbgetentities&sites=${site}&titles=${encodeURIComponent(title)}&props=labels|descriptions|claims&languages=${language}&format=json`;
  const url = `https://www.wikidata.org/w/api.php?${queryParams}`;

  // Fetch with User-Agent header (required by Wikimedia)
  const response = await fetch(url, {
    headers: {
      'User-Agent': 'WikibaseAPIExercise/1.0 (Educational purpose)'
    }
  });

  return await response.json();
}

// Function to extract coordinates from Wikidata entity
function extractCoordinates(entity) {
  if (!entity.claims || !entity.claims.P625) {
    return null;
  }
  
  const coordClaim = entity.claims.P625[0];
  const coordValue = coordClaim.mainsnak.datavalue.value;
  
  return {
    latitude: coordValue.latitude,
    longitude: coordValue.longitude
  };
}

// Function to fetch weather data using coordinates
async function getWeatherData(lat, lon, units = 'metric') {
  const queryParams = `lat=${lat}&lon=${lon}&appid=${API_KEY}&units=${units}`;
  const url = `https://api.openweathermap.org/data/2.5/weather?${queryParams}`;

  const response = await fetch(url);
  const data = await response.json();
  
  if (data.cod && data.cod !== 200) {
    throw new Error(data.message || 'API error');
  }
  
  return data;
}

// Main function to fetch both Wikipedia info and weather data for a city
async function getCityInformation(cityName, units = 'metric') {
  console.log(`\n${'='.repeat(50)}`);
  console.log(`Fetching information for: ${cityName}`);
  console.log('='.repeat(50));

  try {
    // Step 1: Get Wikidata information (including coordinates)
    console.log('\nStep 1: Fetching from Wikidata...');
    const wikiData = await getWikibaseEntity(cityName);
    
    const entity = Object.values(wikiData.entities)[0];
    if (!entity || entity.missing) {
      throw new Error(`City "${cityName}" not found in Wikidata`);
    }
    
    // Step 2: Extract coordinates
    const coords = extractCoordinates(entity);
    if (!coords) {
      throw new Error(`No coordinates found for "${cityName}"`);
    }
    
    console.log(`Found coordinates: ${coords.latitude}°N, ${coords.longitude}°E`);
    
    // Step 3: Get weather using coordinates
    console.log('\nStep 2: Fetching weather data...');
    const weatherData = await getWeatherData(coords.latitude, coords.longitude, units);

    // Display combined information
    displayCombinedInfo(entity, weatherData, coords, units);

  } catch (error) {
    console.error('\n❌ Error:', error.message);
  }
}

// Function to display combined information from both APIs
function displayCombinedInfo(entity, weatherData, coords, units) {
  console.log('\n📚 WIKIPEDIA INFORMATION');
  console.log('-'.repeat(50));

  console.log(`ID: ${entity.id}`);
  
  if (entity.labels && entity.labels.en) {
    console.log(`Label: ${entity.labels.en.value}`);
  }
  
  if (entity.descriptions && entity.descriptions.en) {
    console.log(`Description: ${entity.descriptions.en.value}`);
  }
  
  console.log(`Coordinates: ${coords.latitude}°N, ${coords.longitude}°E`);
  console.log(`Wikidata URL: https://www.wikidata.org/wiki/${entity.id}`);

  console.log('\n🌤️  CURRENT WEATHER');
  console.log('-'.repeat(50));
  
  const tempUnit = units === 'metric' ? '°C' : (units === 'imperial' ? '°F' : 'K');
  const speedUnit = units === 'metric' ? 'm/s' : 'mph';
  
  console.log(`Location: ${weatherData.name}, ${weatherData.sys.country}`);
  console.log(`Condition: ${weatherData.weather[0].main} (${weatherData.weather[0].description})`);
  console.log(`Temperature: ${Math.round(weatherData.main.temp)}${tempUnit}`);
  console.log(`Feels Like: ${Math.round(weatherData.main.feels_like)}${tempUnit}`);
  console.log(`Humidity: ${weatherData.main.humidity}%`);
  console.log(`Pressure: ${weatherData.main.pressure} hPa`);
  console.log(`Wind: ${weatherData.wind.speed} ${speedUnit}`);
  
  if (weatherData.clouds) {
    console.log(`Cloudiness: ${weatherData.clouds.all}%`);
  }
  
  console.log('\n' + '='.repeat(50) + '\n');
}

// Main code - runs when you execute the script
const cityName = process.argv[2] || 'Bologna';
const units = process.argv[3] || 'metric';

getCityInformation(cityName, units);
