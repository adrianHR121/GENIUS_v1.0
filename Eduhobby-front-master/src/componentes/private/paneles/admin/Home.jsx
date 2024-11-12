import React, { useState, useEffect } from "react";
import { FiUsers, FiFileText } from "react-icons/fi";
import { BiBriefcase, BiDollar } from "react-icons/bi";
import CountUp from 'react-countup';
import AdminList from "./adminComponents/AdminList";
import AdminSummary from "./adminComponents/AdminSummary";

const Home = () => {
    const labels = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio'];
    const totalUsers = [100, 150, 200, 250, 300, 300];
    const paidUsers = [50, 200, 100, 130, 160, 250];

    const data = {
        totalUsers: 1200,
        totalRevenue: 25000,
        totalCourses: 85,
        activeTeachers: 45,
    };

    const adminData = [
        { id: 1, name: 'Juan Pérez', email: 'juan.perez@example.com', role: 'Super Administrador', image: "https://via.placeholder.com/64" },
        { id: 2, name: 'María López', email: 'maria.lopez@example.com', role: 'Administrador', image: "https://via.placeholder.com/64" },
        { id: 3, name: 'Carlos Sánchez', email: 'carlos.sanchez@example.com', role: 'Administrador', image: "https://via.placeholder.com/64" },
        { id: 4, name: 'Carlos Sánchez', email: 'carlos.sanchez@example.com', role: 'Administrador', image: "https://via.placeholder.com/64" },
    ];

    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <div className="p-4">
            <div >
                <h1 className="text-3xl font-bold  text-[var(--main-color)]">
                    Panel de Administración
                </h1>
                <span className="text-lg font-bold text-[var(--titulos-color)]">Administrador</span>
                <span className="text-lg font-bold ml-2 mr-2 text-[var(--titulos-color)]">/</span>
                <span className="text-lg font-bold text-[var(--titulos-color)]">Home</span>
            </div>
            <hr className="w-3/4 h-2 bg-[var(--fondo-color)] border-none rounded-md my-6" />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 self-center justify-items-center">
                <div className="w-full px-3">
                    <div className="group w-full rounded-lg bg-[var(--fondo-color)] p-5 shadow-black shadow-lg transition relative duration-300 cursor-pointer hover:translate-y-[3px] hover:shadow-[0_-8px_0px_0px_#2196f3]">
                        <p className="text-white text-2xl">
                            <CountUp end={data.totalUsers} duration={2} />
                        </p>
                        <p className="text-white text-sm">Usuarios</p>
                        <hr className="absolute w-2/3 h-2 bg-[#2196f3] border-none rounded-md" />
                        <FiUsers className="h-12 w-12 group-hover:opacity-100 absolute right-[10%] top-[50%] translate-y-[-50%] opacity-20 transition group-hover:scale-110 duration-300" />
                    </div>
                </div>
                <div className="w-full px-3">
                    <div className="group w-full rounded-lg bg-[var(--fondo-color)] p-5 shadow-black shadow-lg transition relative duration-300 cursor-pointer hover:translate-y-[3px] hover:shadow-[0_-8px_0px_0px_#FF000C]">
                        <p className="text-white text-2xl">
                            <CountUp end={data.totalCourses} duration={2} />
                        </p>
                        <p className="text-white text-sm">Cursos totales</p>
                        <hr className="absolute w-2/3 h-2 bg-[#FF000C] border-none rounded-md" />
                        <FiFileText className="h-12 w-12 group-hover:opacity-100 absolute right-[10%] top-[50%] translate-y-[-50%] opacity-20 transition group-hover:scale-110 duration-300" />
                    </div>
                </div>
                <div className="w-full px-3">
                    <div className="group w-full rounded-lg bg-[var(--fondo-color)] p-5 shadow-black shadow-lg transition relative duration-300 cursor-pointer hover:translate-y-[3px] hover:shadow-[0_-8px_0px_0px_#E6670E]">
                        <p className="text-white text-2xl">
                            <CountUp end={data.activeTeachers} duration={2} />
                        </p>
                        <p className="text-white text-sm">Maestros Activos</p>
                        <hr className="absolute w-2/3 h-2 bg-[#E6670E] border-none rounded-md" />
                        <BiBriefcase className="h-12 w-12 group-hover:opacity-100 absolute right-[10%] top-[50%] translate-y-[-50%] opacity-20 transition group-hover:scale-110 duration-300" />
                    </div>
                </div>
                <div className="w-full px-3">
                    <div className="group w-full rounded-lg bg-[var(--fondo-color)] p-5 shadow-black shadow-lg transition relative duration-300 cursor-pointer hover:translate-y-[3px] hover:shadow-[0_-8px_0px_0px_#0CE80F]">
                        <p className="text-white text-2xl">
                            $<CountUp end={data.totalRevenue} duration={2} />
                        </p>
                        <p className="text-white text-sm">Recaudación Total</p>
                        <hr className="absolute w-2/3 h-2 bg-[#0CE80F] border-none rounded-md" />
                        <BiDollar className="h-12 w-12 group-hover:opacity-100 absolute right-[10%] top-[50%] translate-y-[-50%] opacity-20 transition group-hover:scale-110 duration-300" />
                    </div>
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2  mt-6 ">
                <AdminSummary
                    isMobile={isMobile}
                    totalUsers={totalUsers}
                    paidUsers={paidUsers}
                    labels={labels}
                />
                <AdminList adminData={adminData} />
            </div>
        </div>
    );
};

export default Home;
