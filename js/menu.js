
$(document).ready(function() {

  // Inicializar saldo si no existe
  if(localStorage.getItem("saldo") === null) {
    localStorage.setItem("saldo", 60000);
  }

  // Mostrar saldo
  const saldo = parseFloat(localStorage.getItem("saldo"));
  $('#saldo').text("$" + saldo.toLocaleString());

  // Eventos botones con mensaje de redirección
  $('#btnDepositar').click(function() {
    $('#mensaje-redireccion').html('<div class="alert alert-info">↪️ Redirigiendo a Depositar...</div>');
    setTimeout(() => {
      window.location.href = "deposito1.html";
    }, 1000);
  });

  $('#btnEnviar').click(function() {
    $('#mensaje-redireccion').html('<div class="alert alert-info">↪️ Redirigiendo a Enviar Dinero...</div>');
    setTimeout(() => {
      window.location.href = "sendmoney1.html";
    }, 1000);
  });

  $('#btnMovimientos').click(function() {
    $('#mensaje-redireccion').html('<div class="alert alert-info">↪️ Redirigiendo a Últimos Movimientos...</div>');
    setTimeout(() => {
      window.location.href = "transactions1.html";
    }, 1000);
  });

});