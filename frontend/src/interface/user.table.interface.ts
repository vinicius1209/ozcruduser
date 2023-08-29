import { GridPaginationModel } from "@mui/x-data-grid";

export interface UserTableInterface {
  handlePageChange: (model: GridPaginationModel) => any;
}
