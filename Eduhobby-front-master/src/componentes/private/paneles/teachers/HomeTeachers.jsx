import React from 'react';
import { useAuth } from '../../../protected/AuthProvider';
import SalesCard from './ComponentsTechers/SalesCard';
import CoursesContainer from './ComponentsTechers/cursesComponents/CoursesContainer';
import RecentOrdersTable from './ComponentsTechers/RecentOrdersTable';
import { deleteCourse } from '../../../../fetch/teahers/cursesService';
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';
import ProfileCard from './components/profileCard';




const HomeTeachers = () => {
  const { userData } = useAuth();

  const handleDeleteCourse = async (courseId, refreshCourses) => {
    try {
      await deleteCourse(courseId);
      refreshCourses();
    } catch (error) {
      console.error('Error deleting course:', error);
    }
  };

  const handleAddCourse = () => {
    // No es necesario hacer nada aquí, ya que `CoursesContainer` se actualizará automáticamente
  };

  return (
    <div className="text-white min-h-screen">
      <div className="flex flex-wrap">
        <div className="w-full lg:w-2/3 flex flex-wrap">
          <div className="w-full md:w-1/2 lg:w-1/3 p-4">
            <SalesCard title="Ganancias" value="$65,024 MXN" maxValue={100000} colorVar="var(--fondo-color)" />
          </div>
          <div className="w-full md:w-1/2 lg:w-1/3 p-4">
            <SalesCard title="Visualizaciones" value="24,981" maxValue={50000} colorVar="var(--fondo-color)" />
          </div>
          <div className="w-full md:w-1/2 lg:w-1/3 p-4">
            <SalesCard title="Nuevos Usuarios" value="14,147" maxValue={20000} colorVar="var(--fondo-color)" />
          </div>
          <div className="w-full p-4">
            <h1 className="text-slate-400 text-2xl font-bold">Cursos</h1>
            <CoursesContainer onDeleteCourse={handleDeleteCourse} onAddCourse={handleAddCourse} />
          </div>
          <div className="w-full p-4">
            <RecentOrdersTable /> {/* Aquí se añade la nueva tabla */}
          </div>
        </div>

        <div className="w-full lg:w-1/3 p-4 flex flex-col">
          
            {/* Sección de Información del Usuario */}
            <ProfileCard
              firstNames={userData?.firstNames}
              lastNames={userData?.lastNames}
              email={userData?.email}
              professionalId={userData?.professionalId}
              imageUrl={userData?.imageUrl}
            />

            {/* Sección de Redes Sociales */}
          
          <div className="flex-grow-0 group relative flex flex-col items-center justify-center gap-2 text-center rounded-2xl overflow-hidden p-4">
            <div className="w-full max-w-full h-[70px] bg-[var(--fondo-color)] rounded-[20px] flex items-center justify-start backdrop-blur-[10px] transition-all duration-500 ease-in-out hover:scale-[1.05] cursor-pointer">
              <div className="w-[50px] h-[50px] ml-[10px] rounded-[10px] bg-gradient-to-r from-[#d7cfcf] to-[#9198e5] transition-all duration-500 ease-in-out hover:bg-gradient-to-r hover:from-white flex justify-center items-center text-blue-600">
                <FaFacebook size={24} />
              </div>
              <div className="w-[calc(100%-90px)] ml-[10px] text-white font-poppins">
                <div className="flex items-center justify-between">
                  <p className="text-[16px] font-bold">Facebook</p>
                  <span className="text-[10px]">Hace 12 minutos</span>
                </div>
                <p className="text-[12px] font-light">Última publicación en Facebook</p>
              </div>
            </div>
            <div className="w-full max-w-full h-[70px] bg-[var(--fondo-color)] rounded-[20px] flex items-center justify-start backdrop-blur-[10px] transition-all duration-500 ease-in-out hover:scale-[1.05] cursor-pointer">
              <div className="w-[50px] h-[50px] ml-[10px] rounded-[10px] bg-gradient-to-r from-[#d7cfcf] to-[#9198e5] transition-all duration-500 ease-in-out hover:bg-gradient-to-r hover:from-white flex justify-center items-center text-blue-400">
                <FaTwitter size={24} />
              </div>
              <div className="w-[calc(100%-90px)] ml-[10px] text-white font-poppins">
                <div className="flex items-center justify-between">
                  <p className="text-[16px] font-bold">Twitter</p>
                  <span className="text-[10px]">Hace 15 minutos</span>
                </div>
                <p className="text-[12px] font-light">Última publicación en Twitter</p>
              </div>
            </div>
            <div className="w-full max-w-full h-[70px] bg-[var(--fondo-color)] rounded-[20px] flex items-center justify-start backdrop-blur-[10px] transition-all duration-500 ease-in-out hover:scale-[1.05] cursor-pointer">
              <div className="w-[50px] h-[50px] ml-[10px] rounded-[10px] bg-gradient-to-r from-[#d7cfcf] to-[#9198e5] transition-all duration-500 ease-in-out hover:bg-gradient-to-r hover:from-white flex justify-center items-center text-pink-600">
                <FaInstagram size={24} />
              </div>
              <div className="w-[calc(100%-90px)] ml-[10px] text-white font-poppins">
                <div className="flex items-center justify-between">
                  <p className="text-[16px] font-bold">Instagram</p>
                  <span className="text-[10px]">Hace 20 minutos</span>
                </div>
                <p className="text-[12px] font-light">Última publicación en Instagram</p>
              </div>
            </div>
            <div className="w-full max-w-full h-[70px] bg-white border-2 border-dashed border-[var(--fondo-color)] rounded-[20px] flex items-center justify-center backdrop-blur-[10px] transition-all duration-500 ease-in-out hover:scale-[1.05] cursor-pointer">
              <p className="text-[16px] font-bold text-[var(--fondo-color)]">Agregar Red Social +</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeTeachers;
