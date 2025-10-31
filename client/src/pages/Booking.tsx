import { useState } from "react";
import { useAuthRedirect } from "@/hooks/useAuthRedirect";
import { useQuery, useMutation } from "@tanstack/react-query";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { useToast } from "@/hooks/use-toast";
import { apiRequest, queryClient } from "@/lib/queryClient";

import type {
  Hospital,
  Specialty,
  InsertAppointment,
} from "@shared/schema";

import { Calendar, Clock } from "lucide-react";
import { LoadingState } from "@/components/LoadingState";
import { ErrorState } from "@/components/ErrorState";

export default function Booking() {
  // protege rota
  const me = useAuthRedirect();

  // estados locais do formulário
  const [serviceType, setServiceType] = useState<"Consulta" | "Exame">(
    "Consulta"
  );
  const [hospitalId, setHospitalId] = useState("");
  const [specialtyId, setSpecialtyId] = useState("");
  const [patientName, setPatientName] = useState(me?.name ?? "");
  const [patientCPF, setPatientCPF] = useState("");
  const [patientBirth, setPatientBirth] = useState("");
  const [patientPhone, setPatientPhone] = useState(me?.phone ?? "");
  const [appointmentDate, setAppointmentDate] = useState<Date | undefined>(
    undefined
  );
  const [appointmentTime, setAppointmentTime] = useState("");

  const { toast } = useToast();

  // buscar hospitais e especialidades
  const {
    data: hospitals = [],
    isLoading: isLoadingHospitals,
    isError: isErrorHospitals,
    refetch: refetchHospitals,
  } = useQuery<Hospital[]>({
    queryKey: ["/api/hospitals"],
  });

  const {
    data: specialties = [],
    isLoading: isLoadingSpecialties,
    isError: isErrorSpecialties,
    refetch: refetchSpecialties,
  } = useQuery<Specialty[]>({
    queryKey: ["/api/specialties"],
  });

  // criar agendamento
  const createAppointment = useMutation({
    mutationFn: async () => {
      if (!appointmentDate) {
        throw new Error("Selecione uma data");
      }
      const body: Partial<InsertAppointment> = {
        serviceType,
        hospitalId,
        specialtyId,
        patientName,
        patientCPF,
        patientBirth,
        patientPhone,
        appointmentDate: appointmentDate.toISOString(),
        appointmentTime,
      };

      // POST no backend
      const res = await apiRequest("POST", "/api/appointments", body);
      return res.json();
    },
    onSuccess: () => {
      // limpa form
      setHospitalId("");
      setSpecialtyId("");
      setPatientName(me?.name ?? "");
      setPatientCPF("");
      setPatientBirth("");
      setPatientPhone(me?.phone ?? "");
      setAppointmentDate(undefined);
      setAppointmentTime("");

      // invalida cache da lista de agendamentos
      queryClient.invalidateQueries({ queryKey: ["/api/appointments"] });

      toast({
        title: "Agendamento criado!",
        description: "Sua consulta/exame foi agendada com sucesso.",
      });
    },
    onError: (err: any) => {
      toast({
        variant: "destructive",
        title: "Erro ao agendar",
        description:
          err?.message ||
          "Não foi possível concluir o agendamento. Tente novamente.",
      });
    },
  });

  // validação rápida de botão habilitado
  const formReady =
    serviceType &&
    hospitalId &&
    specialtyId &&
    patientName &&
    patientCPF &&
    patientBirth &&
    patientPhone &&
    appointmentDate &&
    appointmentTime;

  // estados de carregamento/erro globais (carregar opções mínimas)
  if (isLoadingHospitals || isLoadingSpecialties) {
    return (
      <LoadingState message="Carregando disponibilidade de unidades e especialidades..." />
    );
  }

  if (isErrorHospitals || isErrorSpecialties) {
    return (
      <ErrorState
        title="Não foi possível carregar os dados necessários."
        description="Falha ao carregar hospitais e especialidades. Tente novamente."
        onRetry={() => {
          refetchHospitals();
          refetchSpecialties();
        }}
      />
    );
  }

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

  return (
    <div
      className="min-h-screen py-12 px-4 sm:px-6 lg:px-8"
      data-testid="booking-page"
    >
      <div className="max-w-4xl mx-auto space-y-8">
        <header className="space-y-1 text-center">
          <h1 className="text-2xl font-bold tracking-tight">
            Agendar consulta ou exame
          </h1>
          <p className="text-sm text-muted-foreground max-w-xl mx-auto">
            Escolha a especialidade, o local e o melhor horário para você
          </p>
        </header>

        <Card data-testid="booking-card">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">
              Informações do agendamento
            </CardTitle>
          </CardHeader>

          <CardContent className="grid gap-8 md:grid-cols-2">
            {/* Coluna esquerda */}
            <div className="space-y-6">
              {/* Tipo de serviço */}
              <div className="space-y-2">
                <Label className="text-sm font-medium">
                  Tipo de atendimento
                </Label>
                <Select
                  value={serviceType}
                  onValueChange={(v: "Consulta" | "Exame") =>
                    setServiceType(v)
                  }
                >
                  <SelectTrigger data-testid="select-service-type">
                    <SelectValue placeholder="Selecione o tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Consulta">Consulta</SelectItem>
                    <SelectItem value="Exame">Exame</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Hospital */}
              <div className="space-y-2">
                <Label className="text-sm font-medium">
                  Hospital / Unidade
                </Label>
                <Select
                  value={hospitalId}
                  onValueChange={setHospitalId}
                >
                  <SelectTrigger data-testid="select-hospital">
                    <SelectValue placeholder="Selecione o hospital" />
                  </SelectTrigger>
                  <SelectContent>
                    {hospitals.map((h) => (
                      <SelectItem key={h.id} value={h.id}>
                        {h.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Especialidade */}
              <div className="space-y-2">
                <Label className="text-sm font-medium">
                  Especialidade
                </Label>
                <Select
                  value={specialtyId}
                  onValueChange={setSpecialtyId}
                >
                  <SelectTrigger data-testid="select-specialty">
                    <SelectValue placeholder="Selecione a especialidade" />
                  </SelectTrigger>
                  <SelectContent>
                    {specialties.map((s) => (
                      <SelectItem key={s.id} value={s.id}>
                        {s.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Paciente */}
              <div className="space-y-2">
                <Label className="text-sm font-medium">
                  Nome do paciente
                </Label>
                <Input
                  data-testid="input-patient-name"
                  value={patientName}
                  onChange={(e) => setPatientName(e.target.value)}
                  placeholder="Nome completo"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium">CPF</Label>
                <Input
                  data-testid="input-patient-cpf"
                  value={patientCPF}
                  onChange={(e) => setPatientCPF(e.target.value)}
                  placeholder="000.000.000-00"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium">
                  Data de nascimento
                </Label>
                <Input
                  data-testid="input-patient-birth"
                  value={patientBirth}
                  onChange={(e) => setPatientBirth(e.target.value)}
                  placeholder="dd/mm/aaaa"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium">
                  Telefone de contato
                </Label>
                <Input
                  data-testid="input-patient-phone"
                  value={patientPhone}
                  onChange={(e) => setPatientPhone(e.target.value)}
                  placeholder="(11) 99999-0000"
                />
              </div>
            </div>

            {/* Coluna direita */}
            <div className="space-y-6">
              {/* Calendário / data */}
              <div className="space-y-2">
                <Label className="text-sm font-medium">Data</Label>
                <div className="rounded-md border p-3 flex flex-col gap-2">
                  <div className="flex items-center gap-2 text-sm font-medium">
                    <Calendar className="h-4 w-4 text-primary" />
                    <span>
                      {appointmentDate
                        ? format(appointmentDate, "dd 'de' MMMM 'de' yyyy", {
                            locale: ptBR,
                          })
                        : "Selecione uma data"}
                    </span>
                  </div>

                  <CalendarComponent
                    mode="single"
                    selected={appointmentDate}
                    onSelect={setAppointmentDate}
                    disabled={(date) => date < new Date()}
                    initialFocus
                  />
                </div>
              </div>

              {/* Horário */}
              <div className="space-y-2">
                <Label className="text-sm font-medium">Horário</Label>
                <div className="rounded-md border p-3 flex flex-col gap-2">
                  <div className="flex items-center gap-2 text-sm font-medium">
                    <Clock className="h-4 w-4 text-primary" />
                    <span>
                      {appointmentTime || "Selecione um horário"}
                    </span>
                  </div>

                  <Select
                    value={appointmentTime}
                    onValueChange={setAppointmentTime}
                  >
                    <SelectTrigger data-testid="select-time">
                      <SelectValue placeholder="Escolher horário" />
                    </SelectTrigger>
                    <SelectContent>
                      {availableTimes.map((t) => (
                        <SelectItem key={t} value={t}>
                          {t}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Resumo visual */}
              <div className="space-y-2">
                <Label className="text-sm font-medium">
                  Confirmação
                </Label>
                <Input
                  disabled
                  data-testid="booking-summary"
                  value={
                    appointmentDate && appointmentTime
                      ? `${format(appointmentDate, "dd/MM/yyyy", {
                          locale: ptBR,
                        })} às ${appointmentTime}`
                      : "Selecione data e horário"
                  }
                />
              </div>

              {/* Botão de envio */}
              <Button
                className="w-full h-12 text-base font-semibold"
                onClick={() => createAppointment.mutate()}
                disabled={!formReady || createAppointment.isPending}
                data-testid="button-confirm-booking"
              >
                {createAppointment.isPending
                  ? "Agendando..."
                  : "Confirmar Agendamento"}
              </Button>

              <p className="text-[0.8rem] text-muted-foreground text-center leading-relaxed">
                Você poderá visualizar, reagendar ou cancelar este
                atendimento na tela{" "}
                <span className="font-medium">Meus Agendamentos</span>.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
