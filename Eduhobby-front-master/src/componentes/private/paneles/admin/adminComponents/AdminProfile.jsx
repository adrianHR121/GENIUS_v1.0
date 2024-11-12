import React from 'react';

const AdminProfile = ({ imageSrc }) => {
  return (
    <div className="rounded-full overflow-hidden w-[50px] h-[50px]">
      <img src={imageSrc} alt="Admin Profile" className="w-full h-full object-cover" />
    </div>
  );
};

export default AdminProfile;
