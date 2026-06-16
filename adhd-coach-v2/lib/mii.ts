export const SKIN_TONES = ["#FDDBB4","#F5C89A","#E8A87C","#C68642","#8D5524","#4A2912"];
export const HAIR_COLORS = ["#1a0a00","#3b1f0a","#6B3A2A","#c47c2b","#D4A843","#e8d5a3","#888888","#cc3333"];

export const MII_STYLES = [
  { name: "Classico", eyebrow: "arch" as const,
    hair: (s: string) => `<ellipse cx="40" cy="18" rx="22" ry="10" fill="${s}"/><rect x="18" y="16" width="7" height="14" rx="3" fill="${s}"/><rect x="55" y="16" width="7" height="14" rx="3" fill="${s}"/>` },
  { name: "Frangetta", eyebrow: "straight" as const,
    hair: (s: string) => `<ellipse cx="40" cy="16" rx="24" ry="11" fill="${s}"/><rect x="16" y="14" width="48" height="12" rx="4" fill="${s}"/><rect x="16" y="14" width="8" height="22" rx="4" fill="${s}"/><rect x="56" y="14" width="8" height="22" rx="4" fill="${s}"/>` },
  { name: "Corto", eyebrow: "arch" as const,
    hair: (s: string) => `<ellipse cx="40" cy="17" rx="21" ry="9" fill="${s}"/><rect x="19" y="15" width="6" height="10" rx="3" fill="${s}"/><rect x="55" y="15" width="6" height="10" rx="3" fill="${s}"/>` },
  { name: "Lungo", eyebrow: "arch" as const,
    hair: (s: string) => `<ellipse cx="40" cy="16" rx="23" ry="11" fill="${s}"/><rect x="17" y="14" width="7" height="32" rx="3.5" fill="${s}"/><rect x="56" y="14" width="7" height="32" rx="3.5" fill="${s}"/><ellipse cx="40" cy="56" rx="23" ry="6" fill="${s}"/>` },
  { name: "Riccio", eyebrow: "arch" as const,
    hair: (s: string) => `<circle cx="28" cy="19" r="9" fill="${s}"/><circle cx="40" cy="14" r="10" fill="${s}"/><circle cx="52" cy="19" r="9" fill="${s}"/><circle cx="22" cy="26" r="7" fill="${s}"/><circle cx="58" cy="26" r="7" fill="${s}"/><rect x="18" y="22" width="7" height="16" rx="3" fill="${s}"/><rect x="55" y="22" width="7" height="16" rx="3" fill="${s}"/>` },
  { name: "Capello alto", eyebrow: "arch" as const,
    hair: (s: string) => `<ellipse cx="40" cy="14" rx="21" ry="9" fill="${s}"/><rect x="30" y="5" width="20" height="14" rx="4" fill="${s}"/><rect x="19" y="14" width="6" height="12" rx="3" fill="${s}"/><rect x="55" y="14" width="6" height="12" rx="3" fill="${s}"/>` },
  { name: "Codino", eyebrow: "arch" as const,
    hair: (s: string) => `<ellipse cx="40" cy="16" rx="22" ry="10" fill="${s}"/><rect x="18" y="14" width="7" height="14" rx="3" fill="${s}"/><rect x="55" y="14" width="7" height="14" rx="3" fill="${s}"/><ellipse cx="40" cy="8" rx="8" ry="6" fill="${s}"/>` },
  { name: "Calvo", eyebrow: "arch" as const,
    hair: (s: string) => `<ellipse cx="18" cy="28" rx="4" ry="6" fill="${s}"/><ellipse cx="62" cy="28" rx="4" ry="6" fill="${s}"/>` },
];

export function buildMiiSVG(styleIdx: number, skinColor: string, hairColorIdx: number): string {
  const style = MII_STYLES[styleIdx];
  const hairC = HAIR_COLORS[hairColorIdx];
  const eyeColor = "#2c1a0e";
  const mouthColor = "#c0607a";
  const brow = style.eyebrow === "straight"
    ? `<rect x="27" y="31" width="10" height="2.5" rx="1.2" fill="${eyeColor}"/><rect x="43" y="31" width="10" height="2.5" rx="1.2" fill="${eyeColor}"/>`
    : `<path d="M27,33 Q32,29 37,32" stroke="${eyeColor}" stroke-width="2.2" fill="none" stroke-linecap="round"/><path d="M43,32 Q48,29 53,33" stroke="${eyeColor}" stroke-width="2.2" fill="none" stroke-linecap="round"/>`;

  return `
    <rect width="80" height="80" fill="hsl(200,60%,88%)"/>
    <ellipse cx="40" cy="78" rx="22" ry="14" fill="hsl(172,59%,60%)"/>
    <rect x="34" y="56" width="12" height="10" rx="4" fill="${skinColor}"/>
    <ellipse cx="40" cy="38" rx="21" ry="23" fill="${skinColor}"/>
    <ellipse cx="19" cy="38" rx="4" ry="5.5" fill="${skinColor}"/>
    <ellipse cx="61" cy="38" rx="4" ry="5.5" fill="${skinColor}"/>
    ${style.hair(hairC)}
    <ellipse cx="31" cy="37" rx="6" ry="6.5" fill="white"/>
    <ellipse cx="49" cy="37" rx="6" ry="6.5" fill="white"/>
    <circle cx="31" cy="37" r="4" fill="hsl(210,60%,45%)"/>
    <circle cx="49" cy="37" r="4" fill="hsl(210,60%,45%)"/>
    <circle cx="31" cy="37" r="2.2" fill="${eyeColor}"/>
    <circle cx="49" cy="37" r="2.2" fill="${eyeColor}"/>
    <circle cx="32.4" cy="35.6" r="0.9" fill="white"/>
    <circle cx="50.4" cy="35.6" r="0.9" fill="white"/>
    ${brow}
    <ellipse cx="40" cy="44" rx="3" ry="2" fill="${skinColor}" stroke="hsl(0,0%,60%)" stroke-width="0.8"/>
    <path d="M34,51 Q40,56 46,51" stroke="${mouthColor}" stroke-width="2.2" fill="none" stroke-linecap="round"/>
    <ellipse cx="24" cy="43" rx="5" ry="3" fill="hsl(351,73%,80%)" opacity="0.45"/>
    <ellipse cx="56" cy="43" rx="5" ry="3" fill="hsl(351,73%,80%)" opacity="0.45"/>
  `;
}
