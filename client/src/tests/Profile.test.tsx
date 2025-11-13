// client/src/tests/Profile.test.tsx
import React from "react";
import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import Profile from "@/pages/Profile";

// Evita redirecionamento / chamadas de auth durante o teste
vi.mock("@/hooks/useAuthRedirect", () => ({
  useAuthRedirect: () => {},
}));

// Mock de react-query adequado também para o uso de queryClient.ts
vi.mock("@tanstack/react-query", () => {
  const useQuery = vi.fn(() => ({
    data: {
      id: "1",
      name: "Usuário de Teste",
      email: "teste@example.com",
      phone: "11999999999",
      birthDate: null,
      gender: null,
      bloodType: null,
      emergencyContactName: null,
      emergencyContactPhone: null,
      healthPlan: null,
      allergies: null,
      chronicDiseases: null,
      medications: null,
      vaccinationStatus: null,
    },
    isLoading: false,
    isError: false,
  }));

  const useMutation = vi.fn(() => ({
    mutateAsync: vi.fn(),
    isPending: false,
  }));

  const useQueryClient = vi.fn(() => ({
    invalidateQueries: vi.fn(),
  }));

  class QueryClient {}

  const QueryClientProvider = ({
    children,
  }: {
    children: React.ReactNode;
  }) => <>{children}</>;

  return {
    __esModule: true,
    QueryClient,
    QueryClientProvider,
    useQuery,
    useMutation,
    useQueryClient,
  };
});

describe("Profile page", () => {
  it("renderiza campos básicos do perfil", () => {
    render(<Profile />);

    expect(screen.getByTestId("profile-page")).toBeInTheDocument();
    expect(screen.getByTestId("profile-card")).toBeInTheDocument();
    expect(screen.getByTestId("input-name")).toBeInTheDocument();
    expect(screen.getByTestId("input-email")).toBeInTheDocument();
    expect(screen.getByTestId("input-phone")).toBeInTheDocument();
    expect(
      screen.getByTestId("button-save-profile")
    ).toBeInTheDocument();
    expect(
      screen.getByTestId("button-logout")
    ).toBeInTheDocument();
  });
});
