import React from "react";

const AdminList = ({ adminData }) => {
    return (
        <div className="w-auto h-auto">
            <h2 className="text-center text-[var(--main-color)] text-2xl font-bold ">Administradores</h2>
            <div className="bg-white p-6 rounded-lg shadow-lg cardAdmins overflow-y-scroll scrollNone">
                {adminData.map(admin => (
                    <div key={admin.id} className="overflow-hidden mt-6 group cursor-pointer relative flex flex-col gap-4 justify-between rounded-2xl border hover:border-[var(--fondo-color)] duration-300 md:p-6 px-8 before:h-full before:w-2 hover:before:w-full after:absolute after:top-0 after:left-0 after:h-full after:w-0 after:duration-300 after:opacity-5 before:duration-300 before:-z-1 before:bg-[var(--fondo-color)] before:absolute before:top-0 before:left-0">
                        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-4 rounded-lg z-30">
                            <div className="flex items-center">
                                <img src={admin.image} alt={admin.name} className="w-16 h-16 rounded-full mr-4" />
                                <div className="text-left">
                                    <h4 className="text-lg font-medium">{admin.name}</h4>
                                    <p className="text-sm text-gray-600 group-hover:text-white">{admin.role}</p>
                                </div>
                            </div>
                            <p className="text-sm text-gray-600 group-hover:text-white text-right">{admin.email}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AdminList;
