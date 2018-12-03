var cliente = new WebSocket("ws://127.0.0.1:3000");
var anfitrion = true;

cliente.onmessage = function (mensaje) {
    if (!anfitrion) {
        var datos = JSON.parse(mensaje.data);
        colorearCliente(datos["pX"], datos["pY"]);
        console.log("Mensaje recibido: " + datos["pX"] + " - " + datos["pY"]);
    }
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

function colorearCliente(posX, posY) {
    lienzo.moveTo(posX, posY);
    lienzo.beginPath();
    lienzo.arc(posX - 10, posY - 10, 5, 0, Math.PI * 2);
    lienzo.fill();
    lienzo.stroke();
}

function pintar(e, mod) {
    if (mod == 1) {
        pintando = true;
    } else {
        pintando = false;
    }
}

function colorear(e) {
    let rectangulo = document.getElementById("lienzo").getBoundingClientRect();
    posX = e.clientX - rectangulo.left;
    posY = e.clientY - rectangulo.top;

    lienzo.moveTo(posX, posY);
    if (pintando) {
        console.log("Pintando - " + posX + " - " + posY);
        if (anfitrion) {
            var poX = posX;
            var poY = posY;
            var datos = {
                pX: poX,
                pY: poY
            }
            datos = JSON.stringify(datos);
            cliente.send(datos);
            lienzo.beginPath();
            lienzo.arc(posX - 10, posY - 10, 5, 0, Math.PI * 2);
            lienzo.fill();
            lienzo.stroke();
        }
    }
}