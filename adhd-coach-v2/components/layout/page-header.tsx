import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

type Props = { title: string; description: string; badge?: string; badgeVariant?: "teen" | "adult" };

export function PageHeader({ title, description, badge, badgeVariant = "teen" }: Props) {
  return (
    <div className="mb-6">
      {badge && (
        <Badge className={cn("mb-3", badgeVariant === "adult" && "bg-secondary text-foreground")}>
          {badge}
        </Badge>
      )}
      <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight">{title}</h1>
      <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">{description}</p>
    </div>
  );
}
