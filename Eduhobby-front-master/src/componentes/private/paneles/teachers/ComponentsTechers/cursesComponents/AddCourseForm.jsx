import React, { useState, useEffect } from 'react';
import { useAuth } from '../../../../../protected/AuthProvider';
import { createCourse } from '../../../../../../fetch/teahers/cursesService';
import { getAllCategories } from '../../../../../../fetch/teahers/categoryService';

const AddCourseForm = ({ onClose, onCourseAdded }) => {
    const { userData } = useAuth();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        // Cargar las categorías al montar el componente
        const fetchCategories = async () => {
            try {
                const data = await getAllCategories();
                setCategories(data);
            } catch (err) {
                console.error('Error al cargar las categorías:', err);
                setError('Error al cargar las categorías');
            }
        };
        fetchCategories();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            // Crear el curso
            const courseData = {
                title,
                description,
                category,
                professor: userData._id,
                imageUrl,
            };

            const courseResponse = await createCourse(courseData);

            if (!courseResponse || typeof courseResponse.json !== 'function') {
                throw new Error('Respuesta del servidor inválida');
            }

            if (!courseResponse.ok) {
                const errorData = await courseResponse.json();
                const errorMessage = errorData.message || 'Error al crear el curso';
                throw new Error(errorMessage);
            }

            const course = await courseResponse.json();
            console.log('Curso creado:', course);

            alert('¡Curso creado exitosamente!');

            if (onCourseAdded) {
                await onCourseAdded();
            }

            if (onClose) {
                onClose();
            }

        } catch (err) {
            console.error('Error al crear el curso:', err);
            setError(`Fallo al crear el curso: ${err.message}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className=" flex items-center justify-center  sm:px-6 lg:px-8">
            <div className="w-full space-y-8 bg-white p-10 rounded-xl shadow-lg">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                        Crear un Nuevo Curso
                    </h2>
                    <p className="mt-2 text-center text-sm text-gray-600">
                        Completa los detalles para agregar un nuevo curso
                    </p>
                </div>
                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    <div className="rounded-md shadow-sm space-y-4">
                        <div>
                            <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                                Título
                            </label>
                            <input
                                id="title"
                                name="title"
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                required
                                className="mt-1 block w-full px-3 py-2 text-black bg-gray-50 border border-gray-300 rounded-md shadow-sm"
                                placeholder="Introduce el título del curso"
                            />
                        </div>
                        <div>
                            <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                                Descripción
                            </label>
                            <textarea
                                id="description"
                                name="description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                required
                                className="mt-1 block w-full px-3 py-2 text-black bg-gray-50 border border-gray-300 rounded-md shadow-sm"
                                placeholder="Describe brevemente el contenido del curso"
                                rows={4}
                            ></textarea>
                        </div>
                        <div>
                            <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                                Categoría
                            </label>
                            <select
                                id="category"
                                name="category"
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                                required
                                className="mt-1 block w-full pl-3 pr-10 py-2 text-base text-black bg-gray-50 border border-gray-300 sm:text-sm rounded-md"
                            >
                                <option value="">Selecciona una categoría</option>
                                {categories.map((cat) => (
                                    <option key={cat._id} value={cat._id}>
                                        {cat.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label htmlFor="image-url" className="block text-sm font-medium text-gray-700">
                                URL de la imagen
                            </label>
                            <input
                                id="image-url"
                                name="image-url"
                                type="url"
                                value={imageUrl}
                                onChange={(e) => setImageUrl(e.target.value)}
                                required
                                className="mt-1 block w-full px-3 py-2 text-black bg-gray-50 border border-gray-300 rounded-md shadow-sm"
                                placeholder="https://ejemplo.com/imagen.jpg"
                            />
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[var(--fondo-color)] hover:bg-[var(--spark-color)] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 ease-in-out"
                        >
                            {loading ? 'Creando...' : 'Crear Curso'}
                        </button>
                    </div>

                    {error && <div className="text-red-600 mt-4">{error}</div>}
                </form>
            </div>
        </div>
    );
};

export default AddCourseForm;
