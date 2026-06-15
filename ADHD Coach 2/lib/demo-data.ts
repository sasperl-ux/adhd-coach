import type { UserRole } from "@/lib/roles";

export const currentDemoUser = {
  id: "teen-1",
  name: "Marta",
  role: "TEEN" satisfies UserRole,
  therapist: "Dott.ssa Ricci",
  streak: 5
};

export const dailyFocus = [
  { label: "Energia", value: 62 },
  { label: "Focus", value: 48 },
  { label: "Stress", value: 36 },
  { label: "Sonno", value: 72 }
];

export const routines = [
  {
    id: "routine-1",
    title: "Preparare lo zaino",
    time: "07:30",
    status: "Da fare",
    owner: "Adolescente"
  },
  {
    id: "routine-2",
    title: "Blocco studio da 20 minuti",
    time: "16:15",
    status: "In corso",
    owner: "Terapeuta"
  },
  {
    id: "routine-3",
    title: "Check serale leggero",
    time: "21:00",
    status: "Programmato",
    owner: "Adolescente"
  }
];

export const activities = [
  {
    id: "task-1",
    title: "Aprire il diario e scrivere la prima riga",
    category: "Scuola",
    effort: "Basso",
    done: false
  },
  {
    id: "task-2",
    title: "Mettere il telefono fuori dalla scrivania",
    category: "Focus",
    effort: "Basso",
    done: true
  },
  {
    id: "task-3",
    title: "Fare una pausa movimento di 5 minuti",
    category: "Energia",
    effort: "Medio",
    done: false
  }
];

export const therapistTeens = [
  {
    id: "teen-1",
    name: "Marta B.",
    lastCheckIn: "Oggi, 08:12",
    mood: 7,
    focus: 5,
    sharedGoals: 3
  },
  {
    id: "teen-2",
    name: "Luca P.",
    lastCheckIn: "Ieri, 19:40",
    mood: 6,
    focus: 6,
    sharedGoals: 2
  },
  {
    id: "teen-3",
    name: "Sara N.",
    lastCheckIn: "2 giorni fa",
    mood: 4,
    focus: 3,
    sharedGoals: 4
  }
];

export const messages = [
  {
    id: "msg-1",
    from: "Dott.ssa Ricci",
    body: "Ho aggiunto una routine breve per il pomeriggio. Provala solo se oggi hai energia sufficiente.",
    time: "09:10"
  },
  {
    id: "msg-2",
    from: "Marta",
    body: "Il blocco da 20 minuti ieri e andato meglio del previsto.",
    time: "Ieri"
  }
];

export const coachTips = [
  "Scegli una sola cosa da iniziare, non tutta la lista.",
  "Imposta un timer breve e fermati quando suona.",
  "Rendi visibile il primo passo: quaderno aperto, penna pronta, pagina giusta."
];
