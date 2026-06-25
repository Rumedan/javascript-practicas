$(document).ready(function() {
 
// Búsqueda de contactos
// Lista de contactos en memoria (sincronizada con el DOM)
function obtenerContactos() {
  let contactos = [];
  $('#contactList li').each(function() {
    contactos.push({
      nombre: $(this).find('.contact-name').text(),
      elemento: $(this)
    });
  });
  return contactos;
}

// Autocompletar
$('#buscarContacto').on('input', function() {
  const busqueda = $(this).val().toLowerCase();
  const sugerencias = $('#sugerencias');

  if(busqueda === "") {
    sugerencias.hide().empty();
    return;
  }

  const contactos = obtenerContactos();
  const coincidencias = contactos.filter(function(c) {
    return c.nombre.toLowerCase().includes(busqueda);
  });

  sugerencias.empty();

  if(coincidencias.length === 0) {
    sugerencias.append('<li class="list-group-item text-muted">Sin resultados</li>');
  } else {
    coincidencias.forEach(function(c) {
      sugerencias.append(`<li class="list-group-item sugerencia-item" style="cursor:pointer;">${c.nombre}</li>`);
    });
  }

  sugerencias.show();
});

// Al hacer click en una sugerencia, filtra la lista real
$(document).on('click', '.sugerencia-item', function() {
  const nombreSeleccionado = $(this).text();
  $('#buscarContacto').val(nombreSeleccionado);
  $('#sugerencias').hide();

  $('#contactList li').each(function() {
    const nombre = $(this).find('.contact-name').text();
    $(this).toggle(nombre === nombreSeleccionado);
  });
});
// Agregar nuevo contacto
$('#btnGuardarContacto').click(function() {
const nombre = $('#nombre').val();
const cbu = $('#cbu').val();
const alias = $('#alias').val();
const banco = $('#banco').val();
if(nombre === "" || cbu === "" || alias === "" || banco === "") {
alert("❌ Por favor completa todos los campos.");
return;
    }
if(cbu.length < 6) {
alert("❌ El CBU debe tener al menos 6 dígitos.");
return;
    }
const nuevoContacto = `
      <li class="list-group-item">
        <span class="contact-name">${nombre}</span>
        <span class="contact-details">CBU: ${cbu} | Alias: ${alias} | ${banco}</span>
        <button class="btn-enviar btn btn-primary btn-sm mt-2 w-100">💸 Enviar dinero</button>
      </li>`;
$('#contactList').append(nuevoContacto);
let modal = bootstrap.Modal.getInstance(document.getElementById('modalContacto'));
modal.hide();

// Limpiar campos
$('#nombre, #cbu, #alias, #banco').val('');
  });
// Enviar dinero
$(document).on('click', '.btn-enviar', function() {
const contacto = $(this).closest('li').find('.contact-name').text();
const monto = prompt(`💸 ¿Cuánto deseas enviar a ${contacto}?`);
if(monto === null || monto === "") return;
const montoNum = parseFloat(monto);
if(isNaN(montoNum) || montoNum <= 0) {
alert("❌ Ingresa un monto válido.");
return;
    }
let saldo = parseFloat(localStorage.getItem("saldo") || 60000);
if(montoNum > saldo) {
alert("❌ Saldo insuficiente.");
return;
    }
saldo = saldo - montoNum;
localStorage.setItem("saldo", saldo);
const movimientos = JSON.parse(localStorage.getItem("movimientos") || "[]");
movimientos.push({
descripcion: `📤 Envío a ${contacto}`,
monto: -montoNum
    });
localStorage.setItem("movimientos", JSON.stringify(movimientos));
$('#mensaje-confirmacion').html(`<div class="alert alert-success">✅ Enviaste $${montoNum.toLocaleString()} a ${contacto}. Nuevo saldo: $${saldo.toLocaleString()}</div>`);
setTimeout(() => {
window.location.href = "menu1.html";
    }, 2000);
  });
});