import React, { useContext, createContext, useState } from 'react';
import { FaEllipsisV, FaChevronRight, FaChevronLeft, FaHome, FaUser, FaCog, FaSignOutAlt, FaFileMedical } from 'react-icons/fa';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../../protected/AuthProvider';

const SidebarContext = createContext();

export default function Sidebar({ title }) {
  const { userData } = useAuth();
  const [expanded, setExpanded] = useState(true);
  const [isLoading, setIsLoading] = useState(false); 
  const location = useLocation();
  const navigate = useNavigate();
  const auth = useAuth();

  const handleLogout = async () => {
    setIsLoading(true); // Mostrar loader
    await auth.logout();
    setIsLoading(false); // Ocultar loader
    navigate('/Login');
  };

  return (
    <>
      {expanded && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 z-40" onClick={() => setExpanded(false)} />
      )}
      <aside className="fixed z-50 h-screen">
        <nav className="h-full flex flex-col bg-white border-r shadow-sm">
          <div className="p-4 pb-6  flex justify-between items-center">
            <div className="flex z-50 items-center">
              <img
                src="/img/eduHobbyLogo1.png"
                className={`overflow-hidden transition-all ${expanded ? 'w-10' : 'w-0'}`}
                alt=""
              />
              <span className={`ml-2 z-50 transition-all font-bold text-2xl text-[var(--main-color)] ${expanded ? 'block' : 'hidden'}`}>
                {title}
              </span>
            </div>
            <button
              onClick={() => setExpanded((curr) => !curr)}
              className={`p-1.5 border-none rounded-lg bg-gray-50 hover:bg-gray-100 ${expanded ? '' : 'w-full flex justify-center items-center'}`}
            >
              {expanded ? <FaChevronLeft /> : <FaChevronRight />}
            </button>
          </div>

          <SidebarContext.Provider value={{ expanded }}>
            <ul className="flex-1 px-3">
              <SidebarItem icon={<FaHome />} text="Home" to="/DashTeachers/home" active={location.pathname === "/DashTeachers/home"} />
              <SidebarItem icon={<FaUser />} text="Profile" to="/DashTeachers/profile" active={location.pathname === "/DashTeachers/profile"} />
              <SidebarItem icon={<FaCog />} text="Settings" to="/DashTeachers/settings" active={location.pathname === "/DashTeachers/settings"} />
              <SidebarItem icon={<FaFileMedical />} text="Categories" to="/DashTeachers/categories" active={location.pathname === "/DashTeachers/categories"} />
            </ul>
            <div className="mt-auto px-3 mb-4">
              <SidebarItem
                icon={<FaSignOutAlt />}
                text={isLoading ? 'Cerrando sesión...' : 'Logout'} // Muestra el estado de carga
                onClick={handleLogout}
              />
            </div>
          </SidebarContext.Provider>

          <div className="border-t flex p-3 relative">
            <div className={`${expanded ? 'w-12 h-12' : 'w-12 h-12'} rounded-xl bg-emerald-500 flex items-center justify-center text-white font-bold transition-all`}>
              {userData?.firstNames && userData?.lastNames
                ? `${userData.firstNames[0]}${userData.lastNames[0]}`.toUpperCase()
                : '??'}
            </div>
            <div className={`flex flex-col justify-center overflow-hidden transition-all ${expanded ? 'ml-3 flex-grow' : 'w-0'}`}>
              <h4 className="font-semibold text-sm">{userData?.firstNames} {userData?.lastNames}</h4>
              <span className="text-xs text-gray-600">{userData?.email}</span>
            </div>
            {expanded && (
              <button className="ml-auto border-none">
                <FaEllipsisV size={16} className="text-gray-500 " />
              </button>
            )}
          </div>
        </nav>
      </aside>
    </>
  );
}

function SidebarItem({ icon, text, to, active, onClick }) {
  const { expanded } = useContext(SidebarContext);

  const content = (
    <>
      <div className={`${expanded ? '' : 'w-full flex justify-center'}`}>
        {React.cloneElement(icon, { size: 24 })}
      </div>
      <span
        className={`overflow-hidden transition-all ${expanded ? 'w-52 ml-3' : 'w-0'}`}
      >
        {text}
      </span>
      {!expanded && (
        <span className="absolute left-full rounded-md px-2 py-1 ml-6 bg-gray-100 text-gray-800 text-sm invisible opacity-20 -translate-x-3 transition-all group-hover:visible group-hover:opacity-100 group-hover:translate-x-0">
          {text}
        </span>
      )}
    </>
  );

  return (
    <li
      className={`relative flex items-center py-2 px-3 my-1 font-medium rounded-md cursor-pointer transition-colors group ${active ? 'bg-gradient-to-tr bg-[var(--fondo-color)] text-white' : 'hover:bg-indigo-50 text-gray-600'
        }`}
    >
      {to ? (
        <Link to={to} className="flex items-center w-full">
          {content}
        </Link>
      ) : (
        <div onClick={onClick} className="flex items-center w-full">
          {content}
        </div>
      )}
    </li>
  );
}
