import { Router } from "express";
import { activarUsuario, cargarImagen, createUser, deleteUser, desactivarUsuario, getUser, getUsers, updatePasswordUser, updateUser } from "../controllers/user.controller.js";
import { verificarUserToken } from "../controllers/autenticacionController.js";

const routerUser = Router();

routerUser.get("/users", getUsers);
routerUser.get("/users/:id", getUser);
routerUser.post("/users", cargarImagen, createUser);
routerUser.put("/users/:id_user", verificarUserToken, cargarImagen, updateUser);
routerUser.delete("/users/:id", verificarUserToken, deleteUser);
routerUser.put("/users-password/:id", verificarUserToken, updatePasswordUser);
routerUser.put("/usersac/:id", verificarUserToken, activarUsuario);
routerUser.put("/usersdes/:id", verificarUserToken, desactivarUsuario);

export default routerUser;