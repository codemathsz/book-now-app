import { User, Mail, Lock, UtensilsCrossed } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import { createAccount } from '@/api/user.api';
import { useState } from 'react';
import type { ICreateUser } from '@/types/user';

export default function Register() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleRegisterUser = async (e: React.FormEvent) => {

    e.preventDefault();
    if(!name || !email || !password){
      setErrorMessage("Por favor, preencha todos os campos.");
      return;
    }

    if(password !== confirmPassword){
      setErrorMessage("As senhas não coincidem.");
      return;
    }

    setIsLoading(true);

    const dto: ICreateUser = {
      name,
      email,
      password
    }

    await createAccount(dto).then(() =>{
      alert("Conta criada com sucesso! redirecionando...");
      navigate('/dashboard');
    }).catch((error: any) =>{
      console.error("Error creating account:", error);
      setErrorMessage(error.message || "Erro ao criar conta. Tente novamente.");
    }).finally(() =>{
      setIsLoading(false);
    });
  }

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

          <form onSubmit={handleRegisterUser} className="space-y-5">
            <Input
              label="Nome Completo"
              type="text"
              placeholder="Seu nome"
              icon={<User className="w-5 h-5" />}
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

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
              placeholder="Mínimo 6 caracteres"
              icon={<Lock className="w-5 h-5" />}
              required
              minLength={6}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <Input
              label="Confirmar Senha"
              type="password"
              placeholder="Digite a senha novamente"
              icon={<Lock className="w-5 h-5" />}
              required
              minLength={6}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />

            <p>{errorMessage}</p>
            <Button type="submit" className="w-full mt-6" disabled={isLoading}>
              {isLoading ? 'Criando Conta...' : 'Criar Conta'}
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