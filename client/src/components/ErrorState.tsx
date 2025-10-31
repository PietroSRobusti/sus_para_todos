import { AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ErrorState({
  title = "Não foi possível carregar os dados.",
  description = "Verifique sua conexão ou tente novamente.",
  onRetry,
}: {
  title?: string;
  description?: string;
  onRetry?: () => void;
}) {
  return (
    <div
      className="min-h-[40vh] flex flex-col items-center justify-center text-center gap-4"
      data-testid="error-state"
      role="alert"
      aria-live="assertive"
    >
      <AlertTriangle className="h-8 w-8 text-destructive" />
      <div className="space-y-1 max-w-[260px]">
        <p className="text-base font-semibold">{title}</p>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
      {onRetry && (
        <Button variant="outline" size="sm" onClick={onRetry} data-testid="retry-button">
          Tentar novamente
        </Button>
      )}
    </div>
  );
}
