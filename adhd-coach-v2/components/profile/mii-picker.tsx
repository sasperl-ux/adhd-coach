"use client";
import { useProfile } from "@/lib/profile-context";
import { MII_STYLES, SKIN_TONES, HAIR_COLORS, buildMiiSVG } from "@/lib/mii";

export function MiiPicker() {
  const { profile, setProfile, avatarSVG } = useProfile();

  return (
    <div>
      {/* Big preview */}
      <div className="flex justify-center mb-5">
        <div className="w-28 h-28 rounded-full overflow-hidden border-4 border-border bg-sky-100">
          <svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg" className="w-full h-full"
            dangerouslySetInnerHTML={{ __html: avatarSVG }} />
        </div>
      </div>

      {/* Style grid */}
      <div className="mb-4">
        <p className="text-sm font-medium mb-2">Stile personaggio</p>
        <div className="grid grid-cols-4 gap-2">
          {MII_STYLES.map((s, i) => (
            <button
              key={i}
              onClick={() => setProfile({ styleIdx: i })}
              className={`flex flex-col items-center gap-1 p-2 rounded-xl border-2 transition-colors text-center ${i === profile.styleIdx ? "border-primary bg-primary/5" : "border-border hover:border-primary/40"}`}
            >
              <div className="w-14 h-14 rounded-full overflow-hidden bg-sky-100">
                <svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg" className="w-full h-full"
                  dangerouslySetInnerHTML={{ __html: buildMiiSVG(i, SKIN_TONES[profile.skinIdx], profile.hairIdx) }} />
              </div>
              <span className="text-[11px] text-muted-foreground leading-tight">{s.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Skin tones */}
      <div className="mb-4">
        <p className="text-sm font-medium mb-2">Carnagione</p>
        <div className="flex gap-2 flex-wrap">
          {SKIN_TONES.map((c, i) => (
            <button
              key={i}
              onClick={() => setProfile({ skinIdx: i })}
              className={`w-8 h-8 rounded-full border-[3px] transition-all ${i === profile.skinIdx ? "border-foreground scale-110" : "border-transparent hover:border-border"}`}
              style={{ background: c }}
              aria-label={`Carnagione ${i + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Hair colors */}
      <div>
        <p className="text-sm font-medium mb-2">Colore capelli</p>
        <div className="flex gap-2 flex-wrap">
          {HAIR_COLORS.map((c, i) => (
            <button
              key={i}
              onClick={() => setProfile({ hairIdx: i })}
              className={`w-8 h-8 rounded-full border-[3px] transition-all ${i === profile.hairIdx ? "border-foreground scale-110" : "border-transparent hover:border-border"}`}
              style={{ background: c }}
              aria-label={`Colore capelli ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
