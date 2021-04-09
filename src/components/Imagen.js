import React from 'react';

const Imagen = ({ imagen }) => {
  //extraer las variables
  const { largeImageURL, likes, tags, views, previewURL } = imagen;
  return (
    <div className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4">
      <div className="card">
        <img src={previewURL} alt={tags} className="card-img-top" />
        <div className="card-body">
          <p className="card-text">{likes} Me Gusta</p>
          <p className="card-text">{views} Vistas</p>
        </div>
        <div className="card-footer">
          <a
            href={largeImageURL}
            className="btn btn-primary btn-block"
            target="_blank"
            rel="noopener noreferrer"
          >
            Ver Imagen
          </a>
        </div>
      </div>
    </div>
  );
};

export default Imagen;
