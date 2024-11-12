import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import LoadingPage from './public/LoadingPage';
import 'animate.css';

gsap.registerPlugin(ScrollTrigger);

const Carga = () => {
  const loadingPageRef = useRef(null);
  const loaderRef = useRef(null);
  const lastrayRef = useRef(null);
  const manRef = useRef(null);

  useEffect(() => {
    const loadingPage = loadingPageRef.current;
    const loader = loaderRef.current;
    const lastray = lastrayRef.current;
    const man = manRef.current;

    if (loadingPage) {
      setTimeout(() => {
        loadingPage.className += " loaded";
        loader.className += " opzero";
        lastray.className += " finalray";
        document.body.className += " whitebk";
        // console.log("test MostrarNav");
      }, 6500);

      gsap.to("#bg", {
        scrollTrigger: {
          scrub: 1
        },
        scale: 1.5
      });

      gsap.to(man, {
        scrollTrigger: {
          scrub: 1
        },
        y: 600
      });

      const floatAnimation = gsap.to(man, {
        y: -100,
        duration: 1,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
        paused: true
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

      window.addEventListener('scroll', handleScroll);

      ScrollTrigger.create({
        trigger: man,
        start: "top center",
        onEnter: () => floatAnimation.play(),
        onLeave: () => floatAnimation.pause()
      });

      ScrollTrigger.create({
        trigger: man,
        start: "top+=100",
        onEnterBack: () => floatAnimation.play(),
        onLeaveBack: () => floatAnimation.pause()
      });

      gsap.to("#clouds_1", {
        scrollTrigger: {
          scrub: 1
        },
        x: 200
      });

      gsap.to("#clouds_2", {
        scrollTrigger: {
          scrub: 1
        },
        x: -200
      });

      gsap.to("#text", {
        scrollTrigger: {
          scrub: 1
        },
        y: 700
      });

      return () => {
        window.removeEventListener('scroll', handleScroll);
        ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      };
    }
  }, []);

  return (
    <div>
      <LoadingPage loadingPageRef={loadingPageRef} loaderRef={loaderRef} lastrayRef={lastrayRef} />
    </div>
  );
};

export default Carga;
