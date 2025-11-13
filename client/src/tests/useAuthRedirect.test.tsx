// client/src/tests/useAuthRedirect.test.tsx
import React from "react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderHook, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useAuthRedirect } from "@/hooks/useAuthRedirect";
import * as apiModule from "@/lib/queryClient";

// mock do useLocation do wouter
const pushMock = vi.fn();

vi.mock("wouter", () => ({
  useLocation: () => ["/home", pushMock] as any,
}));

function wrapper({ children }: { children: React.ReactNode }) {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}

describe("useAuthRedirect", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("mantém usuário na página se /api/auth/me retorna 200", async () => {
    const apiRequestMock = vi
      .spyOn(apiModule, "apiRequest")
      .mockResolvedValueOnce({
        ok: true,
        status: 200,
        json: async () => ({ id: "user-1", name: "Usuário Teste" }),
      } as any);

    renderHook(() => useAuthRedirect(), { wrapper });

    // garante que a requisição foi chamada
    await waitFor(() => {
      expect(apiRequestMock).toHaveBeenCalledTimes(1);
    });

    // não deve redirecionar
    expect(pushMock).not.toHaveBeenCalled();
  });

  it("redireciona para /login se /api/auth/me dispara erro (ex.: 401)", async () => {
    vi.spyOn(apiModule, "apiRequest").mockRejectedValueOnce(
      Object.assign(new Error("Unauthorized"), { status: 401 })
    );

    renderHook(() => useAuthRedirect(), { wrapper });

    await waitFor(() => {
      expect(pushMock).toHaveBeenCalledWith("/login");
    });
  });
});
