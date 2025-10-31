import { useQuery, useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import {
  Calendar,
  Clock,
  MapPin,
  User,
  Phone,
  FileText,
  Edit,
  Trash2,
  X,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { useToast } from "@/hooks/use-toast";
import { apiRequest, queryClient } from "@/lib/queryClient";
import type { Appointment, Hospital, Specialty } from "@shared/schema";
import { LoadingState } from "@/components/LoadingState";
import { ErrorState } from "@/components/ErrorState";
import { useAuthRedirect } from "@/hooks/useAuthRedirect";

// Componente principal
export default function MyAppointments() {
  // protege rota: se não logado, redireciona pro /login
  useAuthRedirect();

  const { toast } = useToast();

  // estados de modal e edição
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);

  const [editDate, setEditDate] = useState<Date | undefined>(undefined);
  const [editTime, setEditTime] = useState<string>("");

  // BUSCA PRINCIPAL: agendamentos do usuário
  const {
    data: appointments = [],
    isLoading: isLoadingAppointments,
    isError: isErrorAppointments,
    refetch: refetchAppointments,
  } = useQuery<Appointment[]>({
    queryKey: ["/api/appointments"],
  });

  // dados auxiliares (hospital e especialidade)
  const { data: hospitals = [] } = useQuery<Hospital[]>({
    queryKey: ["/api/hospitals"],
  });

  const { data: specialties = [] } = useQuery<Specialty[]>({
    queryKey: ["/api/specialties"],
  });

  // CANCELAR consulta
  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      await apiRequest("DELETE", `/api/appointments/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/appointments"] });
      toast({
        title: "Agendamento cancelado",
        description: "Seu agendamento foi cancelado com sucesso.",
      });
      setDeleteDialogOpen(false);
      setSelectedAppointment(null);
    },
    onError: () => {
      toast({
        variant: "destructive",
        title: "Erro ao cancelar",
        description:
          "Não foi possível cancelar o agendamento. Tente novamente.",
      });
    },
  });

  // ATUALIZAR data/horário
  const updateMutation = useMutation({
    mutationFn: async ({
      id,
      data,
    }: {
      id: string;
      data: { appointmentDate?: string; appointmentTime?: string };
    }) => {
      return await apiRequest("PUT", `/api/appointments/${id}`, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/appointments"] });
      toast({
        title: "Agendamento atualizado",
        description: "Seu agendamento foi atualizado com sucesso.",
      });
      setEditDialogOpen(false);
      setSelectedAppointment(null);
      setEditDate(undefined);
      setEditTime("");
    },
    onError: () => {
      toast({
        variant: "destructive",
        title: "Erro ao atualizar",
        description:
          "Não foi possível atualizar o agendamento. Tente novamente.",
      });
    },
  });

  // helper: abrir modal de edição
  const openEditDialog = (appointment: Appointment) => {
    setSelectedAppointment(appointment);
    setEditDate(new Date(appointment.appointmentDate));
    setEditTime(appointment.appointmentTime);
    setEditDialogOpen(true);
  };

  // helper: abrir modal de remoção
  const openDeleteDialog = (appointment: Appointment) => {
    setSelectedAppointment(appointment);
    setDeleteDialogOpen(true);
  };

  // confirmar deleção
  const confirmDelete = () => {
    if (selectedAppointment) {
      deleteMutation.mutate(selectedAppointment.id);
    }
  };

  // confirmar alteração
  const confirmEdit = () => {
    if (selectedAppointment && editDate && editTime) {
      updateMutation.mutate({
        id: selectedAppointment.id,
        data: {
          appointmentDate: editDate.toISOString(),
          appointmentTime: editTime,
        },
      });
    }
  };

  // helpers de exibição
  const getHospitalName = (hospitalId: string) => {
    return (
      hospitals.find((h) => h.id === hospitalId)?.name ||
      "Hospital não encontrado"
    );
  };

  const getSpecialtyName = (specialtyId: string) => {
    return (
      specialties.find((s) => s.id === specialtyId)?.name ||
      "Especialidade não encontrada"
    );
  };

  const availableTimes = [
    "08:00",
    "09:00",
    "10:00",
    "11:00",
    "14:00",
    "15:00",
    "16:00",
    "17:00",
  ];

  // ESTADOS DE CARREGAMENTO / ERRO / VAZIO
  if (isLoadingAppointments) {
    return <LoadingState message="Carregando seus agendamentos..." />;
  }

  if (isErrorAppointments) {
    return (
      <ErrorState
        title="Não foi possível carregar seus agendamentos."
        description="Isso pode acontecer se a sua sessão expirou ou se houve um problema na conexão."
        onRetry={() => {
          refetchAppointments();
        }}
      />
    );
  }

  const hasAppointments = appointments.length > 0;

  return (
    <div
      className="min-h-screen py-12 px-4 sm:px-6 lg:px-8"
      data-testid="my-appointments-page"
    >
      <div className="max-w-4xl mx-auto space-y-8">
        <header className="space-y-1">
          <h1 className="text-2xl font-bold tracking-tight">
            Meus agendamentos
          </h1>
          <p className="text-sm text-muted-foreground">
            Visualize, edite ou cancele consultas e exames marcados.
          </p>
        </header>

        {!hasAppointments ? (
          <Card data-testid="empty-state-card">
            <CardHeader>
              <CardTitle className="text-lg font-semibold">
                Nenhum agendamento encontrado
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-sm text-muted-foreground">
                Você ainda não marcou nenhuma consulta ou exame.
              </p>
              <Button
                data-testid="go-to-booking"
                asChild
                className="w-fit"
              >
                <a href="/agendar">Agendar agora</a>
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-6" data-testid="appointments-list">
            {appointments.map((appointment) => {
              const appointmentDate = new Date(appointment.appointmentDate);

              return (
                <Card
                  key={appointment.id}
                  className="shadow-sm"
                  data-testid={`appointment-card-${appointment.id}`}
                >
                  <CardHeader className="flex flex-row items-start justify-between gap-4">
                    <div className="space-y-1">
                      <CardTitle className="text-lg font-semibold">
                        {appointment.serviceType}
                      </CardTitle>
                      <Badge variant="secondary" className="text-[0.7rem]">
                        Código #{appointment.id.slice(0, 8)}
                      </Badge>
                    </div>

                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="icon"
                        aria-label="Editar agendamento"
                        title="Editar agendamento"
                        onClick={() => openEditDialog(appointment)}
                        data-testid={`button-edit-${appointment.id}`}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>

                      <Button
                        variant="destructive"
                        size="icon"
                        aria-label="Cancelar agendamento"
                        title="Cancelar agendamento"
                        onClick={() => openDeleteDialog(appointment)}
                        data-testid={`button-delete-${appointment.id}`}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardHeader>

                  <CardContent>
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-3">
                        <div className="flex items-start gap-3">
                          <MapPin className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                          <div>
                            <p className="text-sm text-muted-foreground">
                              Hospital
                            </p>
                            <p className="text-base font-medium">
                              {getHospitalName(appointment.hospitalId)}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-start gap-3">
                          <FileText className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                          <div>
                            <p className="text-sm text-muted-foreground">
                              Especialidade
                            </p>
                            <p className="text-base font-medium">
                              {getSpecialtyName(appointment.specialtyId)}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-start gap-3">
                          <User className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                          <div>
                            <p className="text-sm text-muted-foreground">
                              Paciente
                            </p>
                            <p className="text-base font-medium">
                              {appointment.patientName}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-start gap-3">
                          <Phone className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                          <div>
                            <p className="text-sm text-muted-foreground">
                              Telefone
                            </p>
                            <p className="text-base font-medium">
                              {appointment.patientPhone}
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <div className="flex items-start gap-3">
                          <Calendar className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                          <div>
                            <p className="text-sm text-muted-foreground">
                              Data
                            </p>
                            <p className="text-base font-medium">
                              {format(
                                appointmentDate,
                                "dd 'de' MMMM 'de' yyyy",
                                { locale: ptBR }
                              )}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-start gap-3">
                          <Clock className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                          <div>
                            <p className="text-sm text-muted-foreground">
                              Horário
                            </p>
                            <p className="text-base font-medium">
                              {appointment.appointmentTime}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </div>

      {/* MODAL: confirmar cancelamento */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent
          className="max-w-md"
          data-testid="dialog-delete-appointment"
        >
          <DialogHeader>
            <DialogTitle>Cancelar agendamento</DialogTitle>
            <DialogDescription className="text-muted-foreground text-sm">
              Esta ação não pode ser desfeita.
              {selectedAppointment && (
                <>
                  <br />
                  Você está cancelando{" "}
                  <strong>{selectedAppointment.serviceType}</strong> em{" "}
                  {format(
                    new Date(selectedAppointment.appointmentDate),
                    "dd/MM/yyyy",
                    { locale: ptBR }
                  )}{" "}
                  às {selectedAppointment.appointmentTime}.
                </>
              )}
            </DialogDescription>
          </DialogHeader>

          <DialogFooter className="flex flex-row justify-end gap-2 sm:space-x-0">
            <Button
              variant="outline"
              onClick={() => setDeleteDialogOpen(false)}
              data-testid="button-cancel-delete"
            >
              Voltar
            </Button>
            <Button
              variant="destructive"
              onClick={confirmDelete}
              disabled={deleteMutation.isPending}
              data-testid="button-confirm-delete"
            >
              {deleteMutation.isPending ? "Cancelando..." : "Confirmar"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* MODAL: editar data/horário */}
      <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
        <DialogContent
          className="max-w-2xl"
          data-testid="dialog-edit-appointment"
        >
          <DialogHeader>
            <DialogTitle>Alterar data/horário</DialogTitle>
            <DialogDescription className="text-muted-foreground text-sm">
              Atualize a data e o horário deste agendamento.
            </DialogDescription>
          </DialogHeader>

          <div className="grid md:grid-cols-2 gap-6 py-4">
            <div className="space-y-2">
              <Label className="text-sm font-medium">Nova data</Label>
              <CalendarComponent
                mode="single"
                selected={editDate}
                onSelect={setEditDate}
                disabled={(date) => date < new Date()}
                initialFocus
              />
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium">Novo horário</Label>
              <Select
                value={editTime}
                onValueChange={(value) => setEditTime(value)}
              >
                <SelectTrigger data-testid="select-time">
                  <SelectValue placeholder="Selecione um horário" />
                </SelectTrigger>
                <SelectContent>
                  {availableTimes.map((time) => (
                    <SelectItem
                      key={time}
                      value={time}
                      data-testid={`time-option-${time}`}
                    >
                      {time}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <div className="space-y-2">
                <Label className="text-sm font-medium">Confirmação</Label>
                <Input
                  disabled
                  value={
                    editDate
                      ? `${format(editDate, "dd/MM/yyyy", {
                          locale: ptBR,
                        })} às ${editTime || "--:--"}`
                      : "Selecione data e horário"
                  }
                  data-testid="edit-summary"
                />
              </div>
            </div>
          </div>

          <DialogFooter className="flex flex-row justify-end gap-2 sm:space-x-0">
            <Button
              variant="outline"
              onClick={() => setEditDialogOpen(false)}
              data-testid="button-cancel-edit"
            >
              <X className="mr-2 h-4 w-4" />
              Cancelar
            </Button>
            <Button
              onClick={confirmEdit}
              disabled={
                !editDate || !editTime || updateMutation.isPending
              }
              data-testid="button-confirm-edit"
            >
              {updateMutation.isPending ? "Salvando..." : "Salvar Alterações"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
