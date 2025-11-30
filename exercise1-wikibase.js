// Exercise 1: Wikibase API - Node.js Script
// Fetches information about Wikipedia entities and extracts coordinates

// Function to fetch entity data from Wikibase API
// title: the city or entity to search for (e.g., "Bologna")
// site: which Wikipedia to use (default: 'enwiki' for English)
// language: which language for descriptions (default: 'en')
async function getWikibaseEntity(title, site = 'enwiki', language = 'en') {
  // Build the query string
  // We request: labels, descriptions, AND claims (which contain coordinates)
  const queryParams = `action=wbgetentities&sites=${site}&titles=${encodeURIComponent(title)}&props=labels|descriptions|claims&languages=${language}&format=json`;
  
  const url = `https://www.wikidata.org/w/api.php?${queryParams}`;

  // Fetch with User-Agent header (required by Wikimedia)
  const response = await fetch(url, {
    headers: {
      'User-Agent': 'WikibaseAPIExercise/1.0 (Educational purpose)'
    }
  });

  const data = await response.json();
  return data;
}

// Function to extract coordinates from Wikidata claims
// The property P625 contains coordinate location data
function extractCoordinates(entity) {
  if (!entity.claims || !entity.claims.P625) {
    return null;
  }
  
  // Get the first coordinate claim
  const coordClaim = entity.claims.P625[0];
  const coordValue = coordClaim.mainsnak.datavalue.value;
  
  return {
    latitude: coordValue.latitude,
    longitude: coordValue.longitude
  };
}

// Function to display entity information
function displayEntityInfo(data) {
  if (data.entities) {
    const entities = Object.values(data.entities);
    const entity = entities[0];
    
    if (entity && !entity.missing) {
      console.log('\n=== Entity Information ===');
      console.log(`ID: ${entity.id}`);
      
      if (entity.labels && entity.labels.en) {
        console.log(`Label: ${entity.labels.en.value}`);
      }
      
      if (entity.descriptions && entity.descriptions.en) {
        console.log(`Description: ${entity.descriptions.en.value}`);
      }
      
      // Extract and display coordinates
      const coords = extractCoordinates(entity);
      if (coords) {
        console.log(`Coordinates: ${coords.latitude}°N, ${coords.longitude}°E`);
      } else {
        console.log('Coordinates: Not available');
      }
      
      console.log(`Wikidata URL: https://www.wikidata.org/wiki/${entity.id}`);
      console.log('========================\n');
    } else {
      console.log('No entity found');
    }
  } else {
    console.log('No entities found');
  }
}

// Main code - runs when you execute the script
// Get city name from command line, or use 'Bologna' as default
const cityName = process.argv[2] || 'Bologna';

console.log(`Fetching information for: ${cityName}`);

getWikibaseEntity(cityName)
  .then(data => {
    displayEntityInfo(data);
  })
  .catch(error => {
    console.error('Error fetching data:', error.message);
  });
