import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const JugadorDashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  // Mock data de torneos
  const torneos = [
    { 
      id: 1, 
      nombre: 'Copa de Primavera', 
      fecha: '15 Oct 2025', 
      ubicacion: 'Polideportivo Central', 
      estado: 'Inscrito',
      categoria: 'Juvenil Masculino'
    },
    { 
      id: 2, 
      nombre: 'Torneo Regional Norte', 
      fecha: '22 Nov 2025', 
      ubicacion: 'Club Deportivo Norte', 
      estado: 'Pendiente',
      categoria: 'Sub-18 Masculino'
    },
    { 
      id: 3, 
      nombre: 'Liga Universitaria', 
      fecha: '05 Dic 2025', 
      ubicacion: 'Universidad Nacional', 
      estado: 'Disponible',
      categoria: 'Universitario'
    },
    { 
      id: 4, 
      nombre: 'Copa de Verano', 
      fecha: '20 Ene 2026', 
      ubicacion: 'Complejo Deportivo Sur', 
      estado: 'Disponible',
      categoria: 'Juvenil Masculino'
    },
    { 
      id: 5, 
      nombre: 'Torneo Interclubes', 
      fecha: '14 Feb 2026', 
      ubicacion: 'Estadio Municipal', 
      estado: 'Inscrito',
      categoria: 'Juvenil Masculino'
    }
  ];

  const torneosInscritos = torneos.filter(t => t.estado === 'Inscrito').length;
  const torneosPendientes = torneos.filter(t => t.estado === 'Pendiente').length;
  const torneosDisponibles = torneos.filter(t => t.estado === 'Disponible').length;

  const getEstadoColor = (estado: string) => {
    switch (estado) {
      case 'Inscrito':
        return 'bg-green-100 text-green-800';
      case 'Pendiente':
        return 'bg-yellow-100 text-yellow-800';
      case 'Disponible':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getEstadoAction = (estado: string) => {
    switch (estado) {
      case 'Inscrito':
        return 'Ver detalles';
      case 'Pendiente':
        return 'Completar inscripción';
      case 'Disponible':
        return 'Inscribirse';
      default:
        return 'Ver';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div>
              <h1 className="text-2xl font-poppins font-bold text-voley-blue-dark">
                Panel del Jugador
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
            ¡Bienvenido Jugador!
          </h2>
          <p className="text-lg font-montserrat opacity-90">
            Explora los torneos disponibles y gestiona tus inscripciones.
          </p>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
            <div className="flex items-center">
              <div className="p-3 bg-green-100 rounded-full">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-montserrat text-gray-600">Inscripciones confirmadas</p>
                <p className="text-2xl font-poppins font-bold text-gray-900">{torneosInscritos}</p>
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
                <p className="text-sm font-montserrat text-gray-600">Inscripciones pendientes</p>
                <p className="text-2xl font-poppins font-bold text-gray-900">{torneosPendientes}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
            <div className="flex items-center">
              <div className="p-3 bg-blue-100 rounded-full">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-montserrat text-gray-600">Torneos disponibles</p>
                <p className="text-2xl font-poppins font-bold text-gray-900">{torneosDisponibles}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Tournaments Table */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-100">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-xl font-poppins font-semibold text-voley-blue-dark">
              Torneos y Competencias
            </h3>
            <p className="text-sm font-montserrat text-gray-600 mt-1">
              Explora y gestiona tus participaciones en torneos
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-montserrat font-medium text-gray-500 uppercase tracking-wider">
                    Torneo
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-montserrat font-medium text-gray-500 uppercase tracking-wider">
                    Fecha
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-montserrat font-medium text-gray-500 uppercase tracking-wider">
                    Ubicación
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-montserrat font-medium text-gray-500 uppercase tracking-wider">
                    Estado
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-montserrat font-medium text-gray-500 uppercase tracking-wider">
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {torneos.map((torneo) => (
                  <tr key={torneo.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-montserrat font-medium text-gray-900">
                          {torneo.nombre}
                        </div>
                        <div className="text-sm font-montserrat text-gray-500">
                          {torneo.categoria}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-montserrat text-gray-900">
                      {torneo.fecha}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-montserrat text-gray-500">
                      {torneo.ubicacion}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-3 py-1 text-xs font-montserrat font-semibold rounded-full ${getEstadoColor(torneo.estado)}`}>
                        {torneo.estado}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button 
                        className={`font-montserrat font-medium transition-colors ${
                          torneo.estado === 'Disponible' 
                            ? 'text-voley-blue-vibrant hover:text-voley-blue-dark'
                            : torneo.estado === 'Pendiente'
                            ? 'text-yellow-600 hover:text-yellow-800'
                            : 'text-green-600 hover:text-green-800'
                        }`}
                      >
                        {getEstadoAction(torneo.estado)}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
            <h4 className="text-lg font-poppins font-semibold text-voley-blue-dark mb-4">
              Estado de Mensualidad
            </h4>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-montserrat text-gray-600">Septiembre 2025</p>
                <p className="text-2xl font-poppins font-bold text-green-600">Pagado</p>
                <p className="text-sm font-montserrat text-gray-500">Pagado el 12/09/2025</p>
              </div>
              <div className="p-3 bg-green-100 rounded-full">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
            <h4 className="text-lg font-poppins font-semibold text-voley-blue-dark mb-4">
              Próximo Entrenamiento
            </h4>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-montserrat text-gray-600">Sábado</p>
                <p className="text-2xl font-poppins font-bold text-voley-blue-vibrant">21 Sep</p>
                <p className="text-sm font-montserrat text-gray-500">10:00 AM - Gimnasio</p>
              </div>
              <div className="p-3 bg-blue-100 rounded-full">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JugadorDashboard;