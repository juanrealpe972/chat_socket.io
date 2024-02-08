import mysql from 'mysql2';
import dotenv from 'dotenv';

dotenv.config()

const connection = mysql.createConnection({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
})

connection.connect((error) => {
    if(error){
        console.log("Error al conectar a la database: "+ error.stack);
        return
    }
    console.log("Conexion a la database exitosa");
})

export default connection;