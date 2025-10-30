import Typography, {type TypographyProps} from "@mui/material/Typography";
import UPCA from "@/components/common/upc-a";

export interface FormattedUPCProps extends TypographyProps{
    value?: string|null;
}
const FormattedUPC = ({value}:FormattedUPCProps) => {
    if (!value) {
        return null
    }
    return (
        <Typography variant="bodyMono">{UPCA.format(value)}</Typography>
    )
}

export default FormattedUPC;
