// client/src/tests/Login.test.tsx
import React from "react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Login from "@/pages/Login";
import * as apiModule from "@/lib/queryClient";

function renderWithClient(ui: React.ReactElement) {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

  return render(
    <QueryClientProvider client={queryClient}>{ui}</QueryClientProvider>
  );
}

describe("Login page", () => {
  const apiRequestMock = vi.spyOn(apiModule, "apiRequest");

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renderiza campos e botões básicos", () => {
    renderWithClient(<Login />);

    // título da tela
    expect(
      screen.getByText(/Entrar no SUS Para Todos/i)
    ).toBeInTheDocument();

    // inputs e botões principais
    expect(screen.getByTestId("input-email")).toBeInTheDocument();
    expect(screen.getByTestId("input-password")).toBeInTheDocument();
    expect(screen.getByTestId("button-submit")).toBeInTheDocument();
    expect(screen.getByTestId("link-forgot-password")).toBeInTheDocument();
    expect(screen.getByTestId("link-create-account")).toBeInTheDocument();
  });

  it("chama API de login quando o formulário é enviado", async () => {
    apiRequestMock.mockResolvedValueOnce({
      ok: false,
      status: 401,
      json: async () => ({ message: "Credenciais inválidas" }),
    } as any);

    renderWithClient(<Login />);

    fireEvent.change(screen.getByTestId("input-email"), {
      target: { value: "teste@example.com" },
    });

    fireEvent.change(screen.getByTestId("input-password"), {
      target: { value: "senha-errada" },
    });

    fireEvent.click(screen.getByTestId("button-submit"));

    await waitFor(() => {
      expect(apiRequestMock).toHaveBeenCalledWith(
        "POST",
        "/api/auth/login",
        expect.objectContaining({
          email: "teste@example.com",
          password: "senha-errada",
        })
      );
    });
  });
});
