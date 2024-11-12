import React from 'react';
import { Link } from 'react-router-dom';
import './css/Button.css';

const Button = () => {
  return (
    <Link to="/Login" className='w-full h-full flex justify-center items-center'>
      <button className="btn-53">
        <div className="original">Iniciar sesión</div>
        <div className="letters">
          <span>¡</span>
          <span>A</span>
          <span>P</span>
          <span>R</span>
          <span>E</span>
          <span>N</span>
          <span>D</span>
          <span>E</span>
          <span>&nbsp;</span>
          <span>A</span>
          <span>H</span>
          <span>O</span>
          <span>R</span>
          <span>A</span>
          <span>!</span>
        </div>
      </button>
    </Link>
  );
};

export default Button;
