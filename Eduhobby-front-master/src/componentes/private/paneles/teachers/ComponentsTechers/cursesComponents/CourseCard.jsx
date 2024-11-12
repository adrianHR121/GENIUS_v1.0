import React, { useState } from 'react';
import ModalVideo from './ModalVideo';
import AddVideoForm from './AddVideoForm';
import VideoListModal from './cursosVideos/VideoListModal';

const CourseCard = ({ course, onDelete, onEdit, videos = [] }) => {
  if (course && Array.isArray(course.content)) {
    const videoIds = course.content.map(video => video._id);
    console.log(videoIds);
  } else {
    console.log("course o course.content no están definidos correctamente");
  }
  

  const [isModalOpen, setModalOpen] = useState(false);
  const [isVideoListOpen, setVideoListOpen] = useState(false);

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  const openVideoList = () => setVideoListOpen(true);
  const closeVideoList = () => setVideoListOpen(false);

  return (
    <div className="w-full h-full bg-gray-800 shadow-md shadow-black rounded-lg overflow-hidden">
      <div className="h-[70px] bg-[#1b8377] relative flex items-center justify-between p-4">
        <h3 className="text-lg font-semibold text-white mt-2">{course.title}</h3>
        <button className='CourseCard_button shadow-md shadow-black' onClick={openModal}>
          <div className="svg-wrapper-1">
            <div className="svg-wrapper">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="30" height="30" className="CourseCard_svg">
                <path d="M22,15.04C22,17.23 20.24,19 18.07,19H5.93C3.76,19 2,17.23 2,15.04C2,13.07 3.43,11.44 5.31,11.14C5.28,11 5.27,10.86 5.27,10.71C5.27,9.33 6.38,8.2 7.76,8.2C8.37,8.2 8.94,8.43 9.37,8.8C10.14,7.05 11.13,5.44 13.91,5.44C17.28,5.44 18.87,8.06 18.87,10.83C18.87,10.94 18.87,11.06 18.86,11.17C20.65,11.54 22,13.13 22,15.04Z"></path>
              </svg>
            </div>
          </div>
          <span className='CourseCard_span'>Subir Video</span>
        </button>
      </div>
      <div className="bg-gray-700 w-auto h-[130px] rounded-md border-2 border-gray-900 mt-2 mx-2 overflow-hidden">
        <img src={course.imageUrl} alt={course.title} className="w-full h-full object-cover" />
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-white mt-2">Descripción</h3>
        <p className="text-sm text-gray-300 mt-2">{course.description}</p>
        <div className="flex mt-4 space-x-4">
          <button onClick={onEdit} className="p-2 bg-green-500 text-white rounded hover:bg-green-600">
            Editar
          </button>
          <button onClick={onDelete} className="p-2 bg-red-500 text-white rounded hover:bg-red-600">
            Eliminar
          </button>
          <button className='CourseCard_button shadow-md shadow-black' onClick={openVideoList}>
            <div className="svg-wrapper-1">
              <div className="svg-wrapper">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="30" height="30" className="CourseCard_svg">
                  <path d="M22,15.04C22,17.23 20.24,19 18.07,19H5.93C3.76,19 2,17.23 2,15.04C2,13.07 3.43,11.44 5.31,11.14C5.28,11 5.27,10.86 5.27,10.71C5.27,9.33 6.38,8.2 7.76,8.2C8.37,8.2 8.94,8.43 9.37,8.8C10.14,7.05 11.13,5.44 13.91,5.44C17.28,5.44 18.87,8.06 18.87,10.83C18.87,10.94 18.87,11.06 18.86,11.17C20.65,11.54 22,13.13 22,15.04Z"></path>
                </svg>
              </div>
            </div>
            <span className='CourseCard_span'>Ver Videos</span>
          </button>
        </div>
      </div>
      <ModalVideo isOpen={isModalOpen} onClose={closeModal}>
        <AddVideoForm courseId={course._id} onClose={closeModal} />
      </ModalVideo>
      
    </div>
  );
};

export default CourseCard;
