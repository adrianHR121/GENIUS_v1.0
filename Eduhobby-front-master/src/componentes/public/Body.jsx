import React from "react";

import Categorias from './fragments/Categorias'
import Introduccion from "./fragments/Introduccion";
import Precios from "./fragments/Precios";
import Footer from './Footer';
import MainContent from './MainContent';
import Nav from './Nav'
import Metricas from "./fragments/Metricas";


const Body = () =>{
    return(
        <div>
            <Nav />
            <MainContent />
            <Introduccion />
            <Metricas />
            <Precios />
            <Categorias />
            <Footer />
        </div>
    );
}

export default Body;