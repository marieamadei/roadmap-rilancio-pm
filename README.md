# Roadmap di Rilancio PM

Microsito statico tratto dalla presentazione strategica `Roadmap-di-Rilancio-PM.pdf`.

## Anteprima locale

Non sono richiesti pacchetti o compilazione. Dalla cartella del progetto:

```bash
python3 -m http.server 8000
```

Aprire quindi `http://localhost:8000`.

## Pubblicazione con GitHub Pages

1. Creare un repository GitHub e caricare il contenuto di questa cartella nella branch `main`.
2. Aprire **Settings → Pages**.
3. In **Build and deployment**, scegliere **Deploy from a branch**.
4. Selezionare la branch `main`, cartella `/(root)`, quindi salvare.

Il sito è composto da file statici e non richiede GitHub Actions. Il file `.nojekyll` evita elaborazioni non necessarie.

## Riservatezza

La bozza contiene `noindex` nell'HTML e un `robots.txt` che scoraggia l'indicizzazione. Queste misure **non proteggono l'accesso** al sito.

GitHub Pages è normalmente pubblico anche quando il repository è privato. La pubblicazione privata con controllo degli accessi richiede un'organizzazione GitHub Enterprise Cloud. Prima di pubblicare, confermare quindi che il materiale possa essere accessibile pubblicamente oppure scegliere un hosting protetto.

## Struttura

- `index.html`: contenuti e struttura del sito
- `styles.css`: identità visiva e layout responsive
- `script.js`: navigazione, concept creativi e checklist delle approvazioni
- `assets/`: loghi, immagini e PDF originale

