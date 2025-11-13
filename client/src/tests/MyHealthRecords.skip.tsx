// client/src/tests/MyHealthRecords.test.tsx
import React from "react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import MyHealthRecords from "@/pages/MyHealthRecords";
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

describe("MyHealthRecords page", () => {
  const apiRequestMock = vi.spyOn(apiModule, "apiRequest");

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renderiza título e botão de novo registro", async () => {
    // Simula API retornando lista vazia de registros
    apiRequestMock.mockResolvedValueOnce({
      ok: true,
      json: async () => [],
    } as any);

    renderWithClient(<MyHealthRecords />);

    // Espera carregar os dados e a tela principal aparecer
    await waitFor(() => {
      expect(
        screen.getByText(/Meus Registros de Saúde/i)
      ).toBeInTheDocument();

      expect(
        screen.getByTestId("button-new-record")
      ).toBeInTheDocument();
    });
  });
});
