import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import Login from "@/pages/Login";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ToastProvider } from "@/hooks/use-toast";

// mock wouter navigation
vi.mock("wouter", () => {
  return {
    Link: ({ href, children, ...rest }: any) => (
      <a href={href} {...rest}>
        {children}
      </a>
    ),
    useLocation: () => ["/login", vi.fn()],
  };
});

// mock apiRequest pra não chamar backend real
vi.mock("@/lib/queryClient", async () => {
  const actual = await vi.importActual<any>("@/lib/queryClient");
  return {
    ...actual,
    apiRequest: vi.fn().mockResolvedValue({
      json: () =>
        Promise.resolve({
          id: "user-123",
          name: "Usuário Teste",
          email: "teste@example.com",
        }),
    }),
  };
});

// mock de toast provider: cria stub bem simples
function Wrapper({ children }: { children: React.ReactNode }) {
  const client = new QueryClient();
  return (
    <QueryClientProvider client={client}>
      {/* o hook useToast depende de um ToastProvider.
         se você implementou diferente, ajuste aqui */}
      <ToastProvider>{children}</ToastProvider>
    </QueryClientProvider>
  );
}

describe("Login page", () => {
  it("renderiza campos e botões básicos", () => {
    render(<Login />, { wrapper: Wrapper });

    expect(screen.getByTestId("input-email")).toBeInTheDocument();
    expect(screen.getByTestId("input-password")).toBeInTheDocument();
    expect(screen.getByTestId("button-submit")).toBeInTheDocument();
    expect(screen.getByTestId("link-forgot-password")).toBeInTheDocument();
    expect(screen.getByTestId("link-create-account")).toBeInTheDocument();

    // título
    expect(
      screen.getByText(/Entrar no SUS Para Todos/i)
    ).toBeInTheDocument();
  });
});
