import { useEffect } from "react";
import { useLocation } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";

type MeResponse =
  | { id: string; name: string; email: string; phone?: string }
  | { error: string };

export function useAuthRedirect() {
  const [, setLocation] = useLocation();

  const { data, error } = useQuery<MeResponse>({
    queryKey: ["/api/auth/me"],
    queryFn: async () => {
      const res = await apiRequest("GET", "/api/auth/me");
      // se não estiver logado, backend devolve 401 e apiRequest já lança erro
      return res.json();
    },
    retry: false,
    staleTime: 0,
  });

  useEffect(() => {
    // se a request falhou (provável 401), manda pro login
    if (error) {
      setLocation("/login");
    }
  }, [error, setLocation]);

  return data && "id" in data ? data : null;
}
