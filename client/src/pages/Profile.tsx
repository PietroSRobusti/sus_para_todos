import { useState } from "react";
import { useAuthRedirect } from "@/hooks/useAuthRedirect";
import { useQuery, useMutation } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { LoadingState } from "@/components/LoadingState";
import { ErrorState } from "@/components/ErrorState";

type MeResponse = {
  id: string;
  name: string;
  email: string;
  phone?: string;
  // se você tiver mais campos como tipo sanguíneo, plano de saúde, vacinação etc.,
  // pode adicionar aqui e exibir abaixo
};

export default function Profile() {
  // protege rota + também já nos dá o usuário logado rapidamente
  const meQuick = useAuthRedirect();

  const { toast } = useToast();

  // busca dados mais frescos do backend
  const {
    data: me,
    isLoading,
    isError,
    refetch,
  } = useQuery<MeResponse>({
    queryKey: ["/api/auth/me"],
    queryFn: async () => {
      const res = await apiRequest("GET", "/api/auth/profile");
      return res.json();
    },
    // já temos meQuick como fallback visual imediato
    initialData: meQuick ?? undefined,
    staleTime: 0,
  });

  // estados editáveis
  const [phoneDraft, setPhoneDraft] = useState(me?.phone ?? "");
  const [saving, setSaving] = useState(false);

  // mutação de atualização de perfil
  const updateProfileMutation = useMutation({
    mutationFn: async () => {
      setSaving(true);
      const res = await apiRequest("PUT", "/api/auth/profile", {
        phone: phoneDraft,
      });
      return res.json();
    },
    onSuccess: (updated) => {
      queryClient.invalidateQueries({ queryKey: ["/api/auth/me"] });
      toast({
        title: "Perfil atualizado",
        description: "Suas informações foram salvas com sucesso.",
      });
      // atualiza cache visual
      setSaving(false);
    },
    onError: () => {
      toast({
        variant: "destructive",
        title: "Erro ao salvar",
        description:
          "Não foi possível atualizar seus dados. Tente novamente.",
      });
      setSaving(false);
    },
  });

  // estados de carregamento/erro
  if (isLoading && !me) {
    return (
      <LoadingState message="Carregando seu perfil..." />
    );
  }

  if (isError && !me) {
    return (
      <ErrorState
        title="Não foi possível carregar seu perfil."
        description="Pode ser um problema de sessão expirada ou de conexão."
        onRetry={() => refetch()}
      />
    );
  }

  return (
    <div
      className="min-h-screen py-12 px-4 sm:px-6 lg:px-8"
      data-testid="profile-page"
    >
      <div className="max-w-xl mx-auto space-y-8">
        <header className="space-y-1 text-center">
          <h1 className="text-2xl font-bold tracking-tight">
            Meu Perfil
          </h1>
          <p className="text-sm text-muted-foreground max-w-md mx-auto">
            Suas informações pessoais e de contato
          </p>
        </header>

        <Card data-testid="profile-card">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">
              Dados pessoais
            </CardTitle>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Nome */}
            <div className="space-y-2">
              <Label className="text-sm font-medium">Nome completo</Label>
              <Input
                data-testid="input-name"
                value={me?.name ?? ""}
                disabled
              />
              <p className="text-[0.8rem] text-muted-foreground leading-relaxed">
                Nome cadastrado na sua conta.
              </p>
            </div>

            {/* Email */}
            <div className="space-y-2">
              <Label className="text-sm font-medium">E-mail</Label>
              <Input
                data-testid="input-email"
                value={me?.email ?? ""}
                disabled
              />
              <p className="text-[0.8rem] text-muted-foreground leading-relaxed">
                Seu e-mail também é usado no login.
              </p>
            </div>

            {/* Telefone editável */}
            <div className="space-y-2">
              <Label className="text-sm font-medium">
                Telefone de contato
              </Label>
              <Input
                data-testid="input-phone"
                value={phoneDraft}
                onChange={(e) => setPhoneDraft(e.target.value)}
                placeholder="(11) 99999-0000"
              />
              <p className="text-[0.8rem] text-muted-foreground leading-relaxed">
                Esse telefone é usado para contato das unidades de saúde
                em caso de reagendamento.
              </p>
            </div>

            {/* Campos extras futuros */}
            {/* 
            <div className="space-y-2">
              <Label className="text-sm font-medium">Tipo sanguíneo</Label>
              <Input disabled value={me?.bloodType ?? ""} />
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium">Plano de saúde</Label>
              <Input disabled value={me?.healthPlan ?? ""} />
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium">Vacinação</Label>
              <Input disabled value={me?.vaccinationStatus ?? ""} />
            </div>
            */}

            {/* Botão salvar */}
            <Button
              className="w-full h-12 text-base font-semibold"
              onClick={() => updateProfileMutation.mutate()}
              disabled={saving}
              data-testid="button-save-profile"
            >
              {saving ? "Salvando..." : "Salvar alterações"}
            </Button>

            <p className="text-[0.8rem] text-muted-foreground text-center leading-relaxed">
              Você pode atualizar seu telefone de contato a qualquer
              momento.
            </p>
          </CardContent>
        </Card>

        {/* Sessão de segurança / sair da conta */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold">
              Segurança
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground leading-relaxed">
              Se você estiver usando um computador público, lembre-se de
              finalizar sua sessão.
            </p>
            <form
              action="/api/auth/logout"
              method="post"
              data-testid="logout-form"
            >
              <Button
                type="submit"
                variant="outline"
                className="w-full h-11 text-base font-semibold"
                data-testid="button-logout"
              >
                Sair da conta
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
