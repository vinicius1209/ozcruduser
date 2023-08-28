"use client";

import { UserContext } from "@/context/userContext";
import { User } from "@/models/user.modal";
import {
  DataGrid,
  GridCallbackDetails,
  GridColDef,
  GridPaginationModel,
} from "@mui/x-data-grid";
import { useContext, useEffect, useState } from "react";

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 70 },
  { field: "nome", headerName: "Name", width: 200 },
  { field: "email", headerName: "E-mail", width: 200 },
  {
    field: "idade",
    headerName: "Age",
    type: "number",
    width: 90,
  },
];

export default function UserTable() {
  const { state, dispatch } = useContext(UserContext);

  useEffect(() => {
    setup();
  }, []);

  const getData = async (page: number, pageSize: number) => {
    dispatch({ type: "TOGGLE_LOADING" });
    const res = await fetch(
      `http://localhost:3000/users?page=${page}&pageSize=${pageSize}`
    );

    if (!res.ok) {
      throw new Error("Failed to fetch users data");
    }

    await new Promise((resolve) => setTimeout(resolve, 2000));

    dispatch({ type: "TOGGLE_LOADING" });

    return res.json();
  };

  const setup = async (page: number = 1, pageSize: number = 10) => {
    const data = await getData(page, pageSize);
    dispatch({ type: "SET_USERS", payload: data });
  };

  const handlePageChange = (
    model: GridPaginationModel,
    details: GridCallbackDetails
  ) => {
    const { page, pageSize } = model;
    setup(page + 1, pageSize);
  };

  return (
    <DataGrid
      rows={state.users}
      columns={columns}
      loading={state.isLoading}
      disableRowSelectionOnClick
      disableColumnSelector
      disableColumnMenu
      checkboxSelection={false}
      rowSelection={false}
      initialState={{
        pagination: {
          paginationModel: { page: 0, pageSize: 10 },
        },
      }}
      pageSizeOptions={[5, 10]}
      onPaginationModelChange={handlePageChange}
    />
  );
}
