// src/pages/CoursesPage.js
import React, { useEffect, useState } from 'react';
import { fetchCourses } from '../../../../../fetch/teahers/courseService';
import CategoryCard from './components/CategoryCard';

const categories = ['Programación', 'Matemáticas', 'Ciencias', 'Historia'];

const CoursesPage = () => {
  const [courses, setCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState({});

  useEffect(() => {
    const loadCourses = async () => {
      try {
        const fetchedCourses = await fetchCourses();
        setCourses(fetchedCourses);
        
        // Filtrar los cursos por categoría
        const categorizedCourses = categories.reduce((acc, category) => {
          acc[category] = fetchedCourses.filter(course => course.category === category.toLowerCase());
          return acc;
        }, {});
        
        setFilteredCourses(categorizedCourses);
      } catch (error) {
        console.error('Failed to fetch courses:', error);
      }
    };

    loadCourses();
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-4">
      {categories.map((category) => (
        <CategoryCard 
          key={category}
          title={category}
          imageUrl={`path_to_image_${category.toLowerCase()}`} // Actualiza con las URLs de imágenes correspondientes
          courses={filteredCourses[category]}
        />
      ))}
    </div>
  );
};

export default CoursesPage;
