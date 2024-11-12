import React from "react";
import { Line, Pie } from 'react-chartjs-2';
import 'chart.js/auto';

const AdminSummary = ({ isMobile, totalUsers, paidUsers, labels }) => {
    const chartDataLine = {
        labels: labels,
        datasets: [
            {
                label: 'Usuarios Totales',
                data: totalUsers,
                borderColor: 'rgba(75, 192, 192, 1)',
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderWidth: 2,
                pointBackgroundColor: 'rgba(75, 192, 192, 1)',
                pointBorderColor: '#fff',
                pointBorderWidth: 1,
                pointRadius: 5,
                tension: 0.1,
            },
            {
                label: 'Usuarios Pagados',
                data: paidUsers,
                borderColor: 'rgba(255, 99, 132, 1)',
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderWidth: 2,
                pointBackgroundColor: 'rgba(255, 99, 132, 1)',
                pointBorderColor: '#fff',
                pointBorderWidth: 1,
                pointRadius: 5,
                tension: 0.1,
            },
        ],
    };

    const chartDataPie = {
        labels: ['Usuarios Totales', 'Usuarios Pagados'],
        datasets: [
            {
                data: [totalUsers[totalUsers.length - 1], paidUsers[paidUsers.length - 1]],
                backgroundColor: ['rgba(75, 192, 192, 0.2)', 'rgba(255, 99, 132, 0.2)'],
                borderColor: ['rgba(75, 192, 192, 1)', 'rgba(255, 99, 132, 1)'],
                borderWidth: 2,
            },
        ],
    };

    const optionsPie = {
        responsive: true,
        plugins: {
            legend: {
                labels: {
                    color: 'white',
                    font: {
                        size: 14,
                    },
                },
            },
        },
    };

    const options = {
        responsive: true,
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'Meses',
                    color: 'white',
                    font: {
                        size: 16,
                    },
                },
                grid: {
                    color: 'rgba(255, 255, 255, 0.1)',
                },
                ticks: {
                    color: 'white',
                    font: {
                        size: 12,
                    },
                },
            },
            y: {
                title: {
                    display: true,
                    text: 'Cantidad de Usuarios',
                    color: 'white',
                    font: {
                        size: 16,
                    },
                },
                grid: {
                    color: 'rgba(255, 255, 255, 0.1)',
                },
                ticks: {
                    color: 'white',
                    font: {
                        size: 12,
                    },
                },
            },
        },
        plugins: {
            legend: {
                labels: {
                    color: 'white',
                    font: {
                        size: 14,
                    },
                },
            },
        },
    };

    return (
        <div className="bg-[var(--fondo-color)] p-6 rounded-lg shadow-black shadow-lg m-6">
                    <div className="relative text-center">
                        <h2 className="text-white text-2xl font-bold mb-4 w-full">Usuarios y Usuarios Pagados</h2>
                        {isMobile ? <Pie data={chartDataPie} options={optionsPie} /> : <Line data={chartDataLine} options={options} />}
                    </div>
                    <div className="relative w-full h-auto text-white text-center mt-6 hidden md:block">
                        <h3 className="text-lg font-bold mb-2">Resumen Mensual</h3>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="w-full h-full bg-gradient-to-r from-[var(--spark-color)] to-[var(--fondo-color)] rounded-lg shadow-lg overflow-hidden cursor-pointer transition duration-300 ease-in-out hover:shadow-2xl">
                                <p className="text-white text-5xl font-bold mt-2 ml-6">{totalUsers[totalUsers.length - 1]}<span className="text-sm">Usu.</span></p>
                                <p className="text-white text-lg mt-1 ml-6">Usuarios en {labels[labels.length - 1]}</p>
                            </div>
                            <div className="w-full h-full bg-gradient-to-r from-[var(--spark-color)] to-[var(--fondo-color)] rounded-lg shadow-lg overflow-hidden cursor-pointer transition duration-300 ease-in-out hover:shadow-2xl">
                                <p className="text-white text-5xl font-bold mt-2 ml-6">{paidUsers[paidUsers.length - 1]}<span className="text-sm">Usu. Pagados</span></p>
                                <p className="text-white text-lg mt-1 ml-6">Usuarios Pagados en {labels[labels.length - 1]}</p>
                            </div>
                        </div>
                    </div>

                </div>
    );
};

export default AdminSummary;
