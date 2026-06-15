# ADHD Coach

ADHD Coach e una web app MVP pensata come supporto quotidiano per adolescenti con ADHD gia diagnosticato da professionisti esterni.

L'app aiuta a organizzare la giornata, gestire routine, scomporre attivita in micro-obiettivi, fare check-in emotivi leggeri e comunicare con un terapeuta collegato. Il genitore e un ruolo opzionale con visibilita limitata e controllata.

## Stack

- Next.js
- TypeScript
- Tailwind CSS
- Prisma
- PostgreSQL
- Auth.js / NextAuth
- Zod
- Componenti stile Shadcn/UI

## Installazione

Requisiti:

- Node.js e npm
- Docker, consigliato per PostgreSQL locale
- Git

Clona o apri il progetto, poi entra nella cartella:

```bash
cd "/Users/francescabellomo/Documents/ADHD Coach"
```

Installa le dipendenze:

```bash
npm install
```

Copia le variabili ambiente:

```bash
cp .env.example .env
```

Avvia PostgreSQL locale:

```bash
docker compose up -d
```

Prepara Prisma e il database:

```bash
npm run prisma:migrate -- --name init
npm run prisma:generate
npm run db:seed
```

## Avvio In Locale

Avvia il server di sviluppo:

```bash
npm run dev
```

Apri:

```txt
http://localhost:3000
```

Comandi utili:

```bash
npm test
npm run typecheck
npm run lint
npm run build
npm run prisma:studio
```

Nota: le pagine MVP usano ancora dati demo statici da `lib/demo-data.ts`; Prisma e PostgreSQL sono gia configurati per la fase backend.

## Variabili Ambiente

Vedi [.env.example](.env.example).

```env
DATABASE_URL="postgresql://adhd_coach:adhd_coach_password@localhost:5432/adhd_coach?schema=public"
AUTH_SECRET="replace-with-a-long-random-secret"
AUTH_URL="http://localhost:3000"
```

Variabili:

- `DATABASE_URL`: stringa di connessione PostgreSQL usata da Prisma.
- `AUTH_SECRET`: segreto per firmare sessioni e token Auth.js.
- `AUTH_URL`: URL base dell'app in locale o produzione.

Per produzione, usare valori sicuri e gestiti tramite secret manager o variabili ambiente della piattaforma di deploy.

## Ruoli Demo

Il seed crea utenti demo idempotenti:

| Email | Ruolo | Descrizione |
| --- | --- | --- |
| `marta.demo@adhd-coach.local` | `TEEN` | Adolescente demo |
| `terapeuta.demo@adhd-coach.local` | `THERAPIST` | Terapeuta collegata |
| `genitore.demo@adhd-coach.local` | `PARENT` | Genitore opzionale |
| `admin.demo@adhd-coach.local` | `ADMIN` | Admin tecnico demo |

Regole principali di accesso:

- `TEEN`: vede e gestisce i propri dati.
- `THERAPIST`: vede solo adolescenti collegati con connessione attiva.
- `PARENT`: vede solo contenuti esplicitamente condivisi come `PARENT_SHARED`.
- `ADMIN`: accesso tecnico esteso, da usare solo con policy interne e audit.

Gli helper di protezione dati sono in `lib/data-protection.ts`.

## Coach AI Sicuro

Il Coach AI supporta solo richieste pratiche e non cliniche:

- organizzazione
- routine
- studio
- micro-obiettivi
- gestione delle distrazioni
- motivazione

Non puo:

- fare diagnosi
- prescrivere o consigliare farmaci
- interpretare sintomi
- dare indicazioni terapeutiche

Se l'utente chiede diagnosi, farmaci o terapia, il coach risponde:

```txt
Per questo argomento è importante parlarne con il tuo terapeuta o con un professionista sanitario qualificato. Io posso aiutarti solo a organizzare meglio la giornata e le attività.
```

File principali:

- `lib/coach/safety.ts`
- `lib/coach/coach-engine.ts`
- `lib/validations/coach.ts`
- `app/api/coach/route.ts`
- `components/coach/coach-panel.tsx`

## Limiti Clinici Dell'App

ADHD Coach non e un dispositivo medico e non sostituisce professionisti sanitari.

L'app:

- non fa diagnosi
- non prescrive farmaci
- non modifica terapie
- non interpreta sintomi
- non fa psicoterapia
- non sostituisce terapeuta, medico, genitore o servizi di emergenza

L'app puo offrire supporto organizzativo quotidiano: routine, reminder, micro-obiettivi, check-in non diagnostici e strategie pratiche per iniziare attivita.

In caso di crisi, rischio immediato, emergenza sanitaria o peggioramento significativo, l'utente deve rivolgersi a un adulto di riferimento, al terapeuta, a un medico o ai servizi di emergenza locali.

## GDPR E Privacy Minori

Questo progetto tratta potenzialmente dati molto sensibili: minori, salute mentale, routine quotidiane, comunicazioni e dati comportamentali. Prima di un uso reale servono revisione legale, DPIA e policy operative specifiche.

Aspetti da gestire prima della produzione:

- base giuridica del trattamento
- consenso del minore e/o del titolare della responsabilita genitoriale
- informative privacy chiare e adatte all'eta
- minimizzazione dei dati raccolti
- limitazione della visibilita del genitore
- audit log per accessi e azioni sensibili
- cifratura in transito e, dove opportuno, a riposo
- gestione export, rettifica e cancellazione dati
- retention policy
- verifica dei terapeuti
- accordi con professionisti, scuole o strutture sanitarie se coinvolti
- procedure per data breach

Regola di prodotto: il diario privato, le note terapeuta e i contenuti non condivisi non devono essere visibili al genitore senza consenso e policy esplicita.

## Sviluppi Futuri

Possibili prossime fasi:

- collegare le dashboard ai dati Prisma reali
- completare Auth.js con login e sessioni
- aggiungere middleware di protezione route
- implementare CRUD per routine, attivita, check-in e messaggi
- aggiungere onboarding consenso e inviti
- integrare notifiche leggere
- aggiungere test unitari per `lib/coach/safety.ts`
- aggiungere test end-to-end dei flussi per ruolo
- implementare export/cancellazione dati
- aggiungere audit log applicativo nelle azioni sensibili
- introdurre un provider AI reale solo dopo revisione di privacy, sicurezza e prompt policy

## Stato Attuale

Il progetto e un MVP tecnico in sviluppo. Le fondamenta di UI, Prisma, seed demo, ruoli e Coach AI sicuro sono presenti, ma l'app non e pronta per uso clinico, sanitario o con utenti reali.
