import React from "react";
import { cn } from "@/renderer/lib";

interface InteractionButtonProps extends React.ComponentPropsWithRef<"button"> {
  theme?: "light" | "dark";
}

export default function InteractionButton({
  children,
  className,
  theme = "dark",
  ...props
}: InteractionButtonProps) {
  return (
    <button
      className={cn(
        "drop-shadow-slate-800/30 drop-shadow-xl flex items-center justify-center space-x-2 rounded-2xl px-6 py-4 shadow-xl ring backdrop-blur-md transition-colors disabled:pointer-events-none disabled:opacity-30",
        theme === "dark"
          ? "bg-slate-800 text-white ring-slate-700 hover:bg-slate-800/85 hover:ring-slate-800/85 active:bg-slate-900"
          : "bg-white text-slate-950 ring-neutral-200 hover:bg-neutral-100 active:bg-neutral-50",
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}
