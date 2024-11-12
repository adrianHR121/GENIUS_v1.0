import React, { useState, useEffect, useCallback } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth, SITE_NAME } from '../protected/AuthProvider.js';
import { useDispatch } from 'react-redux';
import { setResponseType } from '../../redux/actions.js';
import Swal from 'sweetalert2';
import MessAuth from "../MessAuth.jsx";

const Login = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const urlEmail = searchParams.get('email');
    const auth = useAuth();
    const dispatch = useDispatch();
    const [showAuthMessage, setShowAuthMessage] = useState(false);
    const [showPassword, setShowPassword] = useState(false); // Agregar estado para mostrar/ocultar contraseña

    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (auth.isLoggedIn) {
            switch (auth.userType) {
                case 'admin':
                    navigate('/Administrador/home');
                    break;
                case 'student':
                    navigate('/Dashboard');
                    break;
                case 'professor':
                    navigate('/DashTeachers/home');
                    break;
                default:
                    break;
            }
        }
    }, [auth.isLoggedIn, auth.userType, navigate]);

    useEffect(() => {
        if (urlEmail) {
            setFormData(prevFormData => ({
                ...prevFormData,
                email: decodeURIComponent(urlEmail),
            }));
        }
    }, [urlEmail]);

    const handleChange = useCallback((e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value,
        }));
        setErrors(prevErrors => ({
            ...prevErrors,
            [name]: !value
        }));
    }, []);

    const validateForm = () => {
        const { email, password } = formData;
        const newErrors = {
            email: !email,
            password: !password,
        };
        setErrors(newErrors);
        return Object.values(newErrors).every(error => !error);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) {
            Swal.fire({
                icon: 'error',
                title: 'Campos vacíos',
                text: 'Por favor, complete todos los campos requeridos.',
            });
            return;
        }
    
        const { email, password } = formData;
    
        try {
            // Mostrar un loader mientras se realiza el login
            Swal.fire({
                title: 'Iniciando sesión...',
                allowOutsideClick: false,
                didOpen: () => {
                    Swal.showLoading();
                },
            });
    
            await auth.login(email, password); // La redirección ahora ocurre dentro de la función login
    
            Swal.close(); // Cierra el loader una vez que el login y la redirección son exitosos
        } catch (error) {
            Swal.close(); // Cierra el loader en caso de error
    
            console.error('Login error:', error);
            let errorMessage = 'Ocurrió un error al iniciar sesión. Por favor, inténtalo de nuevo más tarde.';
            if (error.message.includes('Invalid credentials')) {
                errorMessage = 'Credenciales inválidas. Por favor verifica tu correo electrónico y contraseña.';
                setShowAuthMessage(false);
            } else if (error.message.includes('User not found')) {
                errorMessage = 'Usuario no encontrado. Por favor verifica tu correo electrónico.';
                setShowAuthMessage(false);
            } else if (error.message.includes('User not active') || error.msg === 'User not active') {
                errorMessage = 'Tu cuenta está inactiva. Por favor, contacta con soporte.';
                setShowAuthMessage(true);
            } else if (error.message.includes('Error de autenticación')) {
                errorMessage = 'Error de autenticación. Verifica tu usuario y contraseña.';
            }
            Swal.fire({
                icon: 'error',
                title: 'Error de inicio de sesión',
                text: errorMessage,
            });
        }
    };
    

    return (
        <div className="flex items-center justify-center min-h-screen" id="fondoIMG">
            <div className="relative flex flex-col m-6 space-y-8 bg-white shadow-2xl rounded-2xl md:flex-row md:space-y-0">
                <div className="flex flex-col justify-center p-8 md:p-14">
                    <span className="mb-3 text-4xl font-bold text-[var(--main-color)]">Iniciar Sesión</span>
                    <span className="font-light text-gray-400 mb-8">
                        ¡Bienvenido de nuevo! Por favor, ingresa tus datos
                    </span>
                    {showAuthMessage && <MessAuth email={formData.email} />}
                    <form onSubmit={handleSubmit}>
                        <div className="py-4">
                            <span className="mb-2 text-md">Correo Electrónico</span>
                            <input
                                className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.email ? 'border-red-500' : ''}`}
                                id="email"
                                type="email"
                                name="email"
                                placeholder="Correo Electrónico"
                                onChange={handleChange}
                                value={formData.email}
                                readOnly={!!urlEmail}
                            />
                        </div>
                        <div className="py-4">
                            <span className="mb-2 text-md">Contraseña</span>
                            <div className="flex items-center relative">
                                <input
                                    className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.password ? 'border-red-500' : ''}`}
                                    id="password"
                                    type={showPassword ? 'text' : 'password'}
                                    name="password"
                                    placeholder="Contraseña"
                                    onChange={handleChange}
                                    value={formData.password}
                                />
                                <label className="relative flex items-center ml-2 cursor-pointer text-2xl">
                                    <input
                                        type="checkbox"
                                        className="absolute opacity-0 cursor-pointer w-0 h-0"
                                        onChange={() => setShowPassword(prev => !prev)}
                                    />
                                    <svg
                                        className={`absolute transition-transform duration-500 transform ${showPassword ? 'scale-0 opacity-0' : 'scale-100 opacity-100'} text-[var(--fondo-color)] `}
                                        xmlns="http://www.w3.org/2000/svg"
                                        height="1em"
                                        viewBox="0 0 576 512"
                                        fill="currentColor"
                                    >
                                        <path d="M288 32c-80.8 0-145.5 36.8-192.6 80.6C48.6 156 17.3 208 2.5 243.7c-3.3 7.9-3.3 16.7 0 24.6C17.3 304 48.6 356 95.4 399.4C142.5 443.2 207.2 480 288 480s145.5-36.8 192.6-80.6c46.8-43.5 78.1-95.4 93-131.1c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C433.5 68.8 368.8 32 288 32zM144 256a144 144 0 1 1 288 0 144 144 0 1 1 -288 0zm144-64c0 35.3-28.7 64-64 64c-7.1 0-13.9-1.2-20.3-3.3c-5.5-1.8-11.9 1.6-11.7 7.4c.3 6.9 1.3 13.8 3.2 20.7c13.7 51.2 66.4 81.6 117.6 67.9s81.6-66.4 67.9-117.6c-11.1-41.5-47.8-69.4-88.6-71.1c-5.8-.2-9.2 6.1-7.4 11.7c2.1 6.4 3.3 13.2 3.3 20.3z"></path>
                                    </svg>
                                    <svg
                                        className={`absolute transition-transform duration-500 transform ${showPassword ? 'scale-100 opacity-100' : 'scale-0 opacity-0'} text-[var(--fondo-color)]`}
                                        xmlns="http://www.w3.org/2000/svg"
                                        height="1em"
                                        viewBox="0 0 640 512"
                                        fill="currentColor"
                                    >
                                        <path d="M38.8 5.1C28.4-3.1 13.3-1.2 5.1 9.2S-1.2 34.7 9.2 42.9l592 464c10.4 8.2 25.5 6.3 33.7-4.1s6.3-25.5-4.1-33.7L525.6 386.7c39.6-40.6 66.4-86.1 79.9-118.4c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C465.5 68.8 400.8 32 320 32c-68.2 0-125 26.3-169.3 60.8L38.8 5.1zM223.1 149.5C248.6 126.2 282.7 112 320 112c79.5 0 144 64.5 144 144c0 24.9-6.3 48.3-17.4 68.7L408 294.5c8.4-19.3 10.6-41.4 4.8-63.3c-11.1-41.5-47.8-69.4-88.6-71.1c-5.8-.2-9.2 6.1-7.4 11.7c2.1 6.4 3.3 13.2 3.3 20.3c0 10.2-2.4 19.8-6.6 28.3l-90.3-70.8zM373 389.9c-16.4 6.5-34.3 10.1-53 10.1c-79.5 0-144-64.5-144-144c0-6.9 .5-13.6 1.4-20.2L83.1 161.5C60.3 191.2 44 220.8 34.5 243.7c-3.3 7.9-3.3 16.7 0 24.6c14.9 35.7 46.2 87.7 93 131.1C174.5 443.2 239.2 480 320 480c47.8 0 89.9-12.9 126.2-32.5L373 389.9z"></path>
                                    </svg>
                                </label>
                            </div>
                        </div>


                        <div className="flex justify-between w-full py-4">
                            <span className="font-bold text-md text-[var(--main-color)]">¡Olvidaste tu contraseña!</span>
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-[var(--fondo-color)] text-white p-2 rounded-lg mb-6 hover:bg-white hover:text-[var(--fondo-color)] hover:border hover:border-gray-300 border-[var(--fondo-color)]"
                        >
                            Iniciar sesión
                        </button>
                    </form>
                    <div className="text-center text-gray-400">
                        ¿Aún no tienes una cuenta?
                        <Link to="/Registro" className="font-bold text-[var(--main-color)] underline"> Regístrate gratis</Link>
                    </div>
                </div>
                <div className="relative">
                    <img
                        src="/img/IMGlogin.jpg"
                        alt="img"
                        className="w-[400px] h-full hidden rounded-r-2xl md:block object-cover" loading="lazy"
                    />
                    <div className="absolute hidden bottom-10 right-6 p-6 bg-black bg-opacity-30 backdrop-blur-sm rounded drop-shadow-lg md:block">
                        <span className="text-[var(--main-color)] text-xl">
                            "{SITE_NAME}: el primer paso hacia tu próximo gran logro.
                            <br />
                            Aprende, crece y alcanza nuevas alturas."
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
