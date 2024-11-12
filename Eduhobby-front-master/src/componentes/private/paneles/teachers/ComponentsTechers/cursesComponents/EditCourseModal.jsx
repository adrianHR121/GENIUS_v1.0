import React, { useState, useEffect } from 'react';
import { CircleX } from 'lucide-react';
import { updateCourse } from '../../../../../../fetch/teahers/cursesService';
import { getAllCategories } from '../../../../../../fetch/teahers/categoryService';

const EditCourseModal = ({ isOpen, onClose, course, onSave }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [categories, setCategories] = useState([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        // Obtener categorías para el select
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

        // Setear los valores iniciales del curso
        if (course) {
            setTitle(course.title || '');
            setDescription(course.description || '');
            setCategory(course.category || '');
            setImageUrl(course.imageUrl || '');
        }
    }, [course]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            await updateCourse(course._id, { title, description, category, imageUrl });
            onSave(); // Actualiza la lista de cursos
            onClose(); // Cierra el modal
        } catch (error) {
            console.error('Fallo al actualizar el curso:', error);
            setError('Fallo al actualizar el curso. Por favor, inténtalo de nuevo.');
        } finally {
            setLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-lg">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold text-gray-900">Editar Curso</h2>
                    <button onClick={onClose} className="text-2xl text-[var(--fondo-color)] border border-none">
                        <CircleX className='w-10 h-10'/>
                    </button>
                </div>
                <form onSubmit={handleSubmit} className="space-y-6">
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
                                    <option key={cat._id} value={cat.name}>
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

                    {error && <div className="text-red-600 mt-4">{error}</div>}

                    <div className="flex justify-end">
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-500 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 ease-in-out"
                        >
                            {loading ? 'Guardando...' : 'Guardar Cambios'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditCourseModal;
