import { PageHeader } from "@/components/layout/page-header";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { CalendarDays } from "lucide-react";

const morningRoutines = [
  { id: "mr1", title: "Pianificazione del giorno (10 min)", time: "08:30", status: "Completata", owner: "Lavoro" },
  { id: "mr2", title: "Inbox zero — email urgenti", time: "09:00", status: "Da fare", owner: "Lavoro" },
];
const afternoonRoutines = [
  { id: "ar1", title: "Blocco lavoro profondo 45 min", time: "10:00", status: "In corso", owner: "Lavoro" },
  { id: "ar2", title: "Pausa movimento 10 min", time: "11:00", status: "Da fare", owner: "Benessere" },
  { id: "ar3", title: "Commissioni / spesa / casa", time: "17:30", status: "Programmato", owner: "Casa" },
];
const eveningRoutines = [
  { id: "er1", title: "Review del giorno (5 min)", time: "19:00", status: "Programmato", owner: "Lavoro" },
  { id: "er2", title: "Decompressione serale — no schermi", time: "21:30", status: "Programmato", owner: "Benessere" },
];

function RoutineCard({ title, routines }: { title: string; routines: typeof morningRoutines }) {
  return (
    <Card>
      <CardHeader><CardTitle>{title}</CardTitle></CardHeader>
      {routines.map(r => (
        <div key={r.id} className="flex items-center justify-between border rounded-lg p-3 mb-2">
          <div className="flex items-start gap-2.5">
            <CalendarDays size={16} className="text-secondary mt-0.5 shrink-0" />
            <div><p className="text-sm font-medium">{r.title}</p><p className="text-xs text-muted-foreground">{r.time} · {r.owner}</p></div>
          </div>
          <span className={`text-xs px-2.5 py-1 rounded-full font-medium shrink-0 ${r.status === "In corso" || r.status === "Completata" ? "bg-secondary/20 text-foreground" : "bg-muted text-muted-foreground"}`}>{r.status}</span>
        </div>
      ))}
    </Card>
  );
}

export default function AdultRoutinePage() {
  return (
    <>
      <PageHeader badge="Routine · Adulto" badgeVariant="adult" title="Routine lavoro e casa"
        description="Sequenze strutturate per gestire il lavoro, le faccende domestiche e il benessere personale." />
      <div className="space-y-4">
        <RoutineCard title="Mattina" routines={morningRoutines} />
        <RoutineCard title="Pomeriggio" routines={afternoonRoutines} />
        <RoutineCard title="Sera" routines={eveningRoutines} />
      </div>
    </>
  );
}
