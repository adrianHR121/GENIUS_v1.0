import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { FaLinkedin, FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';
import './Timeline.css'; 


const IndexCourse = () => {
  const defaultImg = 'https://www.nicepng.com/png/detail/933-9332131_profile-picture-default-png.png';
  const navigate = useNavigate();
  const { state } = useLocation();
  const [course, setCourse] = useState({});

  useEffect(() => {
    const setEqualHeights = (elements) => {
      let maxHeight = 0;
      elements.forEach(el => {
        const height = el.offsetHeight;
        if (height > maxHeight) maxHeight = height;
      });
      elements.forEach(el => {
        el.style.height = `${maxHeight}px`;
      });
    };

    const elements = Array.from(document.querySelectorAll('.timeline li > div'));
    setEqualHeights(elements);
  }, []);

  useEffect(() => {
    console.log(state.content);
    setCourse(state)
    console.log(course);
  }, [state]);

  return (
    (() => {
      console.log(course);
      return course.content;
    })() ?
      <div className='h-screen pt-16'>
        <div class="w-full flex items-center p-4 bg-[var(--fondo-color)] ">
          <img class="w-16 h-16 rounded-full mr-4" src={`/img/cursos/${course.category}.webp`} alt={course.category} />
          <div>
            <p class="text-lg font-semibold text-white">{course.title} </p>
            <p class="text-sm text-white">{course.category}</p>
          </div>
        </div>
        <div className="flex h-[90%]">
          {/* coupna 1 */}
        <section className="w-1/4 h-full bg-[var(--fondo-color)] text-white p-4 ">
          <div>
            <h2 className="text-xl font-bold mb-4">Información del curso</h2>
            <p>Duración: {course.duration || 'No especificada'}</p>
            <p>Nivel: {course.level || 'Principiante'}</p>
            <p>Idioma: {course.language || 'Español latino'}</p>
          </div>
        </section>
        {/* coupna 2 */}
        <section className="w-3/4 timeline flex justify-center items-center">
          <div class="info">
            <img width="50" height="50" src={`${course.professor.imageUrl || defaultImg}`} alt="profileImg" />
            <h2>Creado por el profesor:</h2>
            <p>{`${course.professor.firstNames} ${course.professor.lastNames}`}</p>
            <p>Email: {course.professor.email}</p>
            <section class="flex justify-center items-center space-x-4 mt-8 gap-4">
              <button
                href="/"
                class="group flex justify-center p-2 rounded-md drop-shadow-xl bg-[#004de6] from-gray-800 to-black text-white font-semibold hover:translate-y-3 hover:rounded-[50%] transition-all duration-500 hover:from-[#331029] hover:to-[#310413] border-none"
              >
                <FaLinkedin class="w-5 h-5" />
                <span
                  class="absolute opacity-0 group-hover:opacity-100 group-hover:text-text-white group-hover:text-sm group-hover:-translate-y-10 duration-700"
                >
                  LinkedIn
                </span>
              </button>
              <button
                href="/"
                class="group flex justify-center p-2 rounded-md drop-shadow-xl bg-[#0013e6] from-gray-800 to-black text-white font-semibold hover:translate-y-3 hover:rounded-[50%] transition-all duration-500 hover:from-[#1c1e21] hover:to-[#1c1e21] border-none"
              >
                <FaFacebook class="w-5 h-5" />
                <span
                  class="absolute opacity-0 group-hover:opacity-100 group-hover:text-text-white group-hover:text-sm group-hover:-translate-y-10 duration-700"
                >
                  Facebook
                </span>
              </button>
              <button
                href="/"
                class="group flex justify-center p-2 rounded-md drop-shadow-xl bg-[#1DA1F2] from-gray-800 to-black text-white font-semibold hover:translate-y-3 hover:rounded-[50%] transition-all duration-500 hover:from-[#1c1e21] hover:to-[#1c1e21] border-none"
              >
                <FaTwitter class="w-5 h-5" />
                <span
                  class="absolute opacity-0 group-hover:opacity-100 group-hover:text-text-white group-hover:text-sm group-hover:-translate-y-10 duration-700"
                >
                  Twitter
                </span>
              </button>
              <button
                href="/"
                class="group flex justify-center p-2 rounded-md drop-shadow-xl bg-[#E1306C] from-gray-800 to-black text-white font-semibold hover:translate-y-3 hover:rounded-[50%] transition-all duration-500 hover:from-[#1c1e21] hover:to-[#1c1e21] border-none"
              >
                <FaInstagram class="w-5 h-5" />
                <span
                  class="absolute opacity-0 group-hover:opacity-100 group-hover:text-text-white group-hover:text-sm group-hover:-translate-y-10 duration-700"
                >
                  Instagram
                </span>
              </button>
            </section>

          </div>

          <ol className='overflow-y-hidden'>
            {course.content.map((video) => (
              <li>

                <div class="cardTop cardDV">
                  <h3 class="cardDV__title"> {video.title}
                  </h3>
                  <p class="cardDV__content">{new Date(video.creationDate).toLocaleDateString()}</p>
                  {/* poner miniatura el video aqui */}
                  <Link to={"/Dashboard/watch-video"} state={{ state: video, course  }} key={video._id}>
                    <div class="cardDV__arrow">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" height="15" width="15">
                        <path fill="#fff" d="M13.4697 17.9697C13.1768 18.2626 13.1768 18.7374 13.4697 19.0303C13.7626 19.3232 14.2374 19.3232 14.5303 19.0303L20.3232 13.2374C21.0066 12.554 21.0066 11.446 20.3232 10.7626L14.5303 4.96967C14.2374 4.67678 13.7626 4.67678 13.4697 4.96967C13.1768 5.26256 13.1768 5.73744 13.4697 6.03033L18.6893 11.25H4C3.58579 11.25 3.25 11.5858 3.25 12C3.25 12.4142 3.58579 12.75 4 12.75H18.6893L13.4697 17.9697Z"></path>
                      </svg>
                    </div>
                  </Link>
                </div>
              </li>
            ))}
            <li></li>
          </ol>

        </section>
      </div >
      </div>
      : <div>Loading...</div>
  );
};

export default IndexCourse;