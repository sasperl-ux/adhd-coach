export const userRoles = ["TEEN", "THERAPIST", "PARENT", "ADMIN"] as const;

export type UserRole = (typeof userRoles)[number];

export const roleLabels: Record<UserRole, string> = {
  TEEN: "Adolescente",
  THERAPIST: "Terapeuta",
  PARENT: "Genitore",
  ADMIN: "Admin"
};

export const permissions: Record<UserRole, string[]> = {
  TEEN: [
    "Compilare check-in personali",
    "Gestire routine e attivita",
    "Vedere gli obiettivi condivisi",
    "Scegliere cosa condividere quando consentito"
  ],
  THERAPIST: [
    "Vedere adolescenti collegati",
    "Assegnare routine e obiettivi",
    "Leggere trend condivisi",
    "Scrivere note professionali private"
  ],
  PARENT: [
    "Vedere routine condivise",
    "Vedere obiettivi condivisi",
    "Ricevere segnali generali autorizzati"
  ],
  ADMIN: [
    "Gestire configurazioni tecniche",
    "Consultare audit operativi",
    "Supportare account con policy dedicate"
  ]
};
