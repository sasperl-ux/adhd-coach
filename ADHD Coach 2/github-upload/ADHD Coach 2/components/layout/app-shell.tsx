import Link from "next/link";
import { Brain, CalendarCheck, ClipboardList, HeartPulse, MessageSquare, Sparkles, UserRoundCog } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const navItems = [
  { href: "/teen", label: "Teen", icon: Brain },
  { href: "/therapist", label: "Terapeuta", icon: UserRoundCog },
  { href: "/coach", label: "Coach", icon: Sparkles },
  { href: "/routine", label: "Routine", icon: CalendarCheck },
  { href: "/attivita", label: "Attivita", icon: ClipboardList },
  { href: "/check-in", label: "Check-in", icon: HeartPulse },
  { href: "/messaggi", label: "Messaggi", icon: MessageSquare }
];

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen">
      <aside className="fixed inset-y-0 left-0 hidden w-64 border-r bg-white px-4 py-5 md:block">
        <Link href="/" className="flex items-center gap-3">
          <div className="flex size-10 items-center justify-center rounded-md bg-primary text-primary-foreground">
            <Brain size={22} />
          </div>
          <div>
            <p className="font-semibold">ADHD Coach</p>
            <p className="text-xs text-muted-foreground">MVP demo</p>
          </div>
        </Link>
        <nav className="mt-8 space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground"
            >
              <item.icon size={18} />
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="absolute bottom-5 left-4 right-4 rounded-lg border bg-muted/40 p-3 text-xs text-muted-foreground">
          <Badge className="mb-2 bg-white">Confini chiari</Badge>
          <p>Non diagnostica, non prescrive farmaci e non sostituisce terapeuta o servizi di emergenza.</p>
        </div>
      </aside>
      <div className="md:pl-64">
        <header className="sticky top-0 z-10 border-b bg-white/90 px-4 py-3 backdrop-blur md:hidden">
          <Link href="/" className="font-semibold">ADHD Coach</Link>
          <nav className="mt-3 flex gap-2 overflow-x-auto pb-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="inline-flex shrink-0 items-center gap-2 rounded-md bg-muted px-3 py-2 text-xs font-medium text-muted-foreground"
              >
                <item.icon size={14} />
                {item.label}
              </Link>
            ))}
          </nav>
        </header>
        <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">{children}</main>
      </div>
    </div>
  );
}
