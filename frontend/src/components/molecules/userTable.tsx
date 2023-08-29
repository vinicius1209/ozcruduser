"use client";

import { UserContext } from "@/context/userContext";
import { IconButton, Stack } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useContext } from "react";
import { UserTableInterface } from "@/interface/user.table.interface";

export default function UserTable(props: UserTableInterface) {
  const { handlePageChange } = props;

  const { state, dispatch } = useContext(UserContext);

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
    {
      field: "actions",
      headerName: "Ações",
      sortable: false,
      filterable: false,
      width: 150,
      renderCell: (params) => {
        return (
          <Stack direction="row" spacing={2}>
            <IconButton
              aria-label="delete"
              onClick={(event) => {
                event.stopPropagation();
                dispatch({
                  type: "OPEN_DELETE_CONFIRM",
                  payload: params.row.id,
                });
              }}
            >
              <DeleteIcon />
            </IconButton>
            <IconButton
              aria-label="edit"
              onClick={(event) => {
                event.stopPropagation();
                dispatch({ type: "OPEN_EDIT_CONFIRM", payload: params.row.id });
              }}
            >
              <EditIcon />
            </IconButton>
          </Stack>
        );
      },
    },
  ];

  return (
    <DataGrid
      rows={Array.isArray(state.users?.data) ? state.users.data : []}
      columns={columns}
      loading={state.isLoading}
      disableRowSelectionOnClick
      disableColumnSelector
      disableColumnMenu
      checkboxSelection={false}
      rowSelection={false}
      initialState={{
        pagination: {
          paginationModel: { page: 0, pageSize: state.users?.pageSize || 10 },
        },
      }}
      pagination
      pageSizeOptions={[5, 10]}
      rowCount={state.users?.pages * 10 || 10}
      onPaginationModelChange={handlePageChange}
    />
  );
}
