import React, { useState, useRef, useEffect } from 'react';
import { PlusIcon, PencilIcon, TrashIcon, ImageIcon } from 'lucide-react';
import { getAllCategories, updateCategory, uploadCategoryImage, getCategoryImage } from '../../../../../fetch/teahers/categoryService'; // Asegúrate de que la ruta sea correcta
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import Swal from 'sweetalert2';

export default function CategoriesManager() {
    const [categories, setCategories] = useState([]);
    const [newCategory, setNewCategory] = useState({ name: '', image: '' });
    const [editingId, setEditingId] = useState(null);
    const [editingCategory, setEditingCategory] = useState({ name: '', image: '' });
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [updating, setUpdating] = useState(false); // Estado para indicar si se está actualizando una categoría
    const [newImageName, setNewImageName] = useState('Subir Imagen'); // Estado para el nombre de la imagen nueva
    const [editingImageName, setEditingImageName] = useState('Subir Imagen'); // Estado para el nombre de la imagen en edición

    const fileInputRef = useRef(null);
    const editFileInputRef = useRef(null);

    const fetchCategories = async () => {
        try {
            const categoriesData = await getAllCategories();
            const categoriesWithImages = await Promise.all(
                categoriesData.map(async (category) => {
                    const imageUrl = await getCategoryImage(category.imageId);
                    return { ...category, image: imageUrl };
                })
            );
            setCategories(categoriesWithImages);
        } catch (err) {
            setError('Error al cargar las categorías');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    const handleImageUpload = (e, isEditing = false) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const base64String = reader.result;
                if (isEditing) {
                    setEditingCategory(prev => ({ ...prev, image: base64String }));
                    setEditingImageName(file.name); // Actualiza el nombre de la imagen en edición
                } else {
                    setNewCategory(prev => ({ ...prev, image: base64String }));
                    setNewImageName(file.name); // Actualiza el nombre de la nueva imagen
                }
            };
            reader.readAsDataURL(file);
        }
    };

    const handleEditCategory = (category) => {
        setEditingId(category._id);
        setEditingCategory(category);
        setEditingImageName('Subir Imagen'); // Resetear el nombre al editar
    };

    const handleUpdateCategory = async () => {
        if (editingCategory.ID && editingId) {
            setUpdating(true); // Activar el loader de actualización
            try {
                let updatedCategory = { 
                    ID: editingCategory.ID, 
                    id: editingId 
                };

                if (editingCategory.image) {
                    const imageResponse = await uploadCategoryImage(editFileInputRef.current.files[0]);
                    updatedCategory.imageId = imageResponse.imageId;
                }

                const responseData = await updateCategory(updatedCategory);
                fetchCategories();
                setEditingId(null);
                setEditingCategory({ image: '', ID: '' });
                setEditingImageName('Subir Imagen'); // Resetear el nombre de la imagen en edición

                if (editFileInputRef.current) editFileInputRef.current.value = '';

                Swal.fire({
                    title: '¡Éxito!',
                    text: 'La categoría se ha actualizado correctamente.',
                    icon: 'success',
                    confirmButtonText: 'Aceptar',
                });
            } catch (err) {
                Swal.fire({
                    title: '¡Error!',
                    text: 'Error al actualizar la categoría.',
                    icon: 'error',
                    confirmButtonText: 'Aceptar',
                });
                console.error(err);
            } finally {
                setUpdating(false); // Desactivar el loader de actualización
            }
        } else {
            Swal.fire({
                title: '¡Error!',
                text: 'Por favor, seleccione un curso.',
                icon: 'warning',
                confirmButtonText: 'Aceptar',
            });
        }
    };

    const handleDeleteCategory = async (id) => {
        try {
            setCategories(prev => prev.filter(cat => cat._id !== id));
        } catch (error) {
            setError('Error al eliminar la categoría');
            console.error(error);
        }
    };

    return (
        <>
            <div className="mb-6 p-6 relative">
                <h1 className="text-3xl font-bold text-[var(--main-color)]">Alta Para Maestros</h1>
                <span className="text-lg font-bold text-[var(--titulos-color)]">Administrador</span>
                <span className="text-lg font-bold ml-2 mr-2 text-[var(--titulos-color)]">/</span>
                <span className="text-lg font-bold text-[var(--titulos-color)]">CategoriesManager</span>
                <hr className="w-3/4 h-2 bg-[var(--fondo-color)] border-none rounded-md mt-6" />
            </div>
            <div className="container mx-auto p-4 max-w-4xl">
                {error && <div className="text-red-500 text-center mb-4">{error}</div>}
                <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                    {loading || updating ? ( // Mostrar loader si está cargando o actualizando
                        Array.from({ length: 6 }).map((_, index) => (
                            <li key={index} className="bg-white p-4 rounded-lg shadow">
                                <div className="flex flex-col items-center mb-2">
                                    <Skeleton circle={true} height={96} width={96} />
                                    <Skeleton width={100} height={25} className="mt-2" />
                                </div>
                                <div className="flex justify-center space-x-2 mt-4">
                                    <Skeleton width={40} height={30} className="rounded" />
                                    <Skeleton width={40} height={30} className="rounded" />
                                </div>
                            </li>
                        ))
                    ) : (
                        categories.map(category => (
                            <li key={category._id} className="bg-white p-4 rounded-lg shadow">
                                <div className="flex flex-col items-center mb-2">
                                    <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                                        <img src={category.image} alt={category.name} className="object-cover w-full h-full" />
                                    </div>
                                    <h3 className="font-semibold mt-2">{category.name}</h3>
                                </div>
                                {editingId === category._id ? (
                                    <div className="space-y-2">
                                        <input
                                            type="text"
                                            value={editingCategory.name}
                                            onChange={(e) => setEditingCategory({ ...editingCategory, name: e.target.value })}
                                            className="w-full p-1 border rounded"
                                            aria-label={`Editar nombre de categoría ${editingCategory.name}`}
                                        />
                                        <div className="flex items-center justify-center w-full">
                                            <label htmlFor={`file-upload-edit-${editingCategory._id}`} className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                                                <div className="flex flex-col items-center justify-center h-full">
                                                    <ImageIcon size={40} />
                                                    <span>{editingImageName}</span> {/* Cambia a mostrar el nombre de la imagen */}
                                                </div>
                                                <input
                                                    id={`file-upload-edit-${editingCategory._id}`}
                                                    type="file"
                                                    accept="image/*"
                                                    onChange={(e) => handleImageUpload(e, true)}
                                                    className="hidden"
                                                    ref={editFileInputRef}
                                                />
                                            </label>
                                        </div>
                                        <button onClick={handleUpdateCategory} className="mt-4 px-4 py-2 bg-green-500 text-white rounded">Guardar</button>
                                        <button onClick={() => setEditingId(null)} className="mt-2 px-4 py-2 bg-red-500 text-white rounded">Cancelar</button>
                                    </div>
                                ) : (
                                    <div className="flex justify-center space-x-2 mt-4">
                                        <button onClick={() => handleEditCategory(category)} className="px-4 py-2 bg-blue-500 text-white rounded">
                                            <PencilIcon size={16} />
                                        </button>
                                        <button onClick={() => handleDeleteCategory(category._id)} className="px-4 py-2 bg-red-500 text-white rounded">
                                            <TrashIcon size={16} />
                                        </button>
                                    </div>
                                )}
                            </li>
                        ))
                    )}
                </ul>
                <div className="flex flex-col items-center">
                    <h2 className="text-xl font-bold mb-4">Agregar Nueva Categoría</h2>
                    <div className="space-y-2">
                        <input
                            type="text"
                            value={newCategory.name}
                            onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
                            className="w-full p-1 border rounded"
                            placeholder="Nombre de la categoría"
                        />
                        <div className="flex items-center justify-center w-full">
                            <label htmlFor="file-upload" className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                                <div className="flex flex-col items-center justify-center h-full">
                                    <ImageIcon size={40} />
                                    <span>{newImageName}</span> {/* Cambia a mostrar el nombre de la imagen */}
                                </div>
                                <input
                                    id="file-upload"
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageUpload}
                                    className="hidden"
                                    ref={fileInputRef}
                                />
                            </label>
                        </div>
                        <button onClick={() => { /* Lógica para agregar nueva categoría */ }} className="px-4 py-2 bg-green-500 text-white rounded">Agregar</button>
                    </div>
                </div>
            </div>
        </>
    );
}
