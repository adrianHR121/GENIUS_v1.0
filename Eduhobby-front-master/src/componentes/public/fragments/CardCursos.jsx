import React from 'react';
import './css/CardCursos.css';

const CardCursos = ({ image, title, description }) => {
  return (
    <div className="card-container">
    <div className="card">
    <div className="front-content">
    <img src={image} alt=""/>
    </div>
    <div className="content">
      <p className="heading">{title}</p>
      <p>
      {description}
      </p>
    </div>
  </div>
  </div>
  );
};

export default CardCursos;
