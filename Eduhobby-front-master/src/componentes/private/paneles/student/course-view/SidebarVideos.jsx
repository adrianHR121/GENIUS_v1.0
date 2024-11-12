import React, { useState } from 'react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi'; // Importamos iconos para mejor UX
import { Link } from 'react-router-dom';
import './Timeline.css'


const SidebarVideos = ({ courses = [] }) => {
    const [isOpen, setIsOpen] = useState(false);
    
    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className={`relative transition-all duration-300 ${isOpen ? 'w-64' : 'w-16'} bg-gray-800 h-auto shadow-lg rounded-tr-lg rounded-blr-lg`}>
            <div className="flex flex-col h-full">
                <div className="p-4 text-white">
                    <button
                        onClick={toggleSidebar}
                        className="relative p-2 bg-blue-500 text-white rounded-full shadow-md focus:outline-none"
                    >
                        {isOpen ? <FiChevronRight size={20} /> : <FiChevronLeft size={20} />}
                    </button>
                </div>

                {isOpen ? (
                    <section className="timelineSB p-4 overflow-y-auto max-h-full scrollbar-hide"> {/* Ajustar la altura máxima según sea necesario */}
                    <ul>
                        {courses.map((curso) => (
                            <li key={curso._id} className="h-full">
                                <div className="text-white ml-2 CursoTitle">
                                    <h2 className='w-20'>{curso.title}</h2>
                                </div>
                            </li>
                        ))}
                    </ul>
                </section>
                ) : (
                    <section className="timelineSB p-4">
                        <ul>
                            {courses.map((curso) => (
                                <li key={curso._id} className="flex items-center m-auto ml-">
                                    
                                </li>
                            ))}
                        </ul>
                    </section>
                )}
            </div>
        </div>
    );
};


export default SidebarVideos;
