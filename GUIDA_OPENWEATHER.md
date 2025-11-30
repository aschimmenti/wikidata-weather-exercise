# API OpenWeatherMap - Guida Aggiornata

## La Tua Chiave API
```

```

## Modifiche Importanti! ⚠️

### Perché Ora Usiamo le Coordinate

OpenWeather ha **deprecato** l'API di ricerca per nome città:
> "Le richieste API per nome città, codici postali e ID città sono state deprecate. Anche se sono ancora disponibili per l'uso, correzioni di bug e aggiornamenti non sono più disponibili per questa funzionalità."

**Nuovo approccio:**
1. Ottieni le coordinate della città da Wikidata (proprietà P625)
2. Usa quelle coordinate per recuperare il meteo da OpenWeather

## Come Funziona

### Processo in Due Fasi:

#### Fase 1: Ottieni Coordinate da Wikidata
```
https://www.wikidata.org/w/api.php?action=wbgetentities&sites=enwiki&titles=Bologna&props=claims&format=json
```

Questo restituisce le coordinate nella proprietà `claims.P625`:
```json
{
  "latitude": 44.494887,
  "longitude": 11.3426163
}
```

#### Fase 2: Usa le Coordinate per il Meteo
```
https://api.openweathermap.org/data/2.5/weather?lat=44.4949&lon=11.3426&appid={API_KEY}&units=metric
```

## Endpoint API Utilizzati

### 1. API Wikibase (Gratuita, Nessuna Chiave Richiesta)
```
https://www.wikidata.org/w/api.php
```
- Ottiene informazioni città e coordinate
- Nessuna autenticazione necessaria
- Deve includere header User-Agent

### 2. API OpenWeather Current Weather (Tier Gratuito)
```
https://api.openweathermap.org/data/2.5/weather
```
- Ottiene meteo attuale usando coordinate
- Richiede chiave API
- Tier gratuito: 60 chiamate/min, 1M chiamate/mese

## Cos'è la Proprietà P625 di Wikidata?

La proprietà P625 contiene dati "posizione delle coordinate":
```json
{
  "claims": {
    "P625": [
      {
        "mainsnak": {
          "datavalue": {
            "value": {
              "latitude": 44.494887,
              "longitude": 11.3426163,
              "precision": 0.00027777777777778
            }
          }
        }
      }
    ]
  }
}
```

## Eseguire gli Esercizi

Tutti gli esercizi ora usano questo processo in due fasi:

```bash
# Esercizio 1: Wikibase (mostra coordinate)
node exercise1-wikibase.js "Bologna"

# Esercizio 2: Meteo (ottiene prima le coordinate da Wikidata)
node exercise2-weather.js "Bologna"

# Esercizio 3: Combinato (entrambi in uno)
node exercise3-combined.js "Bologna"
```

## Esempio di Output

### Output Esercizio 2:
```
Fase 1: Recupero coordinate per Bologna da Wikidata...
Trovato: Bologna a 44.4949°N, 11.3426°E

Fase 2: Recupero dati meteo...

=== Informazioni Meteo ===
Posizione: Bologna, IT
Coordinate: 44.49°N, 11.34°E
Meteo: Sereno (cielo sereno)
Temperatura: 15.5°C
Percepita: 14.8°C
Umidità: 72%
...
```

## Perché Questo Approccio è Migliore

### Vantaggi:
1. ✅ **A prova di futuro**: Usa l'API basata su coordinate supportata
2. ✅ **Più accurato**: Wikidata ha coordinate precise
3. ✅ **Educativo**: Mostra come combinare più API
4. ✅ **Affidabile**: Non dipende da funzionalità deprecate

### Compromessi:
- ❌ Richiede due chiamate API invece di una
- ❌ Codice leggermente più complesso
- ✅ Ma più robusto e insegna concetti importanti!

## Problemi Comuni

### Problema: "Nessuna coordinata trovata per {città}"
**Causa:** La città potrebbe non esistere in Wikidata con il nome esatto che hai usato.

**Soluzioni:**
- Prova il nome ufficiale inglese della città (es. "Florence" non "Firenze")
- Controlla che esista la pagina Wikipedia in inglese
- Prova una città più grande nelle vicinanze

**Esempi che funzionano:**
- Bologna ✅
- Milan ✅ (non "Milano")
- Rome ✅ (non "Roma")
- Florence ✅ (non "Firenze")
- Berlin ✅
- Tokyo ✅
- New York ✅

### Problema: "Città non trovata in Wikidata"
**Causa:** L'ortografia esatta non corrisponde al titolo di Wikipedia.

**Soluzione:** Controlla il titolo della pagina Wikipedia inglese. Per esempio:
- Usa "Milan" non "Milano"
- Usa "Florence" non "Firenze"
- Usa "Rome" non "Roma"

### Problema: Chiave API non funziona
**Soluzione:** Aspetta 5-10 minuti dopo aver creato la tua chiave API per l'attivazione.

## Test

### Test nel Browser (Wikidata):
```
https://www.wikidata.org/w/api.php?action=wbgetentities&sites=enwiki&titles=Bologna&props=claims&format=json&origin=*
```

Cerca `claims.P625[0].mainsnak.datavalue.value`

### Test nel Browser (Meteo):
```
https://api.openweathermap.org/data/2.5/weather?lat=44.4949&lon=11.3426&appid=95dbc4aaf267efe18f95981c5539dbd7&units=metric
```

## Esempi di Codice

### Estrai Coordinate da Wikidata:
```javascript
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
```

### Usa Coordinate per il Meteo:
```javascript
async function getWeatherData(lat, lon, units = 'metric') {
  const queryParams = `lat=${lat}&lon=${lon}&appid=${API_KEY}&units=${units}`;
  const url = `https://api.openweathermap.org/data/2.5/weather?${queryParams}`;
  
  const response = await fetch(url);
  return await response.json();
}
```

## Obiettivi di Apprendimento

Questi esercizi insegnano:
1. **Concatenamento API**: Usare l'output di un'API come input per un'altra
2. **Estrazione dati**: Navigare strutture JSON complesse
3. **Gestione errori**: Trattare dati mancanti
4. **Scenari reali**: Adattarsi a modifiche e deprecazioni API

## Ulteriore Esplorazione

Una volta a tuo agio con le basi, prova:
- Supportare più città in una query
- Memorizzare coordinate per evitare chiamate ripetute a Wikidata
- Aggiungere validazione geocoding
- Mostrare risultati su una mappa
- Confrontare meteo tra più città

## Link alla Documentazione

- API Wikidata: https://www.wikidata.org/w/api.php
- Proprietà Wikidata: https://www.wikidata.org/wiki/Property:P625
- OpenWeather Current: https://openweathermap.org/current
- Chiavi API OpenWeather: https://home.openweathermap.org/api_keys
