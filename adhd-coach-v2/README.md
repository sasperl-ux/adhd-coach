# ADHD Coach — MVP demo

Web app di coaching quotidiano non clinico per adolescenti e adulti con ADHD già diagnosticato.

## Stack
- **Next.js 15** (App Router)
- **TypeScript**
- **Tailwind CSS**
- **Lucide React** (icone)
- **Zod** (validazione API)

## Funzionalità
- Dashboard **Adolescente** — streak, routine, attività, check-in emotivo
- Dashboard **Adulto** — task lavoro/casa/benessere, routine strutturate, check-in produttività
- **Coach AI** — risposte contestuali con safety filter integrato (blocca diagnosi, farmaci, terapia)
- **Terapeuta** — panoramica utenti collegati
- **Messaggi** — canale demo
- **Profilo** — avatar stile Mii personalizzabile (stile capelli, carnagione, colore) + barra account in alto a destra

## Avvio locale

```bash
npm install
npm run dev
```

Apri [http://localhost:3000](http://localhost:3000).

## Deploy su Vercel

1. Carica questo repo su GitHub
2. Vai su [vercel.com](https://vercel.com) → New Project → importa il repo
3. Deploy automatico — nessuna variabile d'ambiente richiesta per la demo

## Guardrail

L'app **non** fa diagnosi, **non** prescrive farmaci, **non** fa terapia e **non** sostituisce terapeuta, medico o servizi di emergenza.
