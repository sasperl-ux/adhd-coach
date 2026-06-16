import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

export function Card({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn("bg-white border border-border rounded-xl p-5", className)}>{children}</div>;
}
export function CardTitle({ children }: { children: ReactNode }) {
  return <p className="text-[15px] font-semibold mb-1">{children}</p>;
}
export function CardDescription({ children }: { children: ReactNode }) {
  return <p className="text-xs text-muted-foreground mb-4">{children}</p>;
}
export function CardHeader({ children }: { children: ReactNode }) {
  return <div className="mb-3">{children}</div>;
}
