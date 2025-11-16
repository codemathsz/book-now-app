import { Mail, Lock, UtensilsCrossed } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import { useAuth } from '@/hooks/useAuth';
import { useState } from 'react';

export default function Login() {

  const { login } = useAuth()
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    console.log("Submitting login form")
    try {
      e.preventDefault();
      setIsLoading(true);
      if (!email || !password) {
        return;
      }
      await login({ email, password });
      navigate('/dashboard');
    } catch (error) {
      console.log("Error login: ", error);
      alert("Erro ao fazer login. Verifique suas credenciais e tente novamente.");
    }finally{
      setIsLoading(false);
    }
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
            Bem-vindo de volta
          </h1>
          <p className="text-center text-gray-500 mb-8">
            Entre com suas credenciais para continuar
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <Input
              label="Email"
              type="email"
              placeholder="seu@email.com"
              icon={<Mail className="w-5 h-5" />}
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <Input
              label="Senha"
              type="password"
              placeholder="••••••"
              icon={<Lock className="w-5 h-5" />}
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <Button type="submit" className="w-full mt-6" disabled={isLoading}>
              {isLoading ? 'Entrando...' : 'Entrar'}
            </Button>
          </form>

          <p className="text-center text-sm text-gray-600 mt-6">
            Não tem conta?{' '}
            <Link to="/register" className="text-blue-500 font-medium hover:underline">
              Cadastre-se
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}