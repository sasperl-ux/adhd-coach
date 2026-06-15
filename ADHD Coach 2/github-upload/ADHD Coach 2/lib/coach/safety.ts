export const COACH_SAFETY_RESPONSE =
  "Per questo argomento è importante parlarne con il tuo terapeuta o con un professionista sanitario qualificato. Io posso aiutarti solo a organizzare meglio la giornata e le attività.";

const unsafePatterns = [
  /\bdiagnos/i,
  /\bdiagnosi\b/i,
  /\bdiagnostic/i,
  /\bho l'?adhd\b/i,
  /\bsono adhd\b/i,
  /\bsono neurodivergente\b/i,
  /\bdisturbo\b/i,
  /\bsintom/i,
  /\binterpret.*sintom/i,
  /\bvaluta.*sintom/i,
  /\bfarmaco\b/i,
  /\bfarmaci\b/i,
  /\bmedicina\b/i,
  /\bmedicine\b/i,
  /\bmedicinale\b/i,
  /\bmedicinali\b/i,
  /\bdose\b/i,
  /\bdosaggio\b/i,
  /\bprescri/i,
  /\bprescrizione\b/i,
  /\britalin\b/i,
  /\bconcerta\b/i,
  /\bstrattera\b/i,
  /\batomoxetina\b/i,
  /\bmetilfenidato\b/i,
  /\bterapia\b/i,
  /\bterapie\b/i,
  /\bterapeutic/i,
  /\btrattamento\b/i,
  /\bcurare\b/i,
  /\bcura\b/i,
  /\bpsicoterapia\b/i,
  /\bcbt\b/i
];

export type CoachSafetyDecision = {
  blocked: boolean;
  reason?: "DIAGNOSIS" | "MEDICATION" | "THERAPY";
};

function normalizeText(text: string) {
  return text
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
}

export function evaluateCoachSafety(message: string): CoachSafetyDecision {
  const normalized = normalizeText(message);

  if (/\bdiagnos|\bsintom|\bdisturbo|\bho l'?adhd|\bsono adhd|\bsono neurodivergente/.test(normalized)) {
    return { blocked: true, reason: "DIAGNOSIS" };
  }

  if (/\bfarmac|\bmedicin|\bdosaggi|\bdose|\bprescri|\britalin|\bconcerta|\bstrattera|\batomoxetina|\bmetilfenidato/.test(normalized)) {
    return { blocked: true, reason: "MEDICATION" };
  }

  if (/\bterapia|\bterapie|\bterapeutic|\btrattamento|\bcurare|\bcura\b|\bpsicoterapia|\bcbt\b/.test(normalized)) {
    return { blocked: true, reason: "THERAPY" };
  }

  if (unsafePatterns.some((pattern) => pattern.test(message))) {
    return { blocked: true, reason: "THERAPY" };
  }

  return { blocked: false };
}
