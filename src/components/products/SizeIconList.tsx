import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import {visuallyHidden} from '@mui/utils'
import styled from "@emotion/styled";

export type SizeCode = 'sm'|'md'|'lg';

export type SizeIconList = Record<SizeCode, string>

const sizeName:SizeIconList = {
    sm: 'SMALL',
    md: 'MEDIUM',
    lg: 'LARGE',
}



const SizeIcon = styled.div`
    display: inline-block;
    width: 16px;
    height: 16px;
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;

    &.size--sm {
        background-image: url('/css/size-icon-sm.svg');
    }

    &.size--md {
        background-image: url('/css/size-icon-md.svg');
    }

    &.size--lg {
        background-image: url('/css/size-icon-lg.svg');
    }
`

const SizeIconDescription = ({size}:{size:SizeCode}) => {
    if (!sizeName[size]) {
        return null;
    }
    return (
        <Box sx={visuallyHidden}>
            Fits size: {sizeName[size]}
        </Box>
    )
}
const SizeIconContainer = ({size}:{size: SizeCode}) => {
    return (
        <Box style={{height: '32px', display: 'flex', alignItems: 'center'}}>
            <SizeIcon className={`size--${size}`}/>
            <SizeIconDescription size={size}/>
        </Box>
    )
}

const SizeIconList = ({size, spacing}:{size: string, spacing?: number}) => {

    const sizes = size.split(',').map(s => s.trim()).map(s => s.toLowerCase());
    if (!size || !sizes.length) {
        return null;
    }
    return (
        <Stack direction="row" spacing={spacing ?? 2}>
            {(sizes.includes('s') || sizes.includes('sm')) && (
                <SizeIconContainer size="sm"/>
            )}
            {(sizes.includes('m') || sizes.includes('md')) && (
                <SizeIconContainer size="md"/>
            )}
            {(sizes.includes('l') || sizes.includes('lg')) && (
                <SizeIconContainer size="lg"/>
            )}
        </Stack>
    )
}

export default SizeIconList;
