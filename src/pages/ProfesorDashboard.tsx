import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const ProfesorDashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  // Mock data de jugadores
  const jugadores = [
    { id: 1, nombre: 'Ana García', email: 'ana@email.com', mensualidad: 'Pagado', fechaPago: '15/09/2025', monto: '$50.000' },
    { id: 2, nombre: 'Carlos López', email: 'carlos@email.com', mensualidad: 'Pendiente', fechaVencimiento: '20/09/2025', monto: '$50.000' },
    { id: 3, nombre: 'María Rodríguez', email: 'maria@email.com', mensualidad: 'Pagado', fechaPago: '10/09/2025', monto: '$50.000' },
    { id: 4, nombre: 'Juan Martínez', email: 'juan@email.com', mensualidad: 'Pendiente', fechaVencimiento: '25/09/2025', monto: '$50.000' },
    { id: 5, nombre: 'Laura Sánchez', email: 'laura@email.com', mensualidad: 'Pagado', fechaPago: '12/09/2025', monto: '$50.000' },
    { id: 6, nombre: 'Diego Herrera', email: 'diego@email.com', mensualidad: 'Pendiente', fechaVencimiento: '18/09/2025', monto: '$50.000' },
  ];

  const jugadoresPagados = jugadores.filter(j => j.mensualidad === 'Pagado').length;
  const jugadoresPendientes = jugadores.filter(j => j.mensualidad === 'Pendiente').length;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div>
              <h1 className="text-2xl font-poppins font-bold text-voley-blue-dark">
                Panel del Profesor
              </h1>
              <p className="text-sm font-montserrat text-gray-600">
                Bienvenido, {user?.username}
              </p>
            </div>
            <button
              onClick={handleLogout}
              className="bg-voley-red-dark hover:bg-voley-red-bright text-white font-montserrat font-semibold py-2 px-6 rounded-xl shadow-lg transition-all duration-300 transform hover:scale-105"
            >
              Cerrar Sesión
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Welcome Message */}
        <div className="bg-gradient-to-r from-voley-blue-vibrant to-voley-blue-medium rounded-2xl p-8 text-white mb-8">
          <h2 className="text-3xl font-poppins font-bold mb-2">
            ¡Bienvenido Profesor!
          </h2>
          <p className="text-lg font-montserrat opacity-90">
            Gestiona los pagos y el seguimiento de tus jugadores desde aquí.
          </p>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
            <div className="flex items-center">
              <div className="p-3 bg-green-100 rounded-full">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-montserrat text-gray-600">Pagos al día</p>
                <p className="text-2xl font-poppins font-bold text-gray-900">{jugadoresPagados}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
            <div className="flex items-center">
              <div className="p-3 bg-yellow-100 rounded-full">
                <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-montserrat text-gray-600">Pagos pendientes</p>
                <p className="text-2xl font-poppins font-bold text-gray-900">{jugadoresPendientes}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
            <div className="flex items-center">
              <div className="p-3 bg-blue-100 rounded-full">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-montserrat text-gray-600">Total jugadores</p>
                <p className="text-2xl font-poppins font-bold text-gray-900">{jugadores.length}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Players Table */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-100">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-xl font-poppins font-semibold text-voley-blue-dark">
              Estado de Mensualidades
            </h3>
            <p className="text-sm font-montserrat text-gray-600 mt-1">
              Gestiona los pagos de tus jugadores
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-montserrat font-medium text-gray-500 uppercase tracking-wider">
                    Jugador
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-montserrat font-medium text-gray-500 uppercase tracking-wider">
                    Estado
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-montserrat font-medium text-gray-500 uppercase tracking-wider">
                    Monto
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-montserrat font-medium text-gray-500 uppercase tracking-wider">
                    Fecha
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-montserrat font-medium text-gray-500 uppercase tracking-wider">
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {jugadores.map((jugador) => (
                  <tr key={jugador.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-montserrat font-medium text-gray-900">
                          {jugador.nombre}
                        </div>
                        <div className="text-sm font-montserrat text-gray-500">
                          {jugador.email}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-3 py-1 text-xs font-montserrat font-semibold rounded-full ${
                        jugador.mensualidad === 'Pagado'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {jugador.mensualidad}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-montserrat text-gray-900">
                      {jugador.monto}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-montserrat text-gray-500">
                      {jugador.mensualidad === 'Pagado' 
                        ? `Pagado: ${jugador.fechaPago}`
                        : `Vence: ${jugador.fechaVencimiento}`
                      }
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button className="text-voley-blue-vibrant hover:text-voley-blue-dark font-montserrat font-medium transition-colors">
                        Ver detalles
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfesorDashboard;