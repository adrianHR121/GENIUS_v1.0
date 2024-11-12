import React, { useState, useEffect } from 'react'
import { CheckCircleIcon, XCircleIcon, EyeIcon } from 'lucide-react'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

export default function CourseApproval() {
    const [courses, setCourses] = useState([
        { id: 1, title: '', instructor: '', category: '', status: 'pending', image: '' },
        { id: 2, title: '', instructor: '', category: '', status: 'pending', image: '' },
        { id: 3, title: '', instructor: '', category: '', status: 'pending', image: '' },
    ])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        // Simular una llamada a la API para obtener los cursos
        setTimeout(() => {
            setCourses([
                { id: 1, title: 'Introducción a React', instructor: 'Juan Pérez', category: 'Programación', status: 'pending', image: '/placeholder.svg?height=100&width=100' },
                { id: 2, title: 'Diseño UX/UI Avanzado', instructor: 'María García', category: 'Diseño', status: 'pending', image: '/placeholder.svg?height=100&width=100' },
                { id: 3, title: 'Marketing Digital para Principiantes', instructor: 'Carlos Rodríguez', category: 'Marketing Digital', status: 'pending', image: '/placeholder.svg?height=100&width=100' },
            ])
            setLoading(false) // Datos cargados después de 2 segundos
        }, 2000)
    }, [])

    // Funciones para manejar la aprobación y el rechazo de cursos
    const handleApprove = (id) => {
        setCourses(courses.map(course =>
            course.id === id ? { ...course, status: 'approved' } : course
        ))
    }

    const handleReject = (id) => {
        setCourses(courses.map(course =>
            course.id === id ? { ...course, status: 'rejected' } : course
        ))
    }

    return (
        <>
            <div className="mb-6 p-6 relative">
                <h1 className="text-3xl font-bold text-[var(--main-color)]">Aprobación de Cursos</h1>
                <span className="text-lg font-bold text-[var(--titulos-color)]">Administrador</span>
                <span className="text-lg font-bold ml-2 mr-2 text-[var(--titulos-color)]">/</span>
                <span className="text-lg font-bold text-[var(--titulos-color)]">CourseApproval</span>
                <hr className="w-3/4 h-2 bg-[var(--fondo-color)] border-none rounded-md mt-6" />
            </div>
            
            <div className="container mx-auto p-4 max-w-4xl">
                <div className="grid gap-4">
                    {loading ? (
                        // Mostrar skeleton mientras loading es true
                        courses.map((course) => (
                            <div key={course.id} className="bg-white p-4 rounded-lg shadow flex items-center">
                                <Skeleton circle={true} height={96} width={96} className="mr-4" />
                                <div className="flex-grow">
                                    <Skeleton height={24} width={`75%`} className="mb-2" />
                                    <Skeleton height={20} width={`50%`} className="mb-2" />
                                    <Skeleton height={20} width={`30%`} />
                                </div>
                                <div className="flex flex-col space-y-2">
                                    <Skeleton height={36} width={100} />
                                    <Skeleton height={36} width={100} />
                                    <Skeleton height={36} width={100} />
                                </div>
                            </div>
                        ))
                    ) : (
                        // Mostrar las tarjetas reales cuando loading es false
                        courses.map(course => (
                            <div key={course.id} className={`bg-white p-4 rounded-lg shadow flex items-center ${course.status !== 'pending' ? 'opacity-50' : ''}`}>
                                <img
                                    src={course.image}
                                    alt={course.title}
                                    className="rounded-full object-cover w-24 h-24 mr-4"
                                />
                                <div className="flex-grow">
                                    <h2 className="text-xl font-semibold">{course.title}</h2>
                                    <p className="text-gray-600">Instructor: {course.instructor}</p>
                                    <p className="text-gray-600">Categoría: {course.category}</p>
                                    <p className={`font-semibold ${course.status === 'approved' ? 'text-green-600' :
                                        course.status === 'rejected' ? 'text-red-600' :
                                            'text-[var(--spark-color)] '}`}>
                                        Estado: {
                                            course.status === 'approved' ? 'Aprobado' :
                                                course.status === 'rejected' ? 'Rechazado' :
                                                    'Pendiente'
                                        }
                                    </p>
                                </div>
                                {course.status === 'pending' && (
                                    <div className="flex flex-col space-y-2">
                                        <button
                                            onClick={() => handleApprove(course.id)}
                                            className="bg-green-500 text-white p-2 rounded hover:bg-green-600 transition-colors flex items-center justify-center"
                                            aria-label={`Aprobar ${course.title}`}
                                        >
                                            <CheckCircleIcon className="w-5 h-5 mr-1" />
                                            Aprobar
                                        </button>
                                        <button
                                            onClick={() => handleReject(course.id)}
                                            className="bg-red-500 text-white p-2 rounded hover:bg-red-600 transition-colors flex items-center justify-center"
                                            aria-label={`Rechazar ${course.title}`}
                                        >
                                            <XCircleIcon className="w-5 h-5 mr-1" />
                                            Rechazar
                                        </button>
                                        <button
                                            className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition-colors flex items-center justify-center"
                                            aria-label={`Ver detalles de ${course.title}`}
                                        >
                                            <EyeIcon className="w-5 h-5 mr-1" />
                                            Ver Detalles
                                        </button>
                                    </div>
                                )}
                            </div>
                        ))
                    )}
                </div>
            </div>
        </>
    )
}
