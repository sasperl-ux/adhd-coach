export function MetricCard({ label, value, hint }: { label: string; value: string; hint: string }) {
  return (
    <div className="bg-white border border-border rounded-xl p-4">
      <p className="text-xs text-muted-foreground font-medium">{label}</p>
      <p className="text-3xl font-bold mt-1.5 mb-1">{value}</p>
      <p className="text-xs text-muted-foreground">{hint}</p>
    </div>
  );
}
