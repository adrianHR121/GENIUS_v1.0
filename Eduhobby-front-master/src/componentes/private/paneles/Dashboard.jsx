import React from "react";
import { useSelector } from "react-redux"; 
import Carga from "../../Carga";
import { Route, Routes } from 'react-router-dom';

//COMPONENTES
import Navbar from "./student/Navbar";
import IndexHome from "./student/index-home";
import CourseView from "./student/course-view/index";
import WatchVideo from "./student/course-view/WatchVideo";
import CourseProfileView from "./student/profile/CourseProfileView";
import HelpCenter from "./student/HelpCenter";


const Dashboard = () => {
  // Utiliza useSelector para acceder al estado de Redux
  const responseType = useSelector(state => state.responseType);

  // console.log('Dashboard component rendered');
  // console.log('Tipo de respuesta guardado en Redux:', responseType); // Imprime el tipo de respuesta guardado en Redux

  return (
    <div>
      <Navbar/>
      <Routes>
        <Route index element={<IndexHome />} />
        <Route path="course-view" element={<CourseView />} />
        <Route path="watch-video" element={<WatchVideo />} />
        <Route path="HelpCenter" element={<HelpCenter />} />
        <Route path="CourseProfileView" element={<CourseProfileView />} />
      </Routes>
    </div>
  );
};

export default Dashboard;
