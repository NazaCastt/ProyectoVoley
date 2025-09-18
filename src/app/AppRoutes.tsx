import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { ProtectedRoute } from '../components/ProtectedRoute';
import LoginPage from '../pages/LoginPage';
import ProfesorDashboard from '../pages/ProfesorDashboard';
import JugadorDashboard from '../pages/JugadorDashboard';

// Importamos los componentes de la landing page
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import InfoSection from '../components/InfoSection';
import Footer from '../components/Footer';

// Componente para la página de inicio (landing page)
const LandingPage = () => {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate('/login');
  };

  return (
    <>
      <Navbar onOpenLogin={handleLoginClick} />
      <Hero />
      <InfoSection />
      <Footer />
    </>
  );
};

const AppRoutes = () => {
  const { user } = useAuth();

  return (
    <Routes>
      {/* Ruta pública - Landing Page */}
      <Route 
        path="/" 
        element={
          user ? (
            // Si el usuario está logueado, redirigir a su dashboard
            <Navigate to={user.role === 'profesor' ? '/profesor/dashboard' : '/jugador/dashboard'} replace />
          ) : (
            // Si no está logueado, mostrar la landing page
            <LandingPage />
          )
        } 
      />

      {/* Ruta de login */}
      <Route 
        path="/login" 
        element={
          user ? (
            // Si ya está logueado, redirigir a su dashboard
            <Navigate to={user.role === 'profesor' ? '/profesor/dashboard' : '/jugador/dashboard'} replace />
          ) : (
            // Si no está logueado, mostrar el login
            <LoginPage />
          )
        } 
      />

      {/* Rutas protegidas para profesores */}
      <Route
        path="/profesor/dashboard"
        element={
          <ProtectedRoute allowedRoles={['profesor']}>
            <ProfesorDashboard />
          </ProtectedRoute>
        }
      />

      {/* Rutas protegidas para jugadores */}
      <Route
        path="/jugador/dashboard"
        element={
          <ProtectedRoute allowedRoles={['jugador']}>
            <JugadorDashboard />
          </ProtectedRoute>
        }
      />

      {/* Ruta catch-all - redirigir a home */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRoutes;