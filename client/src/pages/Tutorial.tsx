import React from "react";
import { MousePointerClick, UserPlus, CalendarDays, ClipboardList, Bell } from "lucide-react";

const steps = [
  {
    icon: UserPlus,
    title: "1. Crie sua conta",
    text: "Informe seus dados básicos, como nome, e-mail e senha. Em um cenário real, esse cadastro poderia ser integrado ao prontuário municipal.",
  },
  {
    icon: MousePointerClick,
    title: "2. Acesse o sistema",
    text: "Faça login com seu e-mail e senha. O sistema valida a sessão e libera o acesso às funcionalidades principais.",
  },
  {
    icon: CalendarDays,
    title: "3. Agende sua consulta ou exame",
    text: "Escolha o hospital, o tipo de atendimento e um horário disponível. Confirme os dados antes de finalizar.",
  },
  {
    icon: ClipboardList,
    title: "4. Acompanhe em “Meus agendamentos”",
    text: "Veja todos os atendimentos marcados, com informações de data, horário e unidade de saúde.",
  },
  {
    icon: Bell,
    title: "5. Consulte seus registros de saúde",
    text: "Na página de registros, você encontra um resumo básico de atendimentos e observações.",
  },
];

export default function Tutorial() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* HERO */}
      <section className="relative w-full border-b bg-gradient-to-br from-primary/20 via-primary/10 to-background overflow-hidden">
        <div className="pointer-events-none absolute inset-0 opacity-20">
          <div className="h-full w-full bg-[radial-gradient(circle_at_0_0,#22c55e_0,transparent_50%),radial-gradient(circle_at_100%_0,#0ea5e9_0,transparent_50%)]" />
        </div>

        <div className="relative mx-auto max-w-6xl px-4 py-12 space-y-4">
          <span className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold uppercase text-primary">
            Guia rápido do usuário
          </span>
          <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
            Como usar o HealHub em poucos passos
          </h1>
          <p className="max-w-2xl text-sm text-muted-foreground md:text-base">
            Este tutorial apresenta a jornada do cidadão dentro do sistema – do primeiro acesso até
            o acompanhamento de agendamentos e registros.
          </p>
        </div>
      </section>

      {/* STEPS */}
      <section className="mx-auto max-w-6xl space-y-10 px-4 py-10">
        <div className="grid gap-4 md:grid-cols-5">
          {steps.map((step) => (
            <div
              key={step.title}
              className="flex flex-col gap-2 rounded-2xl border bg-card p-4 text-sm shadow-sm"
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-primary">
                <step.icon className="h-4 w-4" />
              </div>
              <h2 className="text-sm font-semibold">{step.title}</h2>
              <p className="text-xs text-muted-foreground">{step.text}</p>
            </div>
          ))}
        </div>

      </section>
    </main>
  );
}
