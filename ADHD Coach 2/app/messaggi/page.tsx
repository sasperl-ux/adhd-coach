import { Send } from "lucide-react";
import { AppShell } from "@/components/layout/app-shell";
import { PageHeader } from "@/components/layout/page-header";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { messages } from "@/lib/demo-data";

export default function MessagesPage() {
  return (
    <AppShell>
      <PageHeader
        badge="Messaggi"
        title="Messaggi di supporto"
        description="Canale demo per comunicazioni pratiche tra adolescente e terapeuta collegato."
      />
      <section className="grid gap-4 lg:grid-cols-[1fr_0.7fr]">
        <Card>
          <CardHeader>
            <CardTitle>Conversazione</CardTitle>
            <CardDescription>Messaggi demo, senza backend.</CardDescription>
          </CardHeader>
          <div className="space-y-3">
            {messages.map((message) => (
              <div key={message.id} className="rounded-md border p-4">
                <div className="mb-2 flex items-center justify-between text-sm">
                  <span className="font-medium">{message.from}</span>
                  <span className="text-muted-foreground">{message.time}</span>
                </div>
                <p className="text-sm leading-6 text-muted-foreground">{message.body}</p>
              </div>
            ))}
          </div>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Nuovo messaggio</CardTitle>
            <CardDescription>Invio simulato.</CardDescription>
          </CardHeader>
          <textarea
            rows={7}
            placeholder="Scrivi un aggiornamento breve..."
            className="w-full rounded-md border bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
          />
          <Button className="mt-4">
            <Send size={16} />
            Invia demo
          </Button>
        </Card>
      </section>
    </AppShell>
  );
}
