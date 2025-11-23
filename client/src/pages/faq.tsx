import React from "react";
import { HelpCircle, CalendarSearch, ClipboardList, ShieldCheck } from "lucide-react";

const faqs = [
  {
    icon: CalendarSearch,
    title: "Como funciona o agendamento pelo HealHub?",
    answer:
      "Você escolhe o hospital, o tipo de atendimento e o horário disponível. Depois é só confirmar o agendamento e acompanhar pela área “Meus agendamentos”.",
  },
  {
    icon: ClipboardList,
    title: "O sistema já está integrado ao prontuário eletrônico oficial?",
    answer:
      "Ainda não. No momento, o HealHub é um projeto acadêmico e funciona como prova de conceito. Os registros são simulados, mas a arquitetura está pronta para integração futura.",
  },
  {
    icon: ShieldCheck,
    title: "Meus dados ficam salvos onde?",
    answer:
      "Os dados ficam em um banco do próprio sistema, usado para fins acadêmicos. Em um ambiente real, o projeto pode ser adaptado para seguir LGPD e políticas de segurança do município.",
  },
  {
    icon: HelpCircle,
    title: "É possível usar o HealHub em outros municípios?",
    answer:
      "Sim, o modelo é genérico. Cada município teria sua própria base de hospitais e regras de agenda, aproveitando as mesmas telas e fluxos.",
  },
];

export default function Faq() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* HERO */}
      <section className="relative w-full border-b bg-gradient-to-br from-primary/20 via-primary/10 to-background overflow-hidden">
        <div className="pointer-events-none absolute inset-0 opacity-20">
          <div className="h-full w-full bg-[radial-gradient(circle_at_0_0,#22c55e_0,transparent_50%),radial-gradient(circle_at_100%_0,#0ea5e9_0,transparent_50%)]" />
        </div>

        <div className="relative mx-auto flex max-w-6xl flex-col gap-6 px-4 py-12 md:flex-row md:items-center md:justify-between">
          <div className="max-w-xl space-y-3">
            <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold uppercase text-primary">
              <HelpCircle className="h-4 w-4" />
              Central de ajuda
            </span>
            <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
              Perguntas frequentes sobre o HealHub
            </h1>
            <p className="text-sm text-muted-foreground md:text-base">
              Entenda rapidamente como o sistema funciona para o cidadão e para a gestão pública.
            </p>
          </div>

          <div className="w-full max-w-sm rounded-2xl bg-card/90 p-4 shadow-md ring-1 ring-primary/10">
            <p className="text-xs font-semibold text-foreground">Não encontrou sua resposta?</p>
            <p className="mt-2 text-xs text-muted-foreground">
              Use a página de <span className="font-semibold">Feedback e Contato</span> para enviar
              dúvidas, sugestões ou relatar problemas durante o uso.
            </p>
          </div>
        </div>
      </section>

      {/* LISTA DE FAQS */}
      <section className="mx-auto max-w-6xl space-y-8 px-4 py-10">
        <div className="grid gap-4 md:grid-cols-2">
          {faqs.map((item) => (
            <article
              key={item.title}
              className="group flex flex-col gap-2 rounded-2xl border bg-card p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <item.icon className="h-4 w-4" />
                </div>
                <h2 className="text-sm font-semibold">{item.title}</h2>
              </div>
              <p className="text-sm text-muted-foreground">{item.answer}</p>
            </article>
          ))}
        </div>

        <div className="rounded-2xl border border-dashed border-primary/30 bg-card p-5 text-xs text-muted-foreground">
          <p className="font-semibold text-foreground">Importante</p>
          <p className="mt-2">
            O HealHub é um protótipo acadêmico inspirado na realidade da rede pública. As telas e
            fluxos podem ser utilizados como base para um sistema real, com as adaptações legais e
            técnicas necessárias.
          </p>
        </div>
      </section>
    </main>
  );
}
