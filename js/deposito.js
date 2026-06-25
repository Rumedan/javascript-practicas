$(document).ready(function() {

  // Mostrar saldo actual
  const saldo = parseFloat(localStorage.getItem("saldo") || 60000);
  $('#saldoActual').text("$" + saldo.toLocaleString());

  // Evento depósito
  $('#formDeposito').submit(function(e) {
    e.preventDefault();

    const monto = parseFloat($('#depositAmount').val());

    if(isNaN(monto) || monto <= 0) {
      $('#alert-container').html('<div class="alert alert-danger">❌ Ingresa un monto válido.</div>');
      return;
    }
    if(monto > 5000000) {
  $('#alert-container').html('<div class="alert alert-danger">❌ El monto máximo por depósito es $5.000.000.</div>');
  return;
}

    // Actualizar saldo
    let saldoActual = parseFloat(localStorage.getItem("saldo") || 60000);
    saldoActual = saldoActual + monto;
    localStorage.setItem("saldo", saldoActual);

    // Guardar movimiento
    const movimientos = JSON.parse(localStorage.getItem("movimientos") || "[]");
    movimientos.push({
      descripcion: "💰 Depósito",
      monto: monto
    });
    localStorage.setItem("movimientos", JSON.stringify(movimientos));

    // Mostrar confirmación
    $('#montoDepositado').text("Monto depositado: $" + monto.toLocaleString());
    $('#alert-container').html('<div class="alert alert-success">✅ Depósito realizado con éxito.</div>');

    setTimeout(() => {
      window.location.href = "menu1.html";
    }, 2000);
  });

});