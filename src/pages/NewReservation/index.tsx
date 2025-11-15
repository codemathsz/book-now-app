function NewReservation() {
  return (
    <div className="min-h-screen p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Nova Reserva</h1>
        <form className="bg-white rounded-lg shadow p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Serviço</label>
            <select className="w-full px-4 py-2 border rounded-lg">
              <option value="">Selecione um serviço</option>
              <option value="1">Consulta</option>
              <option value="2">Procedimento</option>
              <option value="3">Exame</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Data</label>
            <input 
              type="date" 
              className="w-full px-4 py-2 border rounded-lg"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Horário</label>
            <input 
              type="time" 
              className="w-full px-4 py-2 border rounded-lg"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Observações</label>
            <textarea 
              className="w-full px-4 py-2 border rounded-lg"
              rows={4}
              placeholder="Informações adicionais..."
            />
          </div>
          <button 
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
          >
            Confirmar Reserva
          </button>
        </form>
      </div>
    </div>
  );
}

export default NewReservation;
