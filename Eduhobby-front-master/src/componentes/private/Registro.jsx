import React, { useEffect, useState, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { registerUser } from '../../fetch/authService';
import '../css/Registro.css';

const Registro = () => {
    const navigate = useNavigate();
    const [isAlumnoSelected, setIsAlumnoSelected] = useState(true);
    const [formData, setFormData] = useState({
        nombre: '',
        apellido: '',
        email: '',
        password: '',
        cedula: '',
    });
    const [errors, setErrors] = useState({});

    useEffect(() => {
        const RegresarButton = document.getElementById('Regresar');
        const container = document.getElementById('container');

        RegresarButton.addEventListener('click', () => {
            container.classList.remove('right-panel-active');
            setIsAlumnoSelected(false);
        });
    }, []);

    const handleAlumnoClick = () => {
        setIsAlumnoSelected(true);
        const container = document.getElementById('container');
        container.classList.add('right-panel-active');
    };

    const handleMaestroClick = () => {
        setIsAlumnoSelected(false);
        const container = document.getElementById('container');
        container.classList.add('right-panel-active');
    };

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
        const { nombre, apellido, email, password, cedula } = formData;
        const newErrors = {
            nombre: !nombre,
            apellido: !apellido,
            email: !email,
            password: !password,
            cedula: isAlumnoSelected ? false : !cedula,
        };
        setErrors(newErrors);
        return Object.values(newErrors).every(error => !error);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) {
            Swal.fire({
                icon: 'error',
                title: 'Error de validación',
                text: 'Por favor, complete todos los campos requeridos.',
            });
            return;
        }

        // Mostrar loading mientras se envían los datos
        Swal.fire({
            title: 'Cargando...',
            text: 'Por favor, espera mientras se envían los datos.',
            allowOutsideClick: false,
            didOpen: () => {
                Swal.showLoading();
            }
        });

        const { success, data, type, message } = await registerUser(formData, isAlumnoSelected);
        
        // Cerrar el loading
        Swal.close();

        if (success) {
            handleSuccessfulRegistration(type, data);
        } else {
            handleFailedRegistration(message);
        }
    };

    const handleSuccessfulRegistration = (type, responseData) => {
        if (type === 'student') {
            Swal.fire({
                icon: "success",
                title: "Registro Exitoso!",
                showConfirmButton: false,
                timer: 1500
            });
        } else {
            Swal.fire({
                icon: "success",
                title: "Solicitud de registro enviada!",
                showConfirmButton: false,
                timer: 1500
            });
        }
        setTimeout(() => {
            if (type === 'professor') {
                navigate('/Mensaje');
            } else {
                navigate(`/Login?email=${encodeURIComponent(formData.email)}`);
            }
        }, 1500);
    };

    const handleFailedRegistration = (message) => {
        console.error('Error en el registro:', message);
        
        let errorMessage;
    
        // Verifica el mensaje de error recibido
        if (message.includes('User already in existance')) {
            errorMessage = "Este usuario ya está registrado. Por favor, utiliza otro correo electrónico.";
        } else if (message.includes('Invalid data')) {
            errorMessage = "Los datos proporcionados son inválidos. Por favor, verifica e intenta nuevamente.";
        } else {
            errorMessage = 'Ha ocurrido un error inesperado. Por favor, intenta nuevamente.';
        }
    
        Swal.fire({
            title: "Error en el Registro",
            text: errorMessage,
            icon: "error"
        });
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100" id='fondoIMG'>
            <div id="container" className="relative w-full max-w-2xl">
                <div className="absolute top-0 left-0 w-1/2 h-full transition-transform transform sign-in-container">
                    <form className=" flex flex-col items-center justify-center p-8 h-full " onSubmit={handleSubmit}>
                        <h1 className="font-bold text-2xl mb-4  lg:text-black text-white">Si ya tienes cuenta <Link to="/Login"><span className='underline text-[var(--main-color)]'>Inicia sesión</span></Link></h1>
                        <h2 className="text-slate-400 text-3xl">ó</h2>
                        <br />
                        <h1 className="font-bold text-2xl mb-4 lg:text-black text-white">Registrarse como: </h1>
                        <div className="justify-items-center items-center" id='columnas'>
                            <div className="col-span-1 flex items-center justify-center text-end lg:text-black text-white"><h2>¡Empieza tu viaje educativo hoy mismo!</h2></div>
                            <div className="border  lg:border-[var(--fondo-color)] border-gray-50 border-t border-b h-full w-0"></div>
                            <div className="col-span-1 flex items-center justify-center text-start lg:text-black text-white"><h2>Inspira, enseña y lidera con nuestra plataforma de cursos.</h2></div>
                        </div>

                        <div className="flex justify-between mb-4 gap-5 mt-5">
                            <div onClick={handleAlumnoClick} className='cursor-pointer lg:bg-transparent bg-white hover:bg-[var(--fondo-color)] text-[var(--spark-color)] font-semibold hover:text-white py-2 px-4 border border-[var(--spark-color)] hover:border-transparent rounded'>
                                Alumno
                            </div>
                            <div onClick={handleMaestroClick} className='cursor-pointer lg:bg-transparent bg-white hover:bg-[var(--fondo-color)] text-[var(--spark-color)] font-semibold hover:text-white py-2 px-4 border border-[var(--spark-color)] hover:border-transparent rounded'>
                                Maestro
                            </div>
                        </div>
                    </form>
                </div>

                <div className="absolute top-0 left-0 w-1/2 h-full transition-transform transform sign-up-container">
                    <form className="bg-white flex flex-col items-center justify-center p-8 h-full" onSubmit={handleSubmit}>
                        <h1 className="font-bold text-2xl mb-4 text-black">
                            Registrarte como{' '}
                            <span className={isAlumnoSelected ? 'text-[var(--spark-color)]' : 'text-[var(--spark-color)]'}>
                                {isAlumnoSelected ? 'alumno' : 'maestro'}
                            </span>
                        </h1>

                        {isAlumnoSelected ? (
                            <>
                                <input type="text" name="nombre" placeholder="Nombre" className={`bg-gray-100 rounded-lg p-3 mb-3 w-full ${errors.nombre ? 'border-2 border-[#ea1e1efb]' : ''}`} onChange={handleChange} />
                                <input type="text" name="apellido" placeholder="Apellido" className={`bg-gray-100 rounded-lg p-3 mb-3 w-full ${errors.apellido ? 'border-2 border-[#ea1e1efb]' : ''}`} onChange={handleChange} />
                                <input type="email" name="email" placeholder="Correo electrónico" className={`bg-gray-100 rounded-lg p-3 mb-3 w-full ${errors.email ? 'border-2 border-[#ea1e1efb]' : ''}`} onChange={handleChange} />
                                <input type="password" name="password" placeholder="Contraseña" className={`bg-gray-100 rounded-lg p-3 mb-3 w-full ${errors.password ? 'border-2 border-[#ea1e1efb]' : ''}`} onChange={handleChange} />
                            </>
                        ) : (
                            <>
                                <input type="text" name="nombre" placeholder="Nombre" className={`bg-gray-100 rounded-lg p-3 mb-3 w-full ${errors.nombre ? 'border-2 border-[#ea1e1efb]' : ''}`} onChange={handleChange} />
                                <input type="text" name="apellido" placeholder="Apellido" className={`bg-gray-100 rounded-lg p-3 mb-3 w-full ${errors.apellido ? 'border-2 border-[#ea1e1efb]' : ''}`} onChange={handleChange} />
                                <input type="email" name="email" placeholder="Correo electrónico" className={`bg-gray-100 rounded-lg p-3 mb-3 w-full ${errors.email ? 'border-2 border-[#ea1e1efb] ' : ''}`} onChange={handleChange} />
                                <input type="text" name="cedula" placeholder="Cedula" className={`bg-gray-100 rounded-lg p-3 mb-3 w-full ${errors.cedula ? 'border-2 border-[#ea1e1efb]' : ''}`} onChange={handleChange} />
                                <input type="password" name="password" placeholder="Contraseña" className={`bg-gray-100 rounded-lg p-3 mb-3 w-full ${errors.password ? 'border-2 border-[#ea1e1efb]' : ''}`} onChange={handleChange} />
                            </>
                        )}
                        <button type="submit" className="bg-[var(--fondo-color)] border-[var(--fondo-color)] text-white rounded-full py-2 px-8 uppercase font-bold hover:bg-white hover:text-[var(--fondo-color)]">Registrarse</button>
                    </form>
                </div>

                <div className="absolute top-0 left-1/2 w-1/2 h-full overflow-hidden transition-transform transform bg-gradient-to-r overlay-container hidden md:block" id='fondo-color'>
                    <div className="absolute top-0 left-0 w-full h-full transition-transform transform overlay">
                        <div className="absolute top-0 left-0 w-1/2 h-full flex flex-col items-center justify-center p-8 text-center text-white overlay-panel overlay-left">
                            <h1 className="font-bold text-2xl mb-4">Crea Una Nueva cuenta!</h1>
                            <p className="mb-4">Para mantenerte conectado con nosotros, inicia sesión con tu información personal</p>
                            <button className="bg-transparent border border-white rounded-full py-2 px-8 uppercase font-bold hover:bg-white hover:text-[var(--fondo-color)] hover:border-[var(--fondo-color)]" id="Regresar">Regresar</button>
                        </div>
                        <div className="absolute top-0 left-1/2 w-1/2 h-full flex flex-col items-center justify-center p-8 text-center text-white overlay-panel overlay-right">
                            <h1 className="font-bold text-2xl mb-4">¡Hola, amigo!</h1>
                            <p className="mb-4">¿Cómo deseas registrarte?</p>
                            
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Registro;
