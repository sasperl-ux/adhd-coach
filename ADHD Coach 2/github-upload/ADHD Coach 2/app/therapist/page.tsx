import { AppShell } from "@/components/layout/app-shell";
import { PageHeader } from "@/components/layout/page-header";
import { MetricCard } from "@/components/dashboard/metric-card";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { therapistTeens } from "@/lib/demo-data";

export default function TherapistDashboardPage() {
  return (
    <AppShell>
      <PageHeader
        badge="Terapeuta"
        title="Dashboard terapeuta"
        description="Vista demo degli adolescenti collegati, con trend leggeri e senza funzioni diagnostiche."
      />
      <section className="grid gap-4 md:grid-cols-3">
        <MetricCard label="Adolescenti collegati" value="3" hint="Connessioni demo attive" />
        <MetricCard label="Check-in oggi" value="1" hint="Condivisi dagli adolescenti" />
        <MetricCard label="Obiettivi attivi" value="9" hint="Totale sugli utenti demo" />
      </section>
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Adolescenti</CardTitle>
          <CardDescription>Panoramica non clinica per supportare obiettivi e routine.</CardDescription>
        </CardHeader>
        <div className="overflow-hidden rounded-md border">
          <table className="w-full text-left text-sm">
            <thead className="bg-muted text-muted-foreground">
              <tr>
                <th className="px-4 py-3 font-medium">Nome</th>
                <th className="px-4 py-3 font-medium">Ultimo check-in</th>
                <th className="px-4 py-3 font-medium">Umore</th>
                <th className="px-4 py-3 font-medium">Focus</th>
                <th className="px-4 py-3 font-medium">Obiettivi</th>
              </tr>
            </thead>
            <tbody>
              {therapistTeens.map((teen) => (
                <tr key={teen.id} className="border-t bg-white">
                  <td className="px-4 py-3 font-medium">{teen.name}</td>
                  <td className="px-4 py-3 text-muted-foreground">{teen.lastCheckIn}</td>
                  <td className="px-4 py-3">{teen.mood}/10</td>
                  <td className="px-4 py-3">{teen.focus}/10</td>
                  <td className="px-4 py-3">{teen.sharedGoals}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </AppShell>
  );
}
