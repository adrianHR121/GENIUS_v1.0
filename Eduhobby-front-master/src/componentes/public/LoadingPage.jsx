import React from 'react';

const LoadingPage = ({ loadingPageRef, loaderRef, lastrayRef }) => (
  <div id="loading-page" ref={loadingPageRef}>
    <div id="loader" ref={loaderRef}>
      <div className="particles element">
        {/* Agrega aquí todos los elementos de las chispas */}
        <div className="spark1 spark element"><div className="particle1 particle element"></div></div>
        <div className="spark2 spark element"><div className="particle2 particle element"></div></div>
        <div className="spark3 spark element"><div className="particle3 particle element"></div></div>
        <div className="spark4 spark element"><div className="particle4 particle element"></div></div>
        <div className="spark5 spark element"><div className="particle5 particle element"></div></div>
        <div className="spark6 spark element"><div className="particle6 particle element"></div></div>
        <div className="spark7 spark element"><div className="particle7 particle element"></div></div>
        <div className="spark8 spark element"><div className="particle8 particle element"></div></div>
        <div className="spark9 spark element"><div className="particle9 particle element"></div></div>
        <div className="spark10 spark element"><div className="particle10 particle element"></div></div>
        <div className="spark11 spark element"><div className="particle11 particle element"></div></div>
        <div className="spark12 spark element"><div className="particle12 particle element"></div></div>
      </div>
      <div className="ray element" ref={lastrayRef}></div>
      <div className="sphere element"></div>
    </div>
  </div>
);

export default LoadingPage;
