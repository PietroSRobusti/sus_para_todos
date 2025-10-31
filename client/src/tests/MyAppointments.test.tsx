import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import MyAppointments from "@/pages/MyAppointments";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// mock do hook de auth pra não redirecionar no teste
vi.mock("@/hooks/useAuthRedirect", () => ({
  useAuthRedirect: () => ({ id: "user-123", name: "Giulia", email: "g@g.com" }),
}));

// mock apiRequest indireto via react-query: vamos mockar useQuery manualmente
// ATENÇÃO: aqui vamos mockar tanstack/useQuery dentro do componente.
// Estratégia: espiona @tanstack/react-query e sobrescreve useQuery só neste teste.
vi.mock("@tanstack/react-query", async () => {
  const actual = await vi.importActual<any>("@tanstack/react-query");
  return {
    ...actual,
    useQuery: vi.fn().mockImplementation(({ queryKey }: any) => {
      // simulando cada query separada pelo queryKey:
      if (queryKey[0] === "/api/appointments") {
        return {
          data: [],
          isLoading: false,
          isError: false,
          refetch: vi.fn(),
        };
      }
      // /api/hospitals e /api/specialties
      return {
        data: [],
        isLoading: false,
        isError: false,
        refetch: vi.fn(),
      };
    }),
  };
});

// Wrapper padrão de QueryClient
function Wrapper({ children }: { children: React.ReactNode }) {
  const client = new QueryClient();
  return <QueryClientProvider client={client}>{children}</QueryClientProvider>;
}

describe("MyAppointments page", () => {
  it("mostra estado vazio quando não há agendamentos", () => {
    render(<MyAppointments />, { wrapper: Wrapper });

    expect(
      screen.getByText(/Meus agendamentos/i)
    ).toBeInTheDocument();

    expect(
      screen.getByTestId("empty-state-card")
    ).toBeInTheDocument();

    expect(
      screen.getByText(/Nenhum agendamento encontrado/i)
    ).toBeInTheDocument();
  });
});
