var cliente = new WebSocket("ws://127.0.0.1:8080/echo");

cliente.onmessage = function(mensaje) {
    console.log("He recibido un mensaje: " + mensaje.data);
}

document.addEventListener("DOMContentLoaded", function() {
    document.getElementsByTagName("button")[0].addEventListener("click", prueba);
});

function prueba() {
    var elemento = {
        nombre : "Prueba",
        tipo: "Texto"
    }
    cliente.send(JSON.stringify(elemento));
}