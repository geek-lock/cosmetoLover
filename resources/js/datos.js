//funcion para traer datos del JSON
async function cargarDatos() {
    const response = await fetch('../js/data.json');
    const dataDecoded = await response.json();
    
      for (let i = 0; i < dataDecoded.length; i++) {
        const dato = dataDecoded[i];
    
        const marcaElement = document.getElementById(`marca-item${i+1}`);
        const nombreElement = document.getElementById(`nombre-item${i+1}`);
        const precioElement = document.getElementById(`precio-item${i+1}`);
        const descripcionElement = document.getElementById(`descripcion-item${i+1}`);
    
        if (marcaElement && nombreElement && precioElement && descripcionElement) {
          marcaElement.textContent = dato.marca;
          nombreElement.textContent = dato.nombre;
          precioElement.textContent = `$${dato.precio}`;
          descripcionElement.textContent = dato.descripcion;
        }
      }
    



  }
  cargarDatos();