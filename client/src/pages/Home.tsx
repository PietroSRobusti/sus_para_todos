import { HeroSection } from "@/components/HeroSection";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Hospital,
  Stethoscope,
  Calendar,
  Clock,
  Shield,
  Users,
  ClipboardList,
  User as UserIcon,
} from "lucide-react";
import { Link } from "wouter";
import { useAuthRedirect } from "@/hooks/useAuthRedirect";

export default function Home() {
  // protege rota: se o usuário não estiver autenticado, manda pro /login
  useAuthRedirect();

  const features = [
    {
      icon: Hospital,
      title: "Todos os Hospitais",
      description:
        "Acesso aos principais hospitais de São Caetano do Sul em um só lugar",
    },
    {
      icon: Calendar,
      title: "Agendamento Fácil",
      description:
        "Sistema intuitivo e acessível para agendar consultas e exames rapidamente",
    },
    {
      icon: Clock,
      title: "Disponibilidade em Tempo Real",
      description:
        "Visualize horários disponíveis e agende no momento mais conveniente",
    },
    {
      icon: Stethoscope,
      title: "Múltiplas Especialidades",
      description:
        "Consultas e exames em diversas especialidades médicas",
    },
    {
      icon: Shield,
      title: "Seguro e Confiável",
      description:
        "Seus dados protegidos com total segurança e privacidade",
    },
    {
      icon: Users,
      title: "Para Todas as Idades",
      description:
        "Interface acessível pensada para adultos e idosos",
    },
  ];

  return (
    <div
      className="min-h-screen"
      data-testid="home-page"
    >
      <HeroSection />

      {/* Seção de motivos / features */}
      <section
        className="py-20 px-4 sm:px-6 lg:px-8"
        data-testid="features-section"
      >
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">
              Por que usar o HealHub?
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Facilitamos o acesso à saúde pública com tecnologia simples e
              eficiente
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="p-8 hover-elevate"
                data-testid={`feature-card-${index}`}
              >
                <feature.icon className="h-12 w-12 text-primary mb-6" />
                <h3 className="text-2xl font-semibold mb-3">
                  {feature.title}
                </h3>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Seção de CTA principal */}
      <section
        className="py-20 px-4 sm:px-6 lg:px-8 bg-primary/5"
        data-testid="cta-section"
      >
        <div className="mx-auto max-w-7xl text-center">
          <h2 className="text-4xl font-bold mb-6">
            Pronto para agendar?
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            Agende sua consulta ou exame médico de forma rápida e segura
          </p>

          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/agendar">
              <Button
                size="lg"
                className="h-14 px-12 text-lg"
                data-testid="button-cta-agendar"
              >
                <Calendar className="mr-2 h-5 w-5" />
                Começar Agendamento
              </Button>
            </Link>

            <Link href="/meus-agendamentos">
              <Button
                size="lg"
                variant="outline"
                className="h-14 px-12 text-lg"
                data-testid="button-cta-meus-agendamentos"
              >
                <ClipboardList className="mr-2 h-5 w-5" />
                Meus Agendamentos
              </Button>
            </Link>

            <Link href="/perfil">
              <Button
                size="lg"
                variant="outline"
                className="h-14 px-12 text-lg"
                data-testid="button-cta-perfil"
              >
                <UserIcon className="mr-2 h-5 w-5" />
                Meu Perfil
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
