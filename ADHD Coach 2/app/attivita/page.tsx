import { CheckCircle2, Circle } from "lucide-react";
import { AppShell } from "@/components/layout/app-shell";
import { PageHeader } from "@/components/layout/page-header";
import { Badge } from "@/components/ui/badge";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { activities } from "@/lib/demo-data";

export default function ActivitiesPage() {
  return (
    <AppShell>
      <PageHeader
        badge="Attivita"
        title="Lista attivita"
        description="Task piccoli e concreti per trasformare obiettivi ampi in passi visibili."
      />
      <Card>
        <CardHeader>
          <CardTitle>Da fare oggi</CardTitle>
          <CardDescription>Demo UI con stati statici.</CardDescription>
        </CardHeader>
        <div className="space-y-3">
          {activities.map((activity) => (
            <div key={activity.id} className="flex items-center gap-3 rounded-md border p-4">
              {activity.done ? <CheckCircle2 className="text-primary" /> : <Circle className="text-muted-foreground" />}
              <div className="min-w-0 flex-1">
                <p className="font-medium">{activity.title}</p>
                <p className="text-sm text-muted-foreground">{activity.category}</p>
              </div>
              <Badge>{activity.effort}</Badge>
            </div>
          ))}
        </div>
      </Card>
    </AppShell>
  );
}
