import React from 'react';
import './css/Metricas.css';
import CountUp from 'react-countup';
import { useInView } from 'react-intersection-observer';

const Metricas = () => {
    const { ref, inView } = useInView({
        triggerOnce: true, 
        threshold: 0.1,    
    });

    return (
        <div className="metricas-container" ref={ref}>
            <div className="metrica">
                <div className="numero">
                    + de {inView && <CountUp start={0} end={1000} duration={2} separator="," />}
                </div>
                <div className="descripcion">Alumnos</div>
            </div>
            <div className="metrica">
                <div className="numero">
                    + de {inView && <CountUp start={0} end={200} duration={2} separator="," />}
                </div>
                <div className="descripcion">Horas de contenido</div>
            </div>
            <div className="metrica">
                <div className="numero">
                    + de {inView && <CountUp start={0} end={150} duration={2} separator="," />}
                </div>
                <div className="descripcion">Cursos</div>
            </div>
        </div>
    );
};

export default Metricas;
