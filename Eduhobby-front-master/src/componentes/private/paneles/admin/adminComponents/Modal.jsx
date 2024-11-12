import React from 'react';
import '../css/styleAdmin.css';

import { useNavigate } from 'react-router-dom';

const Modal = ({ notifications, toggleModal }) => {
    const navigate = useNavigate();

    const handleViewDetails = (id) => {
        toggleModal();
        navigate(`/Administrador/alta?maestroId=${encodeURIComponent(id)}`);
    };

    return (
        <>
            <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                <div className="bg-white p-10 rounded-lg w-11/12 max-w-lg relative">
                    <div className="flex justify-between items-center">
                        <h2 className="text-xl font-bold">Solicitudes de alta</h2>
                        <div className="flex justify-end border-none">
                            <button className="cursor-pointer border-none duration-200 hover:scale-125 active:scale-100" title="Go Back"
                                onClick={toggleModal}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="50px" height="50px" viewBox="0 0 24 24" className="stroke-[var(--main-color)]">
                                    <path strokeLinejoin="round" strokeLinecap="round" strokeWidth="1.5" d="M11 6L5 12M5 12L11 18M5 12H19"></path>
                                </svg>
                            </button>
                        </div>
                    </div>
                    <div className="mt-4 max-h-60 overflow-y-auto">
                        {notifications.length > 0 ? (
                            notifications.map((request) => (
                                <div key={request._id} className="flex items-center justify-between p-4 hover:bg-gray-200 rounded-lg">
                                    <div className="flex items-center">
                                        <div className="w-12 h-12 bg-gradient-to-r from-[var(--fondo-color)] to-[var(--main-color)] rounded-full mr-4"></div>
                                        <div>
                                            <span className="block font-semibold">
                                                {request.firstNames}
                                            </span>
                                            <span className="block text-gray-600">
                                                {new Date(request.creationDate).toLocaleDateString()}
                                            </span>
                                        </div>
                                    </div>
                                    <button 
                                        className="bg-[var(--fondo-color)] text-white border-none px-4 py-1 rounded-full font-semibold hover:bg-[var(--main-color)] "
                                        onClick={() => handleViewDetails(request._id)}
                                    >
                                        Ver
                                    </button>
                                </div>
                            ))
                        ) : (
                            <div className="text-center text-gray-600">
                                Por el momento no hay ninguna notificación
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Modal;
