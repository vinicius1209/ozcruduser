export interface ConfirmationDialogProps {
    id: string;
    keepMounted: boolean;
    title: string;
    description: string;
    open: boolean;
    onClose: (value?: boolean) => void;
  }