import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import React, { useContext, useEffect, useState } from "react";
import { UserFormDialog } from "@/interface/user.form.dialog.interface";
import { UserContext } from "@/context/userContext";
import { editUser, newUser } from "@/service/user.service";

export default function UserFormDialog(props: UserFormDialog) {
  const { title, open, handleClose } = props;

  const { state, dispatch } = useContext(UserContext);

  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [idade, setIdade] = useState("");

  useEffect(() => {
    if (state.lastClickedUserId && state.lastClickedUserId > -1) {
      const foundUser = state.users.data.find(
        (user: { id: any }) => user.id === state.lastClickedUserId
      );

      setNome(foundUser?.nome);
      setEmail(foundUser?.email);
      setIdade(foundUser?.idade);
    }
  }, [state.lastClickedUserId]);

  const handleConfirm = async () => {
    if (!nome || !email || !idade) return;

    dispatch({ type: "TOGGLE_LOADING" });

    if (state.lastClickedUserId && state.lastClickedUserId > -1) {
      await editUser(state.lastClickedUserId, nome, email, idade);
    } else {
      await newUser(nome, email, idade);
    }

    dispatch({ type: "TOGGLE_LOADING" });
    handleClose(true);
  };

  return (
    <React.Fragment>
      <Dialog open={open}>
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="nome"
            label="Nome"
            type="text"
            fullWidth
            value={nome}
            required
            onChange={(e) => setNome(e.target.value)}
          />
          <TextField
            margin="dense"
            id="email"
            label="E-mail"
            type="email"
            fullWidth
            value={email}
            required
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            margin="dense"
            id="idade"
            label="Idade"
            type="number"
            fullWidth
            value={idade}
            required
            onChange={(e) => setIdade(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleClose(false)}>Cancelar</Button>
          <Button onClick={() => handleConfirm()}>Salvar</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
