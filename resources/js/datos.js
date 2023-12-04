
document.addEventListener("DOMContentLoaded", function() {

function filtrarProductos() {
  const filtroAvanzado = document.getElementById("filtroAvanzado").value;
  const filtroProducto = document.getElementById("filtroProducto").value;
  const filtroMarca = document.getElementById("filtroMarca").value;
  const filtroPrecio = document.getElementById("filtroPrecio").value;

  const productos = document.querySelectorAll(".box");

  productos.forEach(producto => {
    const marca = producto.querySelector(".marca-product").textContent;
    const nombreDiv = producto.querySelector(".detail-box");
    const nombre = nombreDiv.querySelector("h5").textContent;
    const precio = parseFloat(nombreDiv.querySelector("p").textContent.replace("$", "").replace(",", ""));
    const descripcionP = nombreDiv.querySelector(".description-product").textContent;
    const debeMostrar = (
      (filtroAvanzado === "" || nombre.toLowerCase().includes(filtroAvanzado.toLowerCase()) || descripcionP.toLowerCase().includes(filtroAvanzado.toLowerCase())) &&
      (filtroProducto === "opcion1" || filtroProducto === nombre) &&
      (filtroMarca === "opcion1" || filtroMarca === marca) &&
      (filtroPrecio === "opcion1" || (filtroPrecio === "5000" && precio <= 5000) ||
        (filtroPrecio === "10000" && precio <= 10000) ||
        (filtroPrecio === "15000" && precio <= 15000) ||
        (filtroPrecio === "20000" && precio <= 20000)
      )
    );

    producto.style.display = debeMostrar ? "block" : "none";
  });
  }

const btnFiltro = document.getElementById("btn-filtro");
btnFiltro.addEventListener("click", filtrarProductos);
  

  

  
  async function cargarDatos() {
    // Carga datos y genera elementos HTML|
    const response = await fetch('../js/data.json');
    const dataDecoded = await response.json();

    for (let i = 0; i <= dataDecoded.length; i++) {
      const dato = dataDecoded[i];

      const marcaElement = document.getElementById(`marca-item${i+1}`);
      const nombreElement = document.getElementById(`nombre-item${i+1}`);
      const precioElement = document.getElementById(`precio-item${i+1}`);
      const descripcionElement = document.getElementById(`descripcion-item${i+1}`);
      const fotoElement = document.getElementById(`img${i+1}`);
      

      if (marcaElement && nombreElement && precioElement && descripcionElement && fotoElement ) {
        marcaElement.textContent = dato.marca;
        nombreElement.textContent = dato.nombre;
        precioElement.textContent = `$${dato.precio}`;
        descripcionElement.textContent = dato.descripcion;
        fotoElement.style.background ='url(' + dato.foto + ')' ;
        fotoElement.style.backgroundSize = '100% 100%';
        fotoExport = dato.foto;
        
      }
      
    }
  }
  
  cargarDatos();
  

});
