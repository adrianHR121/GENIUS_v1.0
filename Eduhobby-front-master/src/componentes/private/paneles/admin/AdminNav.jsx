import React, { useState } from 'react';
import { FaHome, FaChartBar, FaUsers, FaCog, FaSignOutAlt } from 'react-icons/fa';
import { FiRefreshCcw } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import { useAuth, SITE_NAME } from '../../../protected/AuthProvider';
import { LayoutList, BookCheck  } from 'lucide-react';

import './css/styleAdmin.css';

import AdminProfile from './adminComponents/AdminProfile';
import NotificationBell from './adminComponents/NotificationBell ';

const AdminNav = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(true);
  const auth = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
    document.body.style.overflow = isOpen ? 'auto' : 'hidden'; // Desactiva/Activa el scroll
  };

  const handleLogout = async () => {
    setIsLoading(true); // Mostrar loader
    await auth.logout();
    setIsLoading(false); // Ocultar loader
    navigate('/Login');
  };

  return (
    <>
      <div className={`fixed z-40 inset-0 bg-gray-900 bg-opacity-50 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} onClick={toggleSidebar}>
      </div>
      <div className='fixed z-50'>
        <div className='fixed w-full h-16 bg-[var(--fondo-color)] flex items-center justify-between px-4'>
          <div className={`flex items-center justify-between text-white ${isOpen ? 'w-64' : 'w-16'} transition-width duration-300`}>
            <span className="flex text-2xl font-bold w-full h-full">
              {isOpen ? (
                <>
                  <img src='/img/eduHobbyLogo1.png' alt="Logo" className="h-8 w-8 mr-2 inline-block" />
                  {SITE_NAME}
                </>
              ) : (
                <img src={"/img/eduHobbyLogo1.png"} alt="Logo" className="h-8 w-8 mr-10 inline-block" />
              )}
            </span>

            <label className="hamburger">
              <input type="checkbox" checked={isOpen} onChange={toggleSidebar} />
              <svg viewBox="0 0 32 32">
                <path className="line line-top-bottom" d="M27 10 13 10C10.8 10 9 8.2 9 6 9 3.5 10.8 2 13 2 15.2 2 17 3.8 17 6L17 26C17 28.2 18.8 30 21 30 23.2 30 25 28.2 25 26 25 23.8 23.2 22 21 22L7 22"></path>
                <path className="line" d="M7 16 27 16"></path>
              </svg>
            </label>

          </div>
          <div className="flex items-center">
          </div>
          <div className="flex items-center space-x-4">
            <NotificationBell />
            <AdminProfile imageSrc="/img/yahir.jpeg" />
          </div>
        </div>
        <div className={`z-20 flex flex-col h-screen p-3 bg-[var(--fondo-color)] text-white ${isOpen ? 'w-64' : 'w-20'} transition-width duration-300`}>
          <div className='pt-10'>
            <ul className="mt-5 space-y-2">
              <Link to="/Administrador/home">
                <li className="flex items-center space-x-4 hover:bg-gray-700 p-2 rounded-md cursor-pointer">
                  <FaHome size={20} />
                  {isOpen && <span>Panel</span>}
                </li>
              </Link>
              <Link to="/Administrador/alta">
                <li className="flex items-center space-x-4 hover:bg-gray-700 p-2 rounded-md cursor-pointer">
                  <FaChartBar size={20} />
                  {isOpen && <span>Gestión de Usuarios</span>}
                </li>
              </Link>
              <Link to="/Administrador/UpdatePassword">
                <li className="flex items-center space-x-4 hover:bg-gray-700 p-2 rounded-md cursor-pointer">
                  <FiRefreshCcw size={20} />
                  {isOpen && <span>Actualizar Contraseña</span>}
                </li>
              </Link>
              <Link to="/Administrador/UpdateUser">
                <li className="flex items-center space-x-4 hover:bg-gray-700 p-2 rounded-md cursor-pointer">
                  <FaUsers size={20} />
                  {isOpen && <span>Actualizar usuario</span>}
                </li>
              </Link>
              <Link to="/Administrador/CategoriesManager">
              <li className="flex items-center space-x-4 hover:bg-gray-700 p-2 rounded-md cursor-pointer">
                <LayoutList  size={24} />
                {isOpen && <span>Lista de Categorias de Cursos</span>}
              </li>
              </Link>
              <Link to="/Administrador/CourseApproval">
              <li className="flex items-center space-x-4 hover:bg-gray-700 p-2 rounded-md cursor-pointer">
                <BookCheck  size={24} />
                {isOpen && <span>Cursos por Aprobar</span>}
              </li>
              </Link>
              <li className="flex items-center space-x-4 hover:bg-gray-700 p-2 rounded-md cursor-pointer">
                <FaCog size={20} />
                {isOpen && <span>Settings</span>}
              </li>
              
            </ul>
          </div>
          <div className="mt-auto">
    <ul className="space-y-2">
        <li className="flex items-center space-x-4 hover:bg-gray-700 p-2 rounded-md cursor-pointer" onClick={handleLogout}>
            <FaSignOutAlt size={20} />
            {isOpen && <span>{isLoading ? 'Cerrando sesión...' : 'Logout'}</span>} 
        </li>
    </ul>
</div>
        </div>
      </div>
    </>
  );
};

export default AdminNav;
