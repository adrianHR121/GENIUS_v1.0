// UpdatePassword.jsx
import React, { useState, useEffect } from 'react';
import { TbFilterX } from "react-icons/tb";
import './css/styleAdmin.css'; // Importa tu CSS personalizado si es necesario

import UserRequestsTable from './adminComponents/UserRequestsTable ';
import TeacherRequestsTable from './adminComponents/TeacherRequestsTable';

const UpdatePassword = () => {
    const [userRequests, setUserRequests] = useState([]);
    const [teacherRequests, setTeacherRequests] = useState([]);
    const [filter, setFilter] = useState({
        username: '',
        email: '',
        status: 'all',
    });

    // Simulación de datos de solicitudes de usuarios y maestros
    useEffect(() => {
        const usersData = [
            { id: 1, username: 'user1', email: 'user1@example.com', status: 'pending' },
            { id: 2, username: 'user2', email: 'user2@example.com', status: 'approved' },
            { id: 3, username: 'user3', email: 'user3@example.com', status: 'pending' },
            { id: 4, username: 'user4', email: 'user4@example.com', status: 'pending' },
            { id: 5, username: 'user5', email: 'user5@example.com', status: 'approved' },
            { id: 6, username: 'user6', email: 'user6@example.com', status: 'pending' },
            { id: 7, username: 'user7', email: 'user7@example.com', status: 'pending' },
            { id: 8, username: 'user8', email: 'user8@example.com', status: 'approved' },
            { id: 9, username: 'user9', email: 'user9@example.com', status: 'pending' },
        ];
        setUserRequests(usersData);

        const teachersData = [
            { id: 1, name: 'Teacher A', email: 'teacherA@example.com', status: 'pending' },
            { id: 2, name: 'Teacher B', email: 'teacherB@example.com', status: 'approved' },
            { id: 3, name: 'Teacher C', email: 'teacherC@example.com', status: 'pending' },
            { id: 4, name: 'Teacher D', email: 'teacherD@example.com', status: 'pending' },
            { id: 5, name: 'Teacher E', email: 'teacherE@example.com', status: 'approved' },
            { id: 6, name: 'Teacher F', email: 'teacherF@example.com', status: 'pending' },
            { id: 7, name: 'Teacher G', email: 'teacherG@example.com', status: 'pending' },
            { id: 8, name: 'Teacher H', email: 'teacherH@example.com', status: 'approved' },
            { id: 9, name: 'Teacher I', email: 'teacherI@example.com', status: 'pending' },
        ];
        setTeacherRequests(teachersData);
    }, []);

    // Función para manejar los cambios en los filtros
    const handleFilterChange = (e) => {
        setFilter({ ...filter, [e.target.name]: e.target.value });
    };

    // Función para filtrar solicitudes de usuarios
    const filteredUserRequests = userRequests.filter((user) => {
        return (
            (filter.username === '' || user.username.toLowerCase().includes(filter.username.toLowerCase())) &&
            (filter.email === '' || user.email.toLowerCase().includes(filter.email.toLowerCase())) &&
            (filter.status === 'all' || user.status === filter.status)
        );
    });

    // Función para filtrar solicitudes de maestros
    const filteredTeacherRequests = teacherRequests.filter((teacher) => {
        return (
            (filter.username === '' || teacher.name.toLowerCase().includes(filter.username.toLowerCase())) &&
            (filter.email === '' || teacher.email.toLowerCase().includes(filter.email.toLowerCase())) &&
            (filter.status === 'all' || teacher.status === filter.status)
        );
    });

    // Ordenar solicitudes aprobadas al final
    const sortedUserRequests = filteredUserRequests.sort((a, b) => a.status === 'approved' ? 1 : -1);
    const sortedTeacherRequests = filteredTeacherRequests.sort((a, b) => a.status === 'approved' ? 1 : -1);

    return (
        <div className="p-4 relative">

            <div className='w-full'>
                <h1 className="text-3xl font-bold text-[var(--main-color)]">
                    Solicitudes de Actualización de Contraseña
                </h1>
                <div className="flex items-center mt-2">
                    <span className="text-md md:text-lg font-bold text-[var(--titulos-color)]">Administrador</span>
                    <span className="text-md md:text-lg font-bold mx-2 text-[var(--titulos-color)]">/</span>
                    <span className="text-md md:text-lg font-bold text-[var(--titulos-color)]">UpdatePassword</span>
                </div>
            </div>

            <hr className="w-3/4 h-2 bg-[var(--fondo-color)] border-none rounded-md my-6" />
            <div className="container p-4 mx-auto mt-8">
                {/* Barra de filtrado */}
                <div className="mb-4 rounded shadow-md flex flex-col md:flex-row md:items-center md:justify-between">
                    <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-4">
                        <select
                            name="status"
                            value={filter.status}
                            onChange={handleFilterChange}
                            className="mt-1 block w-full md:w-auto py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-[var(--fondo-color)] focus:border-[var(--fondo-color)] sm:text-sm hover:border-[var(--main-color)]"
                        >
                            <option value="all" className="text-gray-600">Estado</option>
                            <option value="pending" className="hover:bg-[var(--fondo-color)] hover:text-white">Pendiente</option>
                            <option value="approved" className="hover:bg-[var(--fondo-color)] hover:text-white">Aprobado</option>
                        </select>
                        <div className="flex flex-col md:flex-row md:space-x-4 md:items-center">
                            <input
                                placeholder="Nombre"
                                className="outline-none border py-2 px-3 rounded-md focus:border-[var(--fondo-color)] focus:ring-[var(--fondo-color)]"
                                id="username"
                                name="username"
                                value={filter.username}
                                onChange={handleFilterChange}
                                type="text"
                            />
                            <input
                                placeholder="Email"
                                className="outline-none border py-2 px-3 rounded-md focus:border-[var(--fondo-color)] focus:ring-[var(--fondo-color)]"
                                id="email"
                                name="email"
                                value={filter.email}
                                onChange={handleFilterChange}
                                type="text"
                            />
                        </div>
                    </div>
                    <button onClick={() => setFilter({ username: '', email: '', status: 'all' })} className="mt-4 md:mt-0 bg-[var(--fondo-color)] hover:bg-[#1b796e] text-white border-none font-bold py-2 px-4 rounded">
                        <TbFilterX className='w-6 h-6' />
                    </button>
                </div>

                {/* Tabla para solicitudes de usuarios */}
                <div className="mb-8 overflow-x-auto">
                    <UserRequestsTable sortedUserRequests={sortedUserRequests} />
                </div>

                {/* Tabla para solicitudes de maestros */}
                <div className="overflow-x-auto">
                    <TeacherRequestsTable sortedTeacherRequests={sortedTeacherRequests} />
                </div>
            </div>
        </div>
    );
};

export default UpdatePassword;


