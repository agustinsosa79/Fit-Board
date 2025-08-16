import { useState, useEffect } from 'react';

interface User {
  admin_id: string;
  email: string;
  nombre: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  isAuthenticated: () => boolean;
  loading: boolean;
}

export const useProvideAuth = (): AuthContextType => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const login = async (email: string, password: string) => {
    setLoading(true);
    try {
      const res = await fetch('http://localhost:3000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
        credentials: 'include'
      });
      if (!res.ok) throw new Error('Credenciales inválidas');
      const data = await res.json();
      setUser(data.admin); 
    } catch (error) {
      setUser(null);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setLoading(true);
    try {
      const res = await fetch('http://localhost:3000/api/auth/logout', { method: 'POST', credentials: 'include' });
      if (res.ok) setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const isAuthenticated = () => user !== null;

  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);
      try {
        const res = await fetch('http://localhost:3000/api/auth/me', { credentials: 'include' });
        if (res.ok) {
          const data = await res.json();
          setUser(data);
        } else {
          setUser(null);
          console.error('Error fetching user data');
        }
      } catch {
        setUser(null);
        console.error('Error fetching user data');
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  return { user, login, logout, isAuthenticated, loading };
};
