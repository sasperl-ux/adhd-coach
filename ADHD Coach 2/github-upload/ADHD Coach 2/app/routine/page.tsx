import { CalendarCheck } from "lucide-react";
import { AppShell } from "@/components/layout/app-shell";
import { PageHeader } from "@/components/layout/page-header";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { routines } from "@/lib/demo-data";

export default function RoutinePage() {
  return (
    <AppShell>
      <PageHeader
        badge="Routine"
        title="Routine quotidiane"
        description="Sequenze brevi, visibili e modificabili per sostenere la giornata."
      />
      <Card>
        <CardHeader>
          <CardTitle>Oggi</CardTitle>
          <CardDescription>Le routine usano dati demo e non vengono salvate.</CardDescription>
        </CardHeader>
        <div className="grid gap-3">
          {routines.map((routine) => (
            <div key={routine.id} className="flex flex-col gap-3 rounded-md border p-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-start gap-3">
                <CalendarCheck className="mt-1 text-primary" size={18} />
                <div>
                  <p className="font-medium">{routine.title}</p>
                  <p className="text-sm text-muted-foreground">{routine.time} · Creata da {routine.owner}</p>
                </div>
              </div>
              <Button variant="ghost">{routine.status}</Button>
            </div>
          ))}
        </div>
      </Card>
    </AppShell>
  );
}
