// server.js
import express from "express";
import http from "http";
import logger from "morgan";
import { Server as SocketServer } from "socket.io";
import cors from "cors"

import routerUser from "./src/routes/user.routes.js";
import routerChat from "./src/routes/chat.routes.js";
import routerAutenticacion from "./src/routes/autenticacion.routes.js";
import { handleSocketConnection } from "./src/controllers/chat.controller.js";

const app = express();
const PORT = 3000;
const server = http.createServer(app);

const io = new SocketServer(server, {
    connectionStateRecovery: {},
});

app.use(express.json());
app.use(express.static('public'));
app.use(cors())
app.use(logger("dev"));

app.use("/v1", routerAutenticacion);
app.use("/v1", routerUser);
app.use("/v1", routerChat);

// Configuración de Socket.IO
io.on('connection', (socket) => {
    handleSocketConnection(socket, io);
});

app.get("/", (req, res) => {
    res.send("<h1> Hello server chat </h1>");
});

io.on("connection", (socket) => handleSocketConnection(socket, io));

server.listen(PORT, () => {
    console.log(`Server on port ${PORT}`);
});
