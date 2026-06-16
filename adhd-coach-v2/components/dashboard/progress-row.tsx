export function ProgressRow({ label, value, color = "bg-primary" }: { label: string; value: number; color?: string }) {
  return (
    <div>
      <div className="flex justify-between text-sm mb-1.5">
        <span className="font-medium">{label}</span>
        <span className="text-muted-foreground">{value}%</span>
      </div>
      <div className="h-2 rounded bg-muted overflow-hidden mb-3">
        <div className={`h-2 rounded ${color}`} style={{ width: `${value}%` }} />
      </div>
    </div>
  );
}
