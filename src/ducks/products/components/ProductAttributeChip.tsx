import React from 'react';
import Chip, {ChipProps} from "@mui/material/Chip";
import {styled, SxProps} from "@mui/material/styles";

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
            return {backgroundColor: '#D71D78', color: '#FFFFFF'};
        case 'upcycled':
            return {backgroundColor: '#9ABD60', color: '#000000'};
        case 'rfid-blocking':
            return {backgroundColor: '#37BCAB', color: '#FFFFFF'};
        case 'dome':
            return {backgroundColor: '#69696a', color: '#FFFFFF'};
        case 'sublimation':
            return {backgroundColor: '#365629', color: '#FFFFFF'};
        case 'heat-transfer':
            return {backgroundColor: '#F39D27', color: '#000000'};
        case 'screen-printing':
            return {backgroundColor: '#FAD816', color: '#000000'};
        case 'new-colors':
            return {backgroundColor: 'var(--chums-red)', color: '#FFFFFF'};
        case 'new':
            return {backgroundColor: 'var(--chums-red)', color: '#FFFFFF'};
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
    }
    return attr;

}

export default function ProductAttributeChip({feature, label, sx, ...rest}: ProductAttributeChipProps) {
    if (!sx) {
        sx = {} as SxProps;
    }
    const colors = attributeColor(feature);
    if (!label) {
        label = attributeText(feature);
    }
    return (
        <StyledChip label={label} {...rest} size="small" sx={{...colors, ...sx}}/>
    )
}
