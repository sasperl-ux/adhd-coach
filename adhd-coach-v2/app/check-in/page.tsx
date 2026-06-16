"use client";
import { useState } from "react";
import { HeartPulse, Check } from "lucide-react";
import { PageHeader } from "@/components/layout/page-header";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const fields = ["Umore", "Energia", "Focus", "Stress"];

export default function CheckInPage() {
  const [values, setValues] = useState<Record<string, number>>({ Umore: 5, Energia: 5, Focus: 5, Stress: 5 });
  const [note, setNote] = useState("");
  const [saved, setSaved] = useState(false);

  function save() { setSaved(true); setTimeout(() => setSaved(false), 2500); }

  return (
    <>
      <PageHeader badge="Check-in emotivo · Teen" title="Come va adesso?"
        description="Un check-in rapido per osservare la giornata. Non è una valutazione diagnostica." />
      <Card className="max-w-lg">
        <CardHeader>
          <HeartPulse className="text-accent mb-2" size={26} />
          <CardTitle>Check-in demo</CardTitle>
          <CardDescription>Muovi i cursori per registrare il tuo stato.</CardDescription>
        </CardHeader>
        <div className="space-y-4">
          {fields.map(f => (
            <label key={f} className="block">
              <div className="flex justify-between text-sm mb-1.5">
                <span className="font-medium">{f}</span>
                <span className="text-primary font-semibold">{values[f]}</span>
              </div>
              <input type="range" min="1" max="10" step="1" value={values[f]}
                onChange={e => setValues(v => ({ ...v, [f]: Number(e.target.value) }))}
                className="w-full accent-primary" />
            </label>
          ))}
          <label className="block">
            <span className="block text-sm font-medium mb-1.5">Nota facoltativa</span>
            <textarea rows={3} value={note} onChange={e => setNote(e.target.value)}
              placeholder="Scrivi una cosa utile da ricordare..."
              className="w-full border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/30" />
          </label>
          <Button variant="primary" onClick={save}>
            {saved ? <><Check size={16} />Salvato!</> : "Salva demo"}
          </Button>
        </div>
      </Card>
    </>
  );
}
