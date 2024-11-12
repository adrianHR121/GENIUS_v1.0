// src/context/AuthProvider.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Cookies from 'js-cookie';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const SITE_NAME = "GENIUS";
export const ABBREVIATED_SITE_NAME = "Gestión de Educación para Nuevas Ideas Unificadas con Soluciones";

const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userType, setUserType] = useState(null);
  const [userData, setUserData] = useState(null);
  const [isAuthLoading, setIsAuthLoading] = useState(true); // Estado de carga de autenticación

  const getNavigate = useNavigate();
  const navigate = (route) => window.location.href.includes('debug=true') 
    ? getNavigate(`${route}?debug=true`)
    : getNavigate(route);

  const location = useLocation();

  const publicRoutes = ['/Login', '/Registro', '/verify', '/', '/MessAuth', '/Mensaje', '/Dashboard','/PaypalTest','/sucessful-payment','/cancel-payment'];

  useEffect(() => {
    const initializeAuth = async () => {
      
  
      try {
        const accessToken = Cookies.get('accessToken');
        const refreshToken = Cookies.get('refreshToken');
        const storedUserType = Cookies.get('type');
        const storedUserData = Cookies.get('userData');
        const regex = /^\/[^/]+(\/.*)$/;
  
        const pathname = publicRoutes.includes(location.pathname) || 
          (location.pathname.includes('verify') ? 
          regex.test(location.pathname) : false);
  
        if (accessToken && storedUserType && storedUserData) {
          const userData = JSON.parse(storedUserData);
  
          if (userData.active === false) {
            handleLogout();    
           
          }
  
          setIsLoggedIn(true);
          setUserType(storedUserType);
          setUserData(userData);
        } else if (refreshToken) {
          await handleTokenRefresh(refreshToken);
        } else if (!pathname) {
          console.log("el problema es aqui 2");
          navigate('/Login');
        }
      } catch (error) {
        console.error('Error al inicializar la autenticación:', error);
        console.log("el problema es aqui 1");
          handleLogout();
          navigate('/Login');
        
      }
    };
  
    initializeAuth();
  }, [location.pathname, getNavigate]);
  
  useEffect(() => {
    const initializeAuth = async () => {
        try {
            const accessToken = Cookies.get('accessToken');
            const storedUserType = Cookies.get('type');
            const storedUserData = Cookies.get('userData');

            if (accessToken && storedUserType && storedUserData) {
                const userData = JSON.parse(storedUserData);
                setIsLoggedIn(true);
                setUserType(storedUserType);
                setUserData(userData);
            } else {
                setIsLoggedIn(false);
            }
        } catch (error) {
            console.error('Error al inicializar la autenticación:', error);
            setIsLoggedIn(false);
        } finally {
            setIsAuthLoading(false); // Finaliza la carga
        }
    };

    initializeAuth();
}, [location.pathname]);
  
 


  const handleTokenRefresh = async (refreshToken) => {
    try {
      const response = await fetch('https://eduhobby-back.vercel.app/refresh-token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ refreshToken }),
      });

      if (response.ok) {
        const data = await response.json();
        Cookies.set('accessToken', data.accessToken, { expires: 1, sameSite: 'strict', secure: true });
        Cookies.set('type', data.type, { expires: 7, sameSite: 'strict', secure: true });
        Cookies.set('userData', JSON.stringify(data.userData), { expires: 7, sameSite: 'strict', secure: true }); // Store userData as JSON string
        setIsLoggedIn(true);
        setUserType(data.type);
        setUserData(data.userData); // Set userData state
      } else {
        handleLogout();
      }
    } catch (error) {
      console.error('Token refresh error:', error);
      handleLogout();
    }
  };

  const handleLogout = () => {
    Cookies.remove('accessToken');
    Cookies.remove('refreshToken');
    Cookies.remove('type');
    Cookies.remove('userData'); // Remove userData cookie
    setIsLoggedIn(false);
    setUserType(null);
    setUserData(null); // Clear userData state
    if (!publicRoutes.includes(location.pathname)) {
      console.log("el problema es aqui");
      
      navigate('/Login');
    }
  };

  const login = async (email, password) => {
    try {
        const response = await fetch('https://eduhobby-back.vercel.app/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
        });
  
        if (response.ok) {
            const data = await response.json();
            Cookies.set('accessToken', data.accessToken, { expires: 1, sameSite: 'strict', secure: true });
            Cookies.set('refreshToken', data.refreshToken, { expires: 7, sameSite: 'strict', secure: true });
            Cookies.set('type', data.type, { expires: 7, sameSite: 'strict', secure: true });
            Cookies.set('userData', JSON.stringify(data.userData), { expires: 7, sameSite: 'strict', secure: true });
            setIsLoggedIn(true);
            setUserType(data.type);
            setUserData(data.userData);
  
            const lastPath = sessionStorage.getItem('lastPath'); // Obtiene la última ruta guardada
            
            if (lastPath) {
                navigate(lastPath); // Redirige al usuario a la última ruta si existe
                sessionStorage.removeItem('lastPath'); // Limpia la última ruta
            } else {
                // Redirige según el tipo de usuario
                switch (data.type) {
                    case 'student':
                        navigate('/Dashboard');
                        break;
                    case 'professor':
                        navigate('/DashTeachers/home');
                        break;
                    case 'admin':
                        navigate('/Administrador/home');
                        break;
                    default:
                        throw new Error('User type not recognized');
                }
            }
  
            return data.type;
        } else {
            const errorText = await response.text();
            throw new Error(errorText);
        }
    } catch (error) {
        console.error('Login error:', error);
        throw error; // Lanza el error para que sea manejado en el componente
    }
  };
  


  const logout = async () => {
    const refreshToken = Cookies.get('refreshToken');

    if (refreshToken) {
      try {
        await fetch('https://eduhobby-back.vercel.app/logout', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ refreshToken }),
        });
        Cookies.remove('accessToken');
        Cookies.remove('refreshToken');
        Cookies.remove('type');
        Cookies.remove('userData');
        setIsLoggedIn(false);
        setUserType(null);
        setUserData(null);
        console.log("el problema es aqui3");
        navigate('/Login');
      } catch (error) {
        console.error('Logout error:', error);
      }
    }

    handleLogout();
  };

  

  return (
    <AuthContext.Provider value={{ isLoggedIn, userType, userData, login, logout, handleTokenRefresh }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
