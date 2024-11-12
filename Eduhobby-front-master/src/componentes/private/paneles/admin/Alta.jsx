import React, { useState, useEffect } from "react";
import './css/styleAdmin.css';
import { useLocation } from 'react-router-dom';
import LoaderAdmin from "./adminComponents/LoaderAdmin";
import Swal from 'sweetalert2';
import { fetchProfessorRequests, approveProfessorRequest, rejectProfessorRequest } from '../../../../fetch/Admin/altaService';

const Alta = () => {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const maestroIdFromUrl = searchParams.get('maestroId');

    const [searchQuery, setSearchQuery] = useState("");
    const [showDetails, setShowDetails] = useState(false);
    const [selectedMaestro, setSelectedMaestro] = useState(null);
    const [maestros, setMaestros] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchMaestros = async () => {
            try {
                const data = await fetchProfessorRequests();
                setMaestros(data);
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setTimeout(() => setLoading(false), 4000);
            }
        };

        fetchMaestros();
    }, []);

    useEffect(() => {
        if (maestroIdFromUrl) {
            const selected = maestros.find(maestro => maestro._id === maestroIdFromUrl);
            if (selected) {
                setSelectedMaestro(selected);
                setShowDetails(true);
            }
        }
    }, [maestroIdFromUrl, maestros]);

    const showMoreDetails = (maestro) => {
        setSelectedMaestro(maestro);
        setShowDetails(true);
    };

    const handleApprove = async (id) => {
        const result = await Swal.fire({
            title: '¿Estás seguro?',
            text: "¡No podrás revertir esto!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, aprobar'
        });
    
        if (result.isConfirmed) {
            try {
                const responseText = await approveProfessorRequest(id); // Obtén la respuesta del servidor
                console.log('Approve Response:', responseText); // Imprime la respuesta para depuración
                const updatedMaestros = maestros.filter(maestro => maestro._id !== id);
                setMaestros(updatedMaestros);
                setShowDetails(false);
                Swal.fire(
                    '¡Aprobado!',
                    'La solicitud ha sido aprobada.',
                    'success'
                );
            } catch (error) {
                console.error('Error approving:', error);
                Swal.fire(
                    '¡Error!',
                    'No se pudo aprobar la solicitud.',
                    'success'
                );
            }
        }
    };
    

    const handleReject = async (id) => {
        const result = await Swal.fire({
            title: '¿Estás seguro?',
            text: "¡No podrás revertir esto!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, rechazar'
        });

        if (result.isConfirmed) {
            try {
                await rejectProfessorRequest(id);
                const updatedMaestros = maestros.filter(maestro => maestro._id !== id);
                setMaestros(updatedMaestros);
                setShowDetails(false);
                Swal.fire('¡Rechazado!', 'La solicitud ha sido rechazada.', 'success');
            } catch (error) {
                console.error('Error rejecting:', error);
                Swal.fire('Error', 'No se pudo rechazar la solicitud.', 'error');
            }
        }
    };

    const filteredMaestros = maestros.filter(maestro => {
        const searchLower = searchQuery.toLowerCase();
        return (
            maestro.firstNames.toLowerCase().includes(searchLower) ||
            maestro.lastNames.toLowerCase().includes(searchLower) ||
            maestro._id.includes(searchQuery)
        );
    });

    return (
        <>
            <div className="p-4 relative">
                <div className="mb-6">
                    <h1 className="text-3xl font-bold text-[var(--main-color)]">
                        Alta Para Maestros
                    </h1>
                    <span className="text-lg font-bold text-[var(--titulos-color)]">Administrador</span>
                    <span className="text-lg font-bold ml-2 mr-2 text-[var(--titulos-color)]">/</span>
                    <span className="text-lg font-bold text-[var(--titulos-color)]">Alta</span>
                    <hr className="w-3/4 h-2 bg-[var(--fondo-color)] border-none rounded-md mt-6" />
                </div>
                <div className="w-full lg:w-3/4 m-auto h-auto top-0 relative">
                    <div className="input-container">
                        <input
                            type="text"
                            name="text"
                            className="input"
                            placeholder="Buscar por nombre, apellido o ID..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        <span className="icon">
                            <svg width="19px" height="19px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path opacity="1" d="M14 5H20" stroke="#000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                                <path opacity="1" d="M14 8H17" stroke="#000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                                <path d="M21 11.5C21 16.75 16.75 21 11.5 21C6.25 21 2 16.75 2 11.5C2 6.25 6.25 2 11.5 2" stroke="#000" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"></path>
                                <path opacity="1" d="M22 22L20 20" stroke="#000" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"></path>
                            </svg>
                        </span>
                    </div>
                </div>
                {loading ? (
                    <>
                        <div className="h-96">
                            <LoaderAdmin />
                        </div>
                    </>
                ) : (
                    <div className="container p-7 mx-auto mt-8 h-[600px] overflow-y-auto scrollNone">
                        <div className="mt-4 max-w-6xl mx-auto">
                            {filteredMaestros.length > 0 ? (
                                filteredMaestros.map((maestro) => (
                                    <div key={maestro._id} className="notification mt-4">
                                        <div className="notiglow"></div>
                                        <div className="notiborderglow"></div>
                                        <div className="notification-content">
                                            <div>
                                                <div className="notititle">{maestro.firstNames} {maestro.lastNames}</div>
                                                <div className="notibody">Fecha solicitud: {new Date(maestro.creationDate).toLocaleDateString()}</div>
                                            </div>
                                            <button
                                                className="nobutton"
                                                onClick={() => showMoreDetails(maestro)}
                                            >
                                                Ver detalles
                                            </button>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="text-center text-gray-600">
                                    Por el momento no hay ninguna notificación
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {showDetails && selectedMaestro && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="infoAdmin-card">
                        <div className="infoAdmin-content">

                            <div className="flex flex-col items-center z-40">

                                <div className="flex items-center">
                                    <div className="w-20 h-20 rounded-full bg-[var(--main-color)] text-white text-3xl flex items-center justify-center mr-4">
                                        {selectedMaestro.firstNames.charAt(0)}
                                    </div>
                                    <div>
                                        <h2 className="infoAdmin-heading text-3xl font-semibold text-[var(--main-color)]">{selectedMaestro.firstNames} {selectedMaestro.lastNames}</h2>
                                        <p className="infoAdmin-para ">ID: {selectedMaestro._id}</p>
                                    </div>
                                    <div className="flex absolute w-4/5 justify-end border-none z-50">
                                        <button className="cursor-pointer border-none duration-200 hover:scale-125 active:scale-100" title="Go Back"
                                            onClick={() => setShowDetails(false)}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="50px" height="50px" viewBox="0 0 24 24" className="stroke-[var(--main-color)]">
                                                <path strokeLinejoin="round" strokeLinecap="round" strokeWidth="1.5" fill="none" d="M20.25 12H3.75"></path>
                                                <path strokeLinejoin="round" strokeLinecap="round" strokeWidth="1.5" fill="none" d="M9.75 18.75L3 12l6.75-6.75"></path>
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                                <div className="mt-4">
                                    <p className="infoAdmin-para ">Fecha solicitud: {new Date(selectedMaestro.creationDate).toLocaleDateString()}</p>
                                    <p className="infoAdmin-para ">Email: {selectedMaestro.email}</p>
                                    <p className="infoAdmin-para ">Estatus: {selectedMaestro.status}</p>
                                </div>
                                <div className="mt-4 flex justify-center space-x-4">
                                    <button
                                        className="text-white bg-green-500 hover:bg-green-700 p-2 rounded-lg"
                                        onClick={() => handleApprove(selectedMaestro._id)}
                                    >
                                        Aprobar
                                    </button>
                                    <button
                                        className="text-white bg-red-500 hover:bg-red-700 p-2 rounded-lg"
                                        onClick={() => handleReject(selectedMaestro._id)}
                                    >
                                        Rechazar
                                    </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};

export default Alta;
