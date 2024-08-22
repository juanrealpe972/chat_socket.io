import React, { useState, useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button } from "@mui/material";

const ProtectedRoute: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    const auth = localStorage.getItem("token");
    const users = JSON.parse(localStorage.getItem("user") || "{}");

    if (!auth || !users) {
      setOpen(true); 
    }
  }, []);

  const handleClose = () => {
    setOpen(false);
    setRedirect(true); 
  };

  if (redirect) {
    return <Navigate to="/" />;
  }

  return (
    <>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{"Acceso Restringido"}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Tienes que iniciar sesión primero para poder ingresar a la RED.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary" autoFocus>
            Entendido
          </Button>
        </DialogActions>
      </Dialog>
      {!open && <Outlet />}
    </>
  );
};

export default ProtectedRoute;
