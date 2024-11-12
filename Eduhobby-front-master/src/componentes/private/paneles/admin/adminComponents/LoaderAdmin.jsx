import React from 'react';

const LoaderAdmin = () => (
    <div className="absolute inset-0  bg-opacity-50 flex justify-center items-center z-50">
        <div className="flex flex-row gap-2">
            <div className="w-4 h-4 rounded-full bg-[var(--fondo-color)] animate-bounce [animation-delay:.7s]"></div>
            <div className="w-4 h-4 rounded-full bg-[var(--fondo-color)] animate-bounce [animation-delay:.3s]"></div>
            <div className="w-4 h-4 rounded-full bg-[var(--fondo-color)] animate-bounce [animation-delay:.7s]"></div>
        </div>
    </div>
);

export default LoaderAdmin;
