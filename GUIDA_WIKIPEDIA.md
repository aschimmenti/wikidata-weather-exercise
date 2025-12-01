# Esercizio 4: Recuperare Pagina Wikipedia da Wikidata

## Obiettivo

Imparare a recuperare l'URL e il contenuto della pagina Wikipedia corrispondente a un'entità Wikidata, utilizzando il collegamento tra Wikidata e Wikipedia.

## Cosa Imparerai

- Come Wikidata e Wikipedia sono collegati
- Come ottenere l'URL della pagina Wikipedia da un ID Wikidata
- Come recuperare il contenuto testuale di una pagina Wikipedia
- Come estrarre informazioni da pagine Wikipedia tramite API

## Come Funziona il Collegamento Wikidata-Wikipedia

Ogni entità Wikidata può essere collegata a pagine Wikipedia in diverse lingue. Il collegamento è bidirezionale:

```
Wikidata Q1891 (Bologna) ←→ Wikipedia "Bologna" (it.wikipedia.org)
                          ←→ Wikipedia "Bologna" (en.wikipedia.org)
                          ←→ Wikipedia "Bolonia" (es.wikipedia.org)
```

## Processo in Tre Fasi

### Fase 1: Ottieni l'Entità Wikidata
```javascript
// Cerca "Bologna" su Wikipedia inglese
const wikiData = await getWikibaseEntity("Bologna", "enwiki");
// Risultato: Q1891
```

### Fase 2: Estrai i Sitelinks (Collegamenti a Wikipedia)
```javascript
// L'entità contiene sitelinks per diverse lingue
const sitelinks = wikiData.entities.Q1891.sitelinks;
// {
//   enwiki: { site: "enwiki", title: "Bologna", url: "..." },
//   itwiki: { site: "itwiki", title: "Bologna", url: "..." }
// }
```

### Fase 3: Recupera il Contenuto della Pagina
```javascript
// Usa l'API Wikipedia per ottenere il testo
const content = await getWikipediaContent("Bologna", "en");
```

## Struttura dell'Esercizio

### File da Creare

1. **exercise4-wikipedia.js** - Script Node.js
2. **exercise4-wikipedia.html** - Interfaccia web

### Funzionalità

L'esercizio deve:
1. Cercare una città su Wikidata
2. Trovare i collegamenti alle pagine Wikipedia (sitelinks)
3. Mostrare tutti i link Wikipedia disponibili (italiano, inglese, ecc.)
4. Recuperare un estratto/sommario della pagina Wikipedia
5. Mostrare il primo paragrafo della pagina

## API da Utilizzare

### 1. API Wikibase (per ottenere i sitelinks)

**Endpoint:**
```
https://www.wikidata.org/w/api.php
```

**Parametri chiave:**
```javascript
action=wbgetentities
sites=enwiki
titles=Bologna
props=sitelinks|labels|descriptions
format=json
```

**Risposta (sitelinks):**
```json
{
  "entities": {
    "Q1891": {
      "sitelinks": {
        "enwiki": {
          "site": "enwiki",
          "title": "Bologna",
          "badges": []
        },
        "itwiki": {
          "site": "itwiki",
          "title": "Bologna",
          "badges": []
        }
      }
    }
  }
}
```

### 2. API Wikipedia (per ottenere il contenuto)

**Endpoint per estratti:**
```
https://en.wikipedia.org/w/api.php
```

**Parametri:**
```javascript
action=query
prop=extracts
exintro=true      // Solo introduzione
explaintext=true  // Testo semplice (no HTML)
titles=Bologna
format=json
origin=*
```

**Risposta:**
```json
{
  "query": {
    "pages": {
      "3418": {
        "pageid": 3418,
        "title": "Bologna",
        "extract": "Bologna is the capital and largest city..."
      }
    }
  }
}
```

## Esempio di Codice

### Funzione per Ottenere i Sitelinks

```javascript
async function getWikipediaSitelinks(cityName) {
  const params = new URLSearchParams({
    action: 'wbgetentities',
    sites: 'enwiki',
    titles: cityName,
    props: 'sitelinks|labels',
    format: 'json',
    origin: '*'
  });

  const url = `https://www.wikidata.org/w/api.php?${params.toString()}`;
  
  const response = await fetch(url, {
    headers: {
      'User-Agent': 'WikibaseAPIExercise/1.0 (Educational purpose)'
    }
  });

  const data = await response.json();
  const entity = Object.values(data.entities)[0];
  
  if (!entity || entity.missing) {
    throw new Error(`Città "${cityName}" non trovata`);
  }
  
  return {
    id: entity.id,
    label: entity.labels.en ? entity.labels.en.value : cityName,
    sitelinks: entity.sitelinks || {}
  };
}
```

### Funzione per Ottenere Contenuto Wikipedia

```javascript
async function getWikipediaExtract(pageTitle, lang = 'en') {
  const params = new URLSearchParams({
    action: 'query',
    prop: 'extracts',
    exintro: 'true',
    explaintext: 'true',
    titles: pageTitle,
    format: 'json',
    origin: '*'
  });

  const langCode = lang === 'it' ? 'it' : 'en';
  const url = `https://${langCode}.wikipedia.org/w/api.php?${params.toString()}`;
  
  const response = await fetch(url);
  const data = await response.json();
  
  const pages = data.query.pages;
  const page = Object.values(pages)[0];
  
  return {
    title: page.title,
    extract: page.extract,
    url: `https://${langCode}.wikipedia.org/wiki/${encodeURIComponent(page.title)}`
  };
}
```

## Output Atteso

```
=== Informazioni Wikidata ===
ID: Q1891
Nome: Bologna

=== Collegamenti Wikipedia ===
✓ Inglese: https://en.wikipedia.org/wiki/Bologna
✓ Italiano: https://it.wikipedia.org/wiki/Bologna
✓ Tedesco: https://de.wikipedia.org/wiki/Bologna
✓ Francese: https://fr.wikipedia.org/wiki/Bologne

=== Estratto Wikipedia (Italiano) ===
Bologna è un comune italiano di 396 458 abitanti,
capoluogo dell'omonima città metropolitana e della 
regione Emilia-Romagna...

Link completo: https://it.wikipedia.org/wiki/Bologna
```

## Sfide Aggiuntive

Una volta completato l'esercizio base, prova a:

1. **Mostrare estratti in più lingue** - Confronta le descrizioni italiana e inglese
2. **Contare le parole** - Quale lingua ha la descrizione più lunga?
3. **Recuperare immagini** - Usa `prop=pageimages` per ottenere l'immagine principale
4. **Ottenere categorie** - Usa `prop=categories` per vedere le categorie Wikipedia
5. **Link interni** - Estrai i link ad altre pagine Wikipedia menzionate

## Mappatura Codici Lingua

Codici comuni da Wikidata a Wikipedia:

| Wikidata | Wikipedia | Lingua |
|----------|-----------|---------|
| enwiki | en.wikipedia.org | Inglese |
| itwiki | it.wikipedia.org | Italiano |
| dewiki | de.wikipedia.org | Tedesco |
| frwiki | fr.wikipedia.org | Francese |
| eswiki | es.wikipedia.org | Spagnolo |

Per estrarre il codice lingua:
```javascript
const siteCode = "itwiki";
const langCode = siteCode.replace("wiki", ""); // "it"
```

## Note Importanti

1. **Sitelinks possono mancare**: Non tutte le entità Wikidata hanno pagine Wikipedia in tutte le lingue
2. **Titoli diversi**: Il titolo può essere diverso in lingue diverse (es. "Bologna" vs "Bolonia")
3. **Reindirizzamenti**: Alcune pagine potrebbero essere reindirizzamenti
4. **Rate limiting**: Rispetta i limiti delle API (max 200 richieste/secondo per Wikipedia)

## Esempio di Output HTML

L'interfaccia dovrebbe mostrare:

```
┌─────────────────────────────────────┐
│ 🏙️ Bologna (Q1891)                 │
├─────────────────────────────────────┤
│ 🌍 Pagine Wikipedia disponibili:   │
│   🇬🇧 English   [Visualizza]        │
│   🇮🇹 Italiano  [Visualizza]        │
│   🇩🇪 Deutsch   [Visualizza]        │
│   🇫🇷 Français  [Visualizza]        │
└─────────────────────────────────────┘

┌─────────────────────────────────────┐
│ 📄 Estratto (Italiano)              │
├─────────────────────────────────────┤
│ Bologna è un comune italiano...    │
│                                     │
│ [Leggi su Wikipedia →]             │
└─────────────────────────────────────┘
```

## Risorse

### Documentazione API

- **Wikibase Sitelinks**: https://www.wikidata.org/wiki/Wikidata:Sitelinks
- **Wikipedia API**: https://www.mediawiki.org/wiki/API:Main_page
- **API Query/Extracts**: https://www.mediawiki.org/wiki/Extension:TextExtracts#API

### Esempi di Test

Puoi testare direttamente nel browser:

**Wikidata sitelinks:**
```
https://www.wikidata.org/w/api.php?action=wbgetentities&sites=enwiki&titles=Bologna&props=sitelinks&format=json&origin=*
```

**Wikipedia estratto (italiano):**
```
https://it.wikipedia.org/w/api.php?action=query&prop=extracts&exintro=true&explaintext=true&titles=Bologna&format=json&origin=*
```

**Wikipedia estratto (inglese):**
```
https://en.wikipedia.org/w/api.php?action=query&prop=extracts&exintro=true&explaintext=true&titles=Bologna&format=json&origin=*
```

## Obiettivi di Apprendimento

Completando questo esercizio, imparerai:

- ✅ Come funziona l'ecosistema Wikimedia (Wikidata + Wikipedia)
- ✅ Come usare i sitelinks per navigare tra progetti Wikimedia
- ✅ Come recuperare contenuto testuale da Wikipedia
- ✅ Come gestire contenuti multilingua
- ✅ Pattern di navigazione tra API correlate

## Integrazione con Esercizi Precedenti

Questo esercizio si può combinare con l'Esercizio 3 per creare un profilo città completo:

```
Nome Città → Wikidata → {
  ✓ Coordinate (P625)
  ✓ Sitelinks Wikipedia
  ✓ Etichette e descrizioni
}
              ↓
          {Coordinate} → OpenWeather → Meteo
          {Sitelinks} → Wikipedia → Contenuto pagina
```

Risultato: **Profilo completo città** con meteo E informazioni enciclopediche!

---

**Buon divertimento con questo nuovo esercizio! 🚀**