import React from "react";

export default function About() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* HERO NO ESTILO DA HOME */}
      <section className="relative w-full border-b bg-gradient-to-br from-primary/20 via-primary/10 to-background overflow-hidden">
        {/* padrão de fundo suave */}
        <div className="pointer-events-none absolute inset-0 opacity-20">
          <div className="h-full w-full bg-[radial-gradient(circle_at_0_0,#22c55e_0,transparent_50%),radial-gradient(circle_at_100%_0,#0ea5e9_0,transparent_50%)]" />
        </div>

        <div className="relative mx-auto flex max-w-6xl flex-col gap-10 px-4 py-12 md:flex-row md:items-center md:justify-between">
          {/* Texto principal */}
          <div className="max-w-xl space-y-4">
            <span className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold uppercase text-primary">
              Sobre o projeto
            </span>
            <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
              HealHub: saúde pública mais organizada e acessível
            </h1>
            <p className="text-sm text-muted-foreground md:text-base">
              O HealHub foi desenvolvido como um sistema web para aproximar cidadãos, hospitais e
              gestores públicos, digitalizando o processo de agendamento e acompanhamento básico de
              saúde em redes municipais.
            </p>

            <div className="grid gap-4 text-sm md:grid-cols-3">
              <div className="rounded-xl bg-card/80 p-4 shadow-sm ring-1 ring-primary/10">
                <p className="text-xs font-semibold text-primary">Para o cidadão</p>
                <p className="mt-1 text-xs text-muted-foreground">
                  Agendamento simples, histórico de atendimentos e informações centralizadas.
                </p>
              </div>
              <div className="rounded-xl bg-card/80 p-4 shadow-sm ring-1 ring-primary/10">
                <p className="text-xs font-semibold text-primary">Para a rede pública</p>
                <p className="mt-1 text-xs text-muted-foreground">
                  Visão organizada da demanda e distribuição de pacientes entre hospitais.
                </p>
              </div>
              <div className="rounded-xl bg-card/80 p-4 shadow-sm ring-1 ring-primary/10">
                <p className="text-xs font-semibold text-primary">Para o TCC</p>
                <p className="mt-1 text-xs text-muted-foreground">
                  Prova de conceito completa, pronta para evoluir e integrar com sistemas oficiais.
                </p>
              </div>
            </div>
          </div>

          {/* Resumo técnico / “números” */}
          <div className="mt-4 w-full max-w-sm md:mt-0">
            <div className="rounded-2xl bg-card/90 p-5 shadow-md ring-1 ring-primary/10">
              <h2 className="text-sm font-semibold">O que o HealHub entrega hoje</h2>
              <p className="mt-2 text-xs text-muted-foreground">
                Uma jornada completa, desde o cadastro do paciente até o acompanhamento dos
                agendamentos e registros básicos de saúde.
              </p>

              <dl className="mt-4 grid grid-cols-2 gap-3 text-xs">
                <div className="rounded-xl bg-muted p-3">
                  <dt className="text-[10px] font-semibold uppercase text-muted-foreground">
                    Interfaces
                  </dt>
                  <dd className="mt-1 text-lg font-bold">15+</dd>
                  <p className="text-[11px] text-muted-foreground">
                    Fluxos prontos para uso real.
                  </p>
                </div>
                <div className="rounded-xl bg-muted p-3">
                  <dt className="text-[10px] font-semibold uppercase text-muted-foreground">
                    Foco
                  </dt>
                  <dd className="mt-1 text-lg font-bold">SUS</dd>
                  <p className="text-[11px] text-muted-foreground">
                    Pensado para a realidade da rede pública.
                  </p>
                </div>
                <div className="col-span-2 rounded-xl bg-muted p-3">
                  <dt className="text-[10px] font-semibold uppercase text-muted-foreground">
                    Tecnologias
                  </dt>
                  <dd className="mt-1 text-xs text-muted-foreground">
                    React, TypeScript, Express, autenticação com sessões e interface moderna com
                    Tailwind.
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </section>

      {/* Seção 2 */}
      <section className="mx-auto max-w-6xl space-y-8 px-4 py-10">
        <header className="max-w-3xl space-y-3">
          <h2 className="text-2xl font-semibold tracking-tight">Por que o HealHub foi criado?</h2>
          <p className="text-sm text-muted-foreground">
            O projeto nasce da necessidade de organizar o acesso à saúde pública, reduzindo filas
            presenciais e o uso de papel, e aproximando o cidadão dos serviços disponíveis na rede
            municipal.
          </p>
          <p className="text-sm text-muted-foreground">
            Ao mesmo tempo, o sistema gera uma base estruturada para que gestores acompanhem a
            demanda, capacidade de atendimento e ocupação das unidades, abrindo espaço para futuras
            integrações com prontuários eletrônicos e sistemas oficiais.
          </p>
        </header>

        <div className="grid gap-4 rounded-2xl border bg-card p-4 shadow-sm md:grid-cols-3">
          <div>
            <h3 className="text-xs font-semibold uppercase text-muted-foreground">Objetivo</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Facilitar o acesso do cidadão à saúde com uma experiência simples, digital e
              acessível, reduzindo barreiras para agendar consultas e exames.
            </p>
          </div>
          <div>
            <h3 className="text-xs font-semibold uppercase text-muted-foreground">Público</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Cidadãos que utilizam a rede pública de saúde e gestores municipais responsáveis pela
              organização dos atendimentos e da capacidade hospitalar.
            </p>
          </div>
          <div>
            <h3 className="text-xs font-semibold uppercase text-muted-foreground">Visão</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Tornar o agendamento digital de consultas e exames uma realidade em qualquer
              município que queira modernizar sua rede de saúde.
            </p>
          </div>
        </div>
      </section>

      {/* Seção 3 */}
      <section className="mx-auto max-w-6xl px-4 pb-12">
        <div className="grid items-start gap-8 md:grid-cols-[1.3fr,1fr]">
          <div className="space-y-4">
            <h2 className="text-xl font-semibold tracking-tight">
              Como o HealHub melhora a experiência do paciente
            </h2>
            <ol className="space-y-3 text-sm text-muted-foreground">
              <li className="flex gap-3">
                <span className="mt-1 flex h-6 w-6 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                  1
                </span>
                <div>
                  <p className="font-medium text-foreground">
                    Centraliza o acesso aos hospitais da rede.
                  </p>
                  <p>
                    O paciente enxerga em um só lugar as unidades de saúde disponíveis, os tipos de
                    atendimento e os horários oferecidos.
                  </p>
                </div>
              </li>
              <li className="flex gap-3">
                <span className="mt-1 flex h-6 w-6 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                  2
                </span>
                <div>
                  <p className="font-medium text-foreground">
                    Organiza agendamentos e evita desencontros.
                  </p>
                  <p>
                    A área de &quot;Meus agendamentos&quot; permite que o cidadão acompanhe,
                    reagende ou cancele atendimentos de forma clara e estruturada.
                  </p>
                </div>
              </li>
              <li className="flex gap-3">
                <span className="mt-1 flex h-6 w-6 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                  3
                </span>
                <div>
                  <p className="font-medium text-foreground">Constrói um histórico básico.</p>
                  <p>
                    A página de registros de saúde guarda informações essenciais, como exames,
                    vacinas e observações, em um formato simples de consultar.
                  </p>
                </div>
              </li>
            </ol>
          </div>

          <div className="rounded-2xl border border-dashed border-primary/30 bg-card p-5 text-xs text-muted-foreground">
            <h3 className="text-sm font-semibold text-foreground">
              E para a gestão pública, o que muda?
            </h3>
            <p className="mt-2">
              O HealHub funciona como uma base inicial para acompanhar demanda, capacidade de
              atendimento e possíveis gargalos entre unidades de saúde.
            </p>
          </div>
        </div>
      </section>

      {/* Seção 4 */}
      <section className="border-t bg-muted/40">
        <div className="mx-auto max-w-6xl px-4 py-6 text-xs text-muted-foreground">
          <p>
            Este sistema foi desenvolvido como Trabalho de Conclusão de Curso (TCC), com foco em
            demonstrar uma solução tecnicamente viável para digitalizar o acesso à saúde pública.
          </p>
        </div>
      </section>
    </main>
  );
}
