import { CheckCircle2, Circle } from "lucide-react";
import { PageHeader } from "@/components/layout/page-header";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { activitiesWork, activitiesHome, activitiesWellness } from "@/lib/demo-data";

function TaskSection({ title, items }: { title: string; items: typeof activitiesWork }) {
  return (
    <Card>
      <CardHeader><CardTitle>{title}</CardTitle></CardHeader>
      {items.map(a => (
        <div key={a.id} className="flex items-center gap-3 border rounded-lg p-3 mb-2">
          {a.done ? <CheckCircle2 size={20} className="text-secondary shrink-0" /> : <Circle size={20} className="text-muted-foreground shrink-0" />}
          <div className="flex-1 min-w-0">
            <p className={`text-sm font-medium ${a.done ? "line-through text-muted-foreground" : ""}`}>{a.title}</p>
          </div>
          <span className="text-xs px-2.5 py-1 rounded-full bg-muted text-muted-foreground shrink-0">{a.effort}</span>
        </div>
      ))}
    </Card>
  );
}

export default function AdultAttivitaPage() {
  return (
    <>
      <PageHeader badge="Task · Adulto" badgeVariant="adult" title="Task di oggi"
        description="Lavoro, casa e benessere: una cosa alla volta, senza sovraccaricarsi." />
      <div className="space-y-4">
        <TaskSection title="Lavoro" items={activitiesWork} />
        <TaskSection title="Casa e commissioni" items={activitiesHome} />
        <TaskSection title="Benessere" items={activitiesWellness} />
      </div>
    </>
  );
}
