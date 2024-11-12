import { FiPlus } from 'react-icons/fi';
import React, { useState } from 'react';
import AddCourseModal from './AddCourseModal';
import AddCourseForm from './AddCourseForm';

const AddCourseCard = ({ onAddCourse }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleCourseAdded = async () => {
    await onAddCourse();
    handleCloseModal();
  };

  return (
    <>
      <div className="min-w-72 min-h-80 p-4 m-2">
        <div
          onClick={handleOpenModal}
          className="bg-[#1b8377] shadow-md shadow-black h-full rounded-lg p-4 flex items-center justify-center cursor-pointer "
        >
          <FiPlus className="text-4xl text-white" />
        </div>
      </div>
      <AddCourseModal isOpen={isModalOpen} onClose={handleCloseModal}>
        <AddCourseForm onCourseAdded={handleCourseAdded} onClose={handleCloseModal} />
      </AddCourseModal>
    </>
  );
};

export default AddCourseCard;
