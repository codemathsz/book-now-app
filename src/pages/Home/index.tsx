import { Card } from "@/components/Card";
import { Button } from "@/components/Button";
import { Bell, CalendarCheck, CheckCircle2, Clock, UtensilsCrossed } from "lucide-react";
import { Link } from "react-router-dom";

export default function Home() {
  const steps = [
    {
      icon: CalendarCheck,
      title: "Escolha o Horário",
      description: "Selecione entre 3 opções de almoço disponíveis",
    },
    {
      icon: CheckCircle2,
      title: "Reserve Instantaneamente",
      description: "Garantimos sua mesa automaticamente",
    },
    {
      icon: Bell,
      title: "Gerencie suas Reservas",
      description: "Cancele quando precisar com facilidade",
    },
  ];

  const timeSlots = [
    { time: "12:00 - 12:30", icon: Clock },
    { time: "12:30 - 13:00", icon: Clock },
    { time: "13:00 - 13:30", icon: Clock },
  ];

  return (
    <div className="min-h-screen bg-background pt-10">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-b from-primary/5 to-transparent"></div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="max-w-4xl mx-auto text-center">

            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 text-[#3b82f6]">
              Reserve sua Mesa no Refeitório
            </h1>

            <p className="text-lg sm:text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Sistema inteligente de gestão de mesas - rápido, fácil e organizado
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link to="/login" className="w-full sm:w-auto">
                <Button variant="primary" size="lg" className="w-full">
                  Fazer Reserva
                </Button>
              </Link>
              <Link to="/register" className="w-full sm:w-auto">
                <Button variant="outline" size="lg" className="w-full">
                  Criar Conta
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* How it Works Section */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-12 md:mb-16 text-foreground">
            Como Funciona?
          </h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto">
            {steps.map((step, index) => (
              <Card
                className="hover:border-primary/50 transition-all duration-300 hover:shadow-lg"
                key={index}
                icon={step.icon}
                title={step.title}
                description={step.description}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Time Slots Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-12 md:mb-16 text-foreground">
            Horários Disponíveis
          </h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-4xl mx-auto">
            {timeSlots.map((slot, index) => (
              <Card
                key={index}
                className="hover:shadow-lg hover:border-primary/30 transition-all duration-300"
                icon={slot.icon}
                title={slot.time}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card border-t mt-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <UtensilsCrossed className="h-6 w-6 text-primary" />
              <span className="font-semibold text-lg text-foreground">ReservaMesa</span>
            </div>
            <p className="text-muted-foreground text-sm text-center md:text-right">
              © 2025 Sistema de Reservas. Todos os direitos reservados.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}