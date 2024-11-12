import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CategoryCard from './CategoryCard';
import AddCourseCard from './AddCourseCard';
import { fetchCourses } from '../../../../../../fetch/teahers/cursesService';

const CoursesContainer = () => {
  const [courses, setCourses] = useState([]);
  const [categorizedCourses, setCategorizedCourses] = useState({});
  const navigate = useNavigate();

  const loadCourses = async () => {
    try {
      const data = await fetchCourses();
      setCourses(data);
      categorizeCourses(data);
    } catch (error) {
      console.error('Failed to fetch courses:', error);
    }
  };

  const categorizeCourses = (courses) => {
    const categories = {};
    courses.forEach((course) => {
      if (!categories[course.category]) {
        categories[course.category] = [];
      }
      categories[course.category].push(course);
    });
    setCategorizedCourses(categories);
  };

  useEffect(() => {
    loadCourses();
  }, []);

  const handleAddCourse = async () => {
    await loadCourses();
  };

  const renderCategoryCards = () => {
    return Object.entries(categorizedCourses)
      .filter(([category, courses]) => courses.length > 0)
      .map(([category, courses]) => (
        <CategoryCard
          key={category}
          category={category}
          imageUrl={courses[0].imageUrl}
          onClick={() => navigate(`/DashTeachers/categories/${category}`)}
        />
      ));
  };

  return (
    <div className="relative h-auto"> 
      <div className="flex flex-nowrap gap-4 overflow-x-auto overflow-y-hidden scrollNone rounded-lg shadow-lg shadow-black bg-[var(--fondo-color)] p-4">
        {renderCategoryCards()}
        <AddCourseCard onAddCourse={handleAddCourse} />
      </div>
    </div>
  );
};

export default CoursesContainer;
