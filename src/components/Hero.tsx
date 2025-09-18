const Hero = () => {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="inicio"
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20"
    >
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-voley-blue-dark via-voley-blue-medium to-voley-blue-vibrant"></div>
      
      {/* Decorative elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-white/10 rounded-full blur-xl"></div>
      <div className="absolute bottom-20 right-10 w-32 h-32 bg-white/5 rounded-full blur-2xl"></div>
      <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-voley-blue-vibrant/20 rounded-full blur-lg"></div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        {/* Main Title */}
        <h1 className="font-poppins font-bold text-4xl sm:text-5xl lg:text-7xl text-white leading-tight mb-6">
          Bienvenido a la
          <span className="block text-transparent bg-gradient-to-r from-white to-gray-300 bg-clip-text">
            Plataforma de Vóley
          </span>
        </h1>

        {/* Subtitle */}
        <p className="font-montserrat text-lg sm:text-xl lg:text-2xl text-gray-200 mb-8 max-w-2xl mx-auto leading-relaxed">
          Gestiona torneos, controla pagos y mantén a tu comunidad conectada. 
          La solución completa para academias y clubes deportivos.
        </p>

        {/* CTA Button */}
        <button
          onClick={() => scrollToSection('servicios')}
          className="bg-voley-red-bright hover:bg-voley-red-dark text-white font-montserrat font-semibold py-4 px-8 rounded-xl shadow-2xl transition-all duration-300 transform hover:scale-105 hover:shadow-voley-red-bright/25 inline-flex items-center space-x-2"
        >
          <span>Conoce Más</span>
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mt-16 pt-16 border-t border-white/20">
          <div className="text-center">
            <div className="font-poppins font-bold text-3xl sm:text-4xl text-white mb-2">100+</div>
            <div className="font-montserrat text-gray-300">Jugadores Activos</div>
          </div>
          <div className="text-center">
            <div className="font-poppins font-bold text-3xl sm:text-4xl text-white mb-2">25+</div>
            <div className="font-montserrat text-gray-300">Torneos Organizados</div>
          </div>
          <div className="text-center">
            <div className="font-poppins font-bold text-3xl sm:text-4xl text-white mb-2">98%</div>
            <div className="font-montserrat text-gray-300">Satisfacción</div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/70 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;