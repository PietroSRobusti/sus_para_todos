import { Loader2 } from "lucide-react";

export function LoadingState({
  message = "Carregando...",
}: {
  message?: string;
}) {
  return (
    <div
      className="min-h-[40vh] flex flex-col items-center justify-center text-center gap-3 text-muted-foreground"
      data-testid="loading-state"
      role="status"
      aria-live="polite"
    >
      <Loader2 className="h-6 w-6 animate-spin" />
      <p className="text-sm font-medium">{message}</p>
    </div>
  );
}
