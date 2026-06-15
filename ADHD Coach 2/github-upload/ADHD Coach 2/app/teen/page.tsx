import Link from "next/link";
import { MessageSquare, Plus } from "lucide-react";
import { AppShell } from "@/components/layout/app-shell";
import { PageHeader } from "@/components/layout/page-header";
import { MetricCard } from "@/components/dashboard/metric-card";
import { ProgressRow } from "@/components/dashboard/progress-row";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { activities, currentDemoUser, dailyFocus, routines } from "@/lib/demo-data";

export default function TeenDashboardPage() {
  return (
    <AppShell>
      <PageHeader
        badge="Adolescente"
        title={`Ciao ${currentDemoUser.name}, partiamo piccolo.`}
        description="La dashboard raccoglie check-in, routine e attivita di oggi con dati demo."
      />
      <div className="mb-6 flex flex-wrap gap-3">
        <Button asChild>
          <Link href="/check-in">
            <Plus size={16} />
            Nuovo check-in
          </Link>
        </Button>
        <Button asChild variant="secondary">
          <Link href="/messaggi">
            <MessageSquare size={16} />
            Messaggi
          </Link>
        </Button>
      </div>
      <section className="grid gap-4 md:grid-cols-4">
        <MetricCard label="Streak" value={`${currentDemoUser.streak} giorni`} hint="Check-in completati di fila" />
        <MetricCard label="Routine oggi" value="3" hint="Una e gia in corso" />
        <MetricCard label="Attivita" value="1/3" hint="Completate oggi" />
        <MetricCard label="Coach" value="1 passo" hint="Suggerimento attivo" />
      </section>
      <section className="mt-6 grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Stato di oggi</CardTitle>
            <CardDescription>Indicatori demo del check-in mattutino.</CardDescription>
          </CardHeader>
          <div className="space-y-4">
            {dailyFocus.map((item) => (
              <ProgressRow key={item.label} label={item.label} value={item.value} />
            ))}
          </div>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Prossime routine</CardTitle>
            <CardDescription>Azioni brevi e concrete.</CardDescription>
          </CardHeader>
          <div className="space-y-3">
            {routines.map((routine) => (
              <div key={routine.id} className="flex items-center justify-between rounded-md border p-3">
                <div>
                  <p className="font-medium">{routine.title}</p>
                  <p className="text-xs text-muted-foreground">{routine.time} · {routine.owner}</p>
                </div>
                <span className="text-xs text-muted-foreground">{routine.status}</span>
              </div>
            ))}
          </div>
        </Card>
      </section>
      <section className="mt-6">
        <Card>
          <CardHeader>
            <CardTitle>Attivita consigliate</CardTitle>
            <CardDescription>Piccoli compiti pensati per ridurre l’attrito iniziale.</CardDescription>
          </CardHeader>
          <div className="grid gap-3 md:grid-cols-3">
            {activities.map((activity) => (
              <div key={activity.id} className="rounded-md border p-3">
                <p className="font-medium">{activity.title}</p>
                <p className="mt-2 text-xs text-muted-foreground">{activity.category} · Sforzo {activity.effort}</p>
              </div>
            ))}
          </div>
        </Card>
      </section>
    </AppShell>
  );
}
