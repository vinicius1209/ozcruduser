import { ConfirmationDialogProps } from "@/interface/confirmation.dialog.interface";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";

export default function ConfirmationDialog(props: ConfirmationDialogProps) {
  const { onClose, open, title, description, ...other } = props;

  const handleCancel = () => {
    onClose();
  };

  const handleOk = () => {
    onClose(true);
  };

  return (
    <Dialog
      sx={{ "& .MuiDialog-paper": { width: "80%", maxHeight: 435 } }}
      maxWidth="xs"
      open={open}
      {...other}
    >
      <DialogTitle>
        <Typography variant="h5" > {title}</Typography>
      </DialogTitle>
      <DialogContent dividers>
        <Typography>{description}</Typography>
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={handleCancel}>
          Cancelar
        </Button>
        <Button onClick={handleOk}>Confirmar</Button>
      </DialogActions>
    </Dialog>
  );
}
