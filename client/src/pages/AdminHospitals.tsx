import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Plus, Trash2, MapPin, Phone, Hospital } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { useAuthRedirect } from "@/hooks/useAuthRedirect";
import { apiRequest } from "@/lib/queryClient";
import { LoadingState } from "@/components/LoadingState";
import { ErrorState } from "@/components/ErrorState";

type HospitalRecord = {
  id: string;
  name: string;
  address: string;
  phone?: string;
};

export default function AdminHospitals() {
  // 1. Garante que só admin acesse (se não for admin, a rota da API vai falhar
  // e depois podemos evoluir pra checar me.role === 'admin').
  const me = useAuthRedirect();

  const queryClient = useQueryClient();
  const { toast } = useToast();

  // modal aberto?
  const [open, setOpen] = useState(false);

  // formulário de novo hospital
  const [newHospital, setNewHospital] = useState({
    name: "",
    address: "",
    phone: "",
  });

  // =============================
  // LISTAR HOSPITAIS (GET /api/hospitals)
  // =============================
  const {
    data: hospitals,
    isLoading,
    isError,
    refetch,
  } = useQuery<HospitalRecord[]>({
    queryKey: ["/api/hospitals"],
    queryFn: async () => {
      const res = await apiRequest("GET", "/api/hospitals");
      return res.json();
    },
    staleTime: 0,
  });

  // =============================
  // CRIAR HOSPITAL (POST /api/hospitals)
  // =============================
  const createHospitalMutation = useMutation({
    mutationFn: async () => {
      const payload = {
        name: newHospital.name,
        address: newHospital.address,
        phone: newHospital.phone,
      };
      const res = await apiRequest("POST", "/api/hospitals", payload);
      return res.json();
    },
    onSuccess: () => {
      toast({
        title: "Hospital criado",
        description: "O hospital foi adicionado com sucesso.",
      });
      setOpen(false);
      setNewHospital({ name: "", address: "", phone: "" });
      queryClient.invalidateQueries({ queryKey: ["/api/hospitals"] });
    },
    onError: async (err: any) => {
      console.error(err);
      toast({
        variant: "destructive",
        title: "Erro ao criar hospital",
        description:
          "Você precisa ser administrador ou os dados estão incompletos.",
      });
    },
  });

  // =============================
  // EXCLUIR HOSPITAL (DELETE /api/hospitals/:id)
  // =============================
  const deleteHospitalMutation = useMutation({
    mutationFn: async (id: string) => {
      await apiRequest("DELETE", `/api/hospitals/${id}`);
    },
    onSuccess: () => {
      toast({
        title: "Hospital removido",
        description: "O hospital foi excluído do sistema.",
      });
      queryClient.invalidateQueries({ queryKey: ["/api/hospitals"] });
    },
    onError: () => {
      toast({
        variant: "destructive",
        title: "Erro ao excluir hospital",
        description:
          "Você precisa ser administrador para excluir hospitais.",
      });
    },
  });

  function handleOpenModal() {
    setOpen(true);
  }

  function handleCloseModal() {
    setOpen(false);
    setNewHospital({ name: "", address: "", phone: "" });
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    createHospitalMutation.mutate();
  }

  function handleDeleteHospital(h: HospitalRecord) {
    const ok = window.confirm(
      `Tem certeza que deseja remover o hospital "${h.name}"?`
    );
    if (ok) {
      deleteHospitalMutation.mutate(h.id);
    }
  }

  // estados de carregamento/erro
  if (isLoading) {
    return (
      <LoadingState message="Carregando hospitais cadastrados..." />
    );
  }

  if (isError) {
    return (
      <ErrorState
        title="Não foi possível carregar os hospitais."
        description="Isso pode acontecer se sua sessão expirou ou se você não tem permissão de administrador."
        onRetry={() => refetch()}
      />
    );
  }

  return (
    <div className="min-h-screen px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl space-y-8">
        {/* Cabeçalho */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">
              Administração de Hospitais
            </h1>
            <p className="text-sm text-muted-foreground max-w-md leading-relaxed">
              Aqui você cadastra e remove hospitais disponíveis para
              agendamento. Apenas administradores têm acesso.
            </p>
          </div>

          <Button
            className="h-12 px-4 text-base font-semibold"
            onClick={handleOpenModal}
            data-testid="button-new-hospital"
          >
            <Plus className="mr-2 h-4 w-4" />
            Novo Hospital
          </Button>
        </div>

        {/* Lista de hospitais */}
        {(!hospitals || hospitals.length === 0) ? (
          <p className="text-muted-foreground text-lg leading-relaxed">
            Nenhum hospital cadastrado.
            <br />
            Clique em{" "}
            <span className="font-semibold">"Novo Hospital"</span> para
            adicionar o primeiro.
          </p>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {hospitals.map((h) => (
              <div
                key={h.id}
                className="p-6 rounded-xl border bg-card hover-elevate transition-shadow flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Hospital className="h-5 w-5 text-primary shrink-0" />
                    <h2 className="text-lg font-semibold leading-tight">
                      {h.name}
                    </h2>
                  </div>

                  <div className="text-sm text-muted-foreground leading-relaxed space-y-1">
                    <div className="flex items-start gap-2">
                      <MapPin className="h-4 w-4 shrink-0 mt-[2px]" />
                      <span>{h.address}</span>
                    </div>

                    {h.phone ? (
                      <div className="flex items-start gap-2">
                        <Phone className="h-4 w-4 shrink-0 mt-[2px]" />
                        <span>{h.phone}</span>
                      </div>
                    ) : null}
                  </div>
                </div>

                <div className="flex gap-2 mt-4">
                  <Button
                    variant="destructive"
                    size="sm"
                    className="flex-1"
                    onClick={() => handleDeleteHospital(h)}
                    data-testid={`button-delete-hospital-${h.id}`}
                  >
                    <Trash2 className="h-4 w-4 mr-1" />
                    Excluir
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modal Novo Hospital */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-lg font-semibold">
              Cadastrar novo hospital
            </DialogTitle>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid gap-2">
              <Label
                htmlFor="name"
                className="text-sm font-medium leading-none"
              >
                Nome do hospital
              </Label>
              <Input
                id="name"
                value={newHospital.name}
                onChange={(e) =>
                  setNewHospital((prev) => ({
                    ...prev,
                    name: e.target.value,
                  }))
                }
                required
                placeholder="Hospital Municipal São Caetano"
                data-testid="input-hospital-name"
              />
            </div>

            <div className="grid gap-2">
              <Label
                htmlFor="address"
                className="text-sm font-medium leading-none"
              >
                Endereço
              </Label>
              <Input
                id="address"
                value={newHospital.address}
                onChange={(e) =>
                  setNewHospital((prev) => ({
                    ...prev,
                    address: e.target.value,
                  }))
                }
                required
                placeholder="Rua da Saúde, 123 - Centro"
                data-testid="input-hospital-address"
              />
            </div>

            <div className="grid gap-2">
              <Label
                htmlFor="phone"
                className="text-sm font-medium leading-none"
              >
                Telefone (opcional)
              </Label>
              <Input
                id="phone"
                value={newHospital.phone}
                onChange={(e) =>
                  setNewHospital((prev) => ({
                    ...prev,
                    phone: e.target.value,
                  }))
                }
                placeholder="(11) 4002-8922"
                data-testid="input-hospital-phone"
              />
            </div>

            <DialogFooter className="flex gap-2 sm:gap-3">
              <Button
                type="button"
                variant="outline"
                className="flex-1 sm:flex-none"
                onClick={handleCloseModal}
                data-testid="button-cancel-hospital"
              >
                Cancelar
              </Button>

              <Button
                type="submit"
                className="flex-1 sm:flex-none"
                disabled={createHospitalMutation.isPending}
                data-testid="button-save-hospital"
              >
                Salvar hospital
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
