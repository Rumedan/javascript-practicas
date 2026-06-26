
$(document).ready(function() {
// Calcular totales de depositado y enviado
function calcularResumen() {
  const movimientos = JSON.parse(localStorage.getItem("movimientos") || "[]");

  let totalDepositado = 0;
  let totalEnviado = 0;

  movimientos.forEach(function(mov) {
    if(mov.monto > 0) {
      totalDepositado += mov.monto;
    } else {
      totalEnviado += Math.abs(mov.monto);
    }
  });

  $('#totalDepositado').text("$" + totalDepositado.toLocaleString());
  $('#totalEnviado').text("$" + totalEnviado.toLocaleString());
}

calcularResumen();
  
// Inicializar saldo si no existe
  if(localStorage.getItem("saldo") === null) {
    localStorage.setItem("saldo", 60000);
  }

  // Mostrar saldo
  const saldo = parseFloat(localStorage.getItem("saldo"));
  $('#saldo').text("$" + saldo.toLocaleString());

  // Eventos botones con mensaje de redirección
  $('#btnDepositar').click(function() {
    $('#mensaje-redireccion').hide().html('<div class="alert alert-info">↪️ Redirigiendo a Depositar...</div>').fadeIn(400);
    setTimeout(() => {
      window.location.href = "deposito1.html";
    }, 1000);
  });

  $('#btnEnviar').click(function() {
    $('#mensaje-redireccion').hide().html('<div class="alert alert-info">↪️ Redirigiendo a Enviar Dinero...</div>').fadeIn(400);
    setTimeout(() => {
      window.location.href = "sendmoney1.html";
    }, 1000);
  });

  $('#btnMovimientos').click(function() {
    $('#mensaje-redireccion').hide().html('<div class="alert alert-info">↪️ Redirigiendo a Últimos Movimientos...</div>').fadeIn(400);
    setTimeout(() => {
      window.location.href = "transactions1.html";
    }, 1000);
  });

});