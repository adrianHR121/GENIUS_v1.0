import React, { useRef ,useEffect } from "react";
import gsap from 'gsap';
import { useNavigate } from 'react-router-dom';

const Mensaje = () => {
    const navigate = useNavigate();
    const manRef = useRef(null);

    useEffect(() => {
        const man = manRef.current;

        const floatAnimation = gsap.to(man, {
            y: -100,
            duration: 1,
            ease: 'sine.inOut',
            repeat: -1,
            yoyo: true,
            paused: true,
          });

        floatAnimation.play(); // Iniciar la animación al cargar el componente

        return () => {
            floatAnimation.kill(); // Detener y limpiar la animación al desmontar el componente
        };
    }, [manRef]);

    const handleBackClick = () => {
        navigate('/');
      };
    

    return (
        <main className="min-h-screen flex items-center justify-center bg-gray-100">
            <section className="relative text-center p-6 bg-white bg-opacity-80 rounded shadow-lg">
                <img src="/img/fondoMensaje.jpg" id="bg" alt="background" className="absolute top-0 left-0 w-full h-full object-cover" />
                <div className="relative z-10 text-start bg-[var(--fondo-color)] p-10 rounded-3xl shadow-lg shadow-black">
                    <h2 className="text-5xl font-bold mb-4 text-[var(--main-color)]">¡Gracias por tu interés en ser parte de EduHobby!</h2>
                    <p className="text-2xl text-white font-bold">Pronto nos pondremos en contacto contigo para añadirte como maestro a nuestra plataforma.</p>
                </div>
                <div className="h-120 ml-36">
                    <img
                        src="/img/eduHobbyLogo1.png"
                        id="man"
                        className="relative z-10 mt-6 mx-auto"
                        alt="man"
                        height="60px"
                        width="60px"
                        ref={manRef}
                    />
                </div>
            </section>
            <button
                className="regresarHome absolute bottom-4 left-4 flex items-center justify-center w-12 h-12 bg-[var(--fondo-color)] rounded-full border-none font-semibold shadow-[0px_0px_0px_4px_rgba(180,160,255,0.253)] cursor-pointer transition-all duration-300 overflow-hidden "
                onClick={handleBackClick}
            >
                <svg className="svgIcon w-3 transition-all duration-300" viewBox="0 0 384 512">
                    <path
                        d="M214.6 41.4c-12.5-12.5-32.8-12.5-45.3 0l-160 160c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 141.2V448c0 17.7 14.3 32 32 32s32-14.3 32-32V141.2L329.4 246.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3l-160-160z"
                        className="fill-white"
                    />
                </svg>
            </button>
        </main>
    );
};

export default Mensaje;
