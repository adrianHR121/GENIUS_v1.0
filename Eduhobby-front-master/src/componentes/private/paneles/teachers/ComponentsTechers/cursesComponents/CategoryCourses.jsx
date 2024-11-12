import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import CourseCard from './CourseCard';
import EditCourseModal from './EditCourseModal';
import { fetchCourses, deleteCourse } from '../../../../../../fetch/teahers/cursesService';

const CategoryCourses = () => {
  const { category } = useParams();
  const [courses, setCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [currentCourse, setCurrentCourse] = useState(null);

  useEffect(() => {
    const loadCourses = async () => {
      try {
        const data = await fetchCourses();
        if (category) {
          const filteredCourses = data.filter(course => course.category === category);
          setCourses(filteredCourses);
        } else {
          setCourses(data);
        }
      } catch (error) {
        console.error('Failed to fetch courses:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadCourses();
  }, [category]);

  const handleEditClick = (course) => {
    setCurrentCourse(course);
    setIsEditModalOpen(true);
  };

  const handleDeleteClick = async (courseId) => {
    if (window.confirm('Are you sure you want to delete this course?')) {
      try {
        await deleteCourse(courseId);
        setCourses(courses.filter((course) => course._id !== courseId));
      } catch (error) {
        console.error('Error deleting course:', error);
      }
    }
  };

  const handleSaveCourse = async () => {
    try {
      const updatedCourses = await fetchCourses();
      const filteredCourses = category ? updatedCourses.filter((course) => course.category === category) : updatedCourses;
      setCourses(filteredCourses);
    } catch (error) {
      console.error('Error fetching updated courses:', error);
    }
  };

  const groupCoursesByCategory = (courses) => {
    return courses.reduce((acc, course) => {
      (acc[course.category] = acc[course.category] || []).push(course);
      return acc;
    }, {});
  };

  const groupedCourses = category ? { [category]: courses } : groupCoursesByCategory(courses);

  if (isLoading) {
    return (
      <div className="flex-col gap-4 w-full flex items-center justify-center">
        <div className="w-20 h-20 border-4 border-transparent text-blue-400 text-4xl animate-spin flex items-center justify-center border-t-[var(--fondo-color)] rounded-full">
          <div className="w-16 h-16 border-4 border-transparent text-red-400 text-2xl animate-spin flex items-center justify-center border-t-[var(--spark-color)] rounded-full"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative">
      <div className="flex flex-wrap gap-4 overflow-y-auto scrollNone rounded-lg ">
        {Object.entries(groupedCourses).map(([category, courses]) => (
            <div key={category} className="w-full ml-8 mb-8 bg-[var(--fondo-color)] p-4 shadow-lg shadow-black rounded-xl">
            <h2 className="text-white text-2xl font-bold mb-4">{category}</h2>
            <div className="flex flex-wrap -mx-2">
              {courses.map((course, index) => (
                <div key={course._id} className="w-1/2 px-5 mb-8">
                  <CourseCard
                    course={course}
                    courseTitle={course.title}
                    courseDescription={course.description}
                    imageUrl={course.imageUrl}
                    onEdit={() => handleEditClick(course)}
                    onDelete={() => handleDeleteClick(course._id)}
                  />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      {isEditModalOpen && (
        <EditCourseModal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          course={currentCourse}
          onSave={handleSaveCourse}
        />
      )}
    </div>
  );
};

export default CategoryCourses;
