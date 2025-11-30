# Esercizi API con JavaScript e Node.js

Questi esercizi insegnano come lavorare con le API usando JavaScript e Node.js, con particolare attenzione al **concatenamento di API** - utilizzare l'output di un'API come input per un'altra.

## 🎯 Cosa Rende Speciali Questi Esercizi

Utilizziamo le **coordinate di Wikidata** per recuperare i dati meteo, insegnando:
- Come concatenare più API insieme
- Come estrarre dati da strutture JSON complesse
- Come adattarsi quando le API cambiano (OpenWeather ha deprecato la ricerca per nome città!)
- Capacità di problem-solving del mondo reale

## Prerequisiti

- **Node.js 18+** (per il supporto a `fetch`)
- Un browser web (per gli esercizi HTML)
- **Chiave API OpenWeatherMap** (gratuita su https://openweathermap.org/api)

Controlla la tua versione di Node.js:
```bash
node --version  # Deve essere 18 o superiore
```

## Avvio Rapido

### La Tua Chiave API
Gli esercizi sono pre-configurati con questa chiave:
```
95dbc4aaf267efe18f95981c5539dbd7
```

### Esegui gli Esercizi

```bash
# Esercizio 1: Ottieni informazioni Wikipedia + coordinate
node exercise1-wikibase.js "Bologna"

# Esercizio 2: Ottieni meteo (tramite coordinate da Wikidata)
node exercise2-weather.js "Bologna"

# Esercizio 3: Combinato - Sia Wikipedia che meteo
node exercise3-combined.js "Bologna"
```

## Come Funziona

### Il Processo in Due Fasi

#### Approccio Tradizionale (Deprecato):
```
Nome città → API OpenWeather → Dati meteo ❌
```

#### Il Nostro Approccio Moderno:
```
Nome città → API Wikidata → Coordinate → API OpenWeather → Dati meteo ✅
```

### Perché Facciamo Così

OpenWeather ha deprecato le ricerche per nome città:
> "Le richieste API per nome città, codici postali e ID città sono state deprecate."

**Soluzione**: Otteniamo le coordinate da Wikidata (proprietà P625), poi le usiamo per il meteo!

## Dettaglio degli Esercizi

### Esercizio 1: API Wikibase

**Cosa fa:**
- Recupera informazioni Wikipedia/Wikidata su una città
- Estrae le coordinate dalla proprietà P625
- Mostra ID, etichetta, descrizione e coordinate

**File:**
- `exercise1-wikibase.js` - Script Node.js
- `exercise1-wikibase.html` - Interfaccia web

**Nessuna chiave API richiesta!**

**Output di esempio:**
```
=== Informazioni Entità ===
ID: Q1891
Etichetta: Bologna
Descrizione: comune italiano capoluogo dell'Emilia-Romagna
Coordinate: 44.4949°N, 11.3426°E
========================
```

### Esercizio 2: API Meteo (con Coordinate Wikidata)

**Cosa fa:**
1. Ottiene le coordinate da Wikidata
2. Usa le coordinate per recuperare il meteo da OpenWeather
3. Mostra le condizioni meteo attuali

**File:**
- `exercise2-weather.js` - Script Node.js (chiave pre-configurata)
- `exercise2-weather.html` - Interfaccia web (inserisci la tua chiave)

**Output di esempio:**
```
Fase 1: Recupero coordinate per Bologna da Wikidata...
Trovato: Bologna a 44.4949°N, 11.3426°E

Fase 2: Recupero dati meteo...

=== Informazioni Meteo ===
Posizione: Bologna, IT
Meteo: Sereno (cielo sereno)
Temperatura: 15.5°C
Percepita: 14.8°C
Umidità: 72%
...
```

### Esercizio 3: API Combinate

**Cosa fa:**
- Recupera informazioni Wikipedia E meteo in una volta sola
- Mostra il profilo completo della città
- Dimostra l'uso parallelo delle API

**File:**
- `exercise3-combined.js` - Script Node.js (chiave pre-configurata)
- `exercise3-combined.html` - Interfaccia web (inserisci la tua chiave)

**Output di esempio:**
```
📚 INFORMAZIONI WIKIPEDIA
ID: Q1891
Etichetta: Bologna
Descrizione: comune italiano capoluogo dell'Emilia-Romagna
Coordinate: 44.4949°N, 11.3426°E

🌤️ METEO ATTUALE
Posizione: Bologna, IT
Condizione: Sereno (cielo sereno)
Temperatura: 16°C
Umidità: 72%
...
```

## File Importanti

- **[RIEPILOGO_AGGIORNAMENTO.md](RIEPILOGO_AGGIORNAMENTO.md)** - Spiega perché usiamo le coordinate
- **[GUIDA_OPENWEATHER.md](GUIDA_OPENWEATHER.md)** - Riferimento completo API
- **[FETCH_VS_HTTPS.md](FETCH_VS_HTTPS.md)** - Perché usiamo `fetch` invece di `https`

## Città da Provare

Tutte queste funzionano perfettamente:
- Bologna
- Milano (usa "Milan" per Wikipedia inglese)
- Roma (usa "Rome")
- Firenze (usa "Florence")
- Berlin
- Tokyo
- Paris
- London
- New York
- Madrid

**Importante**: Usa i nomi di Wikipedia inglese!
- ✅ "Milan" non "Milano"
- ✅ "Florence" non "Firenze"
- ✅ "Rome" non "Roma"

## Dettagli Tecnici

### API Utilizzate

**1. API Wikibase/Wikidata**
- Endpoint: `https://www.wikidata.org/w/api.php`
- Autenticazione: Nessuna (richiede header User-Agent)
- Limite rate: Generoso (sii rispettoso)
- Gratuita: ✅ Sì

**2. API OpenWeatherMap Current Weather**
- Endpoint: `https://api.openweathermap.org/data/2.5/weather`
- Autenticazione: Chiave API richiesta
- Limite rate: 60 chiamate/min, 1M chiamate/mese (tier gratuito)
- Gratuita: ✅ Sì (con limiti)

### Flusso dei Dati

```javascript
// 1. Interroga Wikidata
const wikiData = await getWikibaseEntity("Bologna");

// 2. Estrai coordinate (proprietà P625)
const coords = extractCoordinates(wikiData);
// Restituisce: { latitude: 44.4949, longitude: 11.3426 }

// 3. Recupera meteo usando le coordinate
const weather = await getWeatherData(coords.latitude, coords.longitude);
```

## Obiettivi di Apprendimento

Completando questi esercizi, imparerai:

### Livello Principiante:
- ✅ Come fare richieste API con `fetch`
- ✅ Come analizzare risposte JSON
- ✅ Come gestire gli errori
- ✅ Come usare `async/await`

### Livello Intermedio:
- ✅ **Concatenamento API** - usare l'output di un'API come input di un'altra
- ✅ Estrarre dati da strutture JSON complesse
- ✅ Gestire dati mancanti in modo elegante
- ✅ Lavorare con diversi metodi di autenticazione API

### Concetti Avanzati:
- ✅ Perché le query basate su coordinate sono più affidabili
- ✅ Come adattarsi quando le API cambiano
- ✅ Pattern di integrazione API del mondo reale

## Risoluzione Problemi

### "Nessuna coordinata trovata per {città}"
**Soluzione**: Controlla che esista la pagina Wikipedia inglese. Prova una città vicina più grande.

### "Città non trovata in Wikidata"
**Soluzione**: Usa il titolo esatto di Wikipedia inglese. Controlla: https://en.wikipedia.org/wiki/[TuaCittà]

### "Chiave API non valida"
**Soluzione**: 
1. Controlla di aver copiato correttamente la chiave
2. Aspetta 5-10 minuti per l'attivazione delle nuove chiavi
3. Verifica su: https://home.openweathermap.org/api_keys

### Errore versione Node.js
**Soluzione**: Aggiorna a Node.js 18 o superiore per il supporto a `fetch`.

## Stile del Codice

Usiamo JavaScript moderno:
- `async/await` invece di catene `.then()`
- `fetch` invece del modulo `https`
- Template literals per leggibilità
- Nomi di variabili chiari
- Commenti semplici

## Estendere gli Esercizi

Idee per ulteriori esplorazioni:
1. Aggiungi caching per evitare chiamate ripetute a Wikidata
2. Supporta più città in una query
3. Aggiungi previsioni meteo (richiede endpoint OpenWeather diverso)
4. Mostra risultati su una mappa
5. Confronta il meteo tra città
6. Aggiungi dati meteo storici

## Risorse

### Documentazione
- [API Wikidata](https://www.wikidata.org/w/api.php)
- [Proprietà P625 Wikidata](https://www.wikidata.org/wiki/Property:P625) (coordinate)
- [OpenWeather Current Weather](https://openweathermap.org/current)
- [MDN: Fetch API](https://developer.mozilla.org/it/docs/Web/API/Fetch_API)

### Le Nostre Guide
- [GUIDA_OPENWEATHER.md](GUIDA_OPENWEATHER.md) - Riferimento completo
- [RIEPILOGO_AGGIORNAMENTO.md](RIEPILOGO_AGGIORNAMENTO.md) - Perché le coordinate sono importanti
- [FETCH_VS_HTTPS.md](FETCH_VS_HTTPS.md) - Approcci moderni vs vecchi

## Licenza

Questi esercizi sono forniti per scopi educativi.

Rispetta i termini di servizio di:
- [Wikidata](https://www.wikidata.org/wiki/Wikidata:API)
- [OpenWeatherMap](https://openweathermap.org/terms)

## Ringraziamenti

- Wikibase/Wikidata per i dati geografici aperti e gratuiti
- OpenWeatherMap per l'accesso API meteo gratuito
- La comunità dei dati aperti

---

**Buona programmazione! 🚀**

Domande? Controlla le guide o prova gli esercizi - sono progettati per essere auto-esplicativi!
