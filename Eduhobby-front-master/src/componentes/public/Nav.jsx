import React, { useState, useEffect } from "react";
import "../css/Nav.css";
import Button from "./fragments/Button";
import { SITE_NAME } from '../protected/AuthProvider';


const Nav = ({ menuRef }) => {
  const [scrolled, setScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="conte">
      <div className={`parent ${scrolled ? "scrolled" : ""}`}>
        <div className=" flex items-center w-full">
          <img src="/img/eduHobbyLogo1.png" alt="Logo" className="w-16 h-auto m-2" />
          <span className="ml-3 text-2xl font-bold">
            <span className={`transition-colors duration-300 ${scrolled ? "text-[var(--main-color)]" : "text-white"}`}>{SITE_NAME}</span>
          </span>
          <div className="flex lg:hidden justify-center w-full">
          <button onClick={toggleMobileMenu} className="text-black focus:outline-none">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
          </button>
        </div>
        </div>
        
        <div className="menu hidden lg:flex">
          <nav className="menu-rapido" ref={menuRef}>
            <ul className="flex space-x-4">
              <li>
                <button className="btn">Inicio</button>
              </li>
              <li>
                <button className="btn">Nosotros</button>
              </li>
              <li>
                <button className="btn">Servicios</button>
              </li>
              <li>
                <button className="btn">Contacto</button>
              </li>
            </ul>
          </nav>
        </div>
        
        <div className="hidden justify-center items-center lg:block login">
          <Button />
        </div>

        
        
        <div className={`mobile-menu ${isMobileMenuOpen ? "block" : "hidden"}`}>
          <nav className="menu-rapido" ref={menuRef}>
            <ul className="flex flex-col space-y-4">
              <li>
                <button className="btn">Inicio</button>
              </li>
              <li>
                <button className="btn">Nosotros</button>
              </li>
              <li>
                <button className="btn">Servicios</button>
              </li>
              <li>
                <button className="btn">Contacto</button>
              </li>
              <li className="block lg:hidden">
                <Button />
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
