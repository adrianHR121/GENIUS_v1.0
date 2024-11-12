import React from 'react';

const TeacherRequestsTable = ({ sortedTeacherRequests }) => {
    return (
        <div>
            <h3 className="text-lg font-semibold mb-2">Maestros
            <hr className="w-full h-2 bg-[var(--fondo-color)] border-none rounded-md block md:hidden" />
            </h3>
            <div className="max-h-64 overflow-y-auto scrollNone">
                {/* Tabla para pantallas grandes */}
                <table className="min-w-full shadow rounded hidden md:table">
                    <thead className='sticky top-0 bg-[var(--fondo-color)]'>
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">ID</th>
                            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Nombre</th>
                            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Correo Electrónico</th>
                            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Estado</th>
                            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Acciones</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {sortedTeacherRequests.map((teacher) => (
                            <tr key={teacher.id} className={teacher.status === 'approved' ? 'disabled' : ''}>
                                <td className="px-6 py-4 whitespace-nowrap">{teacher.id}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{teacher.name}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{teacher.email}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{teacher.status}</td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    {teacher.status !== 'approved' && (
                                        <>
                                            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Aceptar</button>
                                            <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded ml-2">Rechazar</button>
                                        </>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {/* Tabla para dispositivos móviles */}
                <div className="block md:hidden">
               
                    {sortedTeacherRequests.map((teacher) => (
                        <div key={teacher.id} className="shadow rounded mb-4 p-4">
                            <div className="flex justify-between items-center mb-2">
                                <div className="text-sm font-medium text-gray-600">ID: {teacher.id}</div>
                                <div className={`text-sm font-bold ${teacher.status === 'approved' ? 'text-green-500' : 'text-red-500'}`}>{teacher.status}</div>
                            </div>
                            <div className="text-sm mb-2"><strong>Nombre:</strong> {teacher.name}</div>
                            <div className="text-sm mb-2"><strong>Email:</strong> {teacher.email}</div>
                            {teacher.status !== 'approved' && (
                                <div className="flex justify-end space-x-2">
                                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded text-sm">Aceptar</button>
                                    <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 rounded text-sm">Rechazar</button>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default TeacherRequestsTable;
