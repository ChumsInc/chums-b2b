import type {Product} from "chums-types/b2b";
import Stack, {type StackProps} from "@mui/material/Stack";
import SizeIconList from "./SizeIconList.tsx";
import ProductAttributeChip from "./ProductAttributeChip.tsx";

export interface ProductAttributeStackProps extends StackProps {
    product: Product;
    isNew?: boolean;
}

export default function ProductAttributeStack({
                                                  product,
                                                  spacing,
                                                  direction,
                                                  flexWrap,
                                                  justifyContent,
                                                  alignItems,
                                                  isNew,
                                                  ...rest
                                              }: ProductAttributeStackProps) {
    return (
        <Stack spacing={spacing ?? 1} useFlexGap
               direction={direction ?? "row"}
               flexWrap={flexWrap ?? "wrap"}
               justifyContent={justifyContent ?? "center"} alignItems={alignItems ?? "center"} {...rest}>
            {!!product.additionalData?.size && (<SizeIconList size={product.additionalData.size} spacing={1}/>)}
            {isNew && <ProductAttributeChip feature="new"/>}
            {product.additionalData?.best_seller && <ProductAttributeChip feature="best-seller"/>}
            {product.canScreenPrint && <ProductAttributeChip feature="screen-printing"/>}
            {product.canDome && <ProductAttributeChip feature="dome"/>}
            {!!product.additionalData?.upcycled && <ProductAttributeChip feature="upcycled"/>}
            {!!product.additionalData?.heatTransfer && <ProductAttributeChip feature="heat-transfer"/>}
            {!!product.additionalData?.sublimation && <ProductAttributeChip feature="sublimation"/>}
            {!!product.additionalData?.rfidBlocking && <ProductAttributeChip feature="rfid-blocking"/>}
            {!!product.additionalData?.newColors && <ProductAttributeChip feature="new-colors"/>}
        </Stack>
    )
}

