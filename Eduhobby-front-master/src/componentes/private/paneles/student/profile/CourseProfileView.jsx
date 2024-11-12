import React from 'react';
import { useAuth } from '../../../../protected/AuthProvider';
import { Edit, BookOpen, CreditCard, GraduationCap, Award, CircleX  } from 'lucide-react';

const Button = ({ children, variant = 'primary', className = '', ...props }) => {
    const baseStyle = "px-4 py-2 rounded-md font-medium transition-colors duration-300 flex items-center";
    const variantStyles = {
        primary: "bg-[#0FC98C] text-[#111111] hover:bg-[#66D9B1]",
        outline: "border border-[#0FC98C] text-[#0FC98C] hover:bg-[#0BA675] hover:text-[#ffff]"
    };

    return (
        <button className={`${baseStyle} ${variantStyles[variant]} ${className}`} {...props}>
            {children}
        </button>
    );
};

const Badge = ({ children }) => (
    <span className="bg-[#0FC98C] text-[#111111] font-semibold px-3 py-1 rounded-full shadow-sm">
        {children}
    </span>
);

const ProgressBar = ({ value }) => (
    <div className="w-full h-2 bg-[#0BA675] rounded-full overflow-hidden">
        <div
            className="h-full bg-gradient-to-r from-[#0FC98C] to-[#66D9B1]"
            style={{ width: `${value}%` }}
        />
    </div>
);

export default function CourseProfileView({ onClose  }) {
    const { userData } = useAuth();
    return (
        <div className="min-h-screen text-[#ffff] py-8">
            <div className="w-full max-w-4xl mx-auto bg-gradient-to-br from-[#16665d] to-[#0d4d47] border border-[#0FC98C] rounded-lg shadow-lg p-8">
                <div className="flex flex-col items-center space-y-4">
                    <div className="flex justify-end w-full">
                    <CircleX onClick={onClose} size={30} className='cursor-pointer'/>
                    </div>
                    <div className="flex justify-end w-full">
                        <Button variant="outline" className="text-sm">
                            <Edit className="mr-2 h-4 w-4" />
                            Editar Perfil
                        </Button>
                    </div>
                    <div className="w-32 h-32 rounded-full border-4 border-[#0FC98C] shadow-md overflow-hidden">
                        <img src="/placeholder.svg?height=128&width=128" alt="Foto de perfil" className="w-full h-full object-cover" />
                    </div>
                    <div className="text-center">
                        <h2 className="text-3xl font-bold text-[#0FC98C] drop-shadow-md"> {userData?.firstNames} {userData?.lastNames}</h2>
                        <p className="text-[#A9E8D1] mt-1">{userData?.email}</p>
                    </div>
                    <Badge><h2 className='text-teal-50'>Suscripción Premium</h2></Badge>
                </div>

                <div className="mt-8 space-y-6">
                    <div className="text-center">
                        <p className="text-[#e0f5ee] italic">
                            "Aprendiz entusiasta en busca de nuevos conocimientos y habilidades."
                        </p>
                    </div>
                    <div className="bg-[#0d4d47] p-4 rounded-lg shadow-inner">
                        <div className="flex justify-between items-center mb-2">
                            <span className="text-sm font-medium text-[#ffffff]">Progreso General</span>
                            <span className="text-sm font-medium text-[#ffffff]">75%</span>
                        </div>
                        <ProgressBar value={75} />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="bg-[#0d4d47] p-4 rounded-lg shadow-md">
                            <h3 className="font-semibold mb-3 text-[#0FC98C] text-lg">Cursos en Progreso</h3>
                            <ul className="space-y-2">
                                <li className="flex items-center text-[#e0f5ee]">
                                    <BookOpen className="mr-2 h-5 w-5 text-[#66D9B1]" />
                                    <span>Desarrollo Web Avanzado</span>
                                </li>
                                <li className="flex items-center text-[#e0f5ee]">
                                    <BookOpen className="mr-2 h-5 w-5 text-[#66D9B1]" />
                                    <span>Diseño UX/UI</span>
                                </li>
                            </ul>
                        </div>
                        <div className="bg-[#0d4d47] p-4 rounded-lg shadow-md">
                            <h3 className="font-semibold mb-3 text-[#0FC98C] text-lg">Cursos Completados</h3>
                            <ul className="space-y-2">
                                <li className="flex items-center text-[#e0f5ee]">
                                    <GraduationCap className="mr-2 h-5 w-5 text-[#66D9B1]" />
                                    <span>Introducción a Python</span>
                                </li>
                                <li className="flex items-center text-[#e0f5ee]">
                                    <GraduationCap className="mr-2 h-5 w-5 text-[#66D9B1]" />
                                    <span>Marketing Digital</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="flex justify-center space-x-8 text-sm bg-[#0BA675] p-4 rounded-lg shadow-md">
                        <div className="text-center">
                            <strong className="block text-2xl text-[#ffffff]">4</strong>
                            <span className="text-[#e0f5ee]">Cursos Activos</span>
                        </div>
                        <div className="text-center">
                            <strong className="block text-2xl text-[#ffffff]">2</strong>
                            <span className="text-[#e0f5ee]">Cursos Completados</span>
                        </div>
                        <div className="text-center">
                            <strong className="block text-2xl text-[#ffffff]">8</strong>
                            <span className="text-[#e0f5ee]">Certificados</span>
                        </div>
                    </div>
                </div>

                <div className="flex flex-wrap justify-center gap-4 mt-8">
                    <Button variant="outline">
                        <BookOpen className="mr-2 h-5 w-5" />
                        Explorar Cursos
                    </Button>
                    <Button variant="outline">
                        <CreditCard className="mr-2 h-5 w-5" />
                        Gestionar Suscripción
                    </Button>
                    <Button variant="outline">
                        <Award className="mr-2 h-5 w-5" />
                        Ver Certificados
                    </Button>
                </div>
            </div>
        </div>
    );
}