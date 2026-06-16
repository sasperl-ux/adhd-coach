import Link from "next/link";
import { Plus, MessageSquare } from "lucide-react";
import { PageHeader } from "@/components/layout/page-header";
import { MetricCard } from "@/components/dashboard/metric-card";
import { ProgressRow } from "@/components/dashboard/progress-row";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { currentDemoUser, dailyFocus, routines, activities } from "@/lib/demo-data";

export default function TeenPage() {
  return (
    <>
      <PageHeader badge="Adolescente" title={`Ciao ${currentDemoUser.name}, partiamo piccolo.`}
        description="La dashboard raccoglie check-in, routine e attività di oggi con dati demo." />
      <div className="flex flex-wrap gap-3 mb-6">
        <Button asChild variant="primary"><Link href="/check-in"><Plus size={16} />Nuovo check-in</Link></Button>
        <Button asChild><Link href="/messaggi"><MessageSquare size={16} />Messaggi</Link></Button>
      </div>
      <div className="grid gap-3 sm:grid-cols-4 mb-5">
        <MetricCard label="Streak" value={`${currentDemoUser.streak} giorni`} hint="Check-in completati di fila" />
        <MetricCard label="Routine oggi" value="3" hint="Una è già in corso" />
        <MetricCard label="Attività" value="1/3" hint="Completate oggi" />
        <MetricCard label="Coach" value="1 passo" hint="Suggerimento attivo" />
      </div>
      <div className="grid gap-4 lg:grid-cols-2 mb-5">
        <Card>
          <CardHeader><CardTitle>Stato di oggi</CardTitle><CardDescription>Indicatori demo del check-in mattutino.</CardDescription></CardHeader>
          {dailyFocus.map(item => <ProgressRow key={item.label} label={item.label} value={item.value} />)}
        </Card>
        <Card>
          <CardHeader><CardTitle>Prossime routine</CardTitle><CardDescription>Azioni brevi e concrete.</CardDescription></CardHeader>
          {routines.map(r => (
            <div key={r.id} className="flex items-center justify-between border rounded-lg p-3 mb-2">
              <div><p className="text-sm font-medium">{r.title}</p><p className="text-xs text-muted-foreground">{r.time} · {r.owner}</p></div>
              <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${r.status === "In corso" ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground"}`}>{r.status}</span>
            </div>
          ))}
        </Card>
      </div>
      <Card>
        <CardHeader><CardTitle>Attività consigliate</CardTitle><CardDescription>Piccoli compiti per ridurre l'attrito iniziale.</CardDescription></CardHeader>
        <div className="grid gap-3 sm:grid-cols-3">
          {activities.map(a => (
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
