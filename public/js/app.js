var email="hola"
var password="nohay"
$(document).ready(function() {
    // Capturamos el formulario en una variable
    var loginForm = $('#login-form');

    // Agregamos un evento "submit" al formulario
    loginForm.on('submit', function(event) {
        // Evitamos que el formulario se envíe por defecto
        event.preventDefault();

        // Obtenemos los datos del formulario
         email = $('#email').val();
        password = $('#password').val();
        console.log(email,password)

        // Enviamos los datos del formulario al controlador utilizando AJAX
        $.ajax({
            url: '/login', // ruta del controlador
            method: 'POST', // método HTTP utilizado
            dataType: "json",
            data: { // datos que se enviarán al controlador
                email: email,
                password: password
            },
            success: function(response) {
                // En caso de éxito, hacemos algo con la respuesta del servidor
                console.log(response);
            },
            error: function(xhr) {
                // En caso de error, mostramos un mensaje al usuario
                console.log(xhr);
            }
        });
    });
});
