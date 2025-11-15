function Register() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md">
        <h1 className="text-3xl font-bold mb-6">Cadastro</h1>
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Nome</label>
            <input 
              type="text" 
              className="w-full px-4 py-2 border rounded-lg"
              placeholder="Seu nome completo"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Email</label>
            <input 
              type="email" 
              className="w-full px-4 py-2 border rounded-lg"
              placeholder="seu@email.com"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Senha</label>
            <input 
              type="password" 
              className="w-full px-4 py-2 border rounded-lg"
              placeholder="••••••••"
            />
          </div>
          <button 
            type="submit"
            className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700"
          >
            Cadastrar
          </button>
        </form>
      </div>
    </div>
  );
}

export default Register;
