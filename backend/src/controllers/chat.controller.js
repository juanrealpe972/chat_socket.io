
export const handleSocketConnection = (socket, io) => {
    console.log(socket.id, "Client connected");

    socket.on("disconnect", () => {
        console.log(socket.id, "Client disconnected");
    });

    socket.on("chat_message", (msj) => {
        socket.broadcast.emit("message", {
            msj,
            from: socket.id.slice(6),
        });
    });
};
