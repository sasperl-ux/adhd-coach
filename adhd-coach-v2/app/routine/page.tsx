import { PageHeader } from "@/components/layout/page-header";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { routines } from "@/lib/demo-data";
import { CalendarCheck } from "lucide-react";

export default function RoutinePage() {
  return (
    <>
      <PageHeader badge="Routine · Teen" title="Routine quotidiane"
        description="Sequenze brevi, visibili e modificabili per sostenere la giornata scolastica." />
      <Card>
        <CardHeader><CardTitle>Oggi</CardTitle><CardDescription>Le routine usano dati demo e non vengono salvate.</CardDescription></CardHeader>
        {routines.map(r => (
          <div key={r.id} className="flex items-center justify-between border rounded-lg p-3 mb-2">
            <div className="flex items-start gap-2.5">
              <CalendarCheck size={16} className="text-primary mt-0.5 shrink-0" />
              <div><p className="text-sm font-medium">{r.title}</p><p className="text-xs text-muted-foreground">{r.time} · Creata da {r.owner}</p></div>
            </div>
            <span className={`text-xs px-2.5 py-1 rounded-full font-medium shrink-0 ${r.status === "In corso" ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground"}`}>{r.status}</span>
          </div>
        ))}
      </Card>
    </>
  );
}
