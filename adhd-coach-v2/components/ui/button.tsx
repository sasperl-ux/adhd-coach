import { cn } from "@/lib/utils";
import type { ButtonHTMLAttributes } from "react";

type Variant = "primary" | "secondary" | "ghost" | "adult";

const variants: Record<Variant, string> = {
  primary: "bg-primary text-white border-primary hover:bg-primary/85",
  secondary: "bg-white text-foreground border-border hover:bg-muted",
  ghost: "bg-transparent text-muted-foreground border-transparent hover:bg-muted hover:text-foreground",
  adult: "bg-secondary text-foreground border-secondary hover:bg-secondary/85",
};

export function Button({ children, variant = "secondary", className, ...props }: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: Variant }) {
  return (
    <button
      className={cn("inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium border transition-colors cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed", variants[variant], className)}
      {...props}
    >
      {children}
    </button>
  );
}
