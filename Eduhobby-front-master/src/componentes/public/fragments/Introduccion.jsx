import React from "react";
import "./css/Introduccion.css";
import "animate.css";

const Introduccion = () => {
    return (
        <>
            <main>
                <section className="sectionVideos">
                    <div className="contenedorVideo">
                        <div className="cardVideo">
                            {/* <div className="video">
                                <video  controls autoplay loop muted>
                                    <source src="/img/fragmentsIMG/video.mp4" type="video/mp4" />
                                    Your browser does not support the video tag.
                                </video>
                            </div> */}
                            <div className="informacion">
                                <div className="title">
                                    <h2>Información sobre los cursos</h2>
                                </div>
                                <hr className="stylish-line" />
                                <div className="contenido">
                                    <p>
                                        Nuestros cursos están diseñados para ofrecer una experiencia de aprendizaje 
                                        integral y dinámica. A continuación, te explicamos más sobre el contenido y 
                                        la metodología de nuestros cursos.
                                    </p>
                                    <h3>¿Por qué elegirnos?</h3>
                                    <p>
                                        Ofrecemos una amplia variedad de cursos en línea de diversas áreas del conocimiento, 
                                        desde tecnología y negocios hasta arte y ciencia. Cada curso está cuidadosamente 
                                        estructurado para proporcionar tanto conocimientos teóricos como prácticos, 
                                        asegurando que los estudiantes adquieran habilidades aplicables en el mundo real.
                                    </p>
                                    <h3>¿Cómo se manejan los cursos?</h3>
                                    <p>
                                        Los cursos se manejan a través de una plataforma de aprendizaje en línea, 
                                        accesible desde cualquier dispositivo con conexión a Internet. Cada curso incluye 
                                        lecciones en video, materiales de lectura, y ejercicios prácticos. Además, 
                                        contamos con foros de discusión y sesiones de tutoría en vivo para apoyar a los 
                                        estudiantes a lo largo de su proceso de aprendizaje.
                                    </p>
                                    <br />
                                    <p>
                                        Al finalizar un curso, los estudiantes pueden obtener un certificado de 
                                        finalización que reconoce su esfuerzo y los conocimientos adquiridos. Este 
                                        certificado puede ser una valiosa adición a tu currículo profesional.
                                    </p>
                                </div>
                                <div className="boton">
                                    <button className="animated-button">
                                        <div className="layer1">
                                            <span>
                                                <p>¿Quieres saber más?</p><p></p>
                                            </span>
                                        </div>
                                        <div className="layer2">
                                            <span>
                                                <p>Comienza ahora mismo!</p><p></p>
                                            </span>
                                        </div>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </>
    );
};

export default Introduccion;
