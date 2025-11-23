import React from "react";

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <section className="mx-auto max-w-3xl px-4 py-10">
        <header className="mb-6">
          <h1 className="text-3xl font-bold tracking-tight">
            Política de Privacidade e Termos de Uso
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Entenda como o HealHub lida com suas informações e quais são as principais regras de
            utilização da plataforma.
          </p>
        </header>

        <div className="space-y-4 text-sm leading-relaxed text-muted-foreground">
          <section>
            <h2 className="text-base font-semibold text-foreground">1. Finalidade do sistema</h2>
            <p className="mt-1">
              O HealHub tem como objetivo facilitar o agendamento de consultas e exames em redes
              públicas de saúde, organizando atendimentos e oferecendo uma visão centralizada do
              histórico básico de saúde do usuário.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-foreground">2. Coleta de dados</h2>
            <p className="mt-1">
              São coletadas apenas informações essenciais para identificação do usuário e uso do
              sistema, como nome, e-mail, telefone e registros de agendamento. Dados sensíveis
              adicionais podem ser incluídos futuramente conforme a necessidade e com o devido
              cuidado com a privacidade.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-foreground">3. Segurança</h2>
            <p className="mt-1">
              O acesso ao sistema é feito mediante login e senha. As senhas são armazenadas de forma
              criptografada e o acesso a rotas internas é protegido por mecanismos de autenticação e
              autorização.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-foreground">4. Uso responsável</h2>
            <p className="mt-1">
              O usuário se compromete a utilizar o HealHub apenas para fins legítimos relacionados a
              sua própria saúde ou, quando aplicável, de dependentes sob sua responsabilidade,
              respeitando a legislação vigente e as orientações da rede de saúde.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-foreground">5. Ambiente acadêmico</h2>
            <p className="mt-1">
              Este sistema foi desenvolvido como parte de um Trabalho de Conclusão de Curso (TCC),
              podendo ser adaptado, ampliado ou integrado a sistemas oficiais de saúde no futuro.
            </p>
          </section>
        </div>
      </section>
    </main>
  );
}
