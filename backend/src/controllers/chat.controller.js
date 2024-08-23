import { pool } from '../database/conexion.js';

export const getMessages = async (req, res) => {
    const { chat_id } = req.params;
    const sql = `
        SELECT m.message, m.sent_at, u.username
        FROM messages m
        JOIN users u ON m.sender_id = u.id
        WHERE m.chat_id = ?
        ORDER BY m.sent_at ASC;
    `;
    const [rows] = await pool.query(sql, [chat_id]);
    try {
        if(rows.length > 0) {
            res.status(200).json({data: rows});
        }else {
            res.status(200).json({ message: 'No se encontraron mensajes.' });
        }
    } catch (error) {
        res.status(500).json('Error en el servidor: ', error);
    }
};

export const saveMessage = async (req, res) => {
    const { chat_id } = req.params;
    const { sender_id, message } = req.body;

    try {
        // Verificar que el chat existe
        const [chatRows] = await pool.query('SELECT id FROM chats WHERE id = ?', [chat_id]);
        if (chatRows.length === 0) {
            return res.status(404).json({ error: 'El chat no existe' });
        }

        // Verificar que el usuario existe y es parte del chat
        const [userRows] = await pool.query(
            'SELECT user_id FROM chat_members WHERE chat_id = ? AND user_id = ?',
            [chat_id, sender_id]
        );
        if (userRows.length === 0) {
            return res.status(403).json({ error: 'El usuario no es miembro de este chat o no existe' });
        }

        // Insertar el mensaje en la tabla messages
        const [result] = await pool.query(
            `INSERT INTO messages (chat_id, sender_id, message, sent_at)
            VALUES (?, ?, ?, NOW())`,
            [chat_id, sender_id, message]
        );

        // Devolver el ID del mensaje recién creado y una confirmación
        const messageId = result.insertId;
        return res.status(201).json({ message: 'Mensaje guardado con éxito', messageId });

    } catch (error) {
        res.status(500).json('Error en el servidor: ', error);
    }
};


export const findOrCreateChat = async (req, res) => {
    try {
        const { user1_id, user2_id } = req.body;

        let sql = `
            SELECT c.id
            FROM chats c
            JOIN chat_members cm1 ON c.id = cm1.chat_id
            JOIN chat_members cm2 ON c.id = cm2.chat_id
            WHERE cm1.user_id = ? AND cm2.user_id = ? AND c.is_group = 0;
        `;
        const [rows] = await pool.query(sql, [user1_id, user2_id]);

        let chat_id;
        if (rows.length > 0) {
            chat_id = rows[0].id;
            return res.status(200).json({ chat_id });
        } else {
            // Crear nuevo chat
            sql = `INSERT INTO chats (chat_name, is_group, created_at) VALUES ('Chat', 0, NOW());`;
            const [result] = await pool.query(sql);

            chat_id = result.insertId; // Asignar el ID del chat recién creado

            // Insertar ambos usuarios como miembros del chat
            sql = `INSERT INTO chat_members (chat_id, user_id, joined_at) VALUES (?, ?, NOW()), (?, ?, NOW());`;
            await pool.query(sql, [chat_id, user1_id, chat_id, user2_id]);

            return res.status(201).json({ chat_id });
        }
    } catch (error) {
        res.status(500).json('Error en el servidor: ', error);
    }
};


export const handleSocketConnection = (socket, io) => {
    console.log(socket.id, "Client connected");

    socket.on("disconnect", () => {
        console.log(socket.id, "Client disconnected");
    });

    socket.on("join_chat", async ({ user1_id, user2_id, chat_name }) => {
        const chat_id = await findOrCreateChat(user1_id, user2_id, chat_name);
        socket.join(`chat_${chat_id}`);

        const messages = await getMessages(chat_id);
        socket.emit("chat_history", messages);
    });

    socket.on("chat_message", async ({ chat_id, sender_id, message }) => {
        await saveMessage(chat_id, sender_id, message);
        io.to(`chat_${chat_id}`).emit("message", {
            msj: message,
            from: sender_id
        });
    });
};