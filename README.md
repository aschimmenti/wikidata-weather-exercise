# Esercizi API con JavaScript e Node.js

Questi esercizi insegnano come lavorare con le API usando JavaScript e Node.js, con particolare attenzione al **concatenamento di API** - utilizzare l'output di un'API come input per un'altra.

## 📋 Indice

- [Cosa Imparerai](#cosa-imparerai)
- [Prerequisiti](#prerequisiti)
- [Installazione](#installazione)
- [Avvio Rapido](#avvio-rapido)
- [Panoramica degli Esercizi](#panoramica-degli-esercizi)
- [Come Funziona](#come-funziona)
- [Guida agli Esercizi](#guida-agli-esercizi)
- [Concetti Chiave](#concetti-chiave)
- [Risoluzione Problemi](#risoluzione-problemi)
- [Risorse](#risorse)

---

## 🎯 Cosa Imparerai

Questi esercizi coprono competenze fondamentali per lavorare con le API:

### Competenze di Base
- ✅ Fare richieste HTTP con `fetch`
- ✅ Analizzare e manipolare JSON
- ✅ Gestire errori nelle chiamate API
- ✅ Usare `async/await` per codice asincrono
- ✅ Lavorare con Node.js e NPM

### Competenze Avanzate
- ✅ **Concatenamento API** - Usare l'output di un'API come input di un'altra
- ✅ Estrarre dati da strutture JSON complesse
- ✅ Gestire autenticazione API (chiavi API)
- ✅ Lavorare con coordinate geografiche
- ✅ Integrare servizi web multipli

### Problem Solving Reale
- ✅ Adattarsi a modifiche delle API (deprecazioni)
- ✅ Trovare soluzioni alternative quando un'API cambia
- ✅ Combinare dati da fonti diverse

---

## 📦 Prerequisiti

### Software Necessario

#### 1. Node.js (versione 18 o superiore)

**Perché Node 18+?** Serve per il supporto nativo a `fetch`.

**Installazione:**
1. Vai su [nodejs.org](https://nodejs.org)
2. Scarica la versione **LTS** (Long Term Support)
3. Installa seguendo le istruzioni per il tuo sistema operativo

**Verifica installazione:**
```bash
node -v
# Output atteso: v18.x.x o superiore
```

**Nota:** Node.js include automaticamente NPM (Node Package Manager).

#### 2. NPM (Node Package Manager)

NPM viene installato automaticamente con Node.js.

**Verifica installazione:**
```bash
npm -v
# Output atteso: 9.x.x o superiore
```

**Aggiornamento NPM (opzionale):**
```bash
npm install npm@latest -g
```

#### 3. Un Editor di Testo

Scegli uno di questi:
- **Visual Studio Code** (consigliato) - [code.visualstudio.com](https://code.visualstudio.com)
- **Sublime Text** - [sublimetext.com](https://www.sublimetext.com)
- Qualsiasi editor di tua preferenza

#### 4. Un Browser Web Moderno

Per gli esercizi HTML:
- Chrome, Firefox, Safari, o Edge (versioni recenti)

### Chiave API OpenWeatherMap

**Nota:** Gli esercizi Node.js hanno già la chiave pre-configurata, ma per gli esercizi HTML dovrai inserirla.

**Come ottenerla:**
1. Vai su [openweathermap.org](https://openweathermap.org/api)
2. Clicca su "Sign Up" e crea un account gratuito
3. Vai su "API Keys" nel tuo profilo
4. Copia la chiave API (formato: `xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx`)
5. Aspetta 5-10 minuti per l'attivazione

**La chiave già configurata negli esercizi:**
```
95dbc4aaf267efe18f95981c5539dbd7
```

---

## 🚀 Installazione

### 1. Scarica i File degli Esercizi

Scarica tutti i file in una cartella sul tuo computer, ad esempio:
```
Documenti/
  └── esercizi-api/
      ├── exercise1-wikibase.js
      ├── exercise1-wikibase.html
      ├── exercise2-weather.js
      ├── exercise2-weather.html
      ├── exercise3-combined.js
      ├── exercise3-combined.html
      ├── README.md
      ├── GUIDA_WIKIPEDIA.md
      └── GUIDA_OPENWEATHER.md
```

### 2. Apri il Terminale nella Cartella

**Su Windows:**
1. Apri la cartella in Esplora File
2. Nella barra degli indirizzi, digita `cmd` e premi Invio
3. O fai Shift + Click Destro → "Apri finestra PowerShell qui"

**Su Mac:**
1. Apri Finder e vai alla cartella
2. Click destro sulla cartella → "Servizi" → "Nuovo Terminale nella cartella"
3. O usa Spotlight: Cmd+Spazio, digita "Terminal"

**Su Linux:**
1. Apri il terminale
2. Usa `cd` per navigare alla cartella:
```bash
cd ~/Documenti/esercizi-api
```

### 3. Verifica che Tutto Sia Pronto

```bash
# Controlla Node.js
node -v

# Controlla NPM
npm -v

# Lista i file
ls        # Mac/Linux
dir       # Windows
```

---

## ⚡ Avvio Rapido

### Esegui il Primo Esercizio

```bash
# Esercizio 1: Informazioni Wikipedia
node exercise1-wikibase.js "Bologna"
```

**Output atteso:**
```
Fetching information for: Bologna

=== Informazioni Entità ===
ID: Q1891
Label: Bologna
Description: comune italiano capoluogo dell'Emilia-Romagna
Coordinates: 44.4949°N, 11.3426°E
========================
```

### Prova Altri Esercizi

```bash
# Esercizio 2: Meteo
node exercise2-weather.js "Bologna"

# Esercizio 3: Wikipedia + Meteo
node exercise3-combined.js "Bologna"
```

### Apri le Interfacce Web

1. Fai doppio click sui file `.html`
2. Si apriranno nel tuo browser predefinito
3. Segui le istruzioni a schermo

---

## 📚 Panoramica degli Esercizi

### Progressione Didattica

Gli esercizi sono ordinati per difficoltà crescente:

```
Esercizio 1 → Esercizio 2 → Esercizio 3
   (Base)      (Intermedio)   (Avanzato)
```

### Schema Generale

| Esercizio | API Usate | Difficoltà | Concetti |
|-----------|-----------|------------|----------|
| **1. Wikibase** | Wikidata | ⭐ Base | API singola, JSON, coordinate |
| **2. Meteo** | Wikidata + OpenWeather | ⭐⭐ Intermedio | Concatenamento API, autenticazione |
| **3. Combinato** | Wikidata + OpenWeather | ⭐⭐⭐ Avanzato | Integrazione completa, gestione errori |
| **4. Wikipedia** | Wikidata + Wikipedia | ⭐⭐ Intermedio | Sitelinks, contenuto multilingua |

---

## 🔄 Come Funziona

### Il Problema: API Deprecata

OpenWeather ha **deprecato** le ricerche per nome città:
> "Le richieste API per nome città, codici postali e ID città sono state deprecate."

### La Soluzione: Usare Coordinate

Invece di cercare direttamente per nome città, usiamo un approccio in due fasi:

#### Vecchio Approccio (Non Più Supportato)
```
Nome città → OpenWeather API → Meteo ❌
```

#### Nuovo Approccio (Usato in Questi Esercizi)
```
Nome città → Wikidata → Coordinate → OpenWeather → Meteo ✅
```

### Perché Questo È Meglio

1. **A prova di futuro** - Usa API supportate ufficialmente
2. **Più accurato** - Coordinate precise da Wikidata
3. **Educativo** - Insegna il concatenamento di API
4. **Affidabile** - Non dipende da funzionalità deprecate

### Flusso dei Dati

```
┌──────────────┐
│ Utente dice: │
│  "Bologna"   │
└──────┬───────┘
       │
       ▼
┌─────────────────────┐
│  1. API Wikidata    │
│  Cerca "Bologna"    │
│  su Wikipedia EN    │
└─────────┬───────────┘
          │
          ▼ Restituisce Q1891 + Coordinate
┌─────────────────────┐
│  Coordinate:        │
│  Lat: 44.4949°N    │
│  Lon: 11.3426°E    │
└─────────┬───────────┘
          │
          ▼
┌─────────────────────┐
│  2. API OpenWeather │
│  Usa coordinate     │
│  per il meteo       │
└─────────┬───────────┘
          │
          ▼
┌─────────────────────┐
│  Risultato:         │
│  Meteo a Bologna    │
│  Temp: 15°C        │
└─────────────────────┘
```

---

## 📖 Guida agli Esercizi

### Esercizio 1: API Wikibase

**Obiettivo:** Imparare a interrogare Wikidata e estrarre informazioni strutturate.

**Cosa fa:**
- Cerca una città su Wikipedia (inglese)
- Ottiene l'ID Wikidata (es. Q1891 per Bologna)
- Estrae etichetta, descrizione e coordinate (proprietà P625)

**File:**
- `exercise1-wikibase.js` - Script Node.js
- `exercise1-wikibase.html` - Interfaccia web

**Esecuzione:**
```bash
node exercise1-wikibase.js "Bologna"
node exercise1-wikibase.js "Milan"
node exercise1-wikibase.js "Rome"
```

**Output:**
```
=== Informazioni Entità ===
ID: Q1891
Label: Bologna
Description: comune italiano capoluogo dell'Emilia-Romagna
Coordinates: 44.4949°N, 11.3426°E
Wikidata URL: https://www.wikidata.org/wiki/Q1891
========================
```

**Concetti appresi:**
- Struttura delle API RESTful
- Parsing di JSON complessi
- Estrazione di proprietà specifiche (P625 per coordinate)
- Header HTTP (User-Agent richiesto da Wikimedia)

---

### Esercizio 2: API Meteo con Coordinate

**Obiettivo:** Imparare a concatenare due API - usare l'output della prima come input della seconda.

**Cosa fa:**
1. **Fase 1:** Interroga Wikidata per ottenere le coordinate della città
2. **Fase 2:** Usa le coordinate per interrogare OpenWeather
3. **Fase 3:** Mostra il meteo attuale

**File:**
- `exercise2-weather.js` - Script Node.js (chiave API pre-configurata)
- `exercise2-weather.html` - Interfaccia web (inserisci la tua chiave)

**Esecuzione:**
```bash
node exercise2-weather.js "Bologna"
node exercise2-weather.js "Milan" imperial  # Fahrenheit
```

**Output:**
```
Step 1: Fetching coordinates for Bologna from Wikidata...
Found: Bologna at 44.4949°N, 11.3426°E

Step 2: Fetching weather data...

=== Weather Information ===
Location: Bologna, IT
Coordinates: 44.49°N, 11.34°E
Weather: Clear (clear sky)
Temperature: 15.5°C
Feels like: 14.8°C
Humidity: 72%
Pressure: 1013 hPa
Wind Speed: 2.5 m/s
===========================
```

**Concetti appresi:**
- Concatenamento API (API chaining)
- Autenticazione con chiavi API
- Gestione di chiamate asincrone sequenziali
- Conversione unità di misura (metric/imperial)

---

### Esercizio 3: Integrazione Completa

**Obiettivo:** Combinare informazioni da più API in un'unica vista.

**Cosa fa:**
- Recupera **simultaneamente** informazioni Wikipedia e meteo
- Mostra un profilo completo della città
- Dimostra l'uso parallelo di API

**File:**
- `exercise3-combined.js` - Script Node.js
- `exercise3-combined.html` - Interfaccia web completa

**Esecuzione:**
```bash
node exercise3-combined.js "Bologna"
```

**Output:**
```
==================================================
Fetching information for: Bologna
==================================================

Step 1: Fetching from Wikidata...
Found coordinates: 44.4949°N, 11.3426°E

Step 2: Fetching weather data...

📚 WIKIPEDIA INFORMATION
--------------------------------------------------
ID: Q1891
Label: Bologna
Description: comune italiano capoluogo dell'Emilia-Romagna
Coordinates: 44.4949°N, 11.3426°E
Wikidata URL: https://www.wikidata.org/wiki/Q1891

🌤️ CURRENT WEATHER
--------------------------------------------------
Location: Bologna, IT
Condition: Clear (clear sky)
Temperature: 16°C
Feels Like: 15°C
Humidity: 72%
Pressure: 1013 hPa
Wind: 2.5 m/s
Cloudiness: 10%

==================================================
```

**Concetti appresi:**
- Gestione di chiamate API parallele
- Integrazione di dati da fonti multiple
- Gestione errori complessa
- Presentazione dati strutturati

---

### Esercizio 4: Contenuto Wikipedia (Opzionale)

**Obiettivo:** Imparare a navigare nell'ecosistema Wikimedia usando i sitelinks.

**Documentazione completa:** [ESERCIZIO4_WIKIPEDIA.md](ESERCIZIO4_WIKIPEDIA.md)

**Cosa fa:**
- Usa i sitelinks di Wikidata per trovare pagine Wikipedia
- Recupera contenuto testuale in più lingue
- Mostra estratti delle pagine Wikipedia

**Concetti appresi:**
- Navigazione tra progetti Wikimedia
- Gestione contenuti multilingua
- API Wikipedia (extracts)

---

## 🔑 Concetti Chiave

### 1. API (Application Programming Interface)

Un'API è un insieme di regole che permette a programmi diversi di comunicare tra loro.

**Esempio pratico:**
```javascript
// Tu chiedi (richiesta)
fetch('https://api.example.com/data')

// L'API risponde (risposta)
{ "data": "Hello!" }
```

### 2. HTTP e REST

**HTTP** (HyperText Transfer Protocol) è il protocollo usato per comunicare sul web.

**Metodi principali:**
- `GET` - Recupera dati (quello che usiamo in questi esercizi)
- `POST` - Invia dati
- `PUT` - Aggiorna dati
- `DELETE` - Elimina dati

**REST** (REpresentational State Transfer) è uno stile architetturale per API.

### 3. JSON (JavaScript Object Notation)

Formato standard per scambiare dati tra API.

**Esempio:**
```json
{
  "city": "Bologna",
  "temperature": 15.5,
  "condition": "clear"
}
```

**In JavaScript:**
```javascript
const data = JSON.parse(jsonString);  // String → Object
const json = JSON.stringify(data);     // Object → String
```

### 4. Async/Await

JavaScript moderno per gestire operazioni asincrone.

**Vecchio modo (callback):**
```javascript
fetch(url).then(response => {
  return response.json();
}).then(data => {
  console.log(data);
});
```

**Nuovo modo (async/await):**
```javascript
async function getData() {
  const response = await fetch(url);
  const data = await response.json();
  console.log(data);
}
```

### 5. Concatenamento API (API Chaining)

Usare l'output di un'API come input per un'altra.

**Schema:**
```javascript
// Fase 1: Ottieni coordinate
const coords = await getCoordinates("Bologna");
// coords = { lat: 44.49, lon: 11.34 }

// Fase 2: Usa coordinate per il meteo
const weather = await getWeather(coords.lat, coords.lon);
```

**Perché è importante:**
- Le API moderne sono specializzate
- Nessuna singola API ha tutti i dati
- Combinare API crea valore aggiunto

### 6. Autenticazione API

Molte API richiedono una chiave per identificare chi fa la richiesta.

**Esempio:**
```javascript
const url = `https://api.example.com/data?apikey=${API_KEY}`;
```

**Perché serve:**
- Limiti di utilizzo (rate limiting)
- Sicurezza
- Tracciamento utilizzo

### 7. Coordinate Geografiche

**Latitudine:** Distanza dall'equatore (-90° a +90°)
- Positiva = Nord, Negativa = Sud
- Es: Bologna = 44.49°N

**Longitudine:** Distanza dal meridiano di Greenwich (-180° a +180°)
- Positiva = Est, Negativa = Ovest
- Es: Bologna = 11.34°E

### 8. Proprietà Wikidata

Wikidata usa proprietà numerate per descrivere entità:

| Proprietà | Significato | Esempio |
|-----------|-------------|---------|
| P625 | Coordinate geografiche | 44.49°N, 11.34°E |
| P31 | Istanza di | Q515 (città) |
| P17 | Stato | Q38 (Italia) |
| P1082 | Popolazione | 391,000 |

---

## 🛠️ Risoluzione Problemi

### Errori Comuni

#### 1. "node: command not found"

**Problema:** Node.js non è installato o non è nel PATH.

**Soluzione:**
```bash
# Verifica installazione
which node    # Mac/Linux
where node    # Windows

# Se non restituisce nulla, reinstalla Node.js
# Scarica da: https://nodejs.org
```

#### 2. "fetch is not defined"

**Problema:** Stai usando una versione di Node.js troppo vecchia.

**Soluzione:**
```bash
# Controlla versione
node -v

# Deve essere >= 18.0.0
# Aggiorna Node.js se necessario
```

#### 3. "No coordinates found for {città}"

**Problema:** La città non esiste in Wikidata con quel nome, o non ha coordinate.

**Soluzioni:**
- Usa il nome inglese della città (es. "Milan" non "Milano")
- Controlla che esista la pagina Wikipedia inglese
- Prova una città più grande nelle vicinanze

**Città che funzionano sicuramente:**
- Bologna ✅
- Milan ✅
- Rome ✅
- Florence ✅
- Venice ✅
- Naples ✅

#### 4. "City not found in Wikidata"

**Problema:** Il nome non corrisponde esattamente al titolo Wikipedia.

**Soluzione:**
```bash
# NON usare:
node exercise1-wikibase.js "Milano"      ❌
node exercise1-wikibase.js "Firenze"     ❌

# USA invece:
node exercise1-wikibase.js "Milan"       ✅
node exercise1-wikibase.js "Florence"    ✅
```

**Come trovare il nome giusto:**
1. Vai su Wikipedia inglese
2. Cerca la città
3. Usa il titolo della pagina

#### 5. "Invalid API key"

**Problema:** La chiave OpenWeather non è valida o non è ancora attiva.

**Soluzioni:**
1. Controlla di aver copiato la chiave correttamente (32 caratteri)
2. Aspetta 5-10 minuti dopo la registrazione
3. Verifica su https://home.openweathermap.org/api_keys
4. Assicurati che la chiave sia attiva (stato: "Active")

#### 6. "ECONNREFUSED" o "Network Error"

**Problema:** Problemi di connessione internet o firewall.

**Soluzioni:**
- Controlla la connessione internet
- Disabilita temporaneamente VPN/proxy
- Controlla le impostazioni del firewall
- Prova con un'altra rete

#### 7. File HTML non mostra risultati

**Problema:** Possibili cause multiple.

**Checklist:**
- [ ] Hai inserito la chiave API?
- [ ] Hai cliccato il pulsante "Get Weather"?
- [ ] Hai controllato la Console del browser (F12)?
- [ ] Il browser è aggiornato?

**Per vedere gli errori:**
1. Apri il file HTML nel browser
2. Premi F12 (o Click destro → "Ispeziona")
3. Vai alla tab "Console"
4. Guarda gli errori in rosso

---

## 📊 Città da Testare

### Città Italiane

| Nome Italiano | Nome per Wikidata | Funziona? |
|---------------|-------------------|-----------|
| Bologna | `Bologna` | ✅ |
| Milano | `Milan` | ✅ |
| Roma | `Rome` | ✅ |
| Firenze | `Florence` | ✅ |
| Venezia | `Venice` | ✅ |
| Napoli | `Naples` | ✅ |
| Torino | `Turin` | ✅ |
| Genova | `Genoa` | ✅ |
| Palermo | `Palermo` | ✅ |
| Bari | `Bari` | ✅ |

### Città Internazionali

| Città | Funziona? |
|-------|-----------|
| `Berlin` | ✅ |
| `Paris` | ✅ |
| `London` | ✅ |
| `Madrid` | ✅ |
| `Amsterdam` | ✅ |
| `Vienna` | ✅ |
| `Tokyo` | ✅ |
| `New York` | ✅ |
| `Sydney` | ✅ |
| `Moscow` | ✅ |

**Regola generale:** Usa sempre il nome della pagina Wikipedia **inglese**.

---

## 🎓 Approfondimenti

### Estendere gli Esercizi

Una volta completati gli esercizi base, prova queste sfide:

#### Livello Intermedio

1. **Cache delle coordinate**
   - Salva le coordinate in un oggetto per evitare chiamate ripetute a Wikidata
   
2. **Più città contemporaneamente**
   - Modifica il codice per gestire un array di città
   
3. **Conversione unità**
   - Aggiungi un parametro per scegliere °C, °F, o K

4. **Gestione errori migliorata**
   - Messaggi di errore più specifici
   - Suggerimenti automatici per città simili

#### Livello Avanzato

5. **Previsioni meteo**
   - Usa un endpoint diverso di OpenWeather per le previsioni
   - Mostra meteo per i prossimi giorni

6. **Interfaccia grafica**
   - Crea una UI più complessa con framework come React
   - Aggiungi grafici per visualizzare i dati

7. **Database locale**
   - Usa SQLite per memorizzare città e coordinate
   - Implementa un sistema di cache persistente

8. **API aggiuntive**
   - Aggiungi dati sulla qualità dell'aria
   - Includi informazioni turistiche
   - Mostra foto della città (Unsplash API)

### Pattern Avanzati

#### 1. Gestione Errori Robusta

```javascript
async function safeAPICall(apiFunction, ...args) {
  try {
    return await apiFunction(...args);
  } catch (error) {
    console.error(`API Error: ${error.message}`);
    // Implementa retry logic, fallback, ecc.
    return null;
  }
}
```

#### 2. Rate Limiting

```javascript
class RateLimiter {
  constructor(maxRequests, timeWindow) {
    this.maxRequests = maxRequests;
    this.timeWindow = timeWindow;
    this.requests = [];
  }
  
  async throttle() {
    const now = Date.now();
    this.requests = this.requests.filter(
      time => now - time < this.timeWindow
    );
    
    if (this.requests.length >= this.maxRequests) {
      const oldestRequest = Math.min(...this.requests);
      const waitTime = this.timeWindow - (now - oldestRequest);
      await new Promise(resolve => setTimeout(resolve, waitTime));
    }
    
    this.requests.push(Date.now());
  }
}
```

#### 3. Cache con Scadenza

```javascript
class CacheWithExpiry {
  constructor(ttl = 3600000) { // 1 ora default
    this.cache = new Map();
    this.ttl = ttl;
  }
  
  set(key, value) {
    this.cache.set(key, {
      value,
      expiry: Date.now() + this.ttl
    });
  }
  
  get(key) {
    const item = this.cache.get(key);
    if (!item) return null;
    
    if (Date.now() > item.expiry) {
      this.cache.delete(key);
      return null;
    }
    
    return item.value;
  }
}
```

---

## 📚 Risorse

### Documentazione Ufficiale

#### API Utilizzate
- **Wikidata API** - https://www.wikidata.org/w/api.php
- **Wikipedia API** - https://www.mediawiki.org/wiki/API:Main_page
- **OpenWeather API** - https://openweathermap.org/api

#### JavaScript e Node.js
- **MDN Web Docs** - https://developer.mozilla.org/it/
- **Node.js Docs** - https://nodejs.org/docs/
- **NPM Docs** - https://docs.npmjs.com/

### Tutorial e Guide

#### JavaScript
- **JavaScript.info** - https://javascript.info/ (italiano)
- **FreeCodeCamp** - https://www.freecodecamp.org/

#### API e HTTP
- **Postman Learning** - https://learning.postman.com/
- **HTTP Cats** - https://http.cat/ (codici di stato HTTP in modo divertente!)

#### Async JavaScript
- **JavaScript Promises** - https://javascript.info/promise-basics
- **Async/Await Tutorial** - https://javascript.info/async-await

### Strumenti Utili

#### Testing API
- **Postman** - https://www.postman.com/
- **Insomnia** - https://insomnia.rest/
- **HTTPie** - https://httpie.io/

#### JSON Viewer
- **JSON Formatter** - https://jsonformatter.org/
- **JSON Viewer Online** - https://codebeautify.org/jsonviewer

#### Coordinate Geografiche
- **LatLong.net** - https://www.latlong.net/
- **GPS Coordinates** - https://gps-coordinates.org/

### Community e Supporto

#### Forum e Q&A
- **Stack Overflow** - https://stackoverflow.com/ (tag: javascript, node.js, api)
- **Reddit r/learnprogramming** - https://reddit.com/r/learnprogramming

#### Discord/Slack
- **Node.js Community** - https://nodejs.org/en/get-involved/
- **JavaScript Italia** - Cerca su Discord

---

## 📝 Note Tecniche

### API Endpoint Summary

#### Wikidata
```
GET https://www.wikidata.org/w/api.php
Parametri:
  - action: wbgetentities
  - sites: enwiki
  - titles: {città}
  - props: labels|descriptions|claims
  - format: json
Headers richiesti:
  - User-Agent: {nome-app}
```

#### OpenWeather
```
GET https://api.openweathermap.org/data/2.5/weather
Parametri:
  - lat: {latitudine}
  - lon: {longitudine}
  - appid: {tua-chiave-API}
  - units: metric|imperial|standard
  - lang: it|en|...
```

### Limiti API

| API | Limite Gratuito | Note |
|-----|----------------|------|
| Wikidata | Generoso | Sii rispettoso, max ~200 req/sec |
| Wikipedia | Generoso | Sii rispettoso, max ~200 req/sec |
| OpenWeather | 60 chiamate/min<br>1M chiamate/mese | Tier gratuito |

### Proprietà Wikidata Utili

| ID | Nome | Tipo | Esempio |
|----|------|------|---------|
| P625 | Coordinate | Coordinate | 44.49°N, 11.34°E |
| P31 | Istanza di | Item | Q515 (città) |
| P17 | Stato | Item | Q38 (Italia) |
| P1082 | Popolazione | Quantità | 391,000 |
| P856 | Sito web ufficiale | URL | https://... |
| P18 | Immagine | File | Commons:... |

---

## ⚖️ Licenza e Attribuzione

### Licenza degli Esercizi

Questi esercizi sono forniti per **scopi educativi**.

**Puoi:**
- ✅ Usarli per imparare
- ✅ Modificarli per i tuoi progetti
- ✅ Condividerli con altri studenti

**Non puoi:**
- ❌ Venderli
- ❌ Rimuovere le attribuzioni

### Termini di Servizio delle API

Rispetta i termini di servizio di:

- **Wikidata** - https://www.wikidata.org/wiki/Wikidata:API
- **Wikipedia** - https://www.mediawiki.org/wiki/API:Etiquette
- **OpenWeather** - https://openweathermap.org/terms

### Attribuzioni

**Dati:**
- Wikidata/Wikipedia - © Wikimedia Foundation
- OpenWeather - © OpenWeather

**Guide e documentazione:**
- Andrea Schimmenti & Fabio Vitali - Università di Bologna
- Tecnologie Web 2024-2025

---

## 🎯 Obiettivi di Apprendimento

Alla fine di questi esercizi, dovresti essere in grado di:

### Competenze Tecniche

- [ ] Installare e usare Node.js e NPM
- [ ] Fare richieste HTTP con `fetch`
- [ ] Analizzare e manipolare JSON
- [ ] Usare `async/await` per codice asincrono
- [ ] Gestire errori nelle chiamate API
- [ ] Lavorare con coordinate geografiche
- [ ] Usare chiavi API per autenticazione
- [ ] Concatenare chiamate API multiple

### Competenze Concettuali

- [ ] Capire cos'è un'API REST
- [ ] Comprendere il flusso richiesta-risposta HTTP
- [ ] Conoscere i principali metodi HTTP (GET, POST, ecc.)
- [ ] Capire JSON come formato di scambio dati
- [ ] Comprendere il problema delle API deprecate
- [ ] Saper trovare soluzioni alternative

### Problem Solving

- [ ] Leggere documentazione API
- [ ] Debug di errori di rete
- [ ] Trovare informazioni in strutture JSON complesse
- [ ] Adattare codice a requisiti che cambiano
- [ ] Combinare dati da fonti diverse

---

## 🚀 Prossimi Passi

### Dopo Questi Esercizi

1. **Esplora altre API**
   - https://apilist.fun/ - Lista di API pubbliche
   - https://github.com/public-apis/public-apis - Repository GitHub

2. **Impara un Framework**
   - **Express.js** - Per creare tue API
   - **React** - Per interfacce utente
   - **Vue.js** - Alternativa a React

3. **Database**
   - **MongoDB** - Database NoSQL
   - **PostgreSQL** - Database SQL
   - **Firebase** - Backend-as-a-Service

4. **Deploy**
   - **Heroku** - https://heroku.com
   - **Vercel** - https://vercel.com
   - **Netlify** - https://netlify.com

### Progetti Suggeriti

1. **Dashboard Meteo**
   - Mostra meteo per più città
   - Grafici di temperatura
   - Previsioni settimanali

2. **Travel Planner**
   - Informazioni città + meteo
   - Punti di interesse (da Wikipedia)
   - Itinerari suggeriti

3. **Geography Quiz**
   - Domande su città e coordinate
   - Usa dati da Wikidata
   - Score tracking

4. **Personal API**
   - Crea la tua API che combina servizi
   - Aggiungi caching
   - Deploy online

---

## 📞 Supporto

### Hai Domande?

1. **Controlla prima:**
   - Questo README
   - [GUIDA_OPENWEATHER.md](GUIDA_OPENWEATHER.md)
   - [GUIDA_WIKIPEDIA.md](GUIDA_WIKIPEDIA.md)
   - Sezione "Risoluzione Problemi"

2. **Errori nel codice:**
   - Leggi attentamente il messaggio di errore
   - Cerca l'errore su Google (copia e incolla il messaggio)
   - Controlla Stack Overflow

3. **Non funziona nulla:**
   - Verifica Node.js: `node -v`
   - Verifica di essere nella cartella giusta: `pwd` o `cd`
   - Rileggi la sezione "Installazione"

---

## ✨ Crediti

**Creato per il corso:**
- Tecnologie Web 2024-2025
- Università di Bologna

**Docenti:**
- Andrea Schimmenti
- Prof. Fabio Vitali

**Fonti dati:**
- Wikimedia Foundation (Wikidata, Wikipedia)
- OpenWeather

**Ringraziamenti:**
- La comunità open data
- La comunità Node.js
- Tutti gli studenti che hanno testato questi esercizi

---

## 📅 Changelog

### v1.0 (Dicembre 2024)
- ✅ Esercizi 1, 2, 3 completati
- ✅ Documentazione italiana
- ✅ Supporto coordinate da Wikidata
- ✅ Interfacce HTML funzionanti
- ✅ Guide complete

---

**Buona programmazione! 🚀**

**Domande?** Rileggi questo README - è fatto per rispondere a tutto! 📖

**Pronto?** Inizia con: `node exercise1-wikibase.js "Bologna"` 🎯