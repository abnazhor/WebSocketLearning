var cliente = new WebSocket("ws://127.0.0.1:3000");
var jugador = true;

cliente.onmessage = function (mensaje) {
    if (jugador) {
        var datos = JSON.parse(mensaje.data);
        colorearCliente(datos["pX"], datos["pY"], datos["color"]);
        console.log("Mensaje recibido: " + datos["pX"] + " - " + datos["pY"]);
    }
}

var pintando = false;
var color = "black";

document.addEventListener("DOMContentLoaded", function () {
    var elemento = document.getElementById("lienzo");
    lienzo = elemento.getContext("2d");
    elemento.addEventListener("mousedown", function (evento) {
        pintar(evento, 1);
    });

    elemento.addEventListener("mouseup", function (evento) {
        pintar(evento, 2);
    });

    if (jugador) {
        elemento.addEventListener("mousemove", function (evento) {
            colorear(evento);
        });
    }

    if (jugador) {
        crearColores();
    }
});

function colorearCliente(posX, posY, colorotro) {
    lienzo.strokeStyle = colorotro;
    lienzo.fillStyle = colorotro;
    lienzo.fill();
    lienzo.stroke();
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
        if (jugador) {
            var posAnterior = [posX, posY];
            var poX = posX;
            var poY = posY;
            var datos = {
                pX: poX,
                pY: poY,
                color: color
            }
            datos = JSON.stringify(datos);
            cliente.send(datos);
            for (let i = 0; i < 20; i++) {
                lienzo.strokeStyle = color;
                lienzo.fillStyle = color;
                lienzo.beginPath();
                lienzo.arc(posX - 10, posY - 10, 5, 0, Math.PI * 2);
                lienzo.fill();
                lienzo.stroke();
            }
        }
    }
}

function crearColores() {
    let paleta = document.getElementById("colores").getElementsByTagName("div");
    for (let i = 0; i < paleta.length; i++) {
        paleta[i].addEventListener("click", function (ev) {
            cambiarColor(ev);
        });
    }
}

function cambiarColor(elem) {
    var elemento = elem.target;
    color = elemento.id;
    console.log(lienzo.fillStyle);
    console.log("Ha cambiado de color al " + elemento.id);
}