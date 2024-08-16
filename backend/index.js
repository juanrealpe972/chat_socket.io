// server.js
import express from "express";
import http from "http";
import logger from "morgan";
import { Server as SocketServer } from "socket.io";
import { handleSocketConnection } from "./src/controllers/chat.controller.js";

import routerUser from "./src/routes/user.routes.js";
import routerChat from "./src/routes/chat.routes.js";

const app = express();
const PORT = 3000;

const server = http.createServer(app);

const io = new SocketServer(server, {
    connectionStateRecovery: {},
});

app.use(logger("dev"));
app.use("/v1", routerUser);
app.use("/v1", routerChat);

app.get("/", (req, res) => {
    res.send("<h1> Hello server chat </h1>");
});

io.on("connection", (socket) => handleSocketConnection(socket, io));

server.listen(PORT, () => {
    console.log(`Server on port ${PORT}`);
});