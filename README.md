# VoleyPro - Plataforma de Gestión Deportiva

Una plataforma web moderna para la gestión de clubes y academias de vóley, desarrollada con React, TypeScript y TailwindCSS.

## Características

- **Diseño moderno y responsive** con TailwindCSS
- **Sistema de autenticación** para profesores y jugadores
- **Gestión de torneos** y competencias
- **Control de pagos** y cuotas
- **Sistema de notificaciones**
- **Arquitectura modular** y escalable

## Tecnologías

- **Frontend**: React 19 + TypeScript
- **Estilos**: TailwindCSS 3.x
- **Build Tool**: Vite
- **Fuentes**: Google Fonts (Poppins, Montserrat)

## Paleta de Colores

- **Rojo oscuro**: `#73020C`
- **Azul oscuro**: `#020F59` 
- **Azul medio**: `#03258C`
- **Azul vibrante**: `#044BD9`
- **Rojo brillante**: `#F20505`

## Instalación y Uso

1. **Clonar el repositorio**:
```bash
git clone https://github.com/NazaCastt/ProyectoVoley.git
cd ProyectoVoley
```

2. **Instalar dependencias**:
```bash
npm install
```

3. **Ejecutar en modo desarrollo**:
```bash
npm run dev
```

4. **Construir para producción**:
```bash
npm run build
```

## Credenciales de Prueba

- **Profesor**: `profesor` / `1234`
- **Jugador**: `jugador` / `1234`

## Estructura del Proyecto

```
src/
├── components/          # Componentes UI reutilizables
│   ├── Navbar.tsx
│   ├── Hero.tsx
│   ├── InfoSection.tsx
│   ├── Footer.tsx
│   └── LoginModal.tsx
├── features/           # Módulos funcionales
│   ├── auth/
│   ├── pagos/
│   ├── jugadores/
│   └── notificaciones/
├── app/               # Configuración global
│   ├── routes/
│   ├── store/
│   └── providers/
└── utils/             # Utilidades compartidas
```

## Contribución

1. Fork el proyecto
2. Crea tu rama de feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para más detalles.

---

**Desarrollado con cariño para la comunidad deportiva**
