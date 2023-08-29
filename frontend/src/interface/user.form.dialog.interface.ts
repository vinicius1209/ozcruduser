export interface UserFormDialog {
    title: string,
    open: boolean,
    handleClose: (value?: boolean) => any;
}