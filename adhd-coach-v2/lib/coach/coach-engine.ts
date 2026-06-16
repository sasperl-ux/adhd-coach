import { COACH_SAFETY_RESPONSE, evaluateCoachSafety } from "@/lib/coach/safety";

export type CoachCategory =
  | "ORGANIZATION" | "ROUTINE" | "STUDY" | "WORK" | "HOME"
  | "MICRO_GOALS" | "DISTRACTIONS" | "MOTIVATION" | "GENERAL";

export type CoachReply = {
  reply: string;
  blocked: boolean;
  category: CoachCategory;
};

export type CoachRequestInput = {
  message: string;
  context?: {
    focusArea?: CoachCategory;
    energyLevel?: "LOW" | "MEDIUM" | "HIGH";
  };
};

const categoryMatchers: Array<[CoachCategory, RegExp]> = [
  ["ORGANIZATION", /\borganizz|\bordine|\bzaino|\bagenda|\bpianific|\bscaden/i],
  ["ROUTINE", /\broutine|\babitudin|\bmattina|\bsera|\bdormire|\bsvegl/i],
  ["STUDY", /\bstudio|\bstudiare|\bcompit|\bverifica|\binterrogazione|\bscuola/i],
  ["WORK", /\blavoro|\blavorare|\briunione|\bemail|\bprogetto|\bcliente|\bufficio|\bdeadline/i],
  ["HOME", /\bcasa|\bcucina|\bpulizie|\bspesa|\bcommissioni|\bfaccende/i],
  ["MICRO_GOALS", /\bobiettivo|\bpasso|\biniziare|\bpiccolo|\bmicro/i],
  ["DISTRACTIONS", /\bdistraz|\btelefono|\bnotific|\bsocial|\bconcentr/i],
  ["MOTIVATION", /\bmotiv|\bnon ho voglia|\bblocc|\bfatica|\brimand/i],
];

function inferCategory(message: string, requested?: CoachCategory): CoachCategory {
  if (requested) return requested;
  const match = categoryMatchers.find(([, rx]) => rx.test(message));
  return match?.[0] ?? "GENERAL";
}

function energyLine(level?: "LOW" | "MEDIUM" | "HIGH") {
  if (level === "LOW") return "Visto che l'energia è bassa, scegli la versione più piccola possibile del compito.";
  if (level === "HIGH") return "Hai abbastanza spinta: usala per fare un passo in più, senza esaurire tutte le riserve.";
  return "Mantieni il piano breve e visibile.";
}

function buildReply(category: CoachCategory, input: CoachRequestInput): string {
  const e = energyLine(input.context?.energyLevel);
  const replies: Record<CoachCategory, string> = {
    ORGANIZATION: `${e} Dividi tutto in tre colonne: adesso, dopo, non oggi. Metti in "adesso" una sola azione da meno di 10 minuti.`,
    ROUTINE: `${e} Trasforma la routine in una sequenza da tre passi: prepara, fai, chiudi. Scegli un orario e un segnale visibile.`,
    STUDY: `${e} Usa un blocco da 20 minuti: apri il materiale, scegli un esercizio, metti via le notifiche e fermati al timer.`,
    WORK: `${e} Identifica il task più importante e stima il tempo realistico. Apri solo gli strumenti necessari, chiudi le notifiche e lavora in blocchi da 25 minuti con pausa obbligatoria.`,
    HOME: `${e} Scegli una sola cosa da fare in casa adesso: deve richiedere meno di 10 minuti. Prepara l'occorrente e metti un timer.`,
    MICRO_GOALS: `${e} Riscrivi l'obiettivo come primo movimento fisico concreto. Se parte il primo passo, il resto diventa meno pesante.`,
    DISTRACTIONS: `${e} Riduci una distrazione alla volta: telefono fuori portata, una scheda aperta, timer breve. Non serve forza di volontà infinita, serve meno attrito attorno al compito.`,
    MOTIVATION: `${e} Non aspettare di sentirti motivato. Scegli una partenza ridicola ma reale: due minuti, una riga, un oggetto spostato. Dopo decidi se continuare.`,
    GENERAL: `${e} Scegli una sola attività utile per i prossimi 10 minuti. Scrivila con un verbo concreto e togli una distrazione dall'ambiente.`,
  };
  return `${replies[category]}\n\nPosso aiutarti a trasformarlo in una mini-lista da 3 passi.`;
}

export function generateCoachReply(input: CoachRequestInput): CoachReply {
  const safety = evaluateCoachSafety(input.message);
  if (safety.blocked) return { reply: COACH_SAFETY_RESPONSE, blocked: true, category: "GENERAL" };
  const category = inferCategory(input.message, input.context?.focusArea);
  return { reply: buildReply(category, input), blocked: false, category };
}
