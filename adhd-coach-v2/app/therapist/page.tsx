import { PageHeader } from "@/components/layout/page-header";
import { MetricCard } from "@/components/dashboard/metric-card";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { therapistUsers } from "@/lib/demo-data";

export default function TherapistPage() {
  return (
    <>
      <PageHeader badge="Terapeuta" title="Dashboard terapeuta"
        description="Vista demo degli utenti collegati, con trend leggeri e senza funzioni diagnostiche." />
      <div className="grid gap-3 sm:grid-cols-3 mb-5">
        <MetricCard label="Utenti collegati" value="4" hint="Connessioni demo attive" />
        <MetricCard label="Check-in oggi" value="2" hint="Condivisi dagli utenti" />
        <MetricCard label="Obiettivi attivi" value="11" hint="Totale sugli utenti demo" />
      </div>
      <Card>
        <CardHeader><CardTitle>Utenti</CardTitle><CardDescription>Panoramica non clinica per supportare obiettivi e routine.</CardDescription></CardHeader>
        <div className="overflow-hidden rounded-lg border">
          <table className="w-full text-sm text-left">
            <thead className="bg-muted text-muted-foreground text-xs">
              <tr>
                <th className="px-4 py-3 font-semibold">Nome</th>
                <th className="px-4 py-3 font-semibold">Fascia</th>
                <th className="px-4 py-3 font-semibold">Ultimo check-in</th>
                <th className="px-4 py-3 font-semibold">Umore</th>
                <th className="px-4 py-3 font-semibold">Focus</th>
                <th className="px-4 py-3 font-semibold">Obiettivi</th>
              </tr>
            </thead>
            <tbody>
              {therapistUsers.map(u => (
                <tr key={u.id} className="border-t bg-white hover:bg-muted/30 transition-colors">
                  <td className="px-4 py-3 font-medium">{u.name}</td>
                  <td className="px-4 py-3">
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${u.type === "Adulto" ? "bg-secondary/20 text-secondary-foreground" : "bg-muted text-muted-foreground"}`}>{u.type}</span>
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">{u.lastCheckIn}</td>
                  <td className="px-4 py-3">{u.mood}/10</td>
                  <td className="px-4 py-3">{u.focus}/10</td>
                  <td className="px-4 py-3">{u.sharedGoals}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </>
  );
}
