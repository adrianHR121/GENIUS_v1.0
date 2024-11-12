import React from 'react';

const RecentOrdersTable = () => {
    const orders = [
        { courseName: 'Introducción a JavaScript', courseNumber: '85743', payment: 'Pendiente', status: 'Pendiente' },
        { courseName: 'CSS Full Course', courseNumber: '97245', payment: 'Rechazado', status: 'Rechazdo' },
        { courseName: 'Flex-Box Tutorial', courseNumber: '36452', payment: 'Pagado', status: 'Activo' },
    ];

    return (
        <div className="overflow-x-auto">
            <table className="min-w-full h-72 bg-[var(--fondo-color)] rounded-xl overflow-hidden ">
                <thead>
                    <tr>
                        <th className="px-4 py-2 text-left">Nombre del curso</th>
                        <th className="px-4 py-2 text-left">ID del curso</th>
                        <th className="px-4 py-2 text-left">Pago</th>
                        <th className="px-4 py-2 text-left">Estatus</th>
                        <th className="px-4 py-2 text-left">Detalles</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map((order, index) => (
                        <tr key={index} className="border-t border-gray-700">
                            <td className="px-4 py-2">{order.courseName}</td>
                            <td className="px-4 py-2">{order.courseNumber}</td>
                            <td className="px-4 py-2">{order.payment}</td>
                            <td className="px-4 py-2">
                                <span
                                    className={`px-2 py-1 rounded ${order.status === 'Pendiente'
                                            ? 'bg-yellow-500 text-black'
                                            : order.status === 'Rechazdo'
                                                ? 'bg-red-500 text-white'
                                                : 'bg-green-500 text-white'
                                        }`}
                                >
                                    {order.status}
                                </span>
                            </td>
                            <td className="px-4 py-2 text-blue-500 cursor-pointer">Detalles</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default RecentOrdersTable;
