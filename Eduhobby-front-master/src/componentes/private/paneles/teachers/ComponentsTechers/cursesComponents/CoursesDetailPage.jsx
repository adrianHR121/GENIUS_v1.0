// src/pages/CoursesDetailPage.js
import React from 'react';
import { useLocation } from 'react-router-dom';
import CourseCard from './components/CourseCard';

const CoursesDetailPage = () => {
  const location = useLocation();
  const { courses } = location.state || { courses: [] };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Cursos de {courses.length > 0 ? courses[0].category : 'Categoría'}</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {courses.map((course) => (
          <CourseCard
            key={course._id}
            courseTitle={course.title}
            courseDescription={course.description}
            imageUrl={course.imageUrl}
            course={course}
          />
        ))}
      </div>
    </div>
  );
};

export default CoursesDetailPage;
