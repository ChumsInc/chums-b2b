import type {SalesOrderDetailLine} from "chums-types/b2b";
import TableRow from '@mui/material/TableRow';
import TableCell from "@mui/material/TableCell";
import SalesOrderCommentLine from "./SalesOrderCommentLine";
import SalesOrderItemLine from "./SalesOrderItemLine";
import SalesOrderKitComponentLine from "./SalesOrderKitComponentLine";


export default function OrderDetailLine({
                                            line,
                                            customerPriceLevel,
                                            onAddToCart,
                                        }: {
    line: SalesOrderDetailLine;
    customerPriceLevel?: string;
    onAddToCart?: (line: SalesOrderDetailLine) => void;
}) {


    const addToCartHandler = () => {
        if (onAddToCart) {
            onAddToCart(line);
        }
    }

    const isKitComponent = !!line.SalesKitLineKey && line.SalesKitLineKey !== line.LineKey;
    return (
        <>
            {line.ItemType !== '4' && !isKitComponent && (
                <SalesOrderItemLine line={line} customerPriceLevel={customerPriceLevel}
                                    onAddToCart={addToCartHandler}/>
            )}
            {line.ProductType === 'K' && line.ExplodedKitItem === 'Y' && (
                <TableRow sx={{verticalAlign: 'top'}}>
                    <TableCell>&nbsp;</TableCell>
                    <TableCell colSpan={4}>Contains:</TableCell>
                    <TableCell colSpan={2} sx={{display: {xs: 'none', sm: 'table-cell'}}}>&nbsp;</TableCell>
                    <TableCell colSpan={2}>&nbsp;</TableCell>
                </TableRow>
            )}
            {line.ItemType !== '4' && isKitComponent && (
                <SalesOrderKitComponentLine line={line} onAddToCart={addToCartHandler}/>
            )}


            {(line.ItemType === '4' && line.ItemCode === '/C') && (
                <SalesOrderCommentLine line={line}/>
            )}
        </>
    )
}
