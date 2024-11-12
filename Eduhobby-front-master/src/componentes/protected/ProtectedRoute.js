import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthProvider';

const ProtectedRoute = ({ element: Element, requiredTypes, ...rest }) => {
    const { isLoggedIn, userType, isAuthLoading } = useAuth();

    // Verificar si la ruta es pública
    const publicRoutes = ['/Dashboard', '/Mensaje', '/verify']; // Agrega las rutas que deben ser accesibles sin autenticación

    if (isAuthLoading) {
        // Mostrar un indicador de carga mientras se verifica el estado de autenticación
        return <div>Loading...</div>;
    }

    // Permitir acceso a rutas públicas sin necesidad de autenticación
    if (publicRoutes.includes(rest.path)) {
        return <Element {...rest} />;
    }

    // Si el usuario no está autenticado y no es una ruta pública, redirigir al login
    

    // Si se especifican tipos de usuario requeridos, pero el usuario no cumple con ellos, redirigir.
    if (requiredTypes && !requiredTypes.includes(userType)) {
        switch (userType) {
            case 'admin':
                return <Navigate to="/Administrador/home" />;
            case 'student':
                return <Navigate to="/Dashboard" />;
            case 'professor':
                return <Navigate to="/DashTeachers/home" />;
            default:
                
        }
    }

    // Si el usuario está autenticado y cumple con los requisitos, renderizar el componente solicitado
    return <Element {...rest} />;
};

export default ProtectedRoute;
