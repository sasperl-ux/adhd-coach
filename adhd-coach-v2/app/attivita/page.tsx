import { CheckCircle2, Circle } from "lucide-react";
import { PageHeader } from "@/components/layout/page-header";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { activities } from "@/lib/demo-data";

export default function AttivitaPage() {
  return (
    <>
      <PageHeader badge="Attività · Teen" title="Lista attività"
        description="Task piccoli e concreti per trasformare obiettivi ampi in passi visibili." />
      <Card>
        <CardHeader><CardTitle>Da fare oggi</CardTitle><CardDescription>Demo UI con stati statici.</CardDescription></CardHeader>
        {activities.map(a => (
          <div key={a.id} className="flex items-center gap-3 border rounded-lg p-3 mb-2">
            {a.done ? <CheckCircle2 size={20} className="text-primary shrink-0" /> : <Circle size={20} className="text-muted-foreground shrink-0" />}
            <div className="flex-1 min-w-0">
              <p className={`text-sm font-medium ${a.done ? "line-through text-muted-foreground" : ""}`}>{a.title}</p>
              <p className="text-xs text-muted-foreground">{a.category}</p>
            </div>
            <span className="text-xs px-2.5 py-1 rounded-full bg-muted text-muted-foreground shrink-0">{a.effort}</span>
          </div>
        ))}
      </Card>
    </>
  );
}
