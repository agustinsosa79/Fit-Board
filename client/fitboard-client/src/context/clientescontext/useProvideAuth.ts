import { useState, useEffect } from 'react';

interface User {
  admin_id: string;
  email: string;
  nombre: string;
}

interface AuthContextType {
  user: User | undefined ;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  isAuthenticated: () => boolean;
  loading: boolean;
}

export const useProvideAuth = (): AuthContextType => {
  const [user, setUser] = useState<User>();
  const [loading, setLoading] = useState<boolean>(true);

  const API_URL = import.meta.env.VITE_API_URL;

  const login = async (email: string, password: string) => {
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
        credentials: 'include'
      });
      if (!res.ok) throw new Error('Credenciales inválidas');
      const data = await res.json();
      setUser(data.admin_data); 
    } catch (error) {
      setUser(undefined);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/api/auth/logout`, { method: 'POST', credentials: 'include' });
      if (res.ok) setUser(undefined);
    } finally {
      setLoading(false);
    }
  };

  const isAuthenticated = () => !!user ;

  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);
      try {
        const res = await fetch(`${API_URL}/api/auth/me`, { credentials: 'include' });
        if (res.ok) {
          const data = await res.json();
          setUser(data);
        } else if (res.status === 401) {
          setUser(undefined);
        } else {
          console.error("Error inesperado:", res.status);
          setUser(undefined)
        }
      } catch (err) {
        setUser(undefined);
        console.error('Error fetching user data', err);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [API_URL]);

  return { user , login, logout, isAuthenticated, loading };
};
