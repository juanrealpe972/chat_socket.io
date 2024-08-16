import { Router } from "express";
import {
    resetPassword,
    tokenPassword,
    verificarUserToken,
} from "../controllers/autenticacionController.js";

const autenticacionRouter = Router();

autenticacionRouter.post("/login", validarUser);
autenticacionRouter.get("/validate", verificarUserToken);

autenticacionRouter.post("/recuperar", tokenPassword);
autenticacionRouter.put("/cambiar", resetPassword);

export default autenticacionRouter;
