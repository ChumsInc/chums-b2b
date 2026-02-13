import {Link as RouterLink, useLocation} from 'react-router';
import type {BreadcrumbPath} from "@/types/breadcrumbs.ts";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Typography from "@mui/material/Typography";
import Link from '@mui/material/Link'


const BreadcrumbItem = ({title, pathname, active = false}: BreadcrumbPath) => (
    active
        ? <Typography aria-current="page">{title}</Typography>
        : <Link component={RouterLink} to={pathname}>{title}</Link>
);

const Breadcrumb = ({paths}: {
    paths: BreadcrumbPath[]
}) => {
    const location = useLocation();
    return (
        <Breadcrumbs sx={{mb: 2}} aria-label="Breadcrumb">
            {paths.map((path, index) => (
                <BreadcrumbItem key={index} {...path} active={path.pathname === location.pathname}/>
            ))}
        </Breadcrumbs>
    );
}

export default Breadcrumb;
