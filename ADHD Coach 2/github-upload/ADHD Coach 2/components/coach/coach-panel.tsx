"use client";

import type { FormEvent } from "react";
import { useState } from "react";
import { AlertTriangle, Loader2, Send, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

type CoachResponse = {
  reply: string;
  blocked: boolean;
  category: string;
};

const focusAreas = [
  { value: "ORGANIZATION", label: "Organizzazione" },
  { value: "ROUTINE", label: "Routine" },
  { value: "STUDY", label: "Studio" },
  { value: "MICRO_GOALS", label: "Micro-obiettivi" },
  { value: "DISTRACTIONS", label: "Distrazioni" },
  { value: "MOTIVATION", label: "Motivazione" }
];

const energyLevels = [
  { value: "LOW", label: "Bassa" },
  { value: "MEDIUM", label: "Media" },
  { value: "HIGH", label: "Alta" }
];

export function CoachPanel() {
  const [message, setMessage] = useState("Devo studiare ma continuo a distrarmi con il telefono.");
  const [focusArea, setFocusArea] = useState("DISTRACTIONS");
  const [energyLevel, setEnergyLevel] = useState("MEDIUM");
  const [response, setResponse] = useState<CoachResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const result = await fetch("/api/coach", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          message,
          context: {
            focusArea,
            energyLevel
          }
        })
      });

      const data = await result.json();

      if (!result.ok) {
        setError(data.error ?? "Non riesco a generare una risposta adesso.");
        setResponse(null);
        return;
      }

      setResponse(data);
    } catch {
      setError("Errore di rete. Riprova tra poco.");
      setResponse(null);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <section className="grid gap-4 lg:grid-cols-[1fr_0.8fr]">
      <Card>
        <CardHeader>
          <CardTitle>Coach AI sicuro</CardTitle>
          <CardDescription>
            Chiedi aiuto su organizzazione, routine, studio, distrazioni, motivazione o micro-obiettivi.
          </CardDescription>
        </CardHeader>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <label className="block">
            <span className="mb-2 block text-sm font-medium">Richiesta</span>
            <textarea
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              rows={5}
              className="w-full rounded-md border bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
              placeholder="Es. Aiutami a iniziare i compiti senza perdermi..."
            />
          </label>
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block">
              <span className="mb-2 block text-sm font-medium">Area</span>
              <select
                value={focusArea}
                onChange={(event) => setFocusArea(event.target.value)}
                className="h-10 w-full rounded-md border bg-white px-3 text-sm outline-none focus:ring-2 focus:ring-ring"
              >
                {focusAreas.map((area) => (
                  <option key={area.value} value={area.value}>
                    {area.label}
                  </option>
                ))}
              </select>
            </label>
            <label className="block">
              <span className="mb-2 block text-sm font-medium">Energia</span>
              <select
                value={energyLevel}
                onChange={(event) => setEnergyLevel(event.target.value)}
                className="h-10 w-full rounded-md border bg-white px-3 text-sm outline-none focus:ring-2 focus:ring-ring"
              >
                {energyLevels.map((level) => (
                  <option key={level.value} value={level.value}>
                    {level.label}
                  </option>
                ))}
              </select>
            </label>
          </div>
          <Button type="submit" disabled={isLoading || message.trim().length === 0}>
            {isLoading ? <Loader2 className="animate-spin" size={16} /> : <Send size={16} />}
            Chiedi al coach
          </Button>
        </form>
      </Card>

      <div className="space-y-4">
        <Card className={response?.blocked ? "border-accent" : ""}>
          <CardHeader>
            <div className="flex items-center gap-2">
              {response?.blocked ? (
                <AlertTriangle className="text-accent" size={20} />
              ) : (
                <ShieldCheck className="text-primary" size={20} />
              )}
              <CardTitle>Risposta</CardTitle>
            </div>
            <CardDescription>
              {response ? `Categoria: ${response.category}` : "La risposta comparira qui."}
            </CardDescription>
          </CardHeader>
          {error ? <p className="text-sm text-accent">{error}</p> : null}
          {response ? <p className="whitespace-pre-line text-sm leading-6">{response.reply}</p> : null}
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Regole di sicurezza</CardTitle>
            <CardDescription>Il coach resta su supporto pratico quotidiano.</CardDescription>
          </CardHeader>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>Aiuta con organizzazione, routine, studio e micro-obiettivi.</li>
            <li>Aiuta a ridurre distrazioni e scegliere il primo passo.</li>
            <li>Non fa diagnosi, non interpreta sintomi, non prescrive farmaci.</li>
            <li>Non fornisce indicazioni terapeutiche.</li>
          </ul>
        </Card>
      </div>
    </section>
  );
}
