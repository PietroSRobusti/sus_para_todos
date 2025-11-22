import { Link, useLocation } from "wouter";
import { ThemeToggle } from "./ThemeToggle";
import {
  Menu,
  X,
  Calendar,
  Newspaper,
  Home,
  CalendarCheck2,
  ClipboardList,
  ShieldCheck,
  LogOut,
  User,
} from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useAuthRedirect } from "@/hooks/useAuthRedirect";

export function Header() {
  const [location] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // pega o usuário logado (se sessão caiu, esse hook redireciona pro /login)
  const me = useAuthRedirect();

  //
  // Bloco de navegação principal (serviços do app)
  //
  const navItems = [
    { path: "/home", label: "Início", icon: Home },
    { path: "/agendar", label: "Agendar", icon: Calendar },
    { path: "/meus-agendamentos", label: "Agendamentos", icon: CalendarCheck2 },
    { path: "/noticias", label: "Notícias", icon: Newspaper },
    { path: "/meus-registros", label: "Registros", icon: ClipboardList },
  ];

  // Item extra só para admin
  const adminItem =
    me && me.role === "admin"
      ? {
          path: "/admin/hospitais",
          label: "Admin",
          icon: ShieldCheck,
        }
      : null;

  async function handleLogout() {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      window.location.href = "/login";
    } catch (err) {
      console.error("Erro ao sair:", err);
    }
  }

  return (
    <header className="sticky top-0 z-50 border-b bg-card">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Linha principal da navbar */}
        <div className="flex h-16 items-center justify-between gap-4">
          {/* ====================== */}
          {/* ESQUERDA: LOGO + MENU */}
          {/* ====================== */}
          <div className="flex min-w-0 flex-shrink items-center gap-6">
            {/* Logo atualizado (opção 1: HH [verde] + "Para Todos" em linha) */}
            <Link
              href="/home"
              className="flex items-center gap-3 hover-elevate active-elevate-2 rounded-lg px-3 py-2"
              data-testid="link-home"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
                <span className="text-lg font-extrabold text-primary-foreground tracking-tight">
                  HH
                </span>
              </div>
              <span className="hidden text-xl font-bold tracking-tight sm:inline">
                
              </span>
            </Link>

            {/* Nav principal - DESKTOP */}
            <nav className="hidden md:flex items-center gap-3">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  href={item.path}
                  className={`flex items-center gap-2 rounded-lg px-3 py-2 text-base font-medium transition-colors hover-elevate active-elevate-2 ${
                    location === item.path
                      ? "bg-primary text-primary-foreground"
                      : "text-foreground"
                  }`}
                  data-testid={`link-nav-${item.label
                    .toLowerCase()
                    .replace(" ", "-")}`}
                >
                  <item.icon className="h-5 w-5 shrink-0" />
                  <span className="whitespace-nowrap">{item.label}</span>
                </Link>
              ))}
            </nav>
          </div>

          {/* ====================== */}
          {/* DIREITA: AÇÕES DO USUÁRIO */}
          {/* ====================== */}
          <div className="hidden md:flex items-center gap-3">
            {/* separador visual entre navegação e conta */}
            <div className="h-6 w-px bg-border" />

            {/* Admin (se admin) */}
            {adminItem && (
              <Link
                href={adminItem.path}
                className={`flex items-center gap-2 rounded-lg px-3 py-2 text-base font-medium transition-colors hover-elevate active-elevate-2 ${
                  location === adminItem.path
                    ? "bg-primary text-primary-foreground"
                    : "text-foreground"
                }`}
                data-testid="link-nav-admin"
              >
                <adminItem.icon className="h-5 w-5 shrink-0" />
                <span className="whitespace-nowrap">{adminItem.label}</span>
              </Link>
            )}

            {/* Perfil */}
            <Link
              href="/perfil"
              className={`flex items-center gap-2 rounded-lg px-3 py-2 text-base font-medium transition-colors hover-elevate active-elevate-2 ${
                location === "/perfil"
                  ? "bg-primary text-primary-foreground"
                  : "text-foreground"
              }`}
              data-testid="link-profile"
            >
              <User className="h-5 w-5 shrink-0" />
              <span className="whitespace-nowrap">Perfil</span>
            </Link>

            {/* Sair */}
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 rounded-lg px-3 py-2 text-base font-medium text-foreground hover-elevate active-elevate-2"
              data-testid="button-logout-header"
            >
              <LogOut className="h-5 w-5 shrink-0" />
              <span className="whitespace-nowrap">Sair</span>
            </button>

            {/* Tema */}
            <ThemeToggle />
          </div>

          {/* ====================== */}
          {/* MOBILE: THEME + MENU */}
          {/* ====================== */}
          <div className="flex items-center gap-2 md:hidden">
            <ThemeToggle />
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              data-testid="button-mobile-menu"
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* ====================== */}
      {/* MENU MOBILE (md < ...) */}
      {/* ====================== */}
      {mobileMenuOpen && (
        <div className="border-t bg-card md:hidden">
          <nav className="mx-auto max-w-7xl space-y-1 px-4 py-4">
            {/* blocão A: navegação principal */}
            {navItems.map((item) => (
              <Link
                key={item.path}
                href={item.path}
                className={`flex items-center gap-3 rounded-lg px-4 py-3 text-lg font-medium hover-elevate active-elevate-2 ${
                  location === item.path
                    ? "bg-primary text-primary-foreground"
                    : "text-foreground"
                }`}
                onClick={() => setMobileMenuOpen(false)}
                data-testid={`link-mobile-${item.label
                  .toLowerCase()
                  .replace(" ", "-")}`}
              >
                <item.icon className="h-5 w-5 shrink-0" />
                <span className="whitespace-nowrap">{item.label}</span>
              </Link>
            ))}

            {/* Admin (mobile) */}
            {adminItem && (
              <Link
                href={adminItem.path}
                className={`flex items-center gap-3 rounded-lg px-4 py-3 text-lg font-medium hover-elevate active-elevate-2 ${
                  location === adminItem.path
                    ? "bg-primary text-primary-foreground"
                    : "text-foreground"
                }`}
                onClick={() => setMobileMenuOpen(false)}
                data-testid="link-mobile-admin"
              >
                <adminItem.icon className="h-5 w-5 shrink-0" />
                <span className="whitespace-nowrap">{adminItem.label}</span>
              </Link>
            )}

            {/* separador */}
            <div className="my-2 h-px bg-border" />

            {/* Perfil mobile */}
            <Link
              href="/perfil"
              className={`flex items-center gap-3 rounded-lg px-4 py-3 text-lg font-medium hover-elevate active-elevate-2 ${
                location === "/perfil"
                  ? "bg-primary text-primary-foreground"
                  : "text-foreground"
              }`}
              onClick={() => setMobileMenuOpen(false)}
              data-testid="link-mobile-perfil"
            >
              <User className="h-5 w-5 shrink-0" />
              <span className="whitespace-nowrap">Perfil</span>
            </Link>

            {/* Sair mobile */}
            <button
              className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-left text-lg font-medium text-foreground hover-elevate active-elevate-2"
              onClick={() => {
                setMobileMenuOpen(false);
                handleLogout();
              }}
              data-testid="button-mobile-logout"
            >
              <LogOut className="h-5 w-5 shrink-0" />
              <span className="whitespace-nowrap">Sair</span>
            </button>
          </nav>
        </div>
      )}
    </header>
  );
}
