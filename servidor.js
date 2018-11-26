const WebSocket = require("ws");

const wss = new WebSocket.Server({port: 8080});

wss.on("connection", function connection(ws) {
    ws.on("message", function(message) {
        console.log("Recibido : " + message);
    });
    console.log("HALELUYA")
});