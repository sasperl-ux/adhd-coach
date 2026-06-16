export const userRoles = ["TEEN", "ADULT", "THERAPIST", "PARENT", "ADMIN"] as const;
export type UserRole = (typeof userRoles)[number];

export const roleLabels: Record<UserRole, string> = {
  TEEN: "Adolescente",
  ADULT: "Adulto",
  THERAPIST: "Terapeuta",
  PARENT: "Genitore",
  ADMIN: "Admin",
};

export const permissions: Record<UserRole, string[]> = {
  TEEN: ["Compilare check-in personali", "Gestire routine e attività", "Vedere gli obiettivi condivisi"],
  ADULT: ["Gestire task lavoro e casa", "Compilare check-in personali", "Vedere obiettivi condivisi"],
  THERAPIST: ["Vedere utenti collegati", "Assegnare routine e obiettivi", "Leggere trend condivisi"],
  PARENT: ["Vedere routine condivise", "Vedere obiettivi condivisi"],
  ADMIN: ["Gestire configurazioni tecniche", "Consultare audit operativi"],
};
