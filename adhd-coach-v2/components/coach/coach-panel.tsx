"use client";
import { useState, type FormEvent } from "react";
import { Send, Loader2, ShieldCheck, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

type CoachResponse = { reply: string; blocked: boolean; category: string };

const focusAreas = [
  { value: "ORGANIZATION", label: "Organizzazione" },
  { value: "ROUTINE", label: "Routine" },
  { value: "STUDY", label: "Studio" },
  { value: "WORK", label: "Lavoro" },
  { value: "HOME", label: "Casa" },
  { value: "MICRO_GOALS", label: "Micro-obiettivi" },
  { value: "DISTRACTIONS", label: "Distrazioni" },
  { value: "MOTIVATION", label: "Motivazione" },
];

const energyLevels = [
  { value: "LOW", label: "Bassa" },
  { value: "MEDIUM", label: "Media" },
  { value: "HIGH", label: "Alta" },
];

export function CoachPanel() {
  const [message, setMessage] = useState("Devo studiare ma continuo a distrarmi con il telefono.");
  const [focusArea, setFocusArea] = useState("DISTRACTIONS");
  const [energyLevel, setEnergyLevel] = useState("MEDIUM");
  const [response, setResponse] = useState<CoachResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/coach", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message, context: { focusArea, energyLevel } }),
      });
      const data = await res.json();
      if (!res.ok) { setError(data.error ?? "Non riesco a generare una risposta."); setResponse(null); return; }
      setResponse(data);
    } catch { setError("Errore di rete. Riprova tra poco."); setResponse(null); }
    finally { setIsLoading(false); }
  }

  return (
    <section className="grid gap-4 lg:grid-cols-[1fr_0.8fr]">
      <Card>
        <CardHeader>
          <CardTitle>Coach AI sicuro</CardTitle>
          <CardDescription>Chiedi aiuto su organizzazione, lavoro, routine, distrazioni, motivazione o micro-obiettivi.</CardDescription>
        </CardHeader>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <label className="block">
            <span className="block text-sm font-medium mb-1.5">Richiesta</span>
            <textarea value={message} onChange={e => setMessage(e.target.value)} rows={5}
              className="w-full rounded-lg border bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/30"
              placeholder="Es. Aiutami a iniziare i compiti senza perdermi..." />
          </label>
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block">
              <span className="block text-sm font-medium mb-1.5">Area</span>
              <select value={focusArea} onChange={e => setFocusArea(e.target.value)}
                className="h-10 w-full rounded-lg border bg-white px-3 text-sm outline-none focus:ring-2 focus:ring-primary/30">
                {focusAreas.map(a => <option key={a.value} value={a.value}>{a.label}</option>)}
              </select>
            </label>
            <label className="block">
              <span className="block text-sm font-medium mb-1.5">Energia</span>
              <select value={energyLevel} onChange={e => setEnergyLevel(e.target.value)}
                className="h-10 w-full rounded-lg border bg-white px-3 text-sm outline-none focus:ring-2 focus:ring-primary/30">
                {energyLevels.map(l => <option key={l.value} value={l.value}>{l.label}</option>)}
              </select>
            </label>
          </div>
          <Button type="submit" variant="primary" disabled={isLoading || message.trim().length === 0}>
            {isLoading ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} />}
            Chiedi al coach
          </Button>
        </form>
      </Card>

      <div className="space-y-4">
        <Card className={response?.blocked ? "border-accent" : ""}>
          <CardHeader>
            <div className="flex items-center gap-2">
              {response?.blocked
                ? <AlertTriangle size={20} className="text-accent" />
                : <ShieldCheck size={20} className="text-primary" />}
              <CardTitle>Risposta</CardTitle>
            </div>
            <CardDescription>{response ? `Categoria: ${response.category}` : "La risposta comparirà qui."}</CardDescription>
          </CardHeader>
          {error && <p className="text-sm text-accent">{error}</p>}
          {response && <p className="whitespace-pre-line text-sm leading-7">{response.reply}</p>}
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Regole di sicurezza</CardTitle>
            <CardDescription>Il coach resta su supporto pratico quotidiano.</CardDescription>
          </CardHeader>
          <ul className="space-y-1.5 text-sm text-muted-foreground">
            <li>Aiuta con organizzazione, lavoro, routine e micro-obiettivi.</li>
            <li>Aiuta a ridurre distrazioni e scegliere il primo passo.</li>
            <li>Non fa diagnosi, non interpreta sintomi, non prescrive farmaci.</li>
            <li>Non fornisce indicazioni terapeutiche.</li>
          </ul>
        </Card>
      </div>
    </section>
  );
}
