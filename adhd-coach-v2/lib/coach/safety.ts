export const COACH_SAFETY_RESPONSE =
  "Per questo argomento è importante parlarne con il tuo terapeuta o con un professionista sanitario qualificato. Io posso aiutarti solo a organizzare meglio la giornata e le attività.";

export type CoachSafetyDecision = {
  blocked: boolean;
  reason?: "DIAGNOSIS" | "MEDICATION" | "THERAPY";
};

function normalizeText(text: string) {
  return text.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
}

export function evaluateCoachSafety(message: string): CoachSafetyDecision {
  const n = normalizeText(message);
  if (/diagnos|sintom|disturbo|ho l.?adhd|sono adhd/.test(n)) return { blocked: true, reason: "DIAGNOSIS" };
  if (/farmac|medicin|dosaggi|dose\b|prescri|ritalin|concerta|strattera|atomoxetina|metilfenidato/.test(n)) return { blocked: true, reason: "MEDICATION" };
  if (/terapia|terapie|trattamento|curare|cura\b|psicoterapia|cbt\b/.test(n)) return { blocked: true, reason: "THERAPY" };
  return { blocked: false };
}
