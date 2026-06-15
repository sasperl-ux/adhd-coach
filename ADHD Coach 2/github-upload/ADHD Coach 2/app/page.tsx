import Link from "next/link";
import { ArrowRight, ShieldCheck } from "lucide-react";
import { AppShell } from "@/components/layout/app-shell";
import { PageHeader } from "@/components/layout/page-header";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";

export default function HomePage() {
  return (
    <AppShell>
      <PageHeader
        badge="MVP"
        title="ADHD Coach"
        description="Una web app demo per supportare routine, attivita e check-in quotidiani di adolescenti con ADHD gia diagnosticato da professionisti esterni."
      />
      <section className="grid gap-4 lg:grid-cols-[1.4fr_0.8fr]">
        <Card className="bg-primary text-primary-foreground">
          <div className="max-w-2xl">
            <h2 className="text-3xl font-semibold">Un coach pratico per il giorno, non uno strumento clinico.</h2>
            <p className="mt-4 leading-7 text-primary-foreground/85">
              L’MVP usa dati demo e mostra i flussi principali per adolescente, terapeuta e genitore opzionale.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button asChild className="bg-white text-primary hover:bg-white/90">
                <Link href="/teen">
                  Apri dashboard <ArrowRight size={16} />
                </Link>
              </Button>
            </div>
          </div>
        </Card>
        <Card>
          <ShieldCheck className="mb-4 text-primary" size={28} />
          <CardTitle>Guardrail MVP</CardTitle>
          <CardDescription className="mt-2">
            L’app non fa diagnosi, non prescrive farmaci, non fa terapia e non sostituisce terapeuta, medico o servizi di emergenza.
          </CardDescription>
        </Card>
      </section>
    </AppShell>
  );
}
