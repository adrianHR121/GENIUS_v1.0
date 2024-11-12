import React, { useState, useEffect } from 'react';
import { data } from '../../../../data/data';
import { useLocation } from 'react-router-dom';

const Menu = ({ selectedCategory }) => {
  const [menu, setMenu] = useState(data);
  const { hash } = useLocation();

  useEffect(() => {
    if (hash === '#cat') {
      const element = document.getElementById('cat');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [hash]);
  useEffect(() => {
    let filteredMenu = data;

    if (selectedCategory && selectedCategory !== 'Todas') {
      filteredMenu = filteredMenu.filter(item => item.category === selectedCategory);
    }

    setMenu(filteredMenu);
  }, [selectedCategory]);

  return (
    <div className='max-w-[1640px] m-auto px-4 py-20' id='cat'>
      <h1 className='text-grey-600 font-bold text-4xl text-center' >Cursos mejor valorados</h1>
      <div className='grid grid-cols-2 lg:grid-cols-4 gap-6 pt-4'>
        {menu.map((item, index) => (
          <div className='border shadow-lg rounded-lg hover:scale-105 duration-300' key={index}>
            <img src={item.image} alt={item.name} className='w-full h-[200px] object-cover rounded-t-lg' />
            <div className='flex justify-between px-2 py-4'>
              <p className='font-bold'>{item.name}</p>
              <p><span className='bg-green-500 text-white p-1 rounded-full'>{item.price}</span></p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Menu;
