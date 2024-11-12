import React, { useRef, useEffect } from "react";
import "../css/style.css";
import "../css/cell-phone.css";
import { SITE_NAME, ABBREVIATED_SITE_NAME } from '../protected/AuthProvider';
import { gsap } from "gsap";
import ScrollTrigger from 'gsap/ScrollTrigger';
import CardCursos from "./fragments/CardCursos";

gsap.registerPlugin(ScrollTrigger);

const cardData = [
  {
    image: "/img/fragmentsIMG/curso3.jpg",
    title: "Fundamentos de Matemáticas para Informáticos",
    description:
      "Aprende, repasa y mejora tu conocimiento matemático desde lo más básico a lo más avanzado, trabajando con ejemplos enfocados al desarrollo web.",
  },
  {
    image: "/img/fragmentsIMG/python.jpg",
    title: "Aprende programación con Python",
    description:
      "¿No sabes programar? Mejor, porque en este curso vamos a empezar desde cero. Un curso pensado para todas las personas de todas las edades, independientemente de su nivel.",
  },
  {
    image: "/img/fragmentsIMG/redes.jpg",
    title: "Introducción a Redes Informáticas",
    description:
      "¿Alguna vez has querido saber cómo funcionan las redes? ¿Para qué sirven? Aprende desde su diseño y componentes, hasta seguridad y VPN. Practica con herramientas de simulación y ejemplos reales a diseñar, configurar y administrar redes locales.",
  },
];

const MainContent = () => {
  const manRef = useRef(null);

  useEffect(() => {
    const man = manRef.current;


    gsap.to('#bg', {
      scrollTrigger: {
        scrub: 1,
      },
      scale: 1.5,
    });

    gsap.to(man, {
      scrollTrigger: {
        scrub: 1,
      },
      y: 600,
    });

    const floatAnimation = gsap.to(man, {
      y: -100,
      duration: 1,
      ease: 'sine.inOut',
      repeat: -1,
      yoyo: true,
      paused: true,
    });
    floatAnimation.play();

    let lastScrollY = window.scrollY;
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY) {
        floatAnimation.pause();
      } else {
        floatAnimation.play();
      }
      lastScrollY = currentScrollY;
    };

    ScrollTrigger.create({
      trigger: man,
      start: 'top center',
      onEnter: () => floatAnimation.play(),
      onLeave: () => floatAnimation.pause(),
    });

    ScrollTrigger.create({
      trigger: man,
      start: 'top+=100',
      onEnterBack: () => floatAnimation.play(),
      onLeaveBack: () => floatAnimation.pause(),
    });

    gsap.to('#clouds_1', {
      scrollTrigger: {
        scrub: 1,
      },
      x: 200,
    });

    gsap.to('#clouds_2', {
      scrollTrigger: {
        scrub: 1,
      },
      x: -200,
    });

    gsap.to('#text', {
      scrollTrigger: {
        scrub: 1,
      },
      y: 700,
    });

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <main>
      <section>
        <img className="brightness-[.70]" src="/img/fondo4.jpg" id="bg" alt="background" />
        <div className="hidden md:block">
          <img src="/img/clouds_1.png" id="clouds_1" alt="clouds_1" />
          <img src="/img/clouds_2.png" id="clouds_2" alt="clouds_2" />
        </div>
        <header id="text">
          <h1>
            <span>{SITE_NAME}</span> <br />
            <span className="text-2xl text-[var(--main-color)] ">{ABBREVIATED_SITE_NAME}</span>
          </h1>
          <div className="info-brand">
            <h2>Expande tu conocimiento hoy mismo</h2>
          </div>
        </header>
        <div className="hidden md:block">
          <img
            src="/img/eduHobbyLogo1.png"
            id="man"
            className="personaje float-image"
            alt="man"
            height="60px"
            width="60px"
            ref={manRef} // Asignamos el ref aquí
          />
        </div>
        <div style={{ position: "absolute", width: "100%", bottom: "0", left: "0" }}>
          <svg
            preserveAspectRatio="none"
            viewBox="0 0 1200 120"
            xmlns="http://www.w3.org/2000/svg"
            style={{
              fill: "#16665d",
              width: "100%",
              height: "172px",
              transform: "rotate(180deg)",
            }}
          >
            <path
              d="M0 0v46.29c47.79 22.2 103.59 32.17 158 28 70.36-5.37 136.33-33.31 206.8-37.5 73.84-4.36 147.54 16.88 218.2 35.26 69.27 18 138.3 24.88 209.4 13.08 36.15-6 69.85-17.84 104.45-29.34C989.49 25 1113-14.29 1200 52.47V0z"
              opacity=".25"
            />
            <path
              d="M0 0v15.81c13 21.11 27.64 41.05 47.69 56.24C99.41 111.27 165 111 224.58 91.58c31.15-10.15 60.09-26.07 89.67-39.8 40.92-19 84.73-46 130.83-49.67 36.26-2.85 70.9 9.42 98.6 31.56 31.77 25.39 62.32 62 103.63 73 40.44 10.79 81.35-6.69 119.13-24.28s75.16-39 116.92-43.05c59.73-5.85 113.28 22.88 168.9 38.84 30.2 8.66 59 6.17 87.09-7.5 22.43-10.89 48-26.93 60.65-49.24V0z"
              opacity=".5"
            />
            <path d="M0 0v5.63C149.93 59 314.09 71.32 475.83 42.57c43-7.64 84.23-20.12 127.61-26.46 59-8.63 112.48 12.24 165.56 35.4C827.93 77.22 886 95.24 951.2 90c86.53-7 172.46-45.71 248.8-84.81V0z" />
          </svg>
        </div>
      </section>

      <div className="sec">
        <div className="content" id="elemento-entrada">
          <article>
            <h2>Cursos populares</h2>
            <p>
              Explora nuestra selección de cursos más populares, cuidadosamente
              diseñados para satisfacer tus necesidades de aprendizaje.
              <br />
              Desde programación hasta diseño gráfico, estos cursos están aquí para
              llevarte al siguiente nivel en tu camino de desarrollo profesional y
              personal.
            </p>
          </article>
          <div className="cards-container">
            {cardData.map((card, index) => (
              <CardCursos
                key={index}
                image={card.image}
                title={card.title}
                description={card.description}
              />
            ))}
          </div>
        </div>
      </div>
    </main>
  );
};

export default MainContent;
