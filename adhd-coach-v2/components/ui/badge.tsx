import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

export function Badge({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span className={cn("inline-block bg-primary text-white text-[11px] font-medium px-3 py-0.5 rounded-full", className)}>
      {children}
    </span>
  );
}
