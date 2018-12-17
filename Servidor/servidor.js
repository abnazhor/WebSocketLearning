const WebSocket = require("ws");

const wss = new WebSocket.Server({ port: 3000 });

wss.on("connection", function (ws) {
    ws.on("message", function (message) {
        var mensaje = JSON.parse(message);
        console.log(mensaje["pX"] + " - " + mensaje["pY"]);
        wss.clients.forEach(function each(client) {
            if (client !== ws && client.readyState === WebSocket.OPEN) {
                client.send(message);
            }
        });
    });
    console.log("Connected")
});