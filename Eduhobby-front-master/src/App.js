import React, { useEffect, useRef, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import AuthProvider from './componentes/protected/AuthProvider.js';
import ProtectedRoute from  './componentes/protected/ProtectedRoute.js';
import { Provider } from 'react-redux'; 
import store from './redux/store.js';

// Componentes
import LoadingPage from './componentes/public/LoadingPage';
import Body from './componentes/public/Body';
import Login from './componentes/private/Login';
import Registro from './componentes/private/Registro';
import Dashboard from './componentes/private/paneles/Dashboard.jsx';
import Mensaje from './componentes/Mensaje';
import administrador from './componentes/private/paneles/administrador.jsx';
import CookieConsent from './componentes/CookieConsent.jsx';
import VerifyView from './componentes/VerifyView.jsx';
import DashTeachers from './componentes/private/paneles/DashTeachers.jsx';
import Payments from './componentes/private/paneles/Payments/index.jsx';
//prueba 
import IndexHome from './componentes/private/paneles/student/index-home.jsx';

// CSS plus
import './App.css';
import 'animate.css';
import PayOrder from './componentes/private/paneles/Payments/PayOrder.jsx';
import CancelOrder from './componentes/private/paneles/Payments/Cancel.jsx';

const App = () => {
  const [mostrarNav, setMostrarNav] = useState(false);
  const loadingPageRef = useRef(null);
  const loaderRef = useRef(null);
  const lastrayRef = useRef(null);

  const location = useLocation();


  //En Proceso
  const hideComponentsRoutes = [
    '/Login', '/Registro', '/Dashboard', '/Mensaje', '/verify',
    '/Administrador', '/Administrador/home', '/Administrador/alta',
    '/Administrador/UpdatePassword', '/Administrador/UpdateUser',
    '/DashTeachers', '/DashTeachers/home', '/DashTeachers/profile',
    '/DashTeachers/settings', '/Dashboard/course-view',
    '/Dashboard/course-view/watch-video', '/Dashboard/watch-video',
    '/DashTeachers/categories/programacion', '/DashTeachers/categories/matematicas',
    '/DashTeachers/categories/ciencias', '/DashTeachers/categories/historia',
    '/DashTeachers/categories',
    '/PaypalTest','/sucessful-payment','/cancel-payment'
  ];

  const regex = /^\/[^/]+(\/.*)$/;
  const shouldHideComponents = hideComponentsRoutes.includes(location.pathname) || 
    (location.pathname.includes('verify') ? regex.test(location.pathname) : false);

  useEffect(() => {
    const loadingPage = loadingPageRef.current;
    const loader = loaderRef.current;
    const lastray = lastrayRef.current;

    setTimeout(() => {
      loadingPage.className += ' loaded';
      loader.className += ' opzero';
      lastray.className += ' finalray';
      document.body.className += ' whitebk';
      setMostrarNav(true);
    }, 3000);//tiempo de atomo :)
  }, []);

  useEffect(() => {
    console.log('Current path:', location.pathname);
    console.log('Should hide components?', shouldHideComponents);
  }, [location.pathname, shouldHideComponents]);

  return (
    <div id="back">
      <LoadingPage loadingPageRef={loadingPageRef} loaderRef={loaderRef} lastrayRef={lastrayRef} />
      <Routes>
        {/* Rutas públicas */}
        <Route path="/" element={<Body />} />
        <Route path="/Registro" element={<Registro />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Mensaje" element={<Mensaje />} />
        <Route path="/verify/:token" element={<VerifyView />} />
        

        {/* Rutas protegidas */}
        <Route path="/Dashboard/*" element={<ProtectedRoute requiredTypes={['student']} element={Dashboard} />} />
        <Route path="/Administrador/*" element={<ProtectedRoute requiredTypes={['admin']} element={administrador} />} />
        <Route path="/DashTeachers/*" element={<ProtectedRoute requiredTypes={['professor']} element={DashTeachers} />} />
        <Route path='/PaypalTest' element={<Payments />} />
        <Route path='/sucessful-payment' element={<PayOrder />} />
        <Route path='/cancel-payment' element={<CancelOrder />} />
      </Routes>
      <CookieConsent />
    </div>
  );
};

const AppWrapper = () => {
  return (
    <Provider store={store}>
      <AuthProvider>
        <App />
      </AuthProvider>
    </Provider>
  );
};

export default AppWrapper;
