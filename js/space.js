// Referencias a los elementos HTML
const inputBuscar = document.getElementById('inputBuscar');
const btnBuscar = document.getElementById('btnBuscar');
const contenedor = document.getElementById('contenedor');

// Función para buscar imágenes en la API
async function buscarImagenes(query) {
  const url = `https://images-api.nasa.gov/search?q=${query}&media_type=image`;

  try {
    const respuesta = await fetch(url);
    const datos = await respuesta.json();
    mostrarImagenes(datos.collection.items);
  } catch (error) {
    contenedor.innerHTML = '<p>Error al obtener los datos. Intenta de nuevo.</p>';
  }
}

// Función para mostrar las imágenes en filas de tres
function mostrarImagenes(imagenes) {
  contenedor.innerHTML = ''; 

  if (imagenes.length === 0) {
    contenedor.innerHTML = '<p>No se encontraron resultados.</p>';
    return;
  }

  // Crear las filas en grupos de tres imágenes
  for (let i = 0; i < imagenes.length; i += 3) {
    const fila = document.createElement('div');
    fila.classList.add('row', 'mb-4');

    // Iterar sobre las tres imágenes de la fila
    for (let j = i; j < i + 3 && j < imagenes.length; j++) {
      const item = imagenes[j].data[0];
      const titulo = item.title || 'Sin título';
      const descripcion = item.description || 'Descripción no disponible';
      const fecha = item.date_created
        ? new Date(item.date_created).toLocaleDateString()
        : 'Fecha no disponible';
      const imagenURL = imagenes[j].links
        ? imagenes[j].links[0].href
        : 'https://via.placeholder.com/300';

      const columna = document.createElement('div');
      columna.classList.add('col-md-4');

      columna.innerHTML = `
        <div class="card">
          <img src="${imagenURL}" class="card-img-top" alt="${titulo}">
          <div class="card-body">
            <h5 class="card-title">${titulo}</h5>
            <p class="card-text">${descripcion}</p>
            <p class="card-text"><small class="text-muted">Fecha: ${fecha}</small></p>
          </div>
        </div>
      `;
      fila.appendChild(columna); // Agregar la columna a la fila
    }

    contenedor.appendChild(fila); // Agregar la fila al contenedor
  }
}

// Evento de clic para buscar
btnBuscar.addEventListener('click', () => {
  const query = inputBuscar.value.trim();
  if (query) {
    buscarImagenes(query);
  } else {
    contenedor.innerHTML = '<p>Por favor, ingresa un término de búsqueda.</p>';
  }
});
