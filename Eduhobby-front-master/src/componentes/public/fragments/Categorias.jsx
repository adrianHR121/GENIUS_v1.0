import React from "react";
import { Link } from 'react-router-dom';
import "./css/Categorias.css";


const categories = [
  {
    image: "/img/fragmentsIMG/diseño ux.jpg",
    title: "Diseño UX",
    description: "Cursos para dar tus primeros pasos en la industria de Diseño UX"
  },
  {
    image: "/img/fragmentsIMG/Desarrollo web.jpg",
    title: "Desarrollo Web",
    description: "Aprende a crear sitios web y aplicaciones desde los fundamentos hasta ser un desarrollador full-stack y accede a las mejores oportunidades laborales globales."
  },
  {
    image: "/img/fragmentsIMG/marketing digital.jpg",
    title: "Marketing Digital",
    description: "Aprende SEO, Contenido para Redes Sociales, Email Marketing, Growth Marketing, y analítica. Potencia el crecimiento de tu producto o servicio."
  },
  {
    image: "/img/fragmentsIMG/negocios.jpg",
    title: "Negocios",
    description: "Curos especializados en redes sociales. Aprende a sacar todo el potencial "
  },
  {
    image: "/img/fragmentsIMG/ciberseguridad.jpg",
    title: "Ciberseguridad",
    description: "Cursos especializados en ciberseguridad. Aprende a prevenir ciberataques y especialízate para garantizar tu seguridad informática y la de tu empresa."
  },
  {
    image: "/img/fragmentsIMG/musica.jpg",
    title: "Música",
    description: "Aprende conceptos básicos de música y sonido para interpretar pentagramas y cifrados de cualquier instrumento."
  },
];

const CategoryCardModificado = ({ image, title, description }) => (
  <div className="card-modificado-container cursor-pointer">
    <div className="card-modificado">
      <div className="img-content-modificado">
        <img src={image} alt={title} className="category-image-modificado" />
      </div>
      <div className="content-modificado">
        <p className="heading-modificado">{title}</p>
        <p>{description}</p>
      </div>
    </div>
  </div>
);

const CategoriesModificado = () => (
  <section className="categories-section-modificado ">
    <h2>Categorías principales</h2>
    <div className="centar">
      <div className="card-grid-modificado">
        {categories.map((category, index) => (
          <Link to="/Dashboard#cat" className="category-card-link cursor-pointer">
            <CategoryCardModificado key={index} {...category} />
          </Link>
        ))}
      </div>
    </div>
  </section>
);

export default CategoriesModificado;