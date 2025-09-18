import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

// Interfaces para tipos de datos
interface Logro {
  id: number;
  titulo: string;
  descripcion: string;
  fecha: string;
  categoria: 'Torneo' | 'Individual' | 'Equipo' | 'Academico';
}

interface Usuario {
  id: number;
  nombres: string;
  apellidos: string;
  fechaNacimiento: string;
  cedula: string;
  genero: 'Masculino' | 'Femenino' | 'Otro';
  email: string;
  celular: string;
  direccion: string;
  contactoEmergencia: string;
  tipo: 'jugador' | 'profesor';
  // Campos específicos para jugadores
  posicion?: string;
  nivelExperiencia?: string;
  estado: 'Activo' | 'Inactivo';
  fechaRegistro: string;
  logros: Logro[];
}

interface Jugador {
  id: number;
  nombre: string;
  categoria: string;
  estado: 'Activo' | 'Inactivo';
}

interface Pago {
  id: number;
  usuarioId: number;
  usuarioNombre: string;
  periodo: { mes: number; año: number };
  monto: number;
  comprobante?: string;
  estado: 'atraso' | 'pendiente' | 'pagado' | 'rechazado';
  observaciones?: string;
  fechaRegistro: string;
}

interface ModalNotificacion {
  isOpen: boolean;
  tipo: 'exito' | 'error' | 'info' | 'advertencia';
  titulo: string;
  mensaje: string;
}

type SeccionActiva = 'usuarios' | 'mensualidades';
type FiltroUsuario = 'todos' | 'jugador' | 'profesor';
type EstadoPago = 'atraso' | 'pendiente' | 'pagado' | 'rechazado';

const ProfesorDashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  // Estados para la navegación entre secciones
  const [seccionActiva, setSeccionActiva] = useState<SeccionActiva>('usuarios');

  // Estados para usuarios
  const [usuarios, setUsuarios] = useState<Usuario[]>([
    {
      id: 1,
      nombres: 'Ana',
      apellidos: 'García López',
      fechaNacimiento: '2005-03-15',
      cedula: '1234567890',
      genero: 'Femenino',
      email: 'ana.garcia@email.com',
      celular: '3001234567',
      direccion: 'Calle 123 #45-67',
      contactoEmergencia: '3009876543',
      tipo: 'jugador',
      posicion: 'Atacante',
      nivelExperiencia: 'Intermedio',
      estado: 'Activo',
      fechaRegistro: '2025-01-15',
      logros: [
        { id: 1, titulo: 'Mejor Atacante', descripcion: 'Reconocimiento por mejor atacante del torneo regional', fecha: '2025-06-15', categoria: 'Torneo' },
        { id: 2, titulo: 'Jugadora Destacada', descripcion: 'Jugadora más destacada del mes', fecha: '2025-08-01', categoria: 'Individual' }
      ]
    },
    {
      id: 2,
      nombres: 'Carlos',
      apellidos: 'López Martínez',
      fechaNacimiento: '2004-07-22',
      cedula: '0987654321',
      genero: 'Masculino',
      email: 'carlos.lopez@email.com',
      celular: '3007654321',
      direccion: 'Carrera 67 #89-12',
      contactoEmergencia: '3001234567',
      tipo: 'jugador',
      posicion: 'Libero',
      nivelExperiencia: 'Avanzado',
      estado: 'Activo',
      fechaRegistro: '2025-01-10',
      logros: [
        { id: 3, titulo: 'Mejor Libero', descripcion: 'Mejor libero del campeonato intercolegial', fecha: '2025-07-20', categoria: 'Torneo' }
      ]
    },
    {
      id: 3,
      nombres: 'María',
      apellidos: 'Rodríguez Silva',
      fechaNacimiento: '1985-12-03',
      cedula: '1122334455',
      genero: 'Femenino',
      email: 'maria.rodriguez@email.com',
      celular: '3005566778',
      direccion: 'Avenida 45 #12-34',
      contactoEmergencia: '3002233445',
      tipo: 'profesor',
      estado: 'Activo',
      fechaRegistro: '2024-08-01',
      logros: [
        { id: 4, titulo: 'Entrenador del Año', descripcion: 'Reconocimiento como entrenador destacado', fecha: '2024-12-15', categoria: 'Academico' }
      ]
    }
  ]);

  // Estados para el modal de usuario
  const [mostrarModal, setMostrarModal] = useState(false);
  const [mostrarModalVer, setMostrarModalVer] = useState(false);
  const [mostrarModalEditar, setMostrarModalEditar] = useState(false);
  const [usuarioSeleccionado, setUsuarioSeleccionado] = useState<Usuario | null>(null);
  const [filtroUsuario, setFiltroUsuario] = useState<FiltroUsuario>('todos');
  const [busqueda, setBusqueda] = useState('');

  // Estados para el formulario de usuario
  const [formUsuario, setFormUsuario] = useState({
    nombres: '',
    apellidos: '',
    fechaNacimiento: '',
    cedula: '',
    genero: '',
    email: '',
    celular: '',
    direccion: '',
    contactoEmergencia: '',
    tipo: '',
    posicion: '',
    nivelExperiencia: ''
  });

  // Estados para logros
  const [nuevoLogro, setNuevoLogro] = useState({
    titulo: '',
    descripcion: '',
    fecha: '',
    categoria: ''
  });

  // Estados para jugadores (mantenido para compatibilidad)
  const [jugadores, setJugadores] = useState<Jugador[]>([
    { id: 1, nombre: 'Ana García', categoria: 'Juvenil Femenino', estado: 'Activo' },
    { id: 2, nombre: 'Carlos López', categoria: 'Sub-18 Masculino', estado: 'Activo' },
    { id: 3, nombre: 'María Rodríguez', categoria: 'Juvenil Femenino', estado: 'Activo' },
    { id: 4, nombre: 'Juan Martínez', categoria: 'Sub-16 Masculino', estado: 'Inactivo' },
    { id: 5, nombre: 'Laura Sánchez', categoria: 'Juvenil Femenino', estado: 'Activo' },
  ]);

  // Estados para el formulario de jugadores
  const [nombreJugador, setNombreJugador] = useState('');
  const [categoriaJugador, setCategoriaJugador] = useState('');

  // Estados para pagos
  const [pagos, setPagos] = useState<Pago[]>([
    { 
      id: 1, 
      usuarioId: 1, 
      usuarioNombre: 'Ana García', 
      periodo: { mes: 9, año: 2025 },
      monto: 100000, 
      fechaRegistro: '2025-09-15', 
      estado: 'pagado',
      comprobante: 'comprobante_001.pdf'
    },
    { 
      id: 2, 
      usuarioId: 2, 
      usuarioNombre: 'Carlos López', 
      periodo: { mes: 9, año: 2025 },
      monto: 100000, 
      fechaRegistro: '2025-09-20', 
      estado: 'pendiente'
    },
    { 
      id: 3, 
      usuarioId: 3, 
      usuarioNombre: 'María Rodríguez', 
      periodo: { mes: 8, año: 2025 },
      monto: 100000, 
      fechaRegistro: '2025-08-10', 
      estado: 'pagado',
      comprobante: 'comprobante_002.pdf'
    }
  ]);

  // Estados para el modal de registro de pago
  const [mostrarModalPago, setMostrarModalPago] = useState(false);
  const [formPago, setFormPago] = useState({
    usuarioId: 0,
    periodo: { mes: new Date().getMonth() + 1, año: new Date().getFullYear() },
    monto: 100000,
    comprobante: '',
    estado: 'pendiente' as 'atraso' | 'pendiente' | 'pagado' | 'rechazado',
    observaciones: ''
  });

  // Estados para búsqueda y filtros de pagos
  const [busquedaUsuarioPago, setBusquedaUsuarioPago] = useState('');
  const [usuariosBusqueda, setUsuariosBusqueda] = useState(usuarios);
  const [mostrarListaUsuariosPago, setMostrarListaUsuariosPago] = useState(false);
  const [filtroEstadoPago, setFiltroEstadoPago] = useState<'todos' | 'atraso' | 'pendiente' | 'pagado' | 'rechazado'>('todos');
  const [mostrarModalDetalles, setMostrarModalDetalles] = useState(false);
  const [pagoSeleccionado, setPagoSeleccionado] = useState<Pago | null>(null);
  const [imagenComprobante, setImagenComprobante] = useState<File | null>(null);
  const [previewImagen, setPreviewImagen] = useState<string>('');

  // Estados para modal de modificar estado
  const [mostrarModalModificarEstado, setMostrarModalModificarEstado] = useState(false);
  const [nuevoEstado, setNuevoEstado] = useState<EstadoPago>('pendiente');
  const [observaciones, setObservaciones] = useState('');

  // Estado para modal de notificación
  const [modalNotificacion, setModalNotificacion] = useState<ModalNotificacion>({
    isOpen: false,
    tipo: 'info',
    titulo: '',
    mensaje: ''
  });

  // Función para mostrar notificaciones
  const mostrarNotificacion = (tipo: 'exito' | 'error' | 'info' | 'advertencia', titulo: string, mensaje: string) => {
    setModalNotificacion({
      isOpen: true,
      tipo,
      titulo,
      mensaje
    });
  };

  // Función para cerrar notificación
  const cerrarNotificacion = () => {
    setModalNotificacion({
      ...modalNotificacion,
      isOpen: false
    });
  };

  // Función para abrir modal de modificar estado
  const abrirModalModificarEstado = (pago: Pago) => {
    setPagoSeleccionado(pago);
    setNuevoEstado(pago.estado);
    setObservaciones(pago.observaciones || '');
    setMostrarModalModificarEstado(true);
  };

  // Función para cerrar modal de modificar estado
  const cerrarModalModificarEstado = () => {
    setMostrarModalModificarEstado(false);
    setPagoSeleccionado(null);
    setNuevoEstado('pendiente');
    setObservaciones('');
  };

  // Función para guardar cambios de estado
  const handleModificarEstado = (e: React.FormEvent) => {
    e.preventDefault();
    if (!pagoSeleccionado) return;

    const pagosActualizados = pagos.map(p =>
      p.id === pagoSeleccionado.id 
        ? { ...p, estado: nuevoEstado, observaciones: nuevoEstado === 'rechazado' ? observaciones : p.observaciones }
        : p
    );
    setPagos(pagosActualizados);
    
    cerrarModalModificarEstado();
    mostrarNotificacion('exito', '✅ Estado Actualizado', 'El estado del pago ha sido actualizado correctamente');
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  // Funciones para gestión de usuarios
  const usuariosFiltrados = usuarios.filter(usuario => {
    // Filtrar por tipo
    const pasaFiltroTipo = filtroUsuario === 'todos' || usuario.tipo === filtroUsuario;
    
    // Filtrar por búsqueda (nombre completo o cédula)
    const nombreCompleto = `${usuario.nombres} ${usuario.apellidos}`.toLowerCase();
    const cedula = usuario.cedula.toLowerCase();
    const terminoBusqueda = busqueda.toLowerCase().trim();
    
    const pasaFiltroBusqueda = terminoBusqueda === '' || 
      nombreCompleto.includes(terminoBusqueda) || 
      cedula.includes(terminoBusqueda);
    
    return pasaFiltroTipo && pasaFiltroBusqueda;
  });

  const totalUsuarios = usuarios.length;
  const totalJugadores = usuarios.filter(u => u.tipo === 'jugador').length;
  const totalProfesores = usuarios.filter(u => u.tipo === 'profesor').length;

  const handleInputChange = (campo: string, valor: string) => {
    setFormUsuario(prev => ({
      ...prev,
      [campo]: valor
    }));
  };

  const handleSubmitUsuario = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validación básica
    if (!formUsuario.nombres || !formUsuario.apellidos || !formUsuario.email || !formUsuario.tipo) {
      mostrarNotificacion('error', '⚠️ Campos Obligatorios', 'Por favor completa todos los campos obligatorios');
      return;
    }

    if (formUsuario.tipo === 'jugador' && (!formUsuario.posicion || !formUsuario.nivelExperiencia)) {
      mostrarNotificacion('error', '⚠️ Datos Incompletos', 'Por favor completa la posición y nivel de experiencia para jugadores');
      return;
    }

    const nuevoUsuario: Usuario = {
      id: Math.max(...usuarios.map(u => u.id), 0) + 1,
      nombres: formUsuario.nombres,
      apellidos: formUsuario.apellidos,
      fechaNacimiento: formUsuario.fechaNacimiento,
      cedula: formUsuario.cedula,
      genero: formUsuario.genero as 'Masculino' | 'Femenino' | 'Otro',
      email: formUsuario.email,
      celular: formUsuario.celular,
      direccion: formUsuario.direccion,
      contactoEmergencia: formUsuario.contactoEmergencia,
      tipo: formUsuario.tipo as 'jugador' | 'profesor',
      posicion: formUsuario.tipo === 'jugador' ? formUsuario.posicion : undefined,
      nivelExperiencia: formUsuario.tipo === 'jugador' ? formUsuario.nivelExperiencia : undefined,
      estado: 'Activo',
      fechaRegistro: new Date().toISOString().split('T')[0],
      logros: []
    };

    setUsuarios([...usuarios, nuevoUsuario]);
    setMostrarModal(false);
    
    // Limpiar formulario
    setFormUsuario({
      nombres: '',
      apellidos: '',
      fechaNacimiento: '',
      cedula: '',
      genero: '',
      email: '',
      celular: '',
      direccion: '',
      contactoEmergencia: '',
      tipo: '',
      posicion: '',
      nivelExperiencia: ''
    });
  };

  // Función para actualizar usuario
  const handleActualizarUsuario = () => {
    if (!usuarioSeleccionado) return;
    
    const usuariosActualizados = usuarios.map(usuario => 
      usuario.id === usuarioSeleccionado.id ? usuarioSeleccionado : usuario
    );
    
    setUsuarios(usuariosActualizados);
    setMostrarModalEditar(false);
    setUsuarioSeleccionado(null);
  };

  // Función para añadir jugador (mantenida para compatibilidad)
  const handleAnadirJugador = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nombreJugador.trim() || !categoriaJugador.trim()) {
      mostrarNotificacion('advertencia', '⚠️ Datos Incompletos', 'Por favor completa todos los campos');
      return;
    }

    const nuevoJugador: Jugador = {
      id: Math.max(...jugadores.map(j => j.id)) + 1,
      nombre: nombreJugador.trim(),
      categoria: categoriaJugador.trim(),
      estado: 'Activo'
    };

    setJugadores([...jugadores, nuevoJugador]);
    setNombreJugador('');
    setCategoriaJugador('');
  };

  // Función para registrar pago
  const handleRegistrarPago = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formPago.usuarioId) {
      mostrarNotificacion('advertencia', '⚠️ Usuario Requerido', 'Por favor selecciona un usuario');
      return;
    }

    const usuario = usuarios.find(u => u.id === formPago.usuarioId);
    if (!usuario) {
      mostrarNotificacion('error', '❌ Error', 'Usuario no encontrado');
      return;
    }

    const nuevoPago: Pago = {
      id: Math.max(...pagos.map(p => p.id), 0) + 1,
      usuarioId: usuario.id,
      usuarioNombre: `${usuario.nombres} ${usuario.apellidos}`,
      periodo: formPago.periodo,
      monto: formPago.monto,
      comprobante: formPago.comprobante,
      estado: formPago.estado,
      observaciones: formPago.observaciones,
      fechaRegistro: new Date().toISOString().split('T')[0]
    };

    setPagos([...pagos, nuevoPago]);
    setMostrarModalPago(false);
    limpiarFormularioPago();
    mostrarNotificacion('exito', '✅ Éxito', 'Pago registrado correctamente');
  };

  // Función para formatear moneda
  const formatearMoneda = (monto: number) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0
    }).format(monto);
  };

  // Función para calcular edad
  const calcularEdad = (fechaNacimiento: string) => {
    const hoy = new Date();
    const nacimiento = new Date(fechaNacimiento);
    let edad = hoy.getFullYear() - nacimiento.getFullYear();
    const diferenciaMeses = hoy.getMonth() - nacimiento.getMonth();
    if (diferenciaMeses < 0 || (diferenciaMeses === 0 && hoy.getDate() < nacimiento.getDate())) {
      edad--;
    }
    return edad;
  };

  // Funciones para búsqueda de usuarios en pagos
  const filtrarUsuariosBusqueda = (termino: string) => {
    if (!termino.trim()) {
      setUsuariosBusqueda(usuarios);
      return;
    }
    
    const usuariosEncontrados = usuarios.filter(usuario => 
      usuario.nombres.toLowerCase().includes(termino.toLowerCase()) ||
      usuario.apellidos.toLowerCase().includes(termino.toLowerCase()) ||
      usuario.cedula.includes(termino)
    );
    setUsuariosBusqueda(usuariosEncontrados);
  };

  const seleccionarUsuarioPago = (usuario: Usuario) => {
    setFormPago(prev => ({ ...prev, usuarioId: usuario.id }));
    setBusquedaUsuarioPago(`${usuario.nombres} ${usuario.apellidos} - ${usuario.cedula}`);
    setMostrarListaUsuariosPago(false);
  };

  // Función para filtrar pagos por estado
  const pagosFiltrados = pagos.filter(pago => 
    filtroEstadoPago === 'todos' ? true : pago.estado === filtroEstadoPago
  );

  // Función para limpiar formulario de pago
  const limpiarFormularioPago = () => {
    setFormPago({
      usuarioId: 0,
      periodo: { mes: new Date().getMonth() + 1, año: new Date().getFullYear() },
      monto: 100000,
      comprobante: '',
      estado: 'pendiente',
      observaciones: ''
    });
    setBusquedaUsuarioPago('');
    setUsuariosBusqueda(usuarios);
    setMostrarListaUsuariosPago(false);
    setImagenComprobante(null);
    setPreviewImagen('');
  };

  // Función para manejar subida de imagen
  const manejarSubidaImagen = (e: React.ChangeEvent<HTMLInputElement>) => {
    const archivo = e.target.files?.[0];
    if (archivo && archivo.type.startsWith('image/')) {
      setImagenComprobante(archivo);
      
      // Crear preview de la imagen
      const reader = new FileReader();
      reader.onload = (event) => {
        setPreviewImagen(event.target?.result as string);
      };
      reader.readAsDataURL(archivo);
      
      // Actualizar el nombre del comprobante con el nombre del archivo
      setFormPago(prev => ({ ...prev, comprobante: archivo.name }));
    } else {
      mostrarNotificacion('advertencia', '⚠️ Archivo Inválido', 'Por favor selecciona un archivo de imagen válido (JPG, PNG, GIF)');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div>
              <h1 className="text-3xl font-poppins font-bold text-voley-blue-dark">
                Panel del Profesor
              </h1>
              <p className="text-sm font-montserrat text-gray-600 mt-1">
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

      {/* Navigation Tabs */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex space-x-8">
            <button
              onClick={() => setSeccionActiva('usuarios')}
              className={`py-4 px-1 border-b-2 font-montserrat font-medium text-sm transition-colors duration-200 ${
                seccionActiva === 'usuarios'
                  ? 'border-voley-blue-medium text-voley-blue-medium'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Usuarios
            </button>
            <button
              onClick={() => setSeccionActiva('mensualidades')}
              className={`py-4 px-1 border-b-2 font-montserrat font-medium text-sm transition-colors duration-200 ${
                seccionActiva === 'mensualidades'
                  ? 'border-voley-blue-medium text-voley-blue-medium'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Mensualidades
            </button>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Sección Usuarios */}
        {seccionActiva === 'usuarios' && (
          <div className="space-y-6">
            {/* Dashboard de Contadores */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
                <div className="flex items-center">
                  <div className="p-3 bg-blue-100 rounded-full">
                    <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-montserrat text-gray-600">Total Usuarios</p>
                    <p className="text-2xl font-poppins font-bold text-gray-900">{totalUsuarios}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
                <div className="flex items-center">
                  <div className="p-3 bg-green-100 rounded-full">
                    <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-montserrat text-gray-600">Total Jugadores</p>
                    <p className="text-2xl font-poppins font-bold text-gray-900">{totalJugadores}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
                <div className="flex items-center">
                  <div className="p-3 bg-purple-100 rounded-full">
                    <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-montserrat text-gray-600">Total Profesores</p>
                    <p className="text-2xl font-poppins font-bold text-gray-900">{totalProfesores}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
                <button
                  onClick={() => setMostrarModal(true)}
                  className="w-full bg-voley-red-dark hover:bg-voley-red-bright text-white font-montserrat font-semibold py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  <span>Añadir Usuario</span>
                </button>
              </div>
            </div>

            {/* Filtros */}
            <div className="bg-white rounded-lg shadow-md p-6">
              {/* Campo de búsqueda */}
              <div className="mb-6">
                <h3 className="text-lg font-poppins font-semibold text-voley-blue-dark mb-3">
                  Buscar Usuario:
                </h3>
                <div className="relative max-w-md">
                  <input
                    type="text"
                    placeholder="Buscar por nombre o cédula..."
                    value={busqueda}
                    onChange={(e) => setBusqueda(e.target.value)}
                    className="w-full px-4 py-3 pl-10 border border-gray-300 rounded-lg font-montserrat focus:outline-none focus:ring-2 focus:ring-voley-blue-medium focus:border-transparent"
                  />
                  <svg
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                  </svg>
                </div>
              </div>

              {/* Filtros por tipo */}
              <div className="flex flex-wrap gap-4 items-center">
                <h3 className="text-lg font-poppins font-semibold text-voley-blue-dark">
                  Filtrar por tipo:
                </h3>
                <div className="flex space-x-2">
                  <button
                    onClick={() => setFiltroUsuario('todos')}
                    className={`px-4 py-2 rounded-lg font-montserrat font-medium transition-colors duration-200 ${
                      filtroUsuario === 'todos'
                        ? 'bg-voley-blue-medium text-white'
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                  >
                    Todos ({totalUsuarios})
                  </button>
                  <button
                    onClick={() => setFiltroUsuario('jugador')}
                    className={`px-4 py-2 rounded-lg font-montserrat font-medium transition-colors duration-200 ${
                      filtroUsuario === 'jugador'
                        ? 'bg-voley-blue-medium text-white'
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                  >
                    Jugadores ({totalJugadores})
                  </button>
                  <button
                    onClick={() => setFiltroUsuario('profesor')}
                    className={`px-4 py-2 rounded-lg font-montserrat font-medium transition-colors duration-200 ${
                      filtroUsuario === 'profesor'
                        ? 'bg-voley-blue-medium text-white'
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                  >
                    Profesores ({totalProfesores})
                  </button>
                </div>
              </div>
            </div>

            {/* Tabla de Usuarios */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="px-6 py-4 bg-voley-blue-medium">
                <h2 className="text-xl font-poppins font-semibold text-white">
                  Lista de Usuarios ({usuariosFiltrados.length})
                </h2>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-montserrat font-medium text-gray-500 uppercase tracking-wider">
                        ID
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-montserrat font-medium text-gray-500 uppercase tracking-wider">
                        Nombre Completo
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-montserrat font-medium text-gray-500 uppercase tracking-wider">
                        Edad
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-montserrat font-medium text-gray-500 uppercase tracking-wider">
                        Tipo
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-montserrat font-medium text-gray-500 uppercase tracking-wider">
                        Email
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-montserrat font-medium text-gray-500 uppercase tracking-wider">
                        Celular
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
                    {usuariosFiltrados.map((usuario) => (
                      <tr key={usuario.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-montserrat font-medium text-gray-900">
                          {usuario.id}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div>
                            <div className="text-sm font-montserrat font-medium text-gray-900">
                              {usuario.nombres} {usuario.apellidos}
                            </div>
                            <div className="text-sm font-montserrat text-gray-500">
                              {usuario.cedula}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-montserrat text-gray-900">
                          {usuario.fechaNacimiento ? calcularEdad(usuario.fechaNacimiento) : 'N/A'} años
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex px-3 py-1 text-xs font-montserrat font-semibold rounded-full ${
                            usuario.tipo === 'jugador'
                              ? 'bg-green-100 text-green-800'
                              : 'bg-purple-100 text-purple-800'
                          }`}>
                            {usuario.tipo === 'jugador' ? '🏐 Jugador' : '👨‍🏫 Profesor'}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-montserrat text-gray-900">
                          {usuario.email}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-montserrat text-gray-900">
                          {usuario.celular}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex px-3 py-1 text-xs font-montserrat font-semibold rounded-full ${
                            usuario.estado === 'Activo'
                              ? 'bg-green-100 text-green-800'
                              : 'bg-red-100 text-red-800'
                          }`}>
                            {usuario.estado}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <button 
                            onClick={() => {
                              setUsuarioSeleccionado(usuario);
                              setMostrarModalVer(true);
                            }}
                            className="text-voley-blue-vibrant hover:text-voley-blue-dark font-montserrat font-medium transition-colors mr-4"
                          >
                            Ver
                          </button>
                          <button 
                            onClick={() => {
                              setUsuarioSeleccionado(usuario);
                              setMostrarModalEditar(true);
                            }}
                            className="text-yellow-600 hover:text-yellow-800 font-montserrat font-medium transition-colors"
                          >
                            Editar
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Sección Mensualidades */}
        {seccionActiva === 'mensualidades' && (
          <div className="space-y-6">
            {/* Botón para abrir modal de registro de pago */}
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-poppins font-bold text-voley-blue-dark">
                Gestión de Mensualidades
              </h2>
              <button
                onClick={() => setMostrarModalPago(true)}
                className="bg-voley-red-dark hover:bg-voley-red-bright text-white font-montserrat font-semibold py-2 px-4 rounded-lg transition-colors duration-200 flex items-center space-x-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                <span>Registrar Pago</span>
              </button>
            </div>

            {/* Filtros */}
            <div className="bg-white rounded-lg shadow-md p-4 mb-4">
              <div className="flex flex-wrap items-center gap-4">
                <label className="text-sm font-montserrat font-medium text-gray-700">
                  Filtrar por estado:
                </label>
                <select
                  value={filtroEstadoPago}
                  onChange={(e) => setFiltroEstadoPago(e.target.value as 'todos' | 'atraso' | 'pendiente' | 'pagado' | 'rechazado')}
                  className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-voley-blue-medium focus:border-transparent"
                >
                  <option value="todos">Todos los estados</option>
                  <option value="atraso">En Atraso</option>
                  <option value="pendiente">Pendiente</option>
                  <option value="pagado">Pagado</option>
                  <option value="rechazado">Rechazado</option>
                </select>
                <div className="text-sm text-gray-600">
                  Mostrando {pagosFiltrados.length} de {pagos.length} pagos
                </div>
              </div>
            </div>

            {/* Lista de pagos */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="px-6 py-4 bg-voley-blue-medium">
                <h3 className="text-lg font-poppins font-semibold text-white">
                  Historial de Pagos ({pagos.length})
                </h3>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-montserrat font-medium text-gray-500 uppercase tracking-wider">
                        Usuario
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-montserrat font-medium text-gray-500 uppercase tracking-wider">
                        Período
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-montserrat font-medium text-gray-500 uppercase tracking-wider">
                        Monto
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-montserrat font-medium text-gray-500 uppercase tracking-wider">
                        Estado
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-montserrat font-medium text-gray-500 uppercase tracking-wider">
                        Observaciones
                      </th>
                      <th className="px-6 py-3 text-center text-xs font-montserrat font-medium text-gray-500 uppercase tracking-wider">
                        Acciones
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {pagosFiltrados.length === 0 ? (
                      <tr>
                        <td colSpan={6} className="px-6 py-8 text-center text-gray-500">
                          {filtroEstadoPago === 'todos' ? 'No hay pagos registrados' : `No hay pagos con estado "${filtroEstadoPago}"`}
                        </td>
                      </tr>
                    ) : (
                      pagosFiltrados.map((pago) => (
                        <tr key={pago.id} className="hover:bg-gray-50 transition-colors">
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-montserrat font-medium text-gray-900">
                            {usuarios.find(u => u.id === pago.usuarioId)?.nombres} {usuarios.find(u => u.id === pago.usuarioId)?.apellidos}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-montserrat text-gray-900">
                            {pago.periodo.mes}/{pago.periodo.año}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-montserrat text-gray-900">
                            ${pago.monto.toLocaleString()}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`inline-flex px-3 py-1 text-xs font-montserrat font-semibold rounded-full ${
                              pago.estado === 'pagado' ? 'bg-green-100 text-green-800' :
                              pago.estado === 'pendiente' ? 'bg-yellow-100 text-yellow-800' :
                              pago.estado === 'atraso' ? 'bg-orange-100 text-orange-800' :
                              'bg-red-100 text-red-800'
                            }`}>
                              {pago.estado.charAt(0).toUpperCase() + pago.estado.slice(1)}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-montserrat text-gray-500">
                            {pago.observaciones || '-'}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-center">
                            <div className="flex justify-center space-x-2">
                              <button
                                onClick={() => {
                                  setPagoSeleccionado(pago);
                                  setMostrarModalDetalles(true);
                                }}
                                className="bg-voley-blue-medium hover:bg-voley-blue-dark text-white font-montserrat text-xs py-1 px-3 rounded-lg transition-colors duration-200"
                              >
                                Ver Detalles
                              </button>
                              <button
                                onClick={() => abrirModalModificarEstado(pago)}
                                className="bg-voley-red-dark hover:bg-voley-red-bright text-white font-montserrat text-xs py-1 px-3 rounded-lg transition-colors duration-200"
                              >
                                Modificar Estado
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

      {/* Modal para añadir usuario */}
      {mostrarModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-11/12 max-w-4xl shadow-lg rounded-md bg-white">
            <div className="mt-3">
              {/* Header del modal */}
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-poppins font-bold text-voley-blue-dark">
                  Añadir Nuevo Usuario
                </h3>
                <button
                  onClick={() => setMostrarModal(false)}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Formulario */}
              <form onSubmit={handleSubmitUsuario} className="space-y-6">
                {/* Información Personal */}
                <div className="border-b border-gray-200 pb-6">
                  <h4 className="text-lg font-poppins font-semibold text-gray-800 mb-4">Información Personal</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-montserrat font-medium text-gray-700 mb-2">
                        Nombres *
                      </label>
                      <input
                        type="text"
                        value={formUsuario.nombres}
                        onChange={(e) => handleInputChange('nombres', e.target.value)}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-voley-blue-medium focus:border-transparent"
                        placeholder="Nombres"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-montserrat font-medium text-gray-700 mb-2">
                        Apellidos *
                      </label>
                      <input
                        type="text"
                        value={formUsuario.apellidos}
                        onChange={(e) => handleInputChange('apellidos', e.target.value)}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-voley-blue-medium focus:border-transparent"
                        placeholder="Apellidos"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-montserrat font-medium text-gray-700 mb-2">
                        Fecha de Nacimiento
                      </label>
                      <input
                        type="date"
                        value={formUsuario.fechaNacimiento}
                        onChange={(e) => handleInputChange('fechaNacimiento', e.target.value)}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-voley-blue-medium focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-montserrat font-medium text-gray-700 mb-2">
                        Cédula de Identidad
                      </label>
                      <input
                        type="text"
                        value={formUsuario.cedula}
                        onChange={(e) => handleInputChange('cedula', e.target.value)}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-voley-blue-medium focus:border-transparent"
                        placeholder="Número de cédula"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-montserrat font-medium text-gray-700 mb-2">
                        Género
                      </label>
                      <select
                        value={formUsuario.genero}
                        onChange={(e) => handleInputChange('genero', e.target.value)}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-voley-blue-medium focus:border-transparent"
                      >
                        <option value="">Seleccionar género</option>
                        <option value="Masculino">Masculino</option>
                        <option value="Femenino">Femenino</option>
                        <option value="Otro">Otro</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Información de Contacto */}
                <div className="border-b border-gray-200 pb-6">
                  <h4 className="text-lg font-poppins font-semibold text-gray-800 mb-4">Información de Contacto</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-montserrat font-medium text-gray-700 mb-2">
                        Email *
                      </label>
                      <input
                        type="email"
                        value={formUsuario.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-voley-blue-medium focus:border-transparent"
                        placeholder="correo@ejemplo.com"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-montserrat font-medium text-gray-700 mb-2">
                        Celular
                      </label>
                      <input
                        type="tel"
                        value={formUsuario.celular}
                        onChange={(e) => handleInputChange('celular', e.target.value)}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-voley-blue-medium focus:border-transparent"
                        placeholder="3001234567"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-montserrat font-medium text-gray-700 mb-2">
                        Dirección
                      </label>
                      <input
                        type="text"
                        value={formUsuario.direccion}
                        onChange={(e) => handleInputChange('direccion', e.target.value)}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-voley-blue-medium focus:border-transparent"
                        placeholder="Calle 123 #45-67"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-montserrat font-medium text-gray-700 mb-2">
                        Contacto de Emergencia
                      </label>
                      <input
                        type="tel"
                        value={formUsuario.contactoEmergencia}
                        onChange={(e) => handleInputChange('contactoEmergencia', e.target.value)}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-voley-blue-medium focus:border-transparent"
                        placeholder="3009876543"
                      />
                    </div>
                  </div>
                </div>

                {/* Tipo de Usuario */}
                <div className="border-b border-gray-200 pb-6">
                  <h4 className="text-lg font-poppins font-semibold text-gray-800 mb-4">Tipo de Usuario</h4>
                  <div>
                    <label className="block text-sm font-montserrat font-medium text-gray-700 mb-2">
                      Seleccionar Tipo *
                    </label>
                    <select
                      value={formUsuario.tipo}
                      onChange={(e) => handleInputChange('tipo', e.target.value)}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-voley-blue-medium focus:border-transparent"
                      required
                    >
                      <option value="">Seleccionar tipo</option>
                      <option value="jugador">🏐 Jugador</option>
                      <option value="profesor">👨‍🏫 Profesor</option>
                    </select>
                  </div>
                </div>

                {/* Campos específicos para jugadores */}
                {formUsuario.tipo === 'jugador' && (
                  <div className="border-b border-gray-200 pb-6">
                    <h4 className="text-lg font-poppins font-semibold text-gray-800 mb-4">Información del Jugador</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-montserrat font-medium text-gray-700 mb-2">
                          Posición *
                        </label>
                        <select
                          value={formUsuario.posicion}
                          onChange={(e) => handleInputChange('posicion', e.target.value)}
                          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-voley-blue-medium focus:border-transparent"
                          required
                        >
                          <option value="">Seleccionar posición</option>
                          <option value="Atacante">Atacante</option>
                          <option value="Central">Central</option>
                          <option value="Libero">Líbero</option>
                          <option value="Armador">Armador</option>
                          <option value="Opuesto">Opuesto</option>
                          <option value="Receptor">Receptor</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-montserrat font-medium text-gray-700 mb-2">
                          Nivel de Experiencia *
                        </label>
                        <select
                          value={formUsuario.nivelExperiencia}
                          onChange={(e) => handleInputChange('nivelExperiencia', e.target.value)}
                          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-voley-blue-medium focus:border-transparent"
                          required
                        >
                          <option value="">Seleccionar nivel</option>
                          <option value="Principiante">Principiante</option>
                          <option value="Intermedio">Intermedio</option>
                          <option value="Avanzado">Avanzado</option>
                          <option value="Profesional">Profesional</option>
                        </select>
                      </div>
                    </div>
                  </div>
                )}

                {/* Botones del modal */}
                <div className="flex justify-end space-x-4 pt-6">
                  <button
                    type="button"
                    onClick={() => setMostrarModal(false)}
                    className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-montserrat font-semibold py-2 px-6 rounded-lg transition-colors duration-200"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="bg-voley-red-dark hover:bg-voley-red-bright text-white font-montserrat font-semibold py-2 px-6 rounded-lg transition-colors duration-200"
                  >
                    Añadir Usuario
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Modal Ver Usuario */}
      {mostrarModalVer && usuarioSeleccionado && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50 flex items-center justify-center">
          <div className="relative bg-white rounded-xl shadow-2xl w-full max-w-4xl mx-4 max-h-[90vh] overflow-y-auto">
            <div className="p-8">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-poppins font-bold text-voley-blue-dark">
                  Información del Usuario
                </h2>
                <button
                  onClick={() => setMostrarModalVer(false)}
                  className="text-gray-400 hover:text-gray-600 text-2xl font-bold"
                >
                  ×
                </button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Información Personal */}
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="text-lg font-poppins font-semibold text-voley-blue-dark mb-4">
                    Información Personal
                  </h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="font-montserrat font-medium text-gray-600">Nombres:</span>
                      <span className="font-montserrat text-gray-900">{usuarioSeleccionado.nombres}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-montserrat font-medium text-gray-600">Apellidos:</span>
                      <span className="font-montserrat text-gray-900">{usuarioSeleccionado.apellidos}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-montserrat font-medium text-gray-600">Cédula:</span>
                      <span className="font-montserrat text-gray-900">{usuarioSeleccionado.cedula}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-montserrat font-medium text-gray-600">Fecha de Nacimiento:</span>
                      <span className="font-montserrat text-gray-900">{usuarioSeleccionado.fechaNacimiento}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-montserrat font-medium text-gray-600">Edad:</span>
                      <span className="font-montserrat text-gray-900">{calcularEdad(usuarioSeleccionado.fechaNacimiento)} años</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-montserrat font-medium text-gray-600">Género:</span>
                      <span className="font-montserrat text-gray-900">{usuarioSeleccionado.genero}</span>
                    </div>
                  </div>
                </div>

                {/* Información de Contacto */}
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="text-lg font-poppins font-semibold text-voley-blue-dark mb-4">
                    Información de Contacto
                  </h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="font-montserrat font-medium text-gray-600">Email:</span>
                      <span className="font-montserrat text-gray-900">{usuarioSeleccionado.email}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-montserrat font-medium text-gray-600">Celular:</span>
                      <span className="font-montserrat text-gray-900">{usuarioSeleccionado.celular}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-montserrat font-medium text-gray-600">Dirección:</span>
                      <span className="font-montserrat text-gray-900">{usuarioSeleccionado.direccion}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-montserrat font-medium text-gray-600">Contacto de Emergencia:</span>
                      <span className="font-montserrat text-gray-900">{usuarioSeleccionado.contactoEmergencia}</span>
                    </div>
                  </div>
                </div>

                {/* Información Deportiva */}
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="text-lg font-poppins font-semibold text-voley-blue-dark mb-4">
                    Información Deportiva
                  </h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="font-montserrat font-medium text-gray-600">Tipo:</span>
                      <span className={`px-3 py-1 rounded-full text-sm font-montserrat font-semibold ${
                        usuarioSeleccionado.tipo === 'jugador' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-purple-100 text-purple-800'
                      }`}>
                        {usuarioSeleccionado.tipo === 'jugador' ? 'Jugador' : 'Profesor'}
                      </span>
                    </div>
                    {usuarioSeleccionado.posicion && (
                      <div className="flex justify-between">
                        <span className="font-montserrat font-medium text-gray-600">Posición:</span>
                        <span className="font-montserrat text-gray-900">{usuarioSeleccionado.posicion}</span>
                      </div>
                    )}
                    {usuarioSeleccionado.nivelExperiencia && (
                      <div className="flex justify-between">
                        <span className="font-montserrat font-medium text-gray-600">Nivel de Experiencia:</span>
                        <span className="font-montserrat text-gray-900">{usuarioSeleccionado.nivelExperiencia}</span>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span className="font-montserrat font-medium text-gray-600">Estado:</span>
                      <span className={`px-3 py-1 rounded-full text-sm font-montserrat font-semibold ${
                        usuarioSeleccionado.estado === 'Activo' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {usuarioSeleccionado.estado}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-montserrat font-medium text-gray-600">Fecha de Registro:</span>
                      <span className="font-montserrat text-gray-900">{usuarioSeleccionado.fechaRegistro}</span>
                    </div>
                  </div>
                </div>

                {/* Logros */}
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="text-lg font-poppins font-semibold text-voley-blue-dark mb-4">
                    Logros y Reconocimientos ({usuarioSeleccionado.logros?.length || 0})
                  </h3>
                  {usuarioSeleccionado.logros && usuarioSeleccionado.logros.length > 0 ? (
                    <div className="space-y-4">
                      {usuarioSeleccionado.logros.map((logro, index) => (
                        <div key={logro.id} className="bg-white p-4 rounded-lg border-l-4 border-voley-blue-medium">
                          <div className="flex justify-between items-start">
                            <div className="flex-1">
                              <h4 className="font-montserrat font-semibold text-gray-900">{logro.titulo}</h4>
                              <p className="font-montserrat text-gray-600 text-sm mt-1">{logro.descripcion}</p>
                              <div className="flex items-center mt-2 space-x-4">
                                <span className="text-xs font-montserrat text-gray-500">📅 {logro.fecha}</span>
                                <span className={`px-2 py-1 rounded-full text-xs font-montserrat font-medium ${
                                  logro.categoria === 'Torneo' ? 'bg-yellow-100 text-yellow-800' :
                                  logro.categoria === 'Individual' ? 'bg-blue-100 text-blue-800' :
                                  'bg-gray-100 text-gray-800'
                                }`}>
                                  {logro.categoria}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="font-montserrat text-gray-500 text-center py-4">
                      No hay logros registrados aún
                    </p>
                  )}
                </div>
              </div>

              <div className="mt-6 flex justify-end">
                <button
                  onClick={() => setMostrarModalVer(false)}
                  className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-montserrat font-semibold py-2 px-6 rounded-lg transition-colors duration-200"
                >
                  Cerrar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal Editar Usuario */}
      {mostrarModalEditar && usuarioSeleccionado && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50 flex items-center justify-center">
          <div className="relative bg-white rounded-xl shadow-2xl w-full max-w-4xl mx-4 max-h-[90vh] overflow-y-auto">
            <div className="p-8">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-poppins font-bold text-voley-blue-dark">
                  Editar Usuario
                </h2>
                <button
                  onClick={() => setMostrarModalEditar(false)}
                  className="text-gray-400 hover:text-gray-600 text-2xl font-bold"
                >
                  ×
                </button>
              </div>

              <form onSubmit={(e) => {
                e.preventDefault();
                handleActualizarUsuario();
              }}>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Información Personal */}
                  <div className="bg-gray-50 p-6 rounded-lg">
                    <h3 className="text-lg font-poppins font-semibold text-voley-blue-dark mb-4">
                      Información Personal
                    </h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-montserrat font-medium text-gray-700 mb-2">
                          Nombres *
                        </label>
                        <input
                          type="text"
                          value={usuarioSeleccionado.nombres}
                          onChange={(e) => setUsuarioSeleccionado({
                            ...usuarioSeleccionado,
                            nombres: e.target.value
                          })}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg font-montserrat focus:outline-none focus:ring-2 focus:ring-voley-blue-medium focus:border-transparent"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-montserrat font-medium text-gray-700 mb-2">
                          Apellidos *
                        </label>
                        <input
                          type="text"
                          value={usuarioSeleccionado.apellidos}
                          onChange={(e) => setUsuarioSeleccionado({
                            ...usuarioSeleccionado,
                            apellidos: e.target.value
                          })}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg font-montserrat focus:outline-none focus:ring-2 focus:ring-voley-blue-medium focus:border-transparent"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-montserrat font-medium text-gray-700 mb-2">
                          Cédula *
                        </label>
                        <input
                          type="text"
                          value={usuarioSeleccionado.cedula}
                          onChange={(e) => setUsuarioSeleccionado({
                            ...usuarioSeleccionado,
                            cedula: e.target.value
                          })}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg font-montserrat focus:outline-none focus:ring-2 focus:ring-voley-blue-medium focus:border-transparent"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-montserrat font-medium text-gray-700 mb-2">
                          Estado *
                        </label>
                        <select
                          value={usuarioSeleccionado.estado}
                          onChange={(e) => setUsuarioSeleccionado({
                            ...usuarioSeleccionado,
                            estado: e.target.value as 'Activo' | 'Inactivo'
                          })}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg font-montserrat focus:outline-none focus:ring-2 focus:ring-voley-blue-medium focus:border-transparent"
                          required
                        >
                          <option value="Activo">Activo</option>
                          <option value="Inactivo">Inactivo</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Información de Contacto */}
                  <div className="bg-gray-50 p-6 rounded-lg">
                    <h3 className="text-lg font-poppins font-semibold text-voley-blue-dark mb-4">
                      Información de Contacto
                    </h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-montserrat font-medium text-gray-700 mb-2">
                          Email *
                        </label>
                        <input
                          type="email"
                          value={usuarioSeleccionado.email}
                          onChange={(e) => setUsuarioSeleccionado({
                            ...usuarioSeleccionado,
                            email: e.target.value
                          })}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg font-montserrat focus:outline-none focus:ring-2 focus:ring-voley-blue-medium focus:border-transparent"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-montserrat font-medium text-gray-700 mb-2">
                          Celular *
                        </label>
                        <input
                          type="tel"
                          value={usuarioSeleccionado.celular}
                          onChange={(e) => setUsuarioSeleccionado({
                            ...usuarioSeleccionado,
                            celular: e.target.value
                          })}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg font-montserrat focus:outline-none focus:ring-2 focus:ring-voley-blue-medium focus:border-transparent"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-montserrat font-medium text-gray-700 mb-2">
                          Dirección *
                        </label>
                        <input
                          type="text"
                          value={usuarioSeleccionado.direccion}
                          onChange={(e) => setUsuarioSeleccionado({
                            ...usuarioSeleccionado,
                            direccion: e.target.value
                          })}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg font-montserrat focus:outline-none focus:ring-2 focus:ring-voley-blue-medium focus:border-transparent"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-montserrat font-medium text-gray-700 mb-2">
                          Contacto de Emergencia *
                        </label>
                        <input
                          type="tel"
                          value={usuarioSeleccionado.contactoEmergencia}
                          onChange={(e) => setUsuarioSeleccionado({
                            ...usuarioSeleccionado,
                            contactoEmergencia: e.target.value
                          })}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg font-montserrat focus:outline-none focus:ring-2 focus:ring-voley-blue-medium focus:border-transparent"
                          required
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Sección de Logros */}
                <div className="mt-6 bg-gray-50 p-6 rounded-lg">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-poppins font-semibold text-voley-blue-dark">
                      Logros y Reconocimientos
                    </h3>
                    <button
                      type="button"
                      onClick={() => {
                        if (usuarioSeleccionado.logros) {
                          const nuevosLogros = [...usuarioSeleccionado.logros, {
                            id: Math.max(...usuarioSeleccionado.logros.map(l => l.id), 0) + 1,
                            titulo: nuevoLogro.titulo || 'Nuevo Logro',
                            descripcion: nuevoLogro.descripcion || 'Descripción del logro',
                            fecha: nuevoLogro.fecha || new Date().toISOString().split('T')[0],
                            categoria: (nuevoLogro.categoria as 'Torneo' | 'Individual' | 'Equipo' | 'Academico') || 'Individual'
                          }];
                          setUsuarioSeleccionado({
                            ...usuarioSeleccionado,
                            logros: nuevosLogros
                          });
                          setNuevoLogro({ titulo: '', descripcion: '', fecha: '', categoria: '' });
                        }
                      }}
                      className="bg-voley-blue-medium hover:bg-voley-blue-dark text-white px-4 py-2 rounded-lg font-montserrat font-medium text-sm transition-colors"
                    >
                      Agregar Logro
                    </button>
                  </div>

                  {/* Formulario para nuevo logro */}
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-3 mb-4">
                    <input
                      type="text"
                      placeholder="Título del logro"
                      value={nuevoLogro.titulo}
                      onChange={(e) => setNuevoLogro({ ...nuevoLogro, titulo: e.target.value })}
                      className="px-3 py-2 border border-gray-300 rounded-lg text-sm font-montserrat focus:outline-none focus:ring-2 focus:ring-voley-blue-medium"
                    />
                    <input
                      type="text"
                      placeholder="Descripción"
                      value={nuevoLogro.descripcion}
                      onChange={(e) => setNuevoLogro({ ...nuevoLogro, descripcion: e.target.value })}
                      className="px-3 py-2 border border-gray-300 rounded-lg text-sm font-montserrat focus:outline-none focus:ring-2 focus:ring-voley-blue-medium"
                    />
                    <input
                      type="date"
                      value={nuevoLogro.fecha}
                      onChange={(e) => setNuevoLogro({ ...nuevoLogro, fecha: e.target.value })}
                      className="px-3 py-2 border border-gray-300 rounded-lg text-sm font-montserrat focus:outline-none focus:ring-2 focus:ring-voley-blue-medium"
                    />
                    <select
                      value={nuevoLogro.categoria}
                      onChange={(e) => setNuevoLogro({ ...nuevoLogro, categoria: e.target.value })}
                      className="px-3 py-2 border border-gray-300 rounded-lg text-sm font-montserrat focus:outline-none focus:ring-2 focus:ring-voley-blue-medium"
                    >
                      <option value="">Categoría</option>
                      <option value="Torneo">Torneo</option>
                      <option value="Individual">Individual</option>
                      <option value="Academico">Académico</option>
                      <option value="Equipo">Equipo</option>
                    </select>
                  </div>

                  {/* Lista de logros existentes */}
                  <div className="space-y-3">
                    {usuarioSeleccionado.logros?.map((logro, index) => (
                      <div key={logro.id} className="bg-white p-4 rounded-lg border-l-4 border-voley-blue-medium">
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <h4 className="font-montserrat font-semibold text-gray-900">{logro.titulo}</h4>
                            <p className="font-montserrat text-gray-600 text-sm mt-1">{logro.descripcion}</p>
                            <div className="flex items-center mt-2 space-x-4">
                              <span className="text-xs font-montserrat text-gray-500">📅 {logro.fecha}</span>
                              <span className={`px-2 py-1 rounded-full text-xs font-montserrat font-medium ${
                                logro.categoria === 'Torneo' ? 'bg-yellow-100 text-yellow-800' :
                                logro.categoria === 'Individual' ? 'bg-blue-100 text-blue-800' :
                                'bg-gray-100 text-gray-800'
                              }`}>
                                {logro.categoria}
                              </span>
                            </div>
                          </div>
                          <button
                            type="button"
                            onClick={() => {
                              const nuevosLogros = usuarioSeleccionado.logros?.filter(l => l.id !== logro.id) || [];
                              setUsuarioSeleccionado({
                                ...usuarioSeleccionado,
                                logros: nuevosLogros
                              });
                            }}
                            className="ml-4 text-red-500 hover:text-red-700 text-sm font-montserrat"
                          >
                            Eliminar
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-6 flex justify-end space-x-4">
                  <button
                    type="button"
                    onClick={() => setMostrarModalEditar(false)}
                    className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-montserrat font-semibold py-2 px-6 rounded-lg transition-colors duration-200"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="bg-voley-blue-medium hover:bg-voley-blue-dark text-white font-montserrat font-semibold py-2 px-6 rounded-lg transition-colors duration-200"
                  >
                    Guardar Cambios
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Modal Registrar Pago */}
      {mostrarModalPago && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50 flex items-center justify-center">
          <div className="relative bg-white rounded-xl shadow-2xl w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
            <div className="p-8">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-poppins font-bold text-voley-blue-dark">
                  Registrar Pago de Mensualidad
                </h2>
                <button
                  onClick={() => {
                    setMostrarModalPago(false);
                    limpiarFormularioPago();
                  }}
                  className="text-gray-400 hover:text-gray-600 text-2xl font-bold"
                >
                  ×
                </button>
              </div>

              <form onSubmit={handleRegistrarPago}>
                <div className="space-y-6">
                  {/* Selección de Usuario */}
                  <div>
                    <label className="block text-sm font-montserrat font-medium text-gray-700 mb-2">
                      Usuario *
                    </label>
                    <select
                      value={formPago.usuarioId}
                      onChange={(e) => setFormPago({ ...formPago, usuarioId: parseInt(e.target.value) })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg font-montserrat focus:outline-none focus:ring-2 focus:ring-voley-blue-medium focus:border-transparent"
                      required
                    >
                      <option value="">Seleccionar usuario</option>
                      {usuarios
                        .filter(usuario => usuario.estado === 'Activo')
                        .map(usuario => (
                          <option key={usuario.id} value={usuario.id}>
                            {usuario.nombres} {usuario.apellidos}
                          </option>
                        ))}
                    </select>
                  </div>

                  {/* Período */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-montserrat font-medium text-gray-700 mb-2">
                        Mes *
                      </label>
                      <select
                        value={formPago.periodo.mes}
                        onChange={(e) => setFormPago({ 
                          ...formPago, 
                          periodo: { ...formPago.periodo, mes: parseInt(e.target.value) }
                        })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg font-montserrat focus:outline-none focus:ring-2 focus:ring-voley-blue-medium focus:border-transparent"
                        required
                      >
                        {Array.from({ length: 12 }, (_, i) => (
                          <option key={i + 1} value={i + 1}>
                            {new Date(2025, i).toLocaleString('es-ES', { month: 'long' })}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-montserrat font-medium text-gray-700 mb-2">
                        Año *
                      </label>
                      <select
                        value={formPago.periodo.año}
                        onChange={(e) => setFormPago({ 
                          ...formPago, 
                          periodo: { ...formPago.periodo, año: parseInt(e.target.value) }
                        })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg font-montserrat focus:outline-none focus:ring-2 focus:ring-voley-blue-medium focus:border-transparent"
                        required
                      >
                        {Array.from({ length: 5 }, (_, i) => (
                          <option key={2023 + i} value={2023 + i}>
                            {2023 + i}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Monto */}
                  <div>
                    <label className="block text-sm font-montserrat font-medium text-gray-700 mb-2">
                      Monto (COP) *
                    </label>
                    <input
                      type="number"
                      value={formPago.monto}
                      onChange={(e) => setFormPago({ ...formPago, monto: parseInt(e.target.value) })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg font-montserrat focus:outline-none focus:ring-2 focus:ring-voley-blue-medium focus:border-transparent"
                      min="0"
                      step="1000"
                      required
                    />
                    <p className="text-sm text-gray-500 mt-1">Monto por defecto: $100.000 COP</p>
                  </div>

                  {/* Comprobante */}
                  <div>
                    <label className="block text-sm font-montserrat font-medium text-gray-700 mb-2">
                      Comprobante (opcional)
                    </label>
                    <input
                      type="text"
                      value={formPago.comprobante}
                      onChange={(e) => setFormPago({ ...formPago, comprobante: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg font-montserrat focus:outline-none focus:ring-2 focus:ring-voley-blue-medium focus:border-transparent"
                      placeholder="Nombre del archivo o referencia del comprobante"
                    />
                  </div>

                  {/* Estado */}
                  <div>
                    <label className="block text-sm font-montserrat font-medium text-gray-700 mb-2">
                      Estado *
                    </label>
                    <select
                      value={formPago.estado}
                      onChange={(e) => setFormPago({ 
                        ...formPago, 
                        estado: e.target.value as 'atraso' | 'pendiente' | 'pagado' | 'rechazado',
                        observaciones: e.target.value !== 'rechazado' ? '' : formPago.observaciones
                      })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg font-montserrat focus:outline-none focus:ring-2 focus:ring-voley-blue-medium focus:border-transparent"
                      required
                    >
                      <option value="pendiente">Pendiente</option>
                      <option value="pagado">Pagado</option>
                      <option value="atraso">Atraso</option>
                      <option value="rechazado">Rechazado</option>
                    </select>
                  </div>

                  {/* Observaciones (solo para rechazado) */}
                  {formPago.estado === 'rechazado' && (
                    <div>
                      <label className="block text-sm font-montserrat font-medium text-gray-700 mb-2">
                        Observaciones *
                      </label>
                      <textarea
                        value={formPago.observaciones}
                        onChange={(e) => setFormPago({ ...formPago, observaciones: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg font-montserrat focus:outline-none focus:ring-2 focus:ring-voley-blue-medium focus:border-transparent"
                        rows={3}
                        placeholder="Explique el motivo del rechazo..."
                        required={formPago.estado === 'rechazado'}
                      />
                    </div>
                  )}
                </div>

                <div className="mt-8 flex justify-end space-x-4">
                  <button
                    type="button"
                    onClick={() => setMostrarModalPago(false)}
                    className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-montserrat font-semibold py-2 px-6 rounded-lg transition-colors duration-200"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="bg-voley-blue-medium hover:bg-voley-blue-dark text-white font-montserrat font-semibold py-2 px-6 rounded-lg transition-colors duration-200"
                  >
                    Registrar Pago
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Modal para registrar pago */}
      {mostrarModalPago && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-11/12 max-w-2xl shadow-lg rounded-md bg-white">
            <div className="mt-3">
              {/* Header del modal */}
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-poppins font-bold text-voley-blue-dark">
                  Registrar Pago de Mensualidad
                </h3>
                <button
                  onClick={() => {
                    setMostrarModalPago(false);
                    // Limpiar form
                    setFormPago({
                      usuarioId: 0,
                      periodo: { mes: new Date().getMonth() + 1, año: new Date().getFullYear() },
                      monto: 100,
                      comprobante: '',
                      estado: 'pendiente',
                      observaciones: ''
                    });
                  }}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Formulario */}
              <form onSubmit={handleRegistrarPago} className="space-y-4">
                {/* Usuario */}
                <div className="relative">
                  <label className="block text-sm font-montserrat font-medium text-gray-700 mb-2">
                    Usuario *
                  </label>
                  <input
                    type="text"
                    value={busquedaUsuarioPago}
                    onChange={(e) => {
                      setBusquedaUsuarioPago(e.target.value);
                      filtrarUsuariosBusqueda(e.target.value);
                      setMostrarListaUsuariosPago(true);
                    }}
                    onFocus={() => setMostrarListaUsuariosPago(true)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-voley-blue-medium focus:border-transparent"
                    placeholder="Buscar por nombre o cédula..."
                    required
                  />
                  
                  {/* Lista desplegable de usuarios */}
                  {mostrarListaUsuariosPago && usuariosBusqueda.length > 0 && (
                    <div className="absolute top-full left-0 right-0 bg-white border border-gray-300 rounded-lg mt-1 max-h-60 overflow-y-auto z-10 shadow-lg">
                      {usuariosBusqueda.map(usuario => (
                        <div
                          key={usuario.id}
                          onClick={() => seleccionarUsuarioPago(usuario)}
                          className="px-3 py-2 hover:bg-gray-100 cursor-pointer border-b border-gray-100 last:border-b-0"
                        >
                          <div className="font-medium text-gray-900">
                            {usuario.nombres} {usuario.apellidos}
                          </div>
                          <div className="text-sm text-gray-500">
                            Cédula: {usuario.cedula}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Período */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-montserrat font-medium text-gray-700 mb-2">
                      Mes *
                    </label>
                    <select
                      value={formPago.periodo.mes}
                      onChange={(e) => setFormPago(prev => ({ ...prev, periodo: { ...prev.periodo, mes: parseInt(e.target.value) } }))}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-voley-blue-medium focus:border-transparent"
                      required
                    >
                      <option value={1}>Enero</option>
                      <option value={2}>Febrero</option>
                      <option value={3}>Marzo</option>
                      <option value={4}>Abril</option>
                      <option value={5}>Mayo</option>
                      <option value={6}>Junio</option>
                      <option value={7}>Julio</option>
                      <option value={8}>Agosto</option>
                      <option value={9}>Septiembre</option>
                      <option value={10}>Octubre</option>
                      <option value={11}>Noviembre</option>
                      <option value={12}>Diciembre</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-montserrat font-medium text-gray-700 mb-2">
                      Año *
                    </label>
                    <input
                      type="number"
                      value={formPago.periodo.año}
                      onChange={(e) => setFormPago(prev => ({ ...prev, periodo: { ...prev.periodo, año: parseInt(e.target.value) } }))}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-voley-blue-medium focus:border-transparent"
                      min={2020}
                      max={2030}
                      required
                    />
                  </div>
                </div>

                {/* Monto */}
                <div>
                  <label className="block text-sm font-montserrat font-medium text-gray-700 mb-2">
                    Monto (COP) *
                  </label>
                  <input
                    type="number"
                    value={formPago.monto}
                    onChange={(e) => setFormPago(prev => ({ ...prev, monto: parseFloat(e.target.value) }))}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-voley-blue-medium focus:border-transparent"
                    placeholder="100"
                    min={0}
                    step={1}
                    required
                  />
                </div>

                {/* Comprobante */}
                <div>
                  <label className="block text-sm font-montserrat font-medium text-gray-700 mb-2">
                    Comprobante de Pago *
                  </label>
                  <div className="space-y-3">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={manejarSubidaImagen}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-voley-blue-medium focus:border-transparent file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-voley-blue-medium file:text-white hover:file:bg-voley-blue-dark"
                      required
                    />
                    {previewImagen && (
                      <div className="mt-3">
                        <img 
                          src={previewImagen} 
                          alt="Preview del comprobante" 
                          className="max-w-xs max-h-40 object-contain rounded-lg border border-gray-300"
                        />
                      </div>
                    )}
                  </div>
                </div>

                {/* Estado */}
                <div>
                  <label className="block text-sm font-montserrat font-medium text-gray-700 mb-2">
                    Estado *
                  </label>
                  <select
                    value={formPago.estado}
                    onChange={(e) => setFormPago(prev => ({ ...prev, estado: e.target.value as EstadoPago }))}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-voley-blue-medium focus:border-transparent"
                    required
                  >
                    <option value="atraso">Atraso</option>
                    <option value="pendiente">Pendiente</option>
                    <option value="pagado">Pagado</option>
                    <option value="rechazado">Rechazado</option>
                  </select>
                </div>

                {/* Observaciones (solo si estado es rechazado) */}
                {formPago.estado === 'rechazado' && (
                  <div>
                    <label className="block text-sm font-montserrat font-medium text-gray-700 mb-2">
                      Observaciones *
                    </label>
                    <textarea
                      value={formPago.observaciones}
                      onChange={(e) => setFormPago(prev => ({ ...prev, observaciones: e.target.value }))}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-voley-blue-medium focus:border-transparent"
                      rows={3}
                      placeholder="Motivo del rechazo"
                      required
                    />
                  </div>
                )}

                {/* Botones */}
                <div className="flex justify-end space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={() => {
                      setMostrarModalPago(false);
                      limpiarFormularioPago();
                    }}
                    className="py-2 px-4 bg-gray-300 hover:bg-gray-400 text-gray-800 font-montserrat font-semibold rounded-lg transition-colors duration-200"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="py-2 px-4 bg-voley-red-dark hover:bg-voley-red-bright text-white font-montserrat font-semibold rounded-lg transition-colors duration-200"
                  >
                    Registrar Pago
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Modal para ver/editar detalles del pago */}
      {mostrarModalDetalles && pagoSeleccionado && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-11/12 max-w-3xl shadow-lg rounded-md bg-white">
            <div className="mt-3">
              {/* Header del modal */}
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-poppins font-bold text-voley-blue-dark">
                  Detalles del Pago
                </h3>
                <button
                  onClick={() => {
                    setMostrarModalDetalles(false);
                    setPagoSeleccionado(null);
                  }}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Información del pago */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Información del usuario */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-poppins font-semibold text-gray-800 mb-3">Información del Usuario</h4>
                  <div className="space-y-2 text-sm">
                    <div>
                      <span className="font-medium text-gray-600">Nombre:</span>{' '}
                      <span className="text-gray-900">
                        {usuarios.find(u => u.id === pagoSeleccionado.usuarioId)?.nombres}{' '}
                        {usuarios.find(u => u.id === pagoSeleccionado.usuarioId)?.apellidos}
                      </span>
                    </div>
                    <div>
                      <span className="font-medium text-gray-600">Cédula:</span>{' '}
                      <span className="text-gray-900">
                        {usuarios.find(u => u.id === pagoSeleccionado.usuarioId)?.cedula}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Información del pago */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-poppins font-semibold text-gray-800 mb-3">Detalles del Pago</h4>
                  <div className="space-y-2 text-sm">
                    <div>
                      <span className="font-medium text-gray-600">Período:</span>{' '}
                      <span className="text-gray-900">{pagoSeleccionado.periodo.mes}/{pagoSeleccionado.periodo.año}</span>
                    </div>
                    <div>
                      <span className="font-medium text-gray-600">Monto:</span>{' '}
                      <span className="text-gray-900">${pagoSeleccionado.monto.toLocaleString()}</span>
                    </div>
                    <div>
                      <span className="font-medium text-gray-600">Comprobante:</span>{' '}
                      <span className="text-gray-900">{pagoSeleccionado.comprobante || 'Sin comprobante'}</span>
                    </div>
                    <div>
                      <span className="font-medium text-gray-600">Fecha de Registro:</span>{' '}
                      <span className="text-gray-900">{pagoSeleccionado.fechaRegistro}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Solo visualización del estado */}
              <div className="mt-6 bg-white border rounded-lg p-4">
                <h4 className="font-poppins font-semibold text-gray-800 mb-3">Estado Actual</h4>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-montserrat font-medium text-gray-700 mb-2">
                      Estado: 
                      <span className={`ml-2 inline-flex px-3 py-1 text-xs font-semibold rounded-full ${
                        pagoSeleccionado.estado === 'pagado' ? 'bg-green-100 text-green-800' :
                        pagoSeleccionado.estado === 'pendiente' ? 'bg-yellow-100 text-yellow-800' :
                        pagoSeleccionado.estado === 'atraso' ? 'bg-orange-100 text-orange-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {pagoSeleccionado.estado.charAt(0).toUpperCase() + pagoSeleccionado.estado.slice(1)}
                      </span>
                    </label>
                  </div>

                  {/* Mostrar observaciones si existen */}
                  {pagoSeleccionado.observaciones && (
                    <div>
                      <label className="block text-sm font-montserrat font-medium text-gray-700 mb-2">
                        Observaciones
                      </label>
                      <div className="w-full border border-gray-300 rounded-lg px-3 py-2 bg-gray-50 text-gray-700">
                        {pagoSeleccionado.observaciones}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Botón para cerrar */}
              <div className="flex justify-end mt-6">
                <button
                  type="button"
                  onClick={() => {
                    setMostrarModalDetalles(false);
                    setPagoSeleccionado(null);
                  }}
                  className="py-2 px-4 bg-voley-blue-medium hover:bg-voley-blue-dark text-white font-montserrat font-semibold rounded-lg transition-colors duration-200"
                >
                  Cerrar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal para Modificar Estado */}
      {mostrarModalModificarEstado && pagoSeleccionado && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4">
            <div className="px-6 py-4 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-poppins font-bold text-voley-blue-dark">
                  Modificar Estado del Pago
                </h2>
                <button
                  onClick={cerrarModalModificarEstado}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6m0 12L6 6" />
                  </svg>
                </button>
              </div>
            </div>
            
            <form onSubmit={handleModificarEstado} className="p-6">
              <div className="space-y-4">
                {/* Información del pago */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-montserrat font-semibold text-gray-700 mb-2">Información del Pago</h3>
                  <p className="text-sm text-gray-600">
                    <span className="font-medium">Usuario:</span> {pagoSeleccionado.usuarioNombre}
                  </p>
                  <p className="text-sm text-gray-600">
                    <span className="font-medium">Período:</span> {pagoSeleccionado.periodo.mes}/{pagoSeleccionado.periodo.año}
                  </p>
                  <p className="text-sm text-gray-600">
                    <span className="font-medium">Monto:</span> ${pagoSeleccionado.monto.toLocaleString()}
                  </p>
                  <p className="text-sm text-gray-600">
                    <span className="font-medium">Estado Actual:</span> 
                    <span className={`ml-2 px-2 py-1 rounded-full text-xs font-medium ${
                      pagoSeleccionado.estado === 'pagado' 
                        ? 'bg-green-100 text-green-800' 
                        : pagoSeleccionado.estado === 'pendiente'
                        ? 'bg-yellow-100 text-yellow-800'
                        : pagoSeleccionado.estado === 'atraso'
                        ? 'bg-red-100 text-red-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {pagoSeleccionado.estado.charAt(0).toUpperCase() + pagoSeleccionado.estado.slice(1)}
                    </span>
                  </p>
                </div>

                {/* Selector de nuevo estado */}
                <div>
                  <label className="block text-sm font-montserrat font-medium text-gray-700 mb-2">
                    Nuevo Estado *
                  </label>
                  <select
                    value={nuevoEstado}
                    onChange={(e) => setNuevoEstado(e.target.value as EstadoPago)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg font-inter text-sm focus:ring-2 focus:ring-voley-blue-medium focus:border-transparent"
                    required
                  >
                    <option value="atraso">En Atraso</option>
                    <option value="pendiente">Pendiente</option>
                    <option value="pagado">Pagado</option>
                    <option value="rechazado">Rechazado</option>
                  </select>
                </div>

                {/* Campo de observaciones (solo si es rechazado) */}
                {nuevoEstado === 'rechazado' && (
                  <div>
                    <label className="block text-sm font-montserrat font-medium text-gray-700 mb-2">
                      Observaciones *
                    </label>
                    <textarea
                      value={observaciones}
                      onChange={(e) => setObservaciones(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg font-inter text-sm focus:ring-2 focus:ring-voley-blue-medium focus:border-transparent"
                      rows={3}
                      placeholder="Explique el motivo del rechazo..."
                      required
                    />
                  </div>
                )}
              </div>

              {/* Botones */}
              <div className="flex justify-end space-x-3 mt-6">
                <button
                  type="button"
                  onClick={cerrarModalModificarEstado}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 font-montserrat hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors duration-200"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-voley-blue-medium text-white rounded-lg font-montserrat hover:bg-voley-blue-dark focus:outline-none focus:ring-2 focus:ring-voley-blue-medium focus:ring-offset-2 transition-colors duration-200"
                >
                  Guardar Cambios
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal de Notificación */}
      {modalNotificacion.isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4 transform transition-all duration-300 scale-100">
            <div className="p-6">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  {modalNotificacion.tipo === 'exito' && (
                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                      <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  )}
                  {modalNotificacion.tipo === 'error' && (
                    <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                      <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </div>
                  )}
                  {modalNotificacion.tipo === 'advertencia' && (
                    <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center">
                      <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.268 16.5c-.77.833.192 2.5 1.732 2.5z" />
                      </svg>
                    </div>
                  )}
                  {modalNotificacion.tipo === 'info' && (
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                  )}
                </div>
                
                <div className="ml-4 w-0 flex-1">
                  <h3 className="text-lg font-montserrat font-semibold text-gray-900 mb-2">
                    {modalNotificacion.titulo}
                  </h3>
                  <p className="text-sm font-inter text-gray-600">
                    {modalNotificacion.mensaje}
                  </p>
                </div>
              </div>
              
              <div className="mt-6 flex justify-end">
                <button
                  onClick={cerrarNotificacion}
                  className={`px-4 py-2 text-sm font-medium font-montserrat rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors duration-200 ${
                    modalNotificacion.tipo === 'exito'
                      ? 'bg-green-600 text-white hover:bg-green-700 focus:ring-green-500'
                      : modalNotificacion.tipo === 'error'
                      ? 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500'
                      : modalNotificacion.tipo === 'advertencia'
                      ? 'bg-yellow-600 text-white hover:bg-yellow-700 focus:ring-yellow-500'
                      : 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500'
                  }`}
                >
                  Entendido
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
    </div>
  );
};

export default ProfesorDashboard;