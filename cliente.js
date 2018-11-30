var cliente = new WebSocket("ws://127.0.0.1:8080");
var anfitrion = true;

cliente.onmessage = function (mensaje) {
    var datos = JSON.parse(mensaje.data);
    console.log("Mensaje recibido: ");
}

var pintando = false;

document.addEventListener("DOMContentLoaded", function () {
    var elemento = document.getElementById("lienzo");
    lienzo = elemento.getContext("2d");
    elemento.addEventListener("mousedown", function (evento) {
        pintar(evento, 1);
    });

    elemento.addEventListener("mouseup", function (evento) {
        pintar(evento, 2);
    });

    if (anfitrion) {
        elemento.addEventListener("mousemove", function (evento) {
            colorear(evento);
        });
    }
});

function pintar(e, mod) {
    if (mod == 1) {
        pintando = true;
    } else {
        pintando = false;
    }
}

function colorear(e) {
    var posX = e.clientX;
    var posY = e.clientY;

    lienzo.moveTo(posX, posY);
    if (pintando) {
        console.log("Pintando - " + posX + " - " + posY);
        if (anfitrion) {
            var datos = {
                pX: posX,
                pY: posY
            }
            JSON.stringify(datos);
            cliente.send(datos);
            lienzo.beginPath();
            lienzo.arc(posX - 10, posY - 10, 5, 0, Math.PI * 2);
            lienzo.fill();
            lienzo.stroke();
        }
    }
}