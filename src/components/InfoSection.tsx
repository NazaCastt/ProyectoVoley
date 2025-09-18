const InfoSection = () => {
  const services = [
    {
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: "Gestión de Torneos",
      description: "Organiza y administra torneos de vóley de manera eficiente. Crea calendarios, gestiona equipos y lleva un seguimiento completo de cada competencia.",
      features: ["Calendarios automáticos", "Gestión de equipos", "Resultados en tiempo real"]
    },
    {
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
        </svg>
      ),
      title: "Control de Pagos",
      description: "Administra las cuotas y pagos de jugadores de forma sencilla. Genera reportes, envía recordatorios y mantén las finanzas organizadas.",
      features: ["Recordatorios automáticos", "Reportes detallados", "Historial de pagos"]
    },
    {
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5-5-5 5h5zm-5-8l5-5 5 5H10z" />
        </svg>
      ),
      title: "Notificaciones",
      description: "Mantén a todos informados con un sistema de notificaciones inteligente. Comunica cambios, eventos y actualizaciones importantes.",
      features: ["Notificaciones push", "Comunicación grupal", "Alertas personalizadas"]
    }
  ];

  return (
    <section id="servicios" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="font-poppins font-bold text-4xl lg:text-5xl text-voley-blue-dark mb-6">
            Nuestros Servicios
          </h2>
          <p className="font-montserrat text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto">
            Descubre todas las herramientas que tenemos para hacer crecer tu comunidad deportiva
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100"
            >
              {/* Icon */}
              <div className="text-voley-blue-vibrant mb-6 flex justify-center">
                {service.icon}
              </div>

              {/* Title */}
              <h3 className="font-poppins font-semibold text-xl lg:text-2xl text-voley-blue-dark mb-4 text-center">
                {service.title}
              </h3>

              {/* Description */}
              <p className="font-montserrat text-gray-600 mb-6 text-center leading-relaxed">
                {service.description}
              </p>

              {/* Features */}
              <ul className="space-y-2">
                {service.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center text-sm text-gray-500">
                    <svg className="w-4 h-4 text-voley-blue-vibrant mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="font-montserrat">{feature}</span>
                  </li>
                ))}
              </ul>

              {/* Action Button */}
              <div className="mt-8 text-center">
                <button className="text-voley-blue-vibrant font-montserrat font-semibold hover:text-voley-blue-dark transition-colors duration-200 inline-flex items-center">
                  Saber más
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-voley-blue-vibrant to-voley-blue-medium rounded-2xl p-8 lg:p-12 text-white">
            <h3 className="font-poppins font-bold text-2xl lg:text-3xl mb-4">
              ¿Listo para comenzar?
            </h3>
            <p className="font-montserrat text-lg mb-8 opacity-90">
              Únete a nuestra plataforma y lleva la gestión de tu club al siguiente nivel
            </p>
            <button className="bg-voley-red-bright hover:bg-voley-red-dark text-white font-montserrat font-semibold py-3 px-8 rounded-xl shadow-lg transition-all duration-200 transform hover:scale-105">
              Comenzar Ahora
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InfoSection;