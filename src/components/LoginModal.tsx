import { useState } from 'react';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const LoginModal = ({ isOpen, onClose }: LoginModalProps) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState<{ type: string; name: string } | null>(null);

  // Static credentials for demo purposes
  const credentials = {
    'profesor': { password: '1234', name: 'Profesor', type: 'profesor' },
    'jugador': { password: '1234', name: 'Jugador', type: 'jugador' }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    const userCredential = credentials[username.toLowerCase() as keyof typeof credentials];
    
    if (userCredential && userCredential.password === password) {
      setUser({ type: userCredential.type, name: userCredential.name });
      setUsername('');
      setPassword('');
    } else {
      setError('Usuario o contraseña incorrectos');
    }
    
    setIsLoading(false);
  };

  const handleClose = () => {
    setUsername('');
    setPassword('');
    setError('');
    setUser(null);
    onClose();
  };

  const resetForm = () => {
    setUser(null);
    setUsername('');
    setPassword('');
    setError('');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        {!user ? (
          // Login Form
          <div className="p-8">
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
              <h2 className="font-poppins font-bold text-2xl text-voley-blue-dark">
                Iniciar Sesión
              </h2>
              <button
                onClick={handleClose}
                className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Subtitle */}
            <p className="font-montserrat text-gray-600 mb-8 text-center">
              Accede a tu cuenta para gestionar tu plataforma
            </p>

            {/* Login Form */}
            <form onSubmit={handleLogin} className="space-y-6">
              {/* Username Field */}
              <div>
                <label className="font-montserrat font-medium text-voley-blue-dark block mb-2">
                  Usuario
                </label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-voley-blue-vibrant focus:border-transparent outline-none transition-all duration-200 font-montserrat"
                  placeholder="Ingresa tu usuario"
                  required
                />
              </div>

              {/* Password Field */}
              <div>
                <label className="font-montserrat font-medium text-voley-blue-dark block mb-2">
                  Contraseña
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-voley-blue-vibrant focus:border-transparent outline-none transition-all duration-200 font-montserrat"
                  placeholder="Ingresa tu contraseña"
                  required
                />
              </div>

              {/* Error Message */}
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl">
                  <div className="flex items-center">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="font-montserrat text-sm">{error}</span>
                  </div>
                </div>
              )}

              {/* Demo Credentials Info */}
              <div className="bg-blue-50 border border-blue-200 text-blue-700 px-4 py-3 rounded-xl">
                <div className="text-sm font-montserrat">
                  <p className="font-semibold mb-1">Credenciales de prueba:</p>
                  <p>• profesor / 1234</p>
                  <p>• jugador / 1234</p>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className={`w-full bg-voley-red-dark hover:bg-voley-red-bright text-white font-montserrat font-semibold py-3 px-6 rounded-xl shadow-lg transition-all duration-200 transform hover:scale-105 ${
                  isLoading ? 'opacity-75 cursor-not-allowed' : ''
                }`}
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Ingresando...
                  </div>
                ) : (
                  'Ingresar'
                )}
              </button>
            </form>

            {/* Footer */}
            <div className="mt-6 text-center">
              <p className="font-montserrat text-sm text-gray-500">
                ¿Olvidaste tu contraseña?{' '}
                <a href="#" className="text-voley-blue-vibrant hover:text-voley-blue-dark font-semibold">
                  Recuperar
                </a>
              </p>
            </div>
          </div>
        ) : (
          // Welcome Screen
          <div className="p-8 text-center">
            {/* Success Icon */}
            <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>

            {/* Welcome Message */}
            <h2 className="font-poppins font-bold text-2xl text-voley-blue-dark mb-4">
              ¡Bienvenido {user.name}!
            </h2>
            <p className="font-montserrat text-gray-600 mb-8">
              Has iniciado sesión exitosamente como{' '}
              <span className="font-semibold text-voley-blue-vibrant">
                {user.type === 'profesor' ? 'Profesor' : 'Jugador'}
              </span>
            </p>

            {/* User Type Specific Content */}
            <div className="bg-gradient-to-r from-voley-blue-vibrant to-voley-blue-medium text-white rounded-xl p-6 mb-6">
              {user.type === 'profesor' ? (
                <div>
                  <h3 className="font-poppins font-semibold text-lg mb-2">Panel de Profesor</h3>
                  <p className="font-montserrat text-sm opacity-90">
                    Gestiona torneos, controla pagos y administra tu academia desde el dashboard.
                  </p>
                </div>
              ) : (
                <div>
                  <h3 className="font-poppins font-semibold text-lg mb-2">Panel de Jugador</h3>
                  <p className="font-montserrat text-sm opacity-90">
                    Consulta tus pagos, horarios de entrenamientos y participa en torneos.
                  </p>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <button
                onClick={handleClose}
                className="w-full bg-voley-red-bright hover:bg-voley-red-dark text-white font-montserrat font-semibold py-3 px-6 rounded-xl shadow-lg transition-all duration-200 transform hover:scale-105"
              >
                Ir al Dashboard
              </button>
              <button
                onClick={resetForm}
                className="w-full text-voley-blue-vibrant hover:text-voley-blue-dark font-montserrat font-medium transition-colors duration-200"
              >
                Cambiar de usuario
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LoginModal;