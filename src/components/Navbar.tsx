import { useState } from 'react';
import { useScrolled } from '../hooks/useScrolled';

interface NavbarProps {
  onOpenLogin: () => void;
}

const Navbar = ({ onOpenLogin }: NavbarProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const scrolled = useScrolled(50);

  const navLinks = [
    { name: 'Inicio', href: '#inicio' },
    { name: 'Servicios', href: '#servicios' },
    { name: 'Contacto', href: '#contacto' },
  ];

  const scrollToSection = (href: string) => {
    const sectionId = href.substring(1);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className={`sticky top-0 z-50 transition-all duration-300 ease-in-out ${
      scrolled 
        ? 'h-16 bg-gradient-to-r from-voley-blue-dark/95 via-voley-blue-medium/95 to-voley-blue-vibrant/95 backdrop-blur-md shadow-lg' 
        : 'h-20 bg-gradient-to-r from-voley-blue-dark/90 via-voley-blue-medium/90 to-voley-blue-vibrant/90 backdrop-blur-sm shadow-md'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
        <div className="flex justify-between items-center h-full">
          
          {/* Logo */}
          <div className="flex-shrink-0">
            <h1 className="text-2xl md:text-3xl font-poppins font-bold text-white hover:text-gray-100 transition-colors duration-200 cursor-pointer">
              VoleyPro
            </h1>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex space-x-8 lg:space-x-12">
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => scrollToSection(link.href)}
                className="relative text-white font-montserrat font-medium hover:text-voley-red-bright transition-all duration-300 group py-2"
              >
                <span className="relative z-10">{link.name}</span>
                {/* Animated underline */}
                <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-voley-red-bright group-hover:w-full transition-all duration-300 ease-out"></div>
              </button>
            ))}
          </div>

          {/* Desktop Login Button */}
          <div className="hidden md:flex items-center">
            <button
              onClick={onOpenLogin}
              className="bg-voley-red-dark hover:bg-voley-red-bright text-white font-montserrat font-semibold py-2.5 px-6 lg:px-8 rounded-xl shadow-lg transition-all duration-300 transform hover:scale-105 hover:shadow-xl border border-transparent hover:border-voley-red-bright/30"
            >
              Iniciar Sesión
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-white hover:text-voley-red-bright transition-colors duration-200 p-2"
              aria-label="Abrir menú móvil"
            >
              <svg 
                className={`h-6 w-6 transition-transform duration-300 ${isMobileMenuOpen ? 'rotate-90' : ''}`} 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                {isMobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`md:hidden transition-all duration-300 ease-in-out ${
          isMobileMenuOpen 
            ? 'max-h-64 opacity-100' 
            : 'max-h-0 opacity-0 overflow-hidden'
        }`}>
          <div className="bg-voley-blue-dark/95 backdrop-blur-md rounded-b-2xl mx-4 mb-4 shadow-xl border border-white/10">
            <div className="px-6 pt-4 pb-6 space-y-4">
              {navLinks.map((link) => (
                <button
                  key={link.name}
                  onClick={() => scrollToSection(link.href)}
                  className="block w-full text-left text-white font-montserrat font-medium hover:text-voley-red-bright transition-colors duration-200 py-2 px-2 rounded-lg hover:bg-white/5"
                >
                  {link.name}
                </button>
              ))}
              
              {/* Mobile Login Button */}
              <button
                onClick={() => {
                  onOpenLogin();
                  setIsMobileMenuOpen(false);
                }}
                className="w-full mt-4 bg-voley-red-dark hover:bg-voley-red-bright text-white font-montserrat font-semibold py-3 px-6 rounded-xl shadow-lg transition-all duration-300 transform hover:scale-105"
              >
                Iniciar Sesión
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;