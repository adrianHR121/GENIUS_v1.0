import React, { useState } from "react";
import { FiSearch, FiUser, FiBook, FiHelpCircle, FiChevronDown, FiChevronUp, FiPaperclip } from "react-icons/fi";

const CentroDeAyuda = () => {
    const [busqueda, setBusqueda] = useState("");
    const [faqExpandido, setFaqExpandido] = useState(null);
    const [datosFormulario, setDatosFormulario] = useState({
        nombre: "",
        correo: "",
        asunto: "",
        mensaje: "",
        archivo: null,
    });
    const [erroresFormulario, setErroresFormulario] = useState({});

    const categoriasAyuda = [
        { icono: <FiUser />, titulo: "Ayuda con la cuenta" },
        { icono: <FiBook />, titulo: "Navegación de cursos" },
        { icono: <FiHelpCircle />, titulo: "Soporte técnico" },
    ];

    const preguntasFrecuentes = [
        {
            pregunta: "¿Cómo restablezco mi contraseña?",
            respuesta: "Para restablecer tu contraseña, haz clic en el enlace 'Olvidé mi contraseña' en la página de inicio de sesión y sigue las instrucciones enviadas a tu correo electrónico.",
        },
        {
            pregunta: "¿Cómo puedo rastrear mi progreso en el curso?",
            respuesta: "Puedes rastrear tu progreso visitando tu panel de usuario, donde encontrarás una barra de progreso para cada curso en el que estés inscrito.",
        },
        {
            pregunta: "¿Qué hago si un video no carga?",
            respuesta: "Si un video no carga, intenta actualizar la página o borrar la caché de tu navegador. Si el problema persiste, contacta a nuestro equipo de soporte técnico.",
        },
    ];

    const manejarCambioBusqueda = (e) => {
        setBusqueda(e.target.value);
    };

    const alternarFaq = (index) => {
        setFaqExpandido(faqExpandido === index ? null : index);
    };

    const manejarCambioInput = (e) => {
        const { name, value } = e.target;
        setDatosFormulario({ ...datosFormulario, [name]: value });
        validarCampo(name, value);
    };

    const manejarCambioArchivo = (e) => {
        setDatosFormulario({ ...datosFormulario, archivo: e.target.files[0] });
    };

    const validarCampo = (name, value) => {
        let errores = { ...erroresFormulario };
        switch (name) {
            case "correo":
                const regexCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                errores.correo = regexCorreo.test(value) ? "" : "Formato de correo no válido";
                break;
            case "nombre":
            case "asunto":
            case "mensaje":
                errores[name] = value.trim() === "" ? `${name} es obligatorio` : "";
                break;
            default:
                break;
        }
        setErroresFormulario(errores);
    };

    const manejarEnvio = (e) => {
        e.preventDefault();
        let hayErrores = false;
        Object.keys(datosFormulario).forEach((key) => {
            if (key !== "archivo") {
                validarCampo(key, datosFormulario[key]);
                if (erroresFormulario[key]) hayErrores = true;
            }
        });
        if (!hayErrores) {
            console.log("Formulario enviado:", datosFormulario);
            // Agrega aquí tu lógica para enviar el formulario
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br  py-24 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-4xl font-bold text-center text-[var(--spark-color)] mb-12">Centro de Ayuda</h1>

                <div className="bg-[var(--fondo-color)] rounded-lg  shadow-lg shadow-slate-500 p-6 mb-12 ">
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Buscar ayuda..."
                            value={busqueda}
                            onChange={manejarCambioBusqueda}
                            className="w-full py-3 px-4 pr-10 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[var(--main-color)]"
                        />
                        <FiSearch className="absolute right-3 top-3 text-gray-400 text-xl" />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                    {categoriasAyuda.map((categoria, index) => (
                        <div
                            key={index}
                            className="bg-[var(--fondo-color)] rounded-lg shadow-md p-6 flex items-center space-x-4 transition-transform hover:scale-105 cursor-pointer"
                        >
                            <div className="text-3xl text-[var(--main-color)] ">{categoria.icono}</div>
                            <h2 className="text-xl font-semibold text-white">{categoria.titulo}</h2>
                        </div>
                    ))}
                </div>

                <div className="bg-[var(--fondo-color)] rounded-lg  shadow-lg shadow-slate-500 p-6 mb-12">
                    <h2 className="text-2xl font-bold text-[var(--main-color)] mb-6">Preguntas Frecuentes</h2>
                    {preguntasFrecuentes.map((item, index) => (
                        <div key={index} className="mb-4">
                            <button
                                onClick={() => alternarFaq(index)}
                                className="flex justify-between items-center w-full text-left font-semibold text-white hover:text-gray-200 focus:outline-none"
                                aria-expanded={faqExpandido === index}
                            >
                                <span>{item.pregunta}</span>
                                {faqExpandido === index ? <FiChevronUp /> : <FiChevronDown />}
                            </button>
                            {faqExpandido === index && (
                                <p className="mt-2 text-white pl-4 border-l-2 border-[var(--main-color)] ">{item.respuesta}</p>
                            )}
                        </div>
                    ))}
                </div>

                <div className="bg-[var(--fondo-color)] rounded-lg  shadow-lg shadow-slate-500 p-6">
                    <h2 className="text-2xl font-bold text-[var(--main-color)] mb-6">¿Necesitas más ayuda?</h2>
                    <form onSubmit={manejarEnvio}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                            <div>
                                <label htmlFor="nombre" className="block text-sm font-medium text-white mb-1">
                                    Nombre
                                </label>
                                <input
                                    type="text"
                                    id="nombre"
                                    name="nombre"
                                    value={datosFormulario.nombre}
                                    onChange={manejarCambioInput}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-[var(--main-color)] focus:border-[var(--main-color)]"
                                    required
                                />
                                {erroresFormulario.nombre && <p className="mt-1 text-sm text-[var(--main-color-dark)] ">{erroresFormulario.nombre}</p>}
                            </div>
                            <div>
                                <label htmlFor="correo" className="block text-sm font-medium text-white mb-1">
                                    Correo
                                </label>
                                <input
                                    type="email"
                                    id="correo"
                                    name="correo"
                                    value={datosFormulario.correo}
                                    onChange={manejarCambioInput}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-[var(--main-color)] focus:border-[var(--main-color)]"
                                    required
                                />
                                {erroresFormulario.correo && <p className="mt-1 text-sm text-[var(--main-color-dark)] ">{erroresFormulario.correo}</p>}
                            </div>
                        </div>
                        <div className="mb-6">
                            <label htmlFor="asunto" className="block text-sm font-medium text-white mb-1">
                                Asunto
                            </label>
                            <input
                                type="text"
                                id="asunto"
                                name="asunto"
                                value={datosFormulario.asunto}
                                onChange={manejarCambioInput}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-[var(--main-color)] focus:border-[var(--main-color)]"
                                required
                            />
                            {erroresFormulario.asunto && <p className="mt-1 text-sm text-[var(--main-color-dark)] ">{erroresFormulario.asunto}</p>}
                        </div>
                        <div className="mb-6">
                            <label htmlFor="mensaje" className="block text-sm font-medium text-white mb-1">
                                Mensaje
                            </label>
                            <textarea
                                id="mensaje"
                                name="mensaje"
                                value={datosFormulario.mensaje}
                                onChange={manejarCambioInput}
                                rows="4"
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-[var(--main-color)] focus:border-[var(--main-color)]"
                                required
                            ></textarea>
                            {erroresFormulario.mensaje && <p className="mt-1 text-sm text-[var(--main-color-dark)] ">{erroresFormulario.mensaje}</p>}
                        </div>
                        <div className="mb-6">
                            <label htmlFor="archivo" className="block text-sm font-medium text-white mb-1">
                                Adjuntar archivo (opcional)
                            </label>
                            <div className="flex items-center space-x-3">
                                <input
                                    type="file"
                                    id="archivo"
                                    name="archivo"
                                    onChange={manejarCambioArchivo}
                                    className="w-full bg-white px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-[var(--main-color)] focus:border-[var(--main-color)]"
                                />
                                <FiPaperclip className="text-white text-2xl" />
                            </div>
                        </div>
                        <div>
                            <button
                                type="submit"
                                className="w-full py-3 px-4 bg-[var(--main-color)] text-white font-semibold rounded-md hover:bg-[var(--spark-color)] focus:outline-none focus:ring-2 focus:ring-[var(--main-color)] focus:ring-opacity-50"
                            >
                                Enviar
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default CentroDeAyuda;
