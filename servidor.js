const WebSocket = require("ws");

const wss = new WebSocket.Server({port: 8080});

wss.on("connection", function(ws) {
    ws.on("message", function(message) {
        var elem = JSON.parse(message);
        console.log(elem["tipo"]);
        ws.send("Hola");
    });
    console.log("Connected")
});