import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UserPlus, CheckCircle2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

const registerSchema = z.object({
  name: z.string().min(1, "Nome é obrigatório"),
  email: z.string().email("Email inválido"),
  password: z
    .string()
    .min(8, "A senha deve ter no mínimo 8 caracteres")
    .regex(/[a-z]/, "A senha deve conter pelo menos uma letra minúscula")
    .regex(/[A-Z]/, "A senha deve conter pelo menos uma letra maiúscula")
    .regex(/[0-9]/, "A senha deve conter pelo menos um número"),
  confirmPassword: z.string(),
}).refine(data => data.password === data.confirmPassword, {
  message: "As senhas não coincidem",
  path: ["confirmPassword"],
});

type RegisterFormData = z.infer<typeof registerSchema>;

export default function CreateAccount() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();

  const form = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const registerMutation = useMutation({
    mutationFn: async (data: RegisterFormData) => {
      return await apiRequest("POST", "/api/auth/register", data);
    },
    onSuccess: () => {
      toast({
        title: "Conta criada com sucesso!",
        description: "Você já está logado e pode começar a usar o sistema.",
      });
      setLocation("/home");
    },
    onError: (error: any) => {
      toast({
        variant: "destructive",
        title: "Erro ao criar conta",
        description: error.message || "Ocorreu um erro. Tente novamente.",
      });
    },
  });

  const onSubmit = (data: RegisterFormData) => {
    registerMutation.mutate(data);
  };

  const password = form.watch("password");
  const hasMinLength = password?.length >= 8;
  const hasLowercase = /[a-z]/.test(password || "");
  const hasUppercase = /[A-Z]/.test(password || "");
  const hasNumber = /[0-9]/.test(password || "");

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-4 text-center">
          <div className="flex justify-center">
            <div className="rounded-full bg-primary/10 p-4">
              <UserPlus className="h-8 w-8 text-primary" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold">
            Criar Nova Conta
          </CardTitle>
          <CardDescription>
            Preencha os dados abaixo para criar sua conta no HealHub
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nome Completo</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="João da Silva"
                        data-testid="input-name"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="email"
                        placeholder="joao@exemplo.com"
                        data-testid="input-email"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Senha</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="password"
                        placeholder="Sua senha"
                        data-testid="input-password"
                      />
                    </FormControl>
                    <FormDescription>
                      <div className="space-y-1 mt-2">
                        <div className={`flex items-center gap-2 text-xs ${hasMinLength ? 'text-green-600 dark:text-green-400' : 'text-muted-foreground'}`}>
                          <CheckCircle2 className={`h-3 w-3 ${hasMinLength ? 'opacity-100' : 'opacity-30'}`} />
                          <span>Mínimo 8 caracteres</span>
                        </div>
                        <div className={`flex items-center gap-2 text-xs ${hasLowercase ? 'text-green-600 dark:text-green-400' : 'text-muted-foreground'}`}>
                          <CheckCircle2 className={`h-3 w-3 ${hasLowercase ? 'opacity-100' : 'opacity-30'}`} />
                          <span>Uma letra minúscula</span>
                        </div>
                        <div className={`flex items-center gap-2 text-xs ${hasUppercase ? 'text-green-600 dark:text-green-400' : 'text-muted-foreground'}`}>
                          <CheckCircle2 className={`h-3 w-3 ${hasUppercase ? 'opacity-100' : 'opacity-30'}`} />
                          <span>Uma letra maiúscula</span>
                        </div>
                        <div className={`flex items-center gap-2 text-xs ${hasUppercase ? 'text-green-600 dark:text-green-400' : 'text-muted-foreground'}`}>
                          <CheckCircle2 className={`h-3 w-3 ${hasUppercase ? 'opacity-100' : 'opacity-30'}`} />
                          <span>Um caractere especial</span>
                        </div>
                        <div className={`flex items-center gap-2 text-xs ${hasNumber ? 'text-green-600 dark:text-green-400' : 'text-muted-foreground'}`}>
                          <CheckCircle2 className={`h-3 w-3 ${hasNumber ? 'opacity-100' : 'opacity-30'}`} />
                          <span>Um número</span>
                        </div>
                      </div>
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirmar Senha</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="password"
                        placeholder="Confirme sua senha"
                        data-testid="input-confirm-password"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                className="w-full"
                disabled={registerMutation.isPending}
                data-testid="button-submit"
              >
                {registerMutation.isPending ? "Criando conta..." : "Criar Conta"}
              </Button>
            </form>
          </Form>

          <div className="mt-4 text-center text-sm">
            <span className="text-muted-foreground">Já tem uma conta? </span>
            <Link href="/login">
              <a className="text-primary hover:underline" data-testid="link-login">
                Fazer login
              </a>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
