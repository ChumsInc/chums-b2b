import Button from "@mui/material/Button";

export default function AccountUserNewButton({disabled, onClick}: {
    disabled?: boolean;
    onClick: () => void;
}) {

    return (
        <Button variant="outlined" type="button"
                disabled={disabled}
                onClick={onClick}>
            New User
        </Button>
    )

}
