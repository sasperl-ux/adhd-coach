import Link from "next/link";
import { ArrowRight, ShieldCheck, Brain, Briefcase } from "lucide-react";
import { PageHeader } from "@/components/layout/page-header";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";

export default function HomePage() {
  return (
    <>
      <PageHeader badge="MVP" title="ADHD Coach"
        description="Una web app demo per supportare routine, attività e check-in quotidiani di adolescenti e adulti con ADHD già diagnosticato." />
      <section className="grid gap-4 lg:grid-cols-[1.4fr_0.8fr]">
        <Card className="bg-primary text-white">
          <h2 className="text-2xl font-semibold mb-3 leading-snug">Un coach pratico per il giorno, non uno strumento clinico.</h2>
          <p className="text-sm opacity-85 leading-7 mb-5">L'MVP mostra i flussi principali per adolescente, adulto e terapeuta. Clicca sull'avatar in alto a destra per configurare il tuo profilo.</p>
          <div className="flex flex-wrap gap-3">
            <Button asChild className="bg-white text-primary hover:bg-white/90 border-white">
              <Link href="/teen"><Brain size={16} />Dashboard teen <ArrowRight size={15} /></Link>
            </Button>
            <Button asChild className="bg-white/15 text-white hover:bg-white/25 border-white/30">
              <Link href="/adult"><Briefcase size={16} />Dashboard adulto <ArrowRight size={15} /></Link>
            </Button>
          </div>
        </Card>
        <Card>
          <ShieldCheck className="mb-3 text-primary" size={28} />
          <CardTitle>Guardrail MVP</CardTitle>
          <CardDescription className="mt-2">
            L'app non fa diagnosi, non prescrive farmaci, non fa terapia e non sostituisce terapeuta, medico o servizi di emergenza.
          </CardDescription>
        </Card>
      </section>
    </>
  );
}
