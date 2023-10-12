
function validarEmail() {
    const emailInput = document.getElementById('emailInput');
    const email = emailInput.value;
    const emailRegex = /^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;
  
    if (emailRegex.test(email)) {
      alert('¡Correo electrónico válido, Suscripción completa!');
    } else {
      alert('Correo electrónico no válido');
    }
  }