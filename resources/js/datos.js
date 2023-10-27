document.addEventListener("DOMContentLoaded", function() {
  // Función para filtrar productos
function filtrarProductos() {
  const filtroAvanzado = document.getElementById("filtroAvanzado").value;
  const filtroProducto = document.getElementById("filtroProducto").value;
  const filtroMarca = document.getElementById("filtroMarca").value;
  const filtroPrecio = document.getElementById("filtroPrecio").value;

  // Realiza el filtrado de productos según los valores seleccionados en el formulario
  const productos = document.querySelectorAll(".box");

  productos.forEach(producto => {
    const marca = producto.querySelector(".marca-product").textContent;
    const nombreDiv = producto.querySelector(".detail-box");
    const nombre = nombreDiv.querySelector("h5").textContent;
    const precio = parseFloat(nombreDiv.querySelector("p").textContent.replace("$", "").replace(",", ""));
    const debeMostrar = (
      (filtroAvanzado === "" || nombre.toLowerCase().includes(filtroAvanzado.toLowerCase())) &&
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
// Agrega un controlador de eventos al botón de filtro
const btnFiltro = document.getElementById("btn-filtro");
btnFiltro.addEventListener("click", filtrarProductos);
  

  

  // Carga los datos iniciales (asegúrate de que esta función coincida con tu estructura de datos)
  async function cargarDatos() {
    // Carga tus datos y genera elementos HTML
    // Asegúrate de que los productos se creen con las clases y atributos necesarios
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

  // Llama a la función de carga de datos al cargar la página
  cargarDatos();


});