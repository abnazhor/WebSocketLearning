const WebSocket = require("ws");

const wss = new WebSocket.Server({port: 3000});
var clientes = [];

wss.on("connection", function(ws) {
    clientes.push(ws);
    ws.on("message", function(message) {
        
    });
    console.log("Connected")
});