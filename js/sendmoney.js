$(document).ready(function() {
 
// Búsqueda de contactos
$('#buscarContacto').on('input', function() {
const busqueda = $(this).val().toLowerCase();
$('#contactList li').each(function() {
const nombre = $(this).find('.contact-name').text().toLowerCase();
if(nombre.includes(busqueda)) {
$(this).show();
      } else {
$(this).hide();
      }
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