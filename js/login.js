$(document).ready(function() {
  $('#loginForm').submit(function(e) {
    e.preventDefault();

    const email = $('#email').val();
    const password = $('#password').val();
    const emailCorrecto = "julio@gmail.com";
    const passwordCorrecta = "1234";

    if(email === emailCorrecto && password === passwordCorrecta) {
      $('#mensaje').html('<div class="alert alert-success">✅ Credenciales correctas. Redirigiendo...</div>');
      setTimeout(() => {
        window.location.href = "menu1.html";
      }, 1500);
    } else {
      $('#mensaje').html('<div class="alert alert-danger">❌ Email o contraseña incorrectos.</div>');
    }
  });
});