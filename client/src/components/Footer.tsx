import { MapPin, Phone, Mail, Clock, Facebook, Instagram, Twitter } from "lucide-react";
import { Link } from "wouter";

export function Footer() {
  return (
    <footer className="border-t bg-card">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
                <span className="text-xl font-bold text-primary-foreground">HH</span>
              </div>
              <span className="text-xl font-bold">HealHub</span>
            </div>
            <p className="text-lg text-muted-foreground leading-relaxed mb-6">
              Sistema de agendamento de consultas e exames médicos para os hospitais de São Caetano do Sul.
            </p>
            <div className="flex gap-3">
              <a href="#" className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary hover-elevate active-elevate-2" data-testid="link-facebook">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary hover-elevate active-elevate-2" data-testid="link-instagram">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary hover-elevate active-elevate-2" data-testid="link-twitter">
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-6">Links Rápidos</h3>
            <ul className="space-y-3">
              <li>
                <Link 
                  href="/agendar"
                  className="text-lg text-muted-foreground hover:text-foreground transition-colors" 
                  data-testid="link-footer-agendar"
                >
                  Agendar Consulta
                </Link>
              </li>
              <li>
                <Link 
                  href="/noticias"
                  className="text-lg text-muted-foreground hover:text-foreground transition-colors" 
                  data-testid="link-footer-noticias"
                >
                  Notícias
                </Link>
              </li>
              <li>
                <a href="#" className="text-lg text-muted-foreground hover:text-foreground transition-colors" data-testid="link-footer-hospitais">
                  Hospitais
                </a>
              </li>
              <li>
                <a href="#" className="text-lg text-muted-foreground hover:text-foreground transition-colors" data-testid="link-footer-especialidades">
                  Especialidades
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-6">Contato</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 mt-1 text-primary flex-shrink-0" />
                <span className="text-lg text-muted-foreground">São Caetano do Sul, SP</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-primary flex-shrink-0" />
                <span className="text-lg text-muted-foreground">(11)0800-000-000</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-primary flex-shrink-0" />
                <span className="text-lg text-muted-foreground">contato@healhub.com.br</span>
              </li>
              <li className="flex items-start gap-3">
                <Clock className="h-5 w-5 mt-1 text-primary flex-shrink-0" />
                <span className="text-lg text-muted-foreground">Segunda a Sexta, 7h às 19h</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t pt-8 text-center">
          <p className="text-base text-muted-foreground">
            © 2025 HealHub - São Caetano do Sul. Todos os direitos reservados.
          </p>
          <p className="mt-2 text-base text-muted-foreground">
            Site acessível conforme diretrizes WCAG 2.1 nível AAA
          </p>
        </div>
      </div>
    </footer>
  );
}
