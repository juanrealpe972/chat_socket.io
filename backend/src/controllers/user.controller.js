import bcrypt from "bcrypt";
import multer from "multer";
import { pool } from "../database/conexion.js";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/usuarios");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const uploat = multer({ storage: storage });
export const cargarImagen = uploat.single("imagen_user");

export const getUsers = async (req, res) => {
  try {
    let sql = `SELECT * FROM users`;
    const [rows] = await pool.query(sql);
    if (rows.length > 0) {
      res.status(200).json({ message: "Los usuarios son: ", data: rows });
    } else {
      res.status(404).json({ message: "No hay usuarios registrados por el momento" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error en el servidor " + error });
  }
};

export const createUser = async (req, res) => {
  try {
    const { id, nombre, email, password, rol_user } = req.body;
    const bcryptPassword = bcrypt.hashSync(password, 12);
    let imagen_user = req.file ? req.file.originalname : "";

    const checkSqlCedula = `SELECT * FROM users WHERE id = '${id}'`;
    const [existingCedula] = await pool.query(checkSqlCedula);

    const checkSqlEmail = `SELECT * FROM users WHERE email = '${email}'`;
    const [existingEmail] = await pool.query(checkSqlEmail);

    if (existingCedula.length > 0) {
      return res.status(400).json({ message: "Ya existe un usuario con esa cédula" });
    }

    if (existingEmail.length > 0) {
      return res.status(400).json({ message: "Ya existe un usuario con ese correo" });
    }

    let sql = `INSERT INTO users (id, nombre, email, password, rol_user, estado`;

    const params = [id, nombre, email, bcryptPassword, rol_user, "activo"]

    if (imagen_user) {
      sql += `, imagen`;
      params.push(imagen_user);
    }
    sql += ` ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;

    const [result] = await pool.query(sql, params);
    if (result.affectedRows > 0) {
      res.status(200).json({ status: 200, message: "Usuario creado exitosamente" });
    } else {
      res.status(404).json({ message: "No se pudo crear el usuario" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error en el servidor" + error });
  }
};

export const updateUser = async (req, res) => {
  try {

    const { id_user } = req.params;
    const { id, nombre, email } = req.body;
    const imagen_user = req.file ? req.file.originalname : "";

    let sql = `UPDATE users SET id = IFNULL(?, id), nombre = IFNULL(?, nombre), email = IFNULL(?, email), descripcion_user = IFNULL(?, descripcion_user), telefono_user = IFNULL(?, telefono_user)`;
    const params = [id, nombre, email];

    const checkSqlCedula = `SELECT * FROM users WHERE id = ? AND id != ?`;
    const [existingCedula] = await pool.query(checkSqlCedula, [id, id_user]);

    const checkSqlEmail = `SELECT * FROM users WHERE email = ? AND id != ?`;
    const [existingEmail] = await pool.query(checkSqlEmail, [email, id_user]);

    if (existingCedula.length > 0) {
      return res.status(400).json({ message: "Ya existe un usuario con esa cédula" });
    }

    if (existingEmail.length > 0) {
      return res.status(400).json({ message: "Ya existe un usuario con ese correo" });
    }

    if (imagen_user) {
      sql += `, imagen = ?`;
      params.push(imagen_user);
    }
    sql += ` WHERE id = ?`;
    params.push(id_user);

    const [result] = await pool.query(sql, params);

    if (result.affectedRows > 0) {
      res.status(200).json({ message: "Usuario actualizado con éxito" });
    } else {
      res.status(404).json({ message: "Error con el ID al actualizar el usuario" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error del servidor al actualizar el usuario" });
  }
};

export const getUser = async (req, res) => {
  try {
    const id = req.params.id;
    let sql = `SELECT * FROM users WHERE id = '${id}'`;
    const [user] = await pool.query(sql);
    if (user.length > 0) {
      res.status(200).json({ message: "Usuario encontrado con exito", data: user });
    } else {
      res.status(404).json({ message: "Error al encontrar el usuario con ese ID" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error en el servidor" + error });
  }
};

export const updatePasswordUser = async (req, res) => {
  try {
    const id = req.params.id
    const { oldPassword, newPassword, confirmPassword } = req.body

    const [rows] = await pool.query(`SELECT * FROM users WHERE id = '${id}'`);
    
    if (rows.length === 0) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    const user = rows[0];
    const validPassword = await bcrypt.compare(oldPassword, user.password);
    if (!validPassword) {
      return res.status(404).json({ message: "Contraseña incorrecta" });
    }
    if(newPassword !== confirmPassword){
      res.status(404).json({ message: "La nueva contraseña no coincide con la de confirmar contraseña" });
    }
    const bcryptPassword = bcrypt.hashSync(newPassword, 12);

    let sql = `UPDATE users SET password = '${bcryptPassword}' WHERE id = '${id}'`
    const [result] = await pool.query(sql);
    if (result.affectedRows > 0) {
      res.status(200).json({ message: "Se registro la nueva contraseña con exito" });
    } else {
      res.status(404).json({ message: "Error con el ID del usuario al cambiar la contraseña" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error en el servidor" + error });
  }
}

export const deleteUser = async (req, res) => {
  try {
    const id = req.params.id;
    let sql = `DELETE FROM users WHERE id = '${id}'`;
    const [result] = await pool.query(sql);
    if (result.affectedRows > 0) {
      res.status(200).json({ message: "Usuario eliminado con exito" });
    } else {
      res.status(404).json({ message: "Error con el ID al eliminar el usuario" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error en el servidor" + error });
  }
};

export const desactivarUsuario = async (req, res) => {
  const id = req.params.id;
  try {
    const [result] = await pool.query(`UPDATE users SET estado = 2 WHERE id = ${id}`);
    if (result.affectedRows > 0) {
      res.status(200).json({ message: "Usuario desactivado exitosamente" });
    } else {
      res.status(404).json({ message: `No se encontró ningun usuario con el ID` });
    }
  } catch (error) {
    res.status(500).json({ message: "Error en el servidor" + error });
  }
};

export const activarUsuario = async (req, res) => {
  const id = req.params.id;
  try {
    const [result] = await pool.query(`UPDATE users SET estado = 1 WHERE id = '${id}'`);
    if (result.affectedRows > 0) {
      res.status(200).json({ message: "Usuario activado exitosamente" });
    } else {
      res.status(404).json({ message: `No se encontró ningun usuario con el ID` });
    }
  } catch (error) {
    res.status(500).json({ message: "Error en el servidor" + error });
  }
};
