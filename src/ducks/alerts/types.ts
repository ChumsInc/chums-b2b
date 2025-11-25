import type {AlertProps} from '@mui/material/Alert'

export interface B2BContextAlert extends AlertProps{
    alertId: number;
    title?: string;
    message: string;
    context?: string;
    count?: number;
}
