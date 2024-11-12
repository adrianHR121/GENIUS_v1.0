import React, { useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import Sidebar from './teachers/Sidebar';
import HomeTeachers from './teachers/HomeTeachers';
import ProfileTeachers from './teachers/ProfileTeachers';
import SettingsTeachers from './teachers/SettingsTeachers';
import CategoryCourses from './teachers/ComponentsTechers/cursesComponents/CategoryCourses';

const DashTeachers = () => {
  const location = useLocation();

  useEffect(() => {
    document.body.classList.add('no-scroll');
    return () => {
      document.body.classList.remove('no-scroll');
    };
  }, []);

  let title;
  let caption;

  switch (true) {
    case location.pathname === '/DashTeachers/home':
      title = 'Panel de Administración';
      caption = 'Home';
      break;
    case location.pathname === '/DashTeachers/profile':
      title = 'Perfil del Usuario';
      caption = 'Profile';
      break;
    case location.pathname === '/DashTeachers/settings':
      title = 'Ajustes';
      caption = 'Settings';
      break;
    case location.pathname === '/DashTeachers/categories':
        title = 'Todos los Cursos';
        caption = 'Cursos';
        break;
    case location.pathname.startsWith('/DashTeachers/categories/'):
      title = 'Categoría de Cursos';
      caption = 'Courses';
      break;
    default:
      title = 'GENIUS';
  }

  return (
    <div className="flex h-screen overflow-hidden">
      <div className="z-50 w-auto fixed md:relative">
        <Sidebar title={title} />
      </div>
      <div className="flex-1 flex flex-col h-full pl-16 md:pl-5 pt-5 overflow-y-auto">
        <div className="fixed md:relative z-40 bg-white w-full px-4 md:px-20 py-2">
          <h1 className="text-2xl md:text-3xl font-bold text-[var(--main-color)]">
            {title}
          </h1>
          <div className="flex items-center space-x-2 text-lg font-bold text-[var(--titulos-color)]">
            <span>DashTeachers</span>
            <span>/</span>
            <span>{caption}</span>
          </div>
        </div>
        <div className="relative mt-20 md:mt-28 p-4 md:ml-8 lg:mt-4 lg:mr-0 overflow-y-auto h-full">
          <Routes>
            <Route path="/home" element={<HomeTeachers />} />
            <Route path="/profile" element={<ProfileTeachers />} />
            <Route path="/settings" element={<SettingsTeachers />} />
            <Route path="/categories/:category" element={<CategoryCourses />} />
            <Route path="/categories" element={<CategoryCourses />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default DashTeachers;
