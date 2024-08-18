import { Router } from "express";
import {
    validarUser,
    resetPassword,
    tokenPassword,
    verificarUserToken,
} from "../controllers/autenticacionController.js";

const routerAutenticacion = Router();

routerAutenticacion.post("/login", validarUser);
routerAutenticacion.get("/validate", verificarUserToken);

routerAutenticacion.post("/recuperar", tokenPassword);
routerAutenticacion.put("/cambiar", resetPassword);

export default routerAutenticacion;
