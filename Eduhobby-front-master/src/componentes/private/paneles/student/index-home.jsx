import React, { useState } from 'react';
import Hero from "../student/Hero";
import Titulares from "../student/Titulares";
import Menu from "../student/Menu";
import Navbar from "../student/Navbar";
import { useAuth } from '../../../protected/AuthProvider';

const IndexHome = () => {
  const [selectedCategory, setSelectedCategory] = useState('Todas');
  const { isLoggedIn } = useAuth(); 

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
  };

  return (
    <div>
      <Navbar onSelectCategory={handleCategorySelect} />
      <Hero />

      {/* Renderizar el componente Titulares solo si el usuario está autenticado */}
      {isLoggedIn ? (
        <Titulares selectedCategory={selectedCategory} />
      ) : (
        <p className="text-center text-gray-500">Debes estar autenticado para ver los cursos recientes.</p>
      )}

      <Menu selectedCategory={selectedCategory} />
    </div>
  );
}

export default IndexHome;
