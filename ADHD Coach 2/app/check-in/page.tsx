import { HeartPulse } from "lucide-react";
import { AppShell } from "@/components/layout/app-shell";
import { PageHeader } from "@/components/layout/page-header";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const fields = ["Umore", "Energia", "Focus", "Stress"];

export default function CheckInPage() {
  return (
    <AppShell>
      <PageHeader
        badge="Check-in emotivo"
        title="Come va adesso?"
        description="Un check-in rapido per osservare la giornata. Non e una valutazione diagnostica."
      />
      <Card className="max-w-3xl">
        <CardHeader>
          <HeartPulse className="text-accent" size={28} />
          <CardTitle>Check-in demo</CardTitle>
          <CardDescription>I controlli sono statici in questa fase MVP.</CardDescription>
        </CardHeader>
        <form className="space-y-5">
          {fields.map((field) => (
            <label key={field} className="block">
              <span className="mb-2 block text-sm font-medium">{field}</span>
              <input type="range" min="1" max="10" defaultValue="5" className="w-full accent-teal-700" />
            </label>
          ))}
          <label className="block">
            <span className="mb-2 block text-sm font-medium">Nota facoltativa</span>
            <textarea
              rows={4}
              placeholder="Scrivi una cosa utile da ricordare..."
              className="w-full rounded-md border bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
            />
          </label>
          <Button type="submit">Salva demo</Button>
        </form>
      </Card>
    </AppShell>
  );
}
