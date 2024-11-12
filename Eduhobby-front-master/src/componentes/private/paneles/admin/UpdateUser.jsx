import React from 'react';




const UpdateUser = () => {
    return (
        <div className="p-6 relative">
            <div className="mb-6">
                <h1 className="text-3xl font-bold text-[var(--main-color)]">Dashboard de Administración</h1>
                <span className="text-lg font-bold text-[var(--titulos-color)]">Administrador</span>
                <span className="text-lg font-bold ml-2 mr-2 text-[var(--titulos-color)]">/</span>
                <span className="text-lg font-bold text-[var(--titulos-color)]">Alta</span>
                <hr className="w-3/4 h-2 bg-[var(--fondo-color)] border-none rounded-md mt-6" />
            </div>
            <div className="w-full lg:w-3/4 m-auto h-auto top-0 relative">
                <h2 className="text-2xl font-bold text-[var(--main-color)]">Actualización De Maestros/Estudiantes</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  
                </div>
            </div>
        </div>
    );
};

export default UpdateUser;