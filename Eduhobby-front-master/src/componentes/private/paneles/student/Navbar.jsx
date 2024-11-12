import React, { useState, useEffect } from 'react';
import { AiOutlineMenu, AiOutlineSearch, AiOutlineClose } from 'react-icons/ai';
import { CiUser, CiLogout, CiCamera, CiMusicNote1, CiHeart, CiHeadphones } from 'react-icons/ci';
import { VscJson, VscMortarBoard } from 'react-icons/vsc';
import { HiOutlineHome } from "react-icons/hi2";
import { PiSigmaThin } from 'react-icons/pi';
import { IoIosArrowDown } from "react-icons/io";
import { CiPen, CiMonitor } from 'react-icons/ci';
import { MdAutoGraph } from 'react-icons/md';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../../protected/AuthProvider';
import { getAllCategories } from '../../../../fetch/teahers/categoryService'; 




//Component
import CourseProfileView from './profile/CourseProfileView';
import Button from '../../../public/fragments/Button';
import categoryIcons from './Recursos/categoryIcons';


const Navbar = ({ onSelectCategory }) => {
    const [nav, setNav] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [categories, setCategories] = useState([]); 
    const navigate = useNavigate();
    const auth = useAuth();
    const { isLoggedIn } = useAuth();

    
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const data = await getAllCategories();
                setCategories(data); 
            } catch (error) {
                console.error('Error al obtener las categorías:', error);
            }
        };
        fetchCategories();
    }, []);

    const handleLogout = async () => {
        await auth.logout();
        navigate('/Login');
    };

    const handleCategoryClick = (category) => {
        onSelectCategory(category);
        setNav(false);
    };

    const handleClearFilter = () => {
        onSelectCategory(null);  
        setNav(false);
    };

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };

    const toggleModal = () => {
        setIsModalOpen(!isModalOpen); 
    };

    return (
        <div className='max-w[1640px] mx-auto flex justify-between items-center p-4 fixed top-0 left-0 right-0 bg-white z-50'>
            {/* Left side */}
            <div className='flex items-center cursor-pointer'>
                <div className='hover:scale-105 duration-300' onClick={() => setNav(!nav)}>
                    <AiOutlineMenu size={30} />
                </div>
                <div className='flex items-center h-10'>
                    <img src="/img/eduHobbyLogo1.png" alt="" className='ml-4 h-full' />
                    <h1 className='text=2l sm:text-3xl lg:text-4xl px-2'>
                        <span className='font-bold text-[var(--back-color)]'>GENIUS</span>
                    </h1>
                </div>
            </div>

            {/* Search bar */}
            <div className='bg-gray-200 rounded-full flex items-center px-2 w-[200px] sm:w-[400px] lg:w-[500px] hover:scale-105 duration-300'>
                <AiOutlineSearch size={20} />
                <input className='bg-transparent p-2 w-full focus:outline-none' type="text" placeholder='¿Qué quieres aprender hoy?' />
            </div>
            {isLoggedIn ? (
                <>
                    <button onClick={toggleModal} className='bg-white text-black hidden md:flex items-center py-2 rounded hover:scale-105 duration-300'>
                        <CiUser size={20} className='mr-2' />Perfil
                    </button>

                    {isModalOpen && <div className='bg-black/80 fixed w-full h-screen z-10 top-0 left-0'></div>}

                    {isModalOpen && (
                        <div className='fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-4 rounded-lg shadow-lg z-20'>
                            <CourseProfileView onClose={toggleModal} />
                        </div>
                    )}
                </>
            ) : (
                <div className="hidden justify-center items-center lg:block login">
                       <Button />
                </div>
            )}

            {/* Side menu */}
            <div className={nav ? 'fixed top-0 left-0 w-[300px] h-screen bg-white z-10 duration-300' :
                'fixed top-0 left-[-100%] w-[300px] h-screen bg-white z-10 duration-300'
            }>
                <AiOutlineClose onClick={() => setNav(!nav)} size={30} className='absolute right-4 top-4 cursor-pointer hover:scale-105 duration-300' />

                <h2 className='text-2xl p-4'>
                    <span className='font-bold'>Categorías</span>
                </h2>

                <nav>
                    <ul>
                        {/* Botón de Inicio */}
                        <li className='text-xl py-4 flex ml-10 cursor-pointer hover:scale-105 duration-300'>
                            <Link to="/Dashboard" className='flex items-center' onClick={() => setNav(false)}>
                                <HiOutlineHome size={25} className='mr-4' />Inicio
                            </Link>
                        </li>

                        {/* Lista desplegable de categorías */}
                        <li className='text-xl py-4 flex ml-10 cursor-pointer hover:scale-105 duration-300' onClick={toggleDropdown}>
                            <IoIosArrowDown
                                size={25}
                                className={`mr-4 transform duration-300 ${dropdownOpen ? 'rotate-180' : 'rotate-0'}`}
                            />
                            Categorías
                        </li>
                        <div className={`overflow-hidden transition-all duration-300 ${dropdownOpen ? 'max-h-[500px]' : 'max-h-0'}`}>
                            <ul className='ml-10'>
                                {categories.length > 0 ? (
                                    categories.map((category) => (
                                        <li
                                            key={category.id}
                                            className='text-lg py-2 cursor-pointer hover:scale-105 duration-300'
                                            onClick={() => handleCategoryClick(category.name)}
                                        >
                                            
                                            {categoryIcons[category.name]?.icon}
                                            {category.name}
                                        </li>
                                    ))
                                ) : (
                                    <li className='text-lg py-2'>No hay categorías disponibles</li>
                                )}
                            </ul>
                        </div>

                        {/* Botón para eliminar el filtrado */}
                        <li className='text-xl py-4 flex ml-10 cursor-pointer hover:scale-105 duration-300' onClick={handleClearFilter}>
                            <CiHeadphones size={25} className='mr-4' />Mostrar todas las categorías
                        </li>

                        {/* Otras opciones */}
                        <li className='text-xl py-4 flex ml-10 cursor-pointer hover:scale-105 duration-300'>
                            <CiHeart size={25} className='mr-4' /> Favoritos
                        </li>
                        <li className='text-xl py-4 flex ml-10 cursor-pointer hover:scale-105 duration-300'>
                        <Link to="/Dashboard/HelpCenter" className='flex items-center' onClick={() => setNav(false)}>
                            <CiHeadphones size={25} className='mr-4' />Centro de ayuda
                            </Link>
                        </li>
                        {isLoggedIn ? (
                            <li className='text-xl py-4 flex ml-10 cursor-pointer hover:scale-105 duration-300' onClick={handleLogout}>
                                <CiLogout size={25} className='mr-4' />Cerrar sesión
                            </li>
                        ) : (
                            <>
                                {/* Opciones para no logueados */}
                            </>
                        )}
                    </ul>
                </nav>
            </div>
        </div>
    );
};

export default Navbar;
