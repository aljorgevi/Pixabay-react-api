import React, { useState, useEffect } from 'react';
import Formulario from './components/Formulario';
import ListadoImagenes from './components/ListadoImagenes';
import axios from 'axios';

function App() {
  /* ------------------------------------ Hooks ------------------------------------------*/
  //state de la App
  const [busqueda, guardarBusqueda] = useState('');
  const [imagenes, guardarImagenes] = useState([]);
  const [paginaactual, guardarPaginaActual] = useState(1);
  const [totalpaginas, guardarTotalPaginas] = useState(5);

  useEffect(() => {
    const consultarAPI = async () => {
      if (busqueda === '') return;
      const ImagenesPorPagina = 30;
      const key = '19952011-3f9eda82bd9d6282f6d3d5c60';
      const url = `https://pixabay.com/api/?key=${key}&q=${busqueda}&per_page=${ImagenesPorPagina}&page=${paginaactual}`;

      const respuesta = await axios(url);
      guardarImagenes(respuesta.data.hits);

      // calcular el total de guardarTotalPaginas
      const calcularTotalPaginas = Math.ceil(
        respuesta.data.totalHits / ImagenesPorPagina
      );
      guardarTotalPaginas(calcularTotalPaginas);

      // Mover la pantalla hacia arriba
      const jumbotron = document.querySelector('.jumbotron');
      jumbotron.scrollIntoView({ behavior: 'smooth' });
    };
    consultarAPI();
  }, [busqueda, paginaactual]);
  /* ------------------------------------ End Hooks ------------------------------------------*/
  // definir la pagina anterior
  const handleonClickPaginaAnterior = () => {
    const nuevaPaginaActual = paginaactual - 1;
    if (nuevaPaginaActual === 0) return;
    guardarPaginaActual(nuevaPaginaActual);
  };
  //definir la pagina siguiente
  const handleonClickPaginaSiguiente = () => {
    const nuevaPaginaActual = paginaactual + 1;
    if (nuevaPaginaActual > totalpaginas) return;
    guardarPaginaActual(nuevaPaginaActual);
  };
  /* ------------------------------------ return ------------------------------------------*/
  return (
    <div className="container">
      <div className="jumbotron">
        <p className="lead text-center">Bucador de Imagenes</p>
        <Formulario guardarBusqueda={guardarBusqueda} />
      </div>
      <div className="row justify-content-center">
        <ListadoImagenes imagenes={imagenes} />
        {paginaactual === 1 ? null : (
          <button
            type="button"
            className="btn btn-info mr-1"
            onClick={handleonClickPaginaAnterior}
          >
            &laquo; Anterior
          </button>
        )}
        {paginaactual === totalpaginas ? null : (
          <button
            type="button"
            className="btn btn-info"
            onClick={handleonClickPaginaSiguiente}
          >
            Siguiente &raquo;
          </button>
        )}
      </div>
    </div>
  );
}

export default App;
