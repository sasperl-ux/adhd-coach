type ProgressRowProps = {
  label: string;
  value: number;
};

export function ProgressRow({ label, value }: ProgressRowProps) {
  return (
    <div>
      <div className="mb-2 flex items-center justify-between text-sm">
        <span className="font-medium">{label}</span>
        <span className="text-muted-foreground">{value}%</span>
      </div>
      <div className="h-2 rounded-sm bg-muted">
        <div className="h-2 rounded-sm bg-primary" style={{ width: `${value}%` }} />
      </div>
    </div>
  );
}
