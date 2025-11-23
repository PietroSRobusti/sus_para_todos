import React from "react";
import { Newspaper, ExternalLink, HeartPulse, ShieldCheck } from "lucide-react";

const newsLinks = [
  {
    title: "Portal do Ministério da Saúde",
    description:
      "Notícias oficiais sobre campanhas de vacinação, programas do SUS e orientações para a população.",
    url: "https://www.gov.br/saude/pt-br",
    tag: "Governo Federal",
  },
  {
    title: "Organização Mundial da Saúde (OMS)",
    description:
      "Informações globais sobre saúde pública, alertas epidemiológicos, pesquisas e boas práticas.",
    url: "https://www.who.int/pt/about",
    tag: "Referência internacional",
  },
  {
    title: "Canal Saúde – Fiocruz",
    description:
      "Conteúdos educativos, entrevistas e reportagens sobre temas relevantes de saúde pública.",
    url: "https://portal.fiocruz.br/canal-saude",
    tag: "Conteúdo educativo",
  },
];

export default function News() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* HERO */}
      <section className="relative w-full border-b bg-gradient-to-br from-primary/20 via-primary/10 to-background overflow-hidden">
        <div className="pointer-events-none absolute inset-0 opacity-20">
          <div className="h-full w-full bg-[radial-gradient(circle_at_0_0,#22c55e_0,transparent_50%),radial-gradient(circle_at_100%_0,#0ea5e9_0,transparent_50%)]" />
        </div>

        <div className="relative mx-auto max-w-6xl px-4 py-12 space-y-4">
          <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold uppercase text-primary">
            <Newspaper className="h-4 w-4" />
            Notícias de saúde
          </span>
          <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
            Informações confiáveis para cuidar da sua saúde
          </h1>
          <p className="max-w-2xl text-sm text-muted-foreground md:text-base">
            O HealHub direciona o usuário para portais de instituições reconhecidas, ajudando a
            combater desinformação e a fortalecer a prevenção em saúde.
          </p>
        </div>
      </section>

      {/* CONTEÚDO */}
      <section className="mx-auto max-w-6xl space-y-8 px-4 py-10">
        <div className="grid gap-4 md:grid-cols-3">
          {newsLinks.map((item) => (
            <article
              key={item.title}
              className="flex flex-col justify-between rounded-2xl border bg-card p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
            >
              <div className="space-y-2">
                <p className="text-[11px] font-semibold uppercase text-muted-foreground">
                  {item.tag}
                </p>
                <h2 className="text-sm font-semibold">{item.title}</h2>
                <p className="text-xs text-muted-foreground">{item.description}</p>
              </div>
              <div className="mt-4">
                <a
                  href={item.url}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 rounded-lg bg-primary px-3 py-1.5 text-xs font-medium text-primary-foreground hover:bg-primary/90"
                >
                  Acessar portal oficial
                  <ExternalLink className="h-3 w-3" />
                </a>
              </div>
            </article>
          ))}
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-2xl border bg-card p-5 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <HeartPulse className="h-5 w-5 text-primary" />
              <h2 className="text-base font-semibold text-foreground">
                Use o HealHub como ponto de partida
              </h2>
            </div>
            <p className="mt-2">
              A página de notícias facilita o acesso a conteúdos confiáveis. Em produção, o
              município poderia incluir avisos locais, campanhas e comunicados das unidades.
            </p>
          </div>

          <div className="rounded-2xl border border-dashed border-primary/30 bg-card p-5 text-xs text-muted-foreground">
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-primary" />
              <p className="font-semibold text-foreground">Combate à desinformação</p>
            </div>
            <p className="mt-2">
              Uma motivação do projeto é aproximar o cidadão de fontes oficiais e reduzir a
              exposição a fake news sobre saúde, vacinas e tratamentos.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
