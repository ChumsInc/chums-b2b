import {type ReactNode} from 'react';
import Grid from "@mui/material/Grid";

export interface CategoryGridItemProps {
    className?: string;
    children?: ReactNode;
}
const CategoryGridItem = ({className, children}:CategoryGridItemProps) => {

    return (
        <Grid size={{xs: 6, sm: 4, md: 3}}  className={className} sx={{marginBottom: 5, textAlign: 'center'}}>
            {children}
        </Grid>
    )
}

export default CategoryGridItem;
