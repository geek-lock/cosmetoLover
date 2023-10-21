document.getElementById("miFormulario2").addEventListener("submit", function (event) {

  let email = document.getElementById("emailInput").value;


  if (!isValidEmail(email)) {
    event.preventDefault();
    alert("Ingrese una dirección de correo electrónico válida.");
  }else{
    alert("Suscripción exitosa!");
  }
});
document.getElementById("miFormulario").addEventListener("submit", function (event) {
  let nombre = document.getElementById("nombre").value;
  let email = document.getElementById("emailF").value;
  let telefono = document.getElementById("telefono").value;

  if (!nombre || !email || !telefono) {
    event.preventDefault();
    alert("Por favor, complete todos los campos del primer formulario.");
  }

  if (!isValidEmail(email)) {
    event.preventDefault();
    alert("Ingrese una dirección de correo electrónico válida.");
  }

  if (!isValidPhoneNumber(telefono)) {
    event.preventDefault();
    alert("Ingrese un número de teléfono válido.");
  }
});

function isValidEmail(email) {
  let emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  return emailPattern.test(email);
};

function isValidPhoneNumber(telefono) {
  let numeroTelefono = /^[0-9+]+$/;
  return numeroTelefono.test(telefono);
<<<<<<< HEAD
};

//productos-carrito
document.getElementById("see-product").addEventListener("click", function (event) {
  event.preventDefault();

  // Obtener los datos del producto
  const nombre = document.getElementById("nombre-item1").textContent;
  const descripcion = document.getElementById("descripcion-item1").textContent;
  const precio = parseFloat(document.getElementById("precio-item1").textContent);

  // Llamar a la función agregarProducto
  agregarProducto(nombre, descripcion, precio);
});
function agregarProducto(nombre, descripcion, precio) {
  carrito.push({ nombre, descripcion, precio });
  actualizarCarrito();
}
=======
}



//agrego para validar el registro de usuario, la contraseña sea igual a la confirmacion de contraseña

document.getElementById("miRegistro").addEventListener("submit", function(event) {
  var password = document.getElementById("Password-cliente").value;
  var confirmarPassword = document.getElementById("Confirmar-Password").value;

  if (password !== confirmarPassword) {
    // Contraseñas no coinciden, muestra un mensaje de error
    document.getElementById("mensajeError").style.display = "block";
    event.preventDefault(); // Evita el envío del formulario
  }
});
>>>>>>> 56b313d24825d0b56e63857a6401c5403ecc8fa0
