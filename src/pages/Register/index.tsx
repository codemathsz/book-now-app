import { User, Mail, Lock, UtensilsCrossed } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '../../components/Button';
import { Input } from '../../components/Input';

function Register() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-xl sm:p-8 p-2">
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
              <UtensilsCrossed className="w-8 h-8 text-blue-500" />
            </div>
          </div>

          <h1 className="text-2xl font-bold text-center mb-2">
            Criar Conta
          </h1>
          <p className="text-center text-gray-500 mb-8">
            Preencha os dados para começar
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <Input
              label="Nome Completo"
              type="text"
              placeholder="Seu nome"
              icon={<User className="w-5 h-5" />}
              required
            />

            <Input
              label="Email"
              type="email"
              placeholder="seu@email.com"
              icon={<Mail className="w-5 h-5" />}
              required
            />

            <Input
              label="Senha"
              type="password"
              placeholder="Mínimo 6 caracteres"
              icon={<Lock className="w-5 h-5" />}
              required
              minLength={6}
            />

            <Input
              label="Confirmar Senha"
              type="password"
              placeholder="Digite a senha novamente"
              icon={<Lock className="w-5 h-5" />}
              required
              minLength={6}
            />

            <Button type="submit" className="w-full mt-6">
              Criar Conta
            </Button>
          </form>

          <p className="text-center text-sm text-gray-600 mt-6">
            Já tem conta?{' '}
            <Link to="/login" className="text-blue-500 font-medium hover:underline">
              Faça login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;
