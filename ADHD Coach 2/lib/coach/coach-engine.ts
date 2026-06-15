import type { CoachRequestInput } from "@/lib/validations/coach";
import { COACH_SAFETY_RESPONSE, evaluateCoachSafety } from "@/lib/coach/safety";

export type CoachReply = {
  reply: string;
  blocked: boolean;
  category: "ORGANIZATION" | "ROUTINE" | "STUDY" | "MICRO_GOALS" | "DISTRACTIONS" | "MOTIVATION" | "GENERAL";
};

type EnergyLevel = NonNullable<NonNullable<CoachRequestInput["context"]>["energyLevel"]>;

const categoryMatchers: Array<[CoachReply["category"], RegExp]> = [
  ["ORGANIZATION", /\borganizz|\bordine|\bzaino|\bagenda|\bpianific|\bscaden/i],
  ["ROUTINE", /\broutine|\babitudin|\bmattina|\bsera|\bdormire|\bsvegl/i],
  ["STUDY", /\bstudio|\bstudiare|\bcompit|\bverifica|\binterrogazione|\bscuola/i],
  ["MICRO_GOALS", /\bobiettivo|\bpasso|\biniziare|\bpiccolo|\bmicro/i],
  ["DISTRACTIONS", /\bdistraz|\btelefono|\bnotific|\bsocial|\bconcentr/i],
  ["MOTIVATION", /\bmotiv|\bnon ho voglia|\bblocc|\bfatica|\brimand/i]
];

function inferCategory(message: string, requested?: CoachRequestInput["context"]): CoachReply["category"] {
  if (requested?.focusArea) {
    return requested.focusArea;
  }

  const match = categoryMatchers.find(([, pattern]) => pattern.test(message));
  return match?.[0] ?? "GENERAL";
}

function energyLine(energyLevel?: EnergyLevel) {
  if (energyLevel === "LOW") {
    return "Visto che l’energia è bassa, scegli una versione minuscola del compito.";
  }

  if (energyLevel === "HIGH") {
    return "Hai abbastanza spinta: usala per preparare anche il passo successivo, senza riempire tutta la giornata.";
  }

  return "Mantieni il piano breve e visibile.";
}

function buildReply(category: CoachReply["category"], input: CoachRequestInput) {
  const energy = energyLine(input.context?.energyLevel);

  const replies: Record<CoachReply["category"], string> = {
    ORGANIZATION: `${energy} Prendi un foglio o una nota e dividi tutto in tre colonne: adesso, dopo, non oggi. Metti in "adesso" una sola azione da meno di 10 minuti.`,
    ROUTINE: `${energy} Trasforma la routine in una sequenza da tre passi: prepara, fai, chiudi. Per oggi basta scegliere un orario e un segnale visibile, come timer o oggetto sul tavolo.`,
    STUDY: `${energy} Per studiare, usa un blocco da 20 minuti: apri il materiale, scegli un esercizio o una pagina, metti via le notifiche e fermati quando suona il timer.`,
    MICRO_GOALS: `${energy} Riscrivi l’obiettivo come primo movimento fisico: aprire il quaderno, scrivere il titolo, mettere il libro sulla scrivania. Se parte il primo passo, il resto diventa meno pesante.`,
    DISTRACTIONS: `${energy} Riduci una distrazione alla volta: telefono fuori portata, una scheda aperta, timer breve. Non serve forza di volontà infinita, serve meno attrito attorno al compito.`,
    MOTIVATION: `${energy} Non aspettare di sentirti motivato. Scegli una partenza ridicola ma reale: due minuti, una riga, un oggetto spostato. Dopo decidi se continuare.`,
    GENERAL: `${energy} Scegli una sola attività utile per i prossimi 10 minuti. Scrivila con un verbo concreto, prepara quello che serve e togli una distrazione dall’ambiente.`
  };

  return `${replies[category]}\n\nPosso aiutarti a trasformarlo in una mini-lista da 3 passi.`;
}

export function generateCoachReply(input: CoachRequestInput): CoachReply {
  const safety = evaluateCoachSafety(input.message);

  if (safety.blocked) {
    return {
      reply: COACH_SAFETY_RESPONSE,
      blocked: true,
      category: "GENERAL"
    };
  }

  const category = inferCategory(input.message, input.context);

  return {
    reply: buildReply(category, input),
    blocked: false,
    category
  };
}
