import React, { useEffect, useState } from "react";
import { getAllCosts } from "../../../fetch/public/costService"; 
import "./css/Precios.css";

const Precios = () => {
    const [costs, setCosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCosts = async () => {
            try {
                const data = await getAllCosts();
                // Filtrar los costos para no incluir "Compra de curso"
                const filteredCosts = data.filter(cost => cost.planName !== "Compra de curso");
                setCosts(filteredCosts);
                setLoading(false);
            } catch (error) {
                setError(error.message);
                setLoading(false);
            }
        };

        fetchCosts();
    }, []);

    if (loading) return <p>Cargando precios...</p>;
    if (error) return <p>Error al cargar los precios: {error}</p>;

    return (
        <div className="precios-container">
            <div className="cards-background">
                {/* Título y subtítulo */}
                <div className="precios-header">
                    <h1 className="precios-title">
                        Accede a TODOS los cursos las veces que quieras
                    </h1>
                    <p className="precios-subtitle">
                        Sin salir de tu casa. Cancela cuando quieras.
                    </p>
                </div>
                
                {/* Contenedor de las tarjetas */}
                <div className="cards-container">
                    {costs.map((cost) => {
                        // Identificar el plan trimestral para destacarlo
                        const isHighlighted = cost.durationMonths === 3;

                        return (
                            <div
                                className={`card ${isHighlighted ? 'highlighted-card' : ''}`}
                                key={cost._id}
                            >
                                {isHighlighted && (
                                    <div className="highlight-label">Mejor opción</div>
                                )}
                                <div className="card-content">
                                    <span className="card-title">{cost.planName}</span>
                                    <div className="card-price">${cost.price} MXN</div>

                                    {/* Mostrar el subprecio mensual si aplica */}
                                    {cost.durationMonths > 1 && (
                                        <div className="card-sub-price">
                                            ${Math.round(cost.price / cost.durationMonths)} MXN/mes
                                        </div>
                                    )}

                                    <div className="card-description">
                                        {cost.description || "Acceso a todos los cursos."}
                                    </div>
                                    <button className="animated-button">
                                        ¡Suscríbete!
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default Precios;
