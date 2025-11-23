import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

import Home from "@/pages/Home";
import Booking from "@/pages/Booking";
import News from "@/pages/News";
import Login from "@/pages/Login";
import CreateAccount from "@/pages/CreateAccount";
import ForgotPassword from "@/pages/ForgotPassword";
import MyAppointments from "@/pages/MyAppointments";
import MyHealthRecords from "@/pages/MyHealthRecords";
import Profile from "@/pages/Profile";
import NotFound from "@/pages/not-found";

// Admin
import AdminHospitals from "@/pages/AdminHospitals";

// NOVAS PÁGINAS
import Faq from "@/pages/faq";
import About from "@/pages/About";
import Tutorial from "@/pages/Tutorial";
import Feedback from "@/pages/Feedback";
import Settings from "@/pages/Settings";
import Privacy from "@/pages/Privacy";

function Router() {
  return (
    <Switch>
      {/* Login e rotas públicas */}
      <Route path="/" component={Login} />
      <Route path="/login" component={Login} />
      <Route path="/criar-conta" component={CreateAccount} />
      <Route path="/esqueci-senha" component={ForgotPassword} />

      {/* App logado */}
      <Route path="/home" component={Home} />
      <Route path="/agendar" component={Booking} />
      <Route path="/meus-agendamentos" component={MyAppointments} />
      <Route path="/meus-registros" component={MyHealthRecords} />
      <Route path="/noticias" component={News} />
      <Route path="/perfil" component={Profile} />

      {/* Admin */}
      <Route path="/admin/hospitais" component={AdminHospitals} />

      {/* Novas páginas informativas */}
      <Route path="/faq" component={Faq} />
      <Route path="/sobre" component={About} />
      <Route path="/tutorial" component={Tutorial} />
      <Route path="/feedback" component={Feedback} />
      <Route path="/configuracoes" component={Settings} />
      <Route path="/privacidade" component={Privacy} />

      {/* 404 */}
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <TooltipProvider>
          <div className="flex min-h-screen flex-col">
            <Header />
            <main className="flex-1">
              <Router />
            </main>
            <Footer />
          </div>
          <Toaster />
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
