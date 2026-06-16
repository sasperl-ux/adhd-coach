"use client";
import { useState } from "react";
import { Send } from "lucide-react";
import { PageHeader } from "@/components/layout/page-header";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { messages as initialMessages } from "@/lib/demo-data";

export default function MessaggiPage() {
  const [msgs, setMsgs] = useState(initialMessages);
  const [newMsg, setNewMsg] = useState("");

  function send() {
    if (!newMsg.trim()) return;
    const now = new Date();
    setMsgs(m => [...m, { id: `msg-${Date.now()}`, from: "Tu", body: newMsg.trim(), time: `${now.getHours()}:${String(now.getMinutes()).padStart(2,"0")}` }]);
    setNewMsg("");
  }

  return (
    <>
      <PageHeader badge="Messaggi" title="Messaggi di supporto"
        description="Canale demo per comunicazioni pratiche tra utente e terapeuta collegato." />
      <div className="grid gap-4 lg:grid-cols-[1fr_0.7fr]">
        <Card>
          <CardHeader><CardTitle>Conversazione</CardTitle><CardDescription>Messaggi demo — puoi aggiungerne di nuovi.</CardDescription></CardHeader>
          <div className="space-y-3">
            {msgs.map(m => (
              <div key={m.id} className="border rounded-lg p-3">
                <div className="flex justify-between mb-1.5 text-xs">
                  <span className="font-semibold">{m.from}</span>
                  <span className="text-muted-foreground">{m.time}</span>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">{m.body}</p>
              </div>
            ))}
          </div>
        </Card>
        <Card>
          <CardHeader><CardTitle>Nuovo messaggio</CardTitle><CardDescription>Invio simulato.</CardDescription></CardHeader>
          <textarea rows={7} value={newMsg} onChange={e => setNewMsg(e.target.value)}
            placeholder="Scrivi un aggiornamento breve..."
            className="w-full border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/30 mb-3" />
          <Button variant="primary" onClick={send} className="w-full justify-center">
            <Send size={16} />Invia demo
          </Button>
        </Card>
      </div>
    </>
  );
}
