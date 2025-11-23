import React, { useState } from "react";

export default function FeedbackPage() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    type: "sugestao",
    message: "",
  });
  const [sent, setSent] = useState(false);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // Aqui poderia chamar uma API futuramente.
    console.log("Feedback enviado (simulação):", formState);
    setSent(true);
    setFormState({
      name: "",
      email: "",
      type: "sugestao",
      message: "",
    });
  }

  return (
    <main className="min-h-screen bg-background text-foreground">
      <section className="mx-auto flex max-w-2xl flex-col gap-6 px-4 py-10">
        <header>
          <h1 className="text-3xl font-bold tracking-tight">Feedback e Contato</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Envie sugestões, elogios ou relatos de problema sobre o uso do HealHub.
          </p>
        </header>

        <form
          onSubmit={handleSubmit}
          className="space-y-4 rounded-xl border border-border bg-card p-4 shadow-sm"
        >
          <div className="grid gap-4 md:grid-cols-2">
            <div className="flex flex-col gap-1">
              <label htmlFor="name" className="text-xs font-semibold">
                Nome
              </label>
              <input
                id="name"
                name="name"
                className="h-9 rounded-md border border-border bg-background px-2 text-sm"
                value={formState.name}
                onChange={handleChange}
                placeholder="Digite seu nome"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="email" className="text-xs font-semibold">
                E-mail
              </label>
              <input
                id="email"
                name="email"
                type="email"
                className="h-9 rounded-md border border-border bg-background px-2 text-sm"
                value={formState.email}
                onChange={handleChange}
                placeholder="seuemail@exemplo.com"
              />
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="type" className="text-xs font-semibold">
              Tipo de feedback
            </label>
            <select
              id="type"
              name="type"
              className="h-9 rounded-md border border-border bg-background px-2 text-sm"
              value={formState.type}
              onChange={handleChange}
            >
              <option value="sugestao">Sugestão</option>
              <option value="elogio">Elogio</option>
              <option value="problema">Relato de problema</option>
              <option value="outro">Outro</option>
            </select>
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="message" className="text-xs font-semibold">
              Mensagem
            </label>
            <textarea
              id="message"
              name="message"
              className="min-h-[120px] rounded-md border border-border bg-background px-2 py-1 text-sm"
              value={formState.message}
              onChange={handleChange}
              placeholder="Descreva sua sugestão, dúvida ou problema com o máximo de detalhes possível."
            />
          </div>

          <button
            type="submit"
            className="inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground transition hover:brightness-110"
          >
            Enviar feedback
          </button>

          {sent && (
            <p className="text-xs text-emerald-600">
              Obrigado! Seu feedback foi registrado (simulação).
            </p>
          )}
        </form>
      </section>
    </main>
  );
}
