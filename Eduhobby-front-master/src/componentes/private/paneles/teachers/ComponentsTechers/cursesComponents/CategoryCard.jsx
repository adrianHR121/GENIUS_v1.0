import React from 'react';

const CategoryCard = ({ category, onClick }) => {
  return (
    <div className="category-card p-4 m-2 bg-[#1b8377] shadow-md shadow-black rounded cursor-pointer min-w-64 min-h-80 flex flex-col" onClick={onClick}>
    <div className="flex-grow relative">
      <img src={`/img/cursos/${category}.webp`} alt={category} className="absolute inset-0 w-full h-full object-cover rounded" />
    </div>
    <h3 className="text-lg font-semibold mt-4 text-center">{category}</h3>
  </div>
  );
};

export default CategoryCard;