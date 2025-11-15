import { Link } from 'react-router-dom';

function Reservations() {
  return (
    <div className="min-h-screen p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Minhas Reservas</h1>
          <Link 
            to="/reservations/new"
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            Nova Reserva
          </Link>
        </div>
        <div className="bg-white rounded-lg shadow">
          <div className="p-6">
            <p className="text-gray-500 text-center">Nenhuma reserva encontrada</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Reservations;
