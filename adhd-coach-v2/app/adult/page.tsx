import Link from "next/link";
import { Plus, MessageSquare } from "lucide-react";
import { PageHeader } from "@/components/layout/page-header";
import { MetricCard } from "@/components/dashboard/metric-card";
import { ProgressRow } from "@/components/dashboard/progress-row";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { currentDemoAdult, dailyFocusAdult, routinesAdult, activitiesWork } from "@/lib/demo-data";

export default function AdultPage() {
  return (
    <>
      <PageHeader badge="Adulto" badgeVariant="adult" title={`Ciao ${currentDemoAdult.name}, una cosa alla volta.`}
        description="Dashboard per gestire lavoro, casa e impegni quotidiani senza sovraccaricarsi." />
      <div className="flex flex-wrap gap-3 mb-6">
        <Button asChild variant="adult"><Link href="/adult-checkin"><Plus size={16} />Nuovo check-in</Link></Button>
        <Button asChild><Link href="/messaggi"><MessageSquare size={16} />Messaggi</Link></Button>
      </div>
      <div className="grid gap-3 sm:grid-cols-4 mb-5">
        <MetricCard label="Streak" value={`${currentDemoAdult.streak} giorni`} hint="Check-in di fila" />
        <MetricCard label="Task lavoro" value="2/5" hint="Completati oggi" />
        <MetricCard label="Routine casa" value="1/3" hint="Una completata" />
        <MetricCard label="Pausa" value="⚠️ 0" hint="Nessuna pausa oggi" />
      </div>
      <div className="grid gap-4 lg:grid-cols-2 mb-5">
        <Card>
          <CardHeader><CardTitle>Stato di oggi</CardTitle><CardDescription>Indicatori dal check-in mattutino.</CardDescription></CardHeader>
          {dailyFocusAdult.map(item => <ProgressRow key={item.label} label={item.label} value={item.value} color="bg-secondary" />)}
        </Card>
        <Card>
          <CardHeader><CardTitle>Routine di oggi</CardTitle><CardDescription>Lavoro, casa e benessere.</CardDescription></CardHeader>
          {routinesAdult.map(r => (
            <div key={r.id} className="flex items-center justify-between border rounded-lg p-3 mb-2">
              <div><p className="text-sm font-medium">{r.title}</p><p className="text-xs text-muted-foreground">{r.time} · {r.owner}</p></div>
              <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${r.status === "In corso" ? "bg-secondary/20 text-secondary-foreground" : r.status === "Completata" ? "bg-secondary/20 text-secondary-foreground" : "bg-muted text-muted-foreground"}`}>{r.status}</span>
            </div>
          ))}
        </Card>
      </div>
      <Card>
        <CardHeader><CardTitle>Task prioritari</CardTitle><CardDescription>I compiti più urgenti, ridotti all'essenziale.</CardDescription></CardHeader>
        <div className="grid gap-3 sm:grid-cols-3">
          {activitiesWork.map(a => (
            <div key={a.id} className="border rounded-lg p-3">
              <p className="text-sm font-medium">{a.title}</p>
              <p className="text-xs text-muted-foreground mt-2">{a.category} · Sforzo {a.effort}</p>
            </div>
          ))}
        </div>
      </Card>
    </>
  );
}
