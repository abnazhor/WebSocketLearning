var promesa1 = new Promise(function (resolve, reject) {
    var cliente = new WebSocket("ws://127.0.0.1:8080");
}).then(function () {
    cliente.send("Prueba");
})