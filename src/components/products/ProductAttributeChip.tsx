import Chip, {type ChipProps} from "@mui/material/Chip";
import {styled, type SxProps} from "@mui/material/styles";

const StyledChip = styled(Chip)<ChipProps>(() => ({
    width: 'auto',
    borderRadius: 0,
    height: '16px',
    lineHeight: '16px',
    fontWeight: 700,
    '& .MuiChip-label': {
        fontSize: '75%'
    }
}));

export type ProductAttributeType =
    'new'
    | 'rfid-blocking'
    | 'best-seller'
    | 'upcycled'
    | 'heat-transfer'
    | 'sublimation'
    | 'screen-printing'
    | 'dome'
    | 'new-colors';


export interface ProductAttributeChipProps extends ChipProps {
    feature: ProductAttributeType | string;
    label?: string;
}

export interface ProductAttributeColor {
    color?: string;
    backgroundColor?: string;
}

const attributeColor = (attr: ProductAttributeType | string): ProductAttributeColor => {
    switch (attr) {
        case 'best-seller':
            return {backgroundColor: '#f89d67', color: '#000000'};
        case 'upcycled':
            return {backgroundColor: '#7bb291', color: '#000000'};
        case 'rfid-blocking':
            return {backgroundColor: '#1f4c7a', color: '#FFFFFF'};
        case 'dome':
            return {backgroundColor: '#574e1f', color: '#FFFFFF'};
        case 'sublimation':
            return {backgroundColor: '#101b42', color: '#FFFFFF'};
        case 'heat-transfer':
            return {backgroundColor: '#b75931', color: '#FFFFFF'};
        case 'screen-printing':
            return {backgroundColor: '#dbb687', color: '#000000'};
        case 'new-colors':
            return {backgroundColor: 'var(--chums-red)', color: '#FFFFFF'};
        case 'new':
            return {backgroundColor: 'var(--chums-red)', color: '#FFFFFF'};
        // no default
    }
    return {};
}

const attributeText = (attr: ProductAttributeType | string): string => {
    switch (attr) {
        case 'best-seller':
            return "BEST SELLER";
        case 'upcycled':
            return "UPCYCLED";
        case 'rfid-blocking':
            return "RFID-BLOCKING";
        case 'dome':
            return "3D DOME";
        case 'sublimation':
            return "SUBLIMATION";
        case 'heat-transfer':
            return "HEAT TRANSFER";
        case 'screen-printing':
            return "SCREEN PRINTING";
        case 'new-colors':
            return 'NEW COLORS';
        case 'new':
            return 'NEW';
        // no default
    }
    return attr;

}

export default function ProductAttributeChip({feature, label, sx, ...rest}: ProductAttributeChipProps) {
    let sxProps = sx as SxProps;
    let _label = label;
    if (!sxProps) {
        sxProps = {} as SxProps;
    }
    const colors = attributeColor(feature);
    if (!_label) {
        _label = attributeText(feature);
    }
    return (
        <StyledChip label={_label} {...rest} size="small" sx={{...colors, ...sxProps}}/>
    )
}
