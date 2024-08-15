import express from "express";
import http from "http";
import { Server as SocketServer } from "socket.io";
import logger from "morgan"
import connection from "./database/db.js";

const app = express();
const port = process.env.PORT ?? 3000;
const server = http.createServer(app)

const io = new SocketServer(server, {
    connectionStateRecovery: {}
})

app.get("/", (req, res) => {
    connection.query("SELECT * FROM chat", (error, result) => {
        if (error) {
            res.status(500).json({ message: "Error al consultar" + error.stack });
            return
        }
        res.status(result)
    })
})

app.use(logger('dev'))
// Pasamos a agregar el server del front que en este caso es localhost:5173
// Esto lo hacemos con con on, que quiere decir que cuando pase algo. (un evento) ejecutar un texto.

io.on('connection', socket => {
    console.log(socket.id, "Client connected");

    
    socket.on('disconnect', () => {
        console.log(socket.id, "Client Disconnect");
    })

    socket.on("chat_message", (msj) => {
        // store message in database

        // Almacenar datos en database
        // async function insertData(){
        // try {
        //     const query = "INSERT INTO chat (message_chat, fecha_chat) VALUES (:msgchat, :datechat";
        //     const values = [:msgchat, :datechat];
        //     const [rows, fields] = await pool.query(query,values);
        //     console.log("Datos insertados con exito");
        // } catch (error) {
        //     console.error("Error al insertar datos: " + error);
        //     return;
        // }}
        // insertData()

        // Recuperar datos de database
        // async function retrieveData(){
        // try {
        //     const query = "SELECT * FROM chat";
        //     const [rows, fields] = await pool.query(query);
        //     console.log("Datos recuperados :", rows, fields);
        // } catch (error) {
        //     console.error("Error al recuperar los datos: " + error);
        //     return;
        // }}
        // retrieveData()

        // send message to all clients
        socket.broadcast.emit("message", {
            msj,
            from: socket.id.slice(6),
        })
    })
})

// chat.get("/chat", async (req, res) => {
//     try {
//         const [rows, fields] = await connection.query('SELECT * FROM chat');
//         res.json(rows);
//     } catch (error) {
//         console.error('Error al recuperar datos: ' + error);
//         res.status(500).json({ error: 'Error al recuperar datos' });
//     }
// })

app.get("/", (req, res) => {
    res.send('<h1> Hello server chat </h1>')
})

server.listen(port, () => {
    console.log(`Server on port ${port}`);
})