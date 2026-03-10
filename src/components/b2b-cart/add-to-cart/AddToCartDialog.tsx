import Dialog, {type DialogProps} from "@mui/material/Dialog";
import type {CartProduct} from "chums-types/b2b";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import AddToCartForm from "@/components/b2b-cart/add-to-cart/AddToCartForm";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";

export interface AddToCartDialogProps extends DialogProps {
    item: CartProduct | null;
    excludeCartId?: number;
    unitOfMeasure?: string;
    onDone: () => void;
    onCancel: () => void;
}

export default function AddToCartDialog({
                                            item,
                                            unitOfMeasure,
                                            excludeCartId,
                                            open,
                                            onClose,
                                            onDone,
                                            onCancel
                                        }: AddToCartDialogProps) {
    if (!item) {
        return null;
    }
    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Add {item?.itemCode} To Cart</DialogTitle>
            <DialogContent>
                {!!item && (
                    <AddToCartForm cartItem={item}
                                   unitOfMeasure={unitOfMeasure}
                                   excludeCartId={excludeCartId}
                                   onDone={onDone}
                    />
                )}
            </DialogContent>
            <DialogActions>
                <Button autoFocus onClick={onCancel}>Cancel</Button>
            </DialogActions>
        </Dialog>
    )
}
