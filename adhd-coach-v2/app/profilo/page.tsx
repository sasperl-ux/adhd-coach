"use client";
import { useState } from "react";
import { PageHeader } from "@/components/layout/page-header";
import { Card, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MiiPicker } from "@/components/profile/mii-picker";
import { useProfile } from "@/lib/profile-context";
import { Save, Check } from "lucide-react";

export default function ProfiloPage() {
  const { profile, setProfile } = useProfile();
  const [name, setName] = useState(profile.name);
  const [job, setJob] = useState(profile.job);
  const [age, setAge] = useState("");
  const [goal, setGoal] = useState("");
  const [saved, setSaved] = useState(false);

  function save() {
    setProfile({ name: name.trim() || profile.name, job: job.trim() || profile.job });
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  }

  return (
    <>
      <PageHeader badge="Profilo" title="Il tuo profilo"
        description="Scegli il tuo personaggio e inserisci le informazioni base. I dati restano solo su questo dispositivo." />
      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardTitle>Il tuo personaggio</CardTitle>
          <CardDescription>Scegli stile, carnagione e colore capelli.</CardDescription>
          <MiiPicker />
        </Card>
        <Card>
          <CardTitle>Informazioni</CardTitle>
          <CardDescription>Usate per personalizzare i saluti nell'app.</CardDescription>
          <div className="space-y-4 mt-2">
            <label className="block">
              <span className="block text-sm font-medium mb-1.5">Nome</span>
              <input type="text" value={name} onChange={e => setName(e.target.value)}
                className="w-full border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/30"
                placeholder="Es. Marco" />
            </label>
            <label className="block">
              <span className="block text-sm font-medium mb-1.5">Professione / ruolo</span>
              <input type="text" value={job} onChange={e => setJob(e.target.value)}
                className="w-full border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/30"
                placeholder="Es. Designer, Studente, Insegnante..." />
            </label>
            <label className="block">
              <span className="block text-sm font-medium mb-1.5">Fascia d'età</span>
              <select value={age} onChange={e => setAge(e.target.value)}
                className="w-full border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/30 h-10">
                <option value="">Seleziona...</option>
                <option value="teen">Adolescente (12–17)</option>
                <option value="young">Giovane adulto (18–25)</option>
                <option value="adult">Adulto (26–45)</option>
                <option value="senior">Over 45</option>
              </select>
            </label>
            <label className="block">
              <span className="block text-sm font-medium mb-1.5">Obiettivo principale</span>
              <select value={goal} onChange={e => setGoal(e.target.value)}
                className="w-full border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/30 h-10">
                <option value="">Seleziona...</option>
                <option>Gestire meglio il lavoro</option>
                <option>Completare i compiti scolastici</option>
                <option>Ridurre le distrazioni</option>
                <option>Costruire routine stabili</option>
                <option>Migliorare la gestione del tempo</option>
                <option>Ridurre lo stress quotidiano</option>
              </select>
            </label>
            <Button variant="primary" onClick={save} className="w-full justify-center">
              {saved ? <><Check size={16} />Salvato!</> : <><Save size={16} />Salva profilo</>}
            </Button>
          </div>
        </Card>
      </div>
    </>
  );
}
