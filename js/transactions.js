$(document).ready(function() {

  // Lista de transacciones por defecto
  const transaccionesPorDefecto = [
    { descripcion: "🛒 Compra en línea", monto: -50, tipo: "compra" },
    { descripcion: "💰 Depósito", monto: 100, tipo: "deposito" },
    { descripcion: "📥 Transferencia recibida", monto: 75, tipo: "transferencia" },
    { descripcion: "🛒 Compra en línea", monto: -5550, tipo: "compra" },
    { descripcion: "💰 Depósito misma cuenta", monto: 10500, tipo: "deposito" },
    { descripcion: "📥 Transferencia recibida", monto: 7575, tipo: "transferencia" }
  ];

  // Cargar movimientos
  function mostrarMovimientos(filtro) {
    const lista = $('#listaMovimientos');
    lista.html("");

    let movimientos = JSON.parse(localStorage.getItem("movimientos") || "[]");

    // Si no hay movimientos usar los por defecto
    if(movimientos.length === 0) {
      movimientos = transaccionesPorDefecto;
    }

    // Filtrar por tipo
    if(filtro && filtro !== "todos") {
      movimientos = movimientos.filter(m => m.tipo === filtro);
    }

    if(movimientos.length === 0) {
      lista.html('<li class="list-group-item text-muted">No hay movimientos.</li>');
      return;
    }

    movimientos.reverse().forEach(mov => {
      const esPositivo = mov.monto > 0;
      const clase = esPositivo ? 'monto-positivo' : 'monto-negativo';
      const signo = esPositivo ? '+' : '';
      lista.append(`
        <li class="list-group-item d-flex justify-content-between">
          <span>${mov.descripcion}</span>
          <span class="${clase}">${signo}$${Math.abs(mov.monto).toLocaleString()}</span>
        </li>
      `);
    });
  }

  // Cargar al inicio
  mostrarMovimientos("todos");

  // Filtro por tipo
  $('#filtroTipo').change(function() {
    mostrarMovimientos($(this).val());
  });

});