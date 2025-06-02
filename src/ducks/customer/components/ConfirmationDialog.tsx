import React, {useId} from "react";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";

export interface ConfirmationDialogProps {
    open: boolean;
    onConfirm: (() => void)|null;
    onCancel: () => void;
    children?: React.ReactNode;
}
export default function ConfirmationDialog({open, onConfirm, onCancel, children}:ConfirmationDialogProps) {
    const id = useId();
    return (
        <Dialog open={open} onClose={onCancel} aria-describedby={id}>
            <DialogContent>
                <DialogContentText id={id}>{children}</DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={onCancel}>Cancel</Button>
                <Button onClick={onConfirm ?? onCancel}>Agree</Button>
            </DialogActions>
        </Dialog>
    )
}
