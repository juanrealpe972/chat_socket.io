import { pool } from "../database/conexion.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import nodemailer from "nodemailer"

export const validarUser = async (req, res) => {
    try {
        const { correo, password } = req.body;
        const sql = `SELECT * FROM users WHERE correo = '${correo}'`;
        const [rows] = await pool.query(sql);
        if (rows.length === 0) {
            return res.status(401).json({ message: "Usuario no registrado." });
        }
        const user = rows[0]; // Obtener el primer usuario de los resultados
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return res.status(401).json({ message: "Contraseña incorrecta" });
        }
        const token = jwt.sign({ rows }, process.env.AUT_SECRET, {
            expiresIn: process.env.AUT_EXPIRET,
        });
        res.status(200).json({ message: "Inicio de sesión exitoso", user, token });
    } catch (error) {
        res.status(500).json({ message: "Error en el servidor" + error });
    }
};

export const verificarUserToken = async (req, res, next) => {
    try {
        const token_client = req.headers["token"];
        if (!token_client) {
            res.status(203).json({ message: "No autorizado ☢️" });
        } else {
            jwt.verify(token_client, process.env.AUT_SECRET, (err, decoded) => {
                if (err) {
                    res.status(401).json({ message: "Token no valido" });
                } else {
                    next();
                }
            });
        }
    } catch (error) {
        res.status(500).json({ message: error });
    }
};

export const tokenPassword = async (req, res) => {
    try {
        const { correo } = req.body;
        const sql = `SELECT * FROM users WHERE correo = '${correo}'`;
        const [user] = await pool.query(sql);
        
        if (!user[0].correo) {
            return res.status(404).json({ message: "Correo del usuario no definido" });
        }else if (user.length > 0) {
            const token = jwt.sign({ id: user[0].id }, "estemensajedebeserlargoyseguro", { expiresIn: "2h" });
            console.log(token);

            const transporter = nodemailer.createTransport({
                service: "gmail",
                auth: {
                    user: "subcoffee1s@gmail.com",
                    pass: "alkp fmcf kcxx rhca" 
                },
                tls: {
                    rejectUnauthorized: false
                }
            });

            const mailOptions = {
                from: "subcoffee1s@gmail.com",
                to: user[0].email,
                subject: "Restablecer Contraseña SubCoffee",
                html: `
                    <p>Querido Usuario,</p>
                    <p>Para restablecer tu contraseña, haz clic en el siguiente botón:</p>
                    <a href="http://localhost:5173/reset-password?token=${token}" style="background-color: #39A900; color: white;
                    padding: 10px 20px; text-align: center; text-decoration: none; display: inline-block; border-radius: 5px;">Restablecer Contraseña</a>
                    <p>Si no solicitaste un cambio de contraseña, por favor ignora este correo.</p>
                    <p>Saludos,<br>El equipo de SubCoffee</p>
                    <br>
                    <img src="cid:isotipo-SubCoffee" alt="SUBCOFFEE" style="width: 100px; height: auto;">
                    <img src="cid:logo_sena" alt="SENA" style="width: 100px; height: auto;">
                `,
                attachments: [{
                    filename: 'isotipo-SubCoffee.png',
                    path: './public/isotipo-SubCoffee.png',
                    cid: 'isotipo-SubCoffee'
                }, {
                    filename: 'logo_sena.png',
                    path: './public/logo_sena.png',
                    cid: 'logo_sena'
                }]};
            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    console.log(error);
                    return res.status(500).json({ message: "No se pudo enviar el Correo" });
                }
                res.send({
                    message: "Hemos enviado una notificación a tu cuenta de Gmail. Por favor, revisa tu bandeja de entrada y sigue las instrucciones proporcionadas para restablecer tu contraseña."
                });
            });
        } else {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }
    } catch (error) {
        res.status(500).json({ message: "Error en el servidor" + error });
    }
};

export const resetPassword = async (req, res) => {
    try {
        const { token, password } = req.body;

        // Verificar y decodificar el token
        const decoded = jwt.verify(token, "estemensajedebeserlargoyseguro");
        const userId = decoded.id; 

        // Consultar el usuario por su ID
        const sql = "SELECT * FROM users WHERE id = ?";
        const [usuario] = await pool.query(sql, [userId]);

        if (usuario.length === 0) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }

        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const sqlUpdate = "UPDATE users SET password = ? WHERE id = ?";
        const [actualizar] = await pool.query(sqlUpdate, [hashedPassword, userId]);

        if (actualizar.affectedRows > 0) {
            return res.status(200).json({ message: "Contraseña actualizada" });
        } else {
            return res.status(404).json({ message: "No se pudo actualizar la contraseña" });
        }
    } catch (error) {
        res.status(500).json({ message: "Error en el servidor" + error });
    }
};
