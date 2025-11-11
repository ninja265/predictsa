import { Toaster as SonnerToaster } from "sonner";

export function Toaster() {
  return (
    <SonnerToaster
      position="top-right"
      theme="dark"
      toastOptions={{
        className: "bg-canvas-soft text-slate border border-border/10 shadow-soft",
      }}
    />
  );
}
