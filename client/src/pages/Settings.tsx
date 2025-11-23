import React from "react";
import { useTheme } from "next-themes";
import { SunMedium, MoonStar, MonitorCog, Bell, Mail, Smartphone } from "lucide-react";

export default function Settings() {
  const { theme, setTheme } = useTheme();

  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* HERO simples, alinhado com o resto (sem exagerar aqui) */}
      <section className="relative w-full border-b bg-gradient-to-br from-primary/20 via-primary/10 to-background overflow-hidden">
        <div className="pointer-events-none absolute inset-0 opacity-15">
          <div className="h-full w-full bg-[radial-gradient(circle_at_0_0,#22c55e_0,transparent_50%),radial-gradient(circle_at_100%_0,#0ea5e9_0,transparent_50%)]" />
        </div>

        <div className="relative mx-auto max-w-4xl px-4 py-10 space-y-3">
          <span className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold uppercase text-primary">
            Preferências
          </span>
          <h1 className="text-2xl font-semibold tracking-tight">Configurações do HealHub</h1>
          <p className="text-sm text-muted-foreground">
            Ajuste tema, notificações e outras preferências de uso. As configurações são salvas no
            próprio navegador e podem ser evoluídas para o perfil do usuário.
          </p>
        </div>
      </section>

      {/* CONTEÚDO */}
      <section className="mx-auto max-w-4xl space-y-6 px-4 py-10">
        {/* TEMA */}
        <section className="space-y-3 rounded-2xl border bg-card p-5 shadow-sm">
          <h2 className="text-sm font-semibold">Tema do sistema</h2>
          <p className="text-xs text-muted-foreground">
            Escolha entre tema claro, escuro ou acompanhando o tema configurado no seu sistema
            operacional.
          </p>

          <div className="mt-3 grid gap-3 md:grid-cols-3">
            <button
              type="button"
              onClick={() => setTheme("light")}
              className={`flex flex-col items-start gap-2 rounded-xl border p-3 text-left text-xs transition hover-elevate ${
                theme === "light"
                  ? "border-primary bg-primary/5"
                  : "border-border bg-muted/60"
              }`}
            >
              <div className="flex items-center gap-2">
                <SunMedium className="h-4 w-4" />
                <span className="text-sm font-semibold">Claro</span>
              </div>
              <p className="text-[11px] text-muted-foreground">
                Fundo claro, ideal para ambientes bem iluminados.
              </p>
            </button>

            <button
              type="button"
              onClick={() => setTheme("dark")}
              className={`flex flex-col items-start gap-2 rounded-xl border p-3 text-left text-xs transition hover-elevate ${
                theme === "dark"
                  ? "border-primary bg-primary/10"
                  : "border-border bg-muted/60"
              }`}
            >
              <div className="flex items-center gap-2">
                <MoonStar className="h-4 w-4" />
                <span className="text-sm font-semibold">Escuro</span>
              </div>
              <p className="text-[11px] text-muted-foreground">
                Reduz o brilho da tela, mais confortável para uso à noite.
              </p>
            </button>

            <button
              type="button"
              onClick={() => setTheme("system")}
              className={`flex flex-col items-start gap-2 rounded-xl border p-3 text-left text-xs transition hover-elevate ${
                theme === "system" || !theme
                  ? "border-primary bg-primary/5"
                  : "border-border bg-muted/60"
              }`}
            >
              <div className="flex items-center gap-2">
                <MonitorCog className="h-4 w-4" />
                <span className="text-sm font-semibold">Sistema</span>
              </div>
              <p className="text-[11px] text-muted-foreground">
                O HealHub acompanha automaticamente o tema definido no seu dispositivo.
              </p>
            </button>
          </div>

          <p className="mt-3 text-[11px] text-muted-foreground">
            Essa configuração usa o <code className="rounded bg-muted px-1 py-[1px] text-[10px]">next-themes</code>.
            Em um ambiente real, as preferências poderiam ser salvas no próprio perfil do usuário.
          </p>
        </section>

        {/* NOTIFICAÇÕES – NOVA SEÇÃO */}
        <section className="space-y-3 rounded-2xl border bg-card p-5 shadow-sm">
          <h2 className="text-sm font-semibold">Notificações</h2>
          <p className="text-xs text-muted-foreground">
            Nesta versão acadêmica, as notificações são apenas configuradas na interface, mas
            mostram como o sistema pode avisar o paciente sobre mudanças e lembretes de agenda.
          </p>

          <div className="mt-3 grid gap-4 md:grid-cols-2">
            <div className="space-y-3 rounded-xl bg-muted/60 p-4">
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-primary" />
                <p className="text-sm font-semibold">Alertas por e-mail</p>
              </div>
              <label className="flex items-center gap-2 text-xs text-muted-foreground">
                <input type="checkbox" className="h-4 w-4 rounded border-border" defaultChecked />
                Receber confirmação de novos agendamentos.
              </label>
              <label className="flex items-center gap-2 text-xs text-muted-foreground">
                <input type="checkbox" className="h-4 w-4 rounded border-border" defaultChecked />
                Receber lembretes próximos à data da consulta/exame.
              </label>
            </div>

            <div className="space-y-3 rounded-xl bg-muted/60 p-4">
              <div className="flex items-center gap-2">
                <Smartphone className="h-4 w-4 text-primary" />
                <p className="text-sm font-semibold">Notificações no sistema</p>
              </div>
              <label className="flex items-center gap-2 text-xs text-muted-foreground">
                <input type="checkbox" className="h-4 w-4 rounded border-border" defaultChecked />
                Mostrar alertas na área de &quot;Meus agendamentos&quot;.
              </label>
              <label className="flex items-center gap-2 text-xs text-muted-foreground">
                <input type="checkbox" className="h-4 w-4 rounded border-border" />
                Exibir avisos sobre campanhas de saúde relevantes.
              </label>
            </div>
          </div>

          <p className="mt-2 text-[11px] text-muted-foreground">
            Em um cenário de produção, essas preferências poderiam ser integradas a serviços de
            e-mail, SMS, WhatsApp ou notificações push, conforme a política do município.
          </p>
        </section>

        {/* BLOCO FUTURO */}
        <section className="rounded-2xl border border-dashed border-primary/30 bg-card p-4 text-xs text-muted-foreground">
          <p className="font-semibold text-foreground">Configurações adicionais</p>
          <p className="mt-2">
            A mesma página pode ser ampliada para incluir idioma, acessibilidade e integração com
            aplicativos oficiais de saúde, reforçando o potencial do HealHub como base para um
            sistema municipal completo.
          </p>
        </section>
      </section>
    </main>
  );
}
