import { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';

// Tipos
export type UserRole = 'profesor' | 'jugador';

export interface User {
  username: string;
  role: UserRole;
}

interface AuthContextType {
  user: User | null;
  login: (username: string, password: string) => boolean;
  logout: () => void;
  isLoading: boolean;
}

// Credenciales estáticas
const CREDENTIALS = {
  profesor: { password: '1234', role: 'profesor' as UserRole },
  jugador: { password: '1234', role: 'jugador' as UserRole }
};

// Crear contexto
const AuthContext = createContext<AuthContextType | null>(null);

// Provider del contexto
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const login = (username: string, password: string): boolean => {
    setIsLoading(true);
    
    // Simular delay de autenticación
    setTimeout(() => {
      setIsLoading(false);
    }, 500);

    const credential = CREDENTIALS[username as keyof typeof CREDENTIALS];
    
    if (credential && credential.password === password) {
      const newUser = {
        username,
        role: credential.role
      };
      setUser(newUser);
      
      // Guardar en localStorage para persistencia
      localStorage.setItem('voley_user', JSON.stringify(newUser));
      return true;
    }
    
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('voley_user');
  };

  // Recuperar usuario al cargar la aplicación
  useState(() => {
    const savedUser = localStorage.getItem('voley_user');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch {
        localStorage.removeItem('voley_user');
      }
    }
  });

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook personalizado para usar el contexto
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe usarse dentro de AuthProvider');
  }
  return context;
};