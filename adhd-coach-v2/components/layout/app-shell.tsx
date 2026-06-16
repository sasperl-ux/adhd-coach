"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Brain, Sparkles, UserCog, MessageSquare,
  CalendarCheck, ClipboardList, HeartPulse,
  Briefcase, CalendarDays, ListChecks, Activity,
  Home, ShieldCheck, ChevronDown,
} from "lucide-react";
import { ProfileProvider, useProfile } from "@/lib/profile-context";
import { AccountBar } from "@/components/layout/account-bar";
import type { ReactNode } from "react";

const navGroups = [
  {
    label: "Generale",
    items: [
      { href: "/", label: "Home", icon: Home },
      { href: "/coach", label: "Coach", icon: Sparkles },
      { href: "/therapist", label: "Terapeuta", icon: UserCog },
      { href: "/messaggi", label: "Messaggi", icon: MessageSquare },
    ],
  },
  {
    label: "Adolescente",
    items: [
      { href: "/teen", label: "Dashboard teen", icon: Brain },
      { href: "/routine", label: "Routine", icon: CalendarCheck },
      { href: "/attivita", label: "Attività", icon: ClipboardList },
      { href: "/check-in", label: "Check-in", icon: HeartPulse },
    ],
  },
  {
    label: "Adulto",
    items: [
      { href: "/adult", label: "Dashboard adulto", icon: Briefcase },
      { href: "/adult-routine", label: "Routine lavoro", icon: CalendarDays },
      { href: "/adult-attivita", label: "Task adulto", icon: ListChecks },
      { href: "/adult-checkin", label: "Check-in adulto", icon: Activity },
    ],
  },
];

function SidebarInner() {
  const pathname = usePathname();
  return (
    <aside className="fixed inset-y-0 left-0 w-60 border-r bg-white flex flex-col px-3 py-4 z-50 overflow-y-auto hidden md:flex">
      <Link href="/" className="flex items-center gap-2.5 mb-5 px-2">
        <div className="w-9 h-9 rounded-lg bg-primary text-white flex items-center justify-center flex-shrink-0">
          <Brain size={20} />
        </div>
        <div>
          <p className="text-[15px] font-semibold leading-tight">ADHD Coach</p>
          <p className="text-[11px] text-muted-foreground">MVP demo</p>
        </div>
      </Link>
      <nav className="flex-1 space-y-0.5">
        {navGroups.map(group => (
          <div key={group.label}>
            <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-widest px-2.5 pt-3 pb-1">{group.label}</p>
            {group.items.map(item => {
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-sm transition-colors ${active ? "bg-primary/10 text-primary font-semibold" : "text-muted-foreground hover:bg-muted hover:text-foreground"}`}
                >
                  <item.icon size={17} />
                  {item.label}
                </Link>
              );
            })}
          </div>
        ))}
      </nav>
      <div className="mt-4 rounded-xl border bg-muted/40 p-3 text-[11px] text-muted-foreground leading-relaxed">
        <span className="inline-block bg-white border rounded px-2 py-0.5 text-[10px] mb-1.5">Confini chiari</span>
        <p>Non diagnostica, non prescrive farmaci e non sostituisce terapeuta o servizi di emergenza.</p>
      </div>
    </aside>
  );
}

function MobileNav() {
  const pathname = usePathname();
  const allItems = navGroups.flatMap(g => g.items);
  return (
    <div className="md:hidden sticky top-[52px] z-10 border-b bg-white/95 backdrop-blur px-4 py-2">
      <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
        {allItems.map(item => {
          const active = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs whitespace-nowrap shrink-0 transition-colors ${active ? "bg-primary text-white" : "bg-muted text-muted-foreground"}`}
            >
              <item.icon size={13} />
              {item.label}
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export function AppShell({ children }: { children: ReactNode }) {
  return (
    <ProfileProvider>
      <SidebarInner />
      <AccountBar />
      <div className="md:ml-60 pt-[52px]">
        <MobileNav />
        <main className="max-w-5xl mx-auto px-4 py-7 sm:px-6 lg:px-8">
          {children}
        </main>
      </div>
    </ProfileProvider>
  );
}
