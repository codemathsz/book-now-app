import { Card } from "@/components/Card";
import { Button } from "@/components/Button";
import {
  Bell,
  CalendarCheck,
  CheckCircle2,
  Clock,
  UtensilsCrossed,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useReservations } from "@/hooks/useReservations";
import { motion } from "framer-motion";

export default function Home() {
  const { timeSlots } = useReservations();
  console.log("timer", timeSlots);

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

  return (
    <div className="min-h-screen bg-background font-sans">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-blue-50 via-white to-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center py-20 sm:py-32">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 text-blue-600">
              Reserve sua Mesa no Refeitório
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Sistema inteligente de gestão de mesas - rápido, fácil e organizado
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link to="/login" className="w-full sm:w-auto">
                <Button
                  variant="primary"
                  size="lg"
                  className="w-full hover:scale-105 transition-transform"
                >
                  Fazer Reserva
                </Button>
              </Link>
              <Link to="/register" className="w-full sm:w-auto">
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full hover:scale-105 transition-transform"
                >
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
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
              >
                <Card
                  className="hover:shadow-xl hover:scale-105 transition-all duration-300 text-center p-6"
                  icon={step.icon}
                  title={step.title}
                  description={step.description}
                />
              </motion.div>
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
            {timeSlots.length > 0 ? (
              timeSlots.map((slot) => (
                <motion.div
                  key={slot.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4 }}
                >
                  <Card
                    icon={Clock}
                    title={slot.label}
                    className="hover:shadow-lg hover:border-primary/30 transition-all duration-300 cursor-pointer"
                  />
                </motion.div>
              ))
            ) : (
              <p className="text-center text-gray-500 col-span-full">
                Nenhum horário disponível no momento.
              </p>
            )}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card border-t mt-16 py-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <UtensilsCrossed className="h-6 w-6 text-primary" />
            <span className="font-semibold text-lg text-foreground">
              ReservaMesa
            </span>
          </div>
          <div className="flex flex-col md:flex-row gap-4">
            <Link
              to="/about"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              Sobre
            </Link>
            <Link
              to="/faq"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              FAQ
            </Link>
            <Link
              to="/contact"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              Contato
            </Link>
          </div>
          <p className="text-muted-foreground text-sm text-center md:text-right">
            © 2025 Sistema de Reservas. Todos os direitos reservados.
          </p>
        </div>
      </footer>
    </div>
  );
}