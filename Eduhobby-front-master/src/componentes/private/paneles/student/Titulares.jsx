import React, { useEffect, useState } from 'react';
import getCourses from '../../../../services/courses/getCourses';
import { useNavigate } from "react-router-dom";
import { useAuth } from '../../../protected/AuthProvider';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const Titulares = ({ selectedCategory }) => {
  const [isCourses, setIsCourses] = useState(false);
  const [courses, setCourses] = useState([]);
  const navigate = useNavigate();
  const auth = useAuth();

  useEffect(() => {
    const getIt = async () => {
      const coursesResponse = await getCourses(auth.handleTokenRefresh);

      // Simular un retraso de 2 segundos antes de mostrar los cursos
      setTimeout(() => {
        setCourses(coursesResponse);
        setIsCourses(true);
      }, 2000); // 2000 milisegundos = 2 segundos
    };
    getIt();
  }, []);

  const filteredCourses = selectedCategory && selectedCategory !== 'Todas'
    ? courses.filter(course => course.category === selectedCategory)
    : courses;

  const handleCourseClick = (content) => {
    if (!content.content || content.content.length === 0) {
      alert('No content for this course');
      return;
    }
    navigate('course-view', { state: content });
  };

  return (
    isCourses ? (
      <div className='max-w-[1640px] m-auto px-4 py-20'>
        <h1 className='text-grey-600 font-bold text-4xl text-center mb-8'>Cursos Recientes</h1>
        <div className='grid grid-cols-2 lg:grid-cols-4 gap-6 pt-4'>
          {filteredCourses.map((course) => (
            <div className='rounded-xl relative h-[255px] w-auto hover:scale-105 duration-300 cursor-pointer' key={course._id}>
              <div className='absolute h-full w-full bg-black/50 rounded-xl text-white flex flex-col justify-between p-4'>
                <p className='font-bold text-2xl min-w-[20vh] truncate'>{course.title}</p>
                <p className='truncate'>{course.description}</p>
                <button className='border-white bg-white text-black mx-2 mt-auto' onClick={() => handleCourseClick(course)}>Ver curso</button>
              </div>
              <img className='h-full w-full object-cover rounded-xl' src={`${course.imageUrl}`} alt={course.title} />
            </div>
          ))}
        </div>
      </div>
    ) : (
      <div className='max-w-[1640px] m-auto px-4 py-20'>
        <h1 className='text-grey-600 font-bold text-4xl text-center mb-8'>
          <Skeleton width={300} />
        </h1>
        <div className='grid grid-cols-2 lg:grid-cols-4 gap-6 pt-4'>
          {Array(4).fill().map((_, index) => (
            <div className='rounded-xl relative h-[255px] w-auto' key={index}>
              <Skeleton height={255} />
            </div>
          ))}
        </div>
      </div>
    )
  );
};

export default Titulares;
