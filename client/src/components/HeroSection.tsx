import { Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

export function HeroSection() {
  return (
    <section className="relative flex min-h-[70vh] items-center justify-center overflow-hidden bg-gradient-to-br from-primary/20 via-chart-2/10 to-background">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMwMDAiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDE0YzMuMzEgMCA2LTIuNjkgNi02cy0yLjY5LTYtNi02LTYgMi42OS02IDYgMi42OSA2IDYgNnoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-30"></div>
      
      <div className="relative z-10 mx-auto max-w-7xl px-4 py-20 text-center sm:px-6 lg:px-8">
        <h1 className="mb-6 text-5xl font-bold leading-tight text-foreground md:text-6xl">
          Agende sua Consulta ou Exame
        </h1>
        <p className="mx-auto mb-8 max-w-3xl text-xl leading-relaxed text-muted-foreground md:text-2xl">
          Atendemos todos os hospitais de São Caetano do Sul. Sistema fácil e acessível para todas as idades.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link href="/agendar">
            <Button size="lg" className="h-14 px-12 text-lg" data-testid="button-hero-agendar">
              <Calendar className="mr-2 h-5 w-5" />
              Agendar Agora
            </Button>
          </Link>
          <Link href="/noticias">
            <Button size="lg" variant="outline" className="h-14 px-12 text-lg backdrop-blur-sm" data-testid="button-hero-noticias">
              Ver Notícias de Saúde
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
