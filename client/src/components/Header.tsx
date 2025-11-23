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
  HelpCircle,
  BookOpen,
  Info,
  Settings as SettingsIcon,
  MessageSquare,
  FileCheck,
  ChevronDown,
} from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useAuthRedirect } from "@/hooks/useAuthRedirect";

export function Header() {
  const [location] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [helpOpen, setHelpOpen] = useState(false);

  const me = useAuthRedirect();

  const navItems = [
    { path: "/home", label: "Início", icon: Home },
    { path: "/agendar", label: "Agendar", icon: Calendar },
    { path: "/meus-agendamentos", label: "Agendamentos", icon: CalendarCheck2 },
    { path: "/noticias", label: "Notícias", icon: Newspaper },
    { path: "/meus-registros", label: "Registros", icon: ClipboardList },
  ];

  const helpItems = [
    { path: "/faq", label: "FAQ", icon: HelpCircle },
    { path: "/tutorial", label: "Tutorial", icon: BookOpen },
    { path: "/sobre", label: "Sobre", icon: Info },
    { path: "/feedback", label: "Feedback", icon: MessageSquare },
    { path: "/configuracoes", label: "Configurações", icon: SettingsIcon },
    { path: "/privacidade", label: "Privacidade", icon: FileCheck },
  ];

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
    <header className="sticky top-0 z-50 bg-card border-b">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          
          {/* ESQUERDA: Logo + Navegação */}
          <div className="flex items-center gap-6">
            <Link href="/home" className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
                <span className="text-lg font-extrabold text-primary-foreground">HH</span>
              </div>
            </Link>

            {/* NAV DESKTOP */}
            <nav className="hidden md:flex items-center gap-3">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  href={item.path}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg text-base transition hover-elevate
                    ${location === item.path ? "bg-primary text-primary-foreground" : "text-foreground"}
                  `}
                >
                  <item.icon className="h-5 w-5" />
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* DIREITA: Ícones e menus */}
          <div className="hidden md:flex items-center gap-3">

            {/* Admin */}
            {adminItem && (
              <Link
                href={adminItem.path}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg transition hover-elevate 
                  ${location === adminItem.path ? "bg-primary text-primary-foreground" : "text-foreground"}
                `}
              >
                <adminItem.icon className="h-5 w-5" />
                {adminItem.label}
              </Link>
            )}

            {/* Perfil */}
            <Link
              href="/perfil"
              className={`flex items-center gap-2 px-3 py-2 rounded-lg transition hover-elevate
                ${location === "/perfil" ? "bg-primary text-primary-foreground" : "text-foreground"}
              `}
            >
              <User className="h-5 w-5" />
              Perfil
            </Link>

            {/* Sair */}
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-3 py-2 rounded-lg text-foreground hover-elevate transition"
            >
              <LogOut className="h-5 w-5" />
              Sair
            </button>

            {/* Tema */}
            <ThemeToggle />

            {/* Menu Ajuda (dropdown) */}
            <div className="relative">
              <button
                className="flex items-center gap-2 px-3 py-2 rounded-lg text-foreground hover-elevate transition"
                onClick={() => setHelpOpen(!helpOpen)}
              >
                <HelpCircle className="h-5 w-5" />
                Ajuda
                <ChevronDown className="h-4 w-4" />
              </button>

              {helpOpen && (
                <div className="absolute right-0 mt-2 w-60 bg-card border rounded-lg shadow-lg py-2 z-50">
                  {helpItems.map((item) => (
                    <Link
                      key={item.path}
                      href={item.path}
                      className="flex items-center gap-2 px-3 py-2 hover:bg-accent text-sm"
                      onClick={() => setHelpOpen(false)}
                    >
                      <item.icon className="h-4 w-4" />
                      {item.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

          </div>

          {/* MOBILE */}
          <div className="md:hidden flex items-center gap-2">
            <ThemeToggle />
            <Button variant="ghost" size="icon" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>

        </div>
      </div>

      {/* MOBILE MENU */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t bg-card">
          <nav className="px-4 py-4 space-y-1">
            {[...navItems, ...helpItems].map((item) => (
              <Link
                key={item.path}
                href={item.path}
                className="flex items-center gap-3 px-4 py-3 rounded-lg text-lg hover-elevate"
                onClick={() => setMobileMenuOpen(false)}
              >
                <item.icon className="h-5 w-5" />
                {item.label}
              </Link>
            ))}

            {/* Admin */}
            {adminItem && (
              <Link
                href={adminItem.path}
                className="flex items-center gap-3 px-4 py-3 rounded-lg text-lg hover-elevate"
                onClick={() => setMobileMenuOpen(false)}
              >
                <adminItem.icon className="h-5 w-5" />
                {adminItem.label}
              </Link>
            )}

            {/* Perfil */}
            <Link
              href="/perfil"
              className="flex items-center gap-3 px-4 py-3 rounded-lg text-lg hover-elevate"
              onClick={() => setMobileMenuOpen(false)}
            >
              <User className="h-5 w-5" />
              Perfil
            </Link>

            {/* Sair */}
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                handleLogout();
              }}
              className="flex items-center gap-3 px-4 py-3 text-lg hover-elevate"
            >
              <LogOut className="h-5 w-5" />
              Sair
            </button>
          </nav>
        </div>
      )}
    </header>
  );
}
