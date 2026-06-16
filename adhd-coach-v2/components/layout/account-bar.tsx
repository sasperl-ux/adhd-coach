"use client";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { ChevronDown, UserCircle, Sparkles, MessageSquare } from "lucide-react";
import { useProfile } from "@/lib/profile-context";

export function AccountBar() {
  const { profile, avatarSVG } = useProfile();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handler(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div
      className="fixed top-0 right-0 left-0 md:left-60 z-[100] h-[52px] bg-white/95 backdrop-blur border-b flex items-center justify-end px-5 gap-3"
      ref={ref}
    >
      <span className="text-sm text-muted-foreground hidden sm:block">
        {profile.name || "Imposta profilo"}
      </span>
      <button
        onClick={() => setOpen(o => !o)}
        className="flex items-center gap-2 p-1.5 rounded-xl hover:bg-muted transition-colors"
        aria-label="Account"
      >
        <div className="w-8 h-8 rounded-full overflow-hidden border-2 border-border bg-sky-100 flex-shrink-0">
          <svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg" className="w-full h-full"
            dangerouslySetInnerHTML={{ __html: avatarSVG }} />
        </div>
        <ChevronDown size={14} className="text-muted-foreground" />
      </button>

      {open && (
        <div className="absolute top-[52px] right-3 bg-white border border-border rounded-xl shadow-lg w-52 p-2 z-[200]">
          <div className="px-3 py-2 border-b border-border mb-2">
            <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-border bg-sky-100 mx-auto mb-2">
              <svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg" className="w-full h-full"
                dangerouslySetInnerHTML={{ __html: avatarSVG }} />
            </div>
            <p className="text-sm font-semibold text-center">{profile.name || "—"}</p>
            <p className="text-xs text-muted-foreground text-center mt-0.5">{profile.job || "Configura il profilo"}</p>
          </div>
          <Link href="/profilo" onClick={() => setOpen(false)}
            className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-foreground hover:bg-muted transition-colors">
            <UserCircle size={16} className="text-muted-foreground" /> Modifica profilo
          </Link>
          <Link href="/coach" onClick={() => setOpen(false)}
            className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-foreground hover:bg-muted transition-colors">
            <Sparkles size={16} className="text-muted-foreground" /> Vai al Coach
          </Link>
          <Link href="/messaggi" onClick={() => setOpen(false)}
            className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-foreground hover:bg-muted transition-colors">
            <MessageSquare size={16} className="text-muted-foreground" /> Messaggi
          </Link>
        </div>
      )}
    </div>
  );
}
