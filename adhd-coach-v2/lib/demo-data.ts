export const currentDemoUser = {
  id: "teen-1",
  name: "Marta",
  role: "TEEN" as const,
  therapist: "Dott.ssa Ricci",
  streak: 5,
};

export const currentDemoAdult = {
  id: "adult-1",
  name: "Marco",
  role: "ADULT" as const,
  therapist: "Dott.ssa Ricci",
  streak: 8,
};

export const dailyFocus = [
  { label: "Energia", value: 62 },
  { label: "Focus", value: 48 },
  { label: "Stress", value: 36 },
  { label: "Sonno", value: 72 },
];

export const dailyFocusAdult = [
  { label: "Energia mentale", value: 55 },
  { label: "Focus lavorativo", value: 40 },
  { label: "Stress", value: 62 },
  { label: "Sonno", value: 68 },
];

export const routines = [
  { id: "r1", title: "Preparare lo zaino", time: "07:30", status: "Da fare", owner: "Adolescente" },
  { id: "r2", title: "Blocco studio da 20 minuti", time: "16:15", status: "In corso", owner: "Terapeuta" },
  { id: "r3", title: "Check serale leggero", time: "21:00", status: "Programmato", owner: "Adolescente" },
];

export const routinesAdult = [
  { id: "ra1", title: "Pianificazione del giorno (10 min)", time: "08:30", status: "Completata", owner: "Lavoro" },
  { id: "ra2", title: "Blocco lavoro profondo 45 min", time: "10:00", status: "In corso", owner: "Lavoro" },
  { id: "ra3", title: "Decompressione serale", time: "19:30", status: "Programmato", owner: "Casa" },
];

export const activities = [
  { id: "t1", title: "Aprire il diario e scrivere la prima riga", category: "Scuola", effort: "Basso", done: false },
  { id: "t2", title: "Mettere il telefono fuori dalla scrivania", category: "Focus", effort: "Basso", done: true },
  { id: "t3", title: "Fare una pausa movimento di 5 minuti", category: "Energia", effort: "Medio", done: false },
];

export const activitiesWork = [
  { id: "w1", title: "Rispondere alle email urgenti", category: "Lavoro", effort: "Basso", done: true },
  { id: "w2", title: "Completare la presentazione del progetto", category: "Lavoro", effort: "Alto", done: false },
  { id: "w3", title: "Call con il team (30 min)", category: "Lavoro", effort: "Medio", done: false },
];

export const activitiesHome = [
  { id: "h1", title: "Preparare la lista della spesa", category: "Casa", effort: "Basso", done: false },
  { id: "h2", title: "Pagare bollette in scadenza", category: "Casa", effort: "Basso", done: false },
];

export const activitiesWellness = [
  { id: "wl1", title: "Passeggiata di 15 minuti", category: "Benessere", effort: "Basso", done: false },
];

export const therapistUsers = [
  { id: "u1", name: "Marta B.", type: "Teen", lastCheckIn: "Oggi, 08:12", mood: 7, focus: 5, sharedGoals: 3 },
  { id: "u2", name: "Luca P.", type: "Teen", lastCheckIn: "Ieri, 19:40", mood: 6, focus: 6, sharedGoals: 2 },
  { id: "u3", name: "Sara N.", type: "Teen", lastCheckIn: "2 giorni fa", mood: 4, focus: 3, sharedGoals: 4 },
  { id: "u4", name: "Marco R.", type: "Adulto", lastCheckIn: "Oggi, 07:55", mood: 6, focus: 4, sharedGoals: 2 },
];

export const messages = [
  { id: "m1", from: "Dott.ssa Ricci", body: "Ho aggiunto una routine breve per il pomeriggio. Provala solo se oggi hai energia sufficiente.", time: "09:10" },
  { id: "m2", from: "Marta", body: "Il blocco da 20 minuti ieri è andato meglio del previsto.", time: "Ieri" },
];
