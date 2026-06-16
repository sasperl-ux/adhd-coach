"use client";
import { useState } from "react";
import { Activity, Check } from "lucide-react";
import { PageHeader } from "@/components/layout/page-header";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const fields = ["Energia mentale", "Focus lavorativo", "Stress", "Qualità del sonno", "Carico cognitivo"];

export default function AdultCheckinPage() {
  const [values, setValues] = useState<Record<string, number>>(Object.fromEntries(fields.map(f => [f, 5])));
  const [note, setNote] = useState("");
  const [saved, setSaved] = useState(false);

  function save() { setSaved(true); setTimeout(() => setSaved(false), 2500); }

  return (
    <>
      <PageHeader badge="Check-in · Adulto" badgeVariant="adult" title="Come stai lavorando oggi?"
        description="Un check-in breve su energia e produttività. Non è una valutazione diagnostica." />
      <Card className="max-w-lg">
        <CardHeader>
          <Activity className="text-secondary mb-2" size={26} />
          <CardTitle>Check-in adulto</CardTitle>
          <CardDescription>Muovi i cursori per registrare il tuo stato attuale.</CardDescription>
        </CardHeader>
        <div className="space-y-4">
          {fields.map(f => (
            <label key={f} className="block">
              <div className="flex justify-between text-sm mb-1.5">
                <span className="font-medium">{f}</span>
                <span className="text-secondary font-semibold">{values[f]}</span>
              </div>
              <input type="range" min="1" max="10" step="1" value={values[f]}
                onChange={e => setValues(v => ({ ...v, [f]: Number(e.target.value) }))}
                className="w-full" style={{ accentColor: "hsl(39,81%,52%)" }} />
            </label>
          ))}
          <label className="block">
            <span className="block text-sm font-medium mb-1.5">Nota facoltativa</span>
            <textarea rows={3} value={note} onChange={e => setNote(e.target.value)}
              placeholder="Es. Riunione importante nel pomeriggio..."
              className="w-full border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-secondary/30" />
          </label>
          <Button variant="adult" onClick={save}>
            {saved ? <><Check size={16} />Salvato!</> : "Salva check-in"}
          </Button>
        </div>
      </Card>
    </>
  );
}
