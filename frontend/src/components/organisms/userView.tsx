"use client";

import { useContext, useEffect } from "react";
import UserTable from "../molecules/userTable";
import { UserContext } from "@/context/userContext";
import { GridPaginationModel } from "@mui/x-data-grid";
import React from "react";
import ConfirmationDialog from "../molecules/confirmationDialog";
import { listUsers, deleteUser } from "@/service/user.service";
import { Box, Button } from "@mui/material";
import UserFormDialog from "../molecules/userFormDialog";

export default function UserView() {
  const { state, dispatch } = useContext(UserContext);

  useEffect(() => {
    setup();
  }, []);

  const getData = async (page: number, pageSize: number) => {
    dispatch({ type: "TOGGLE_LOADING" });
    const res = await listUsers(page, pageSize);
    dispatch({ type: "TOGGLE_LOADING" });
    return res;
  };

  const setup = async (page: number = 1, pageSize: number = 10) => {
    const data = await getData(page, pageSize);
    dispatch({ type: "SET_USERS", payload: data });
  };

  const handlePageChange = (model: GridPaginationModel) => {
    const { page, pageSize } = model;
    setup(page + 1, pageSize);
  };

  const handleDelete = (id: number) => {
    console.log("handleDelete");
    dispatch({ type: "OPEN_DELETE_CONFIRM", payload: id });
  };

  const handleEdit = (id: number) => {
    console.log("handleEdit");
  };

  const handleCloseConfirm = async (value?: boolean) => {
    if (value) {
      dispatch({ type: "TOGGLE_LOADING" });
      const userID = state?.lastClickedUserId;
      dispatch({ type: "CLOSE_DELETE_CONFIRM" });
      await deleteUser(userID);
      dispatch({ type: "TOGGLE_LOADING" });
      setup();
    } else {
      dispatch({ type: "CLOSE_DELETE_CONFIRM" });
    }
  };

  const handleCloseEdit = async (value?: boolean) => {
    if (value) {
      dispatch({ type: "CLOSE_EDIT_CONFIRM" });
      setup();
    } else {
      dispatch({ type: "CLOSE_EDIT_CONFIRM" });
    }
  };

  const handleCloseNew = async (value?: boolean) => {
    if (value) {
      dispatch({ type: "CLOSE_NEW_USER" });
      setup();
    } else {
      dispatch({ type: "CLOSE_NEW_USER" });
    }
  };

  return (
    <React.Fragment>
      <ConfirmationDialog
        id="delete-confirmation"
        title="Deletar usuário"
        description={`Deseja realmente deletar o usuário de ID ${state?.lastClickedUserId} ?`}
        keepMounted
        open={state?.openDeleteConfirm || false}
        onClose={handleCloseConfirm}
      />

      <UserFormDialog
        open={state?.openEditDialog || false}
        title={`Editar usuário ${state?.lastClickedUserId}`}
        handleClose={handleCloseEdit}
      />

      <UserFormDialog
        open={state?.openNewDialog || false}
        title={`Novo usuário`}
        handleClose={handleCloseNew}
      />

      <Box mt={1} mb={2}>
        <Button
          variant="text"
          onClick={() => dispatch({ type: "OPEN_NEW_USER" })}
        >
          Novo
        </Button>
      </Box>

      <UserTable handlePageChange={handlePageChange} />
    </React.Fragment>
  );
}
