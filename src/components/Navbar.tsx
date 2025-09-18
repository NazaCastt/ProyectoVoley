interface NavbarProps {
  onOpenLogin: () => void;
}

const Navbar = ({ onOpenLogin }: NavbarProps) => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white shadow-lg border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <h1 className="text-2xl font-poppins font-bold text-voley-blue-dark">
              VoleyPro
            </h1>
          </div>

          {/* Navigation Links - Hidden on mobile */}
          <div className="hidden md:flex space-x-8">
            <a
              href="#inicio"
              className="text-voley-blue-medium font-montserrat font-medium hover:text-voley-blue-vibrant transition-colors duration-200"
            >
              Inicio
            </a>
            <a
              href="#servicios"
              className="text-voley-blue-medium font-montserrat font-medium hover:text-voley-blue-vibrant transition-colors duration-200"
            >
              Servicios
            </a>
            <a
              href="#contacto"
              className="text-voley-blue-medium font-montserrat font-medium hover:text-voley-blue-vibrant transition-colors duration-200"
            >
              Contacto
            </a>
          </div>

          {/* Login Button */}
          <div className="flex items-center">
            <button
              onClick={onOpenLogin}
              className="bg-voley-red-bright hover:bg-voley-red-dark text-white font-montserrat font-semibold py-2 px-6 rounded-xl shadow-lg transition-all duration-200 transform hover:scale-105"
            >
              Iniciar Sesión
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button className="text-voley-blue-medium hover:text-voley-blue-vibrant">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;