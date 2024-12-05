import {SalesOrderDetailLine} from "b2b-types";
import Decimal from "decimal.js";

export function calcUnitPrice(line: SalesOrderDetailLine): Decimal {
    return new Decimal(1).sub(new Decimal(line.LineDiscountPercent).div(100)).times(new Decimal(line.UnitPrice).div(line.UnitOfMeasureConvFactor ?? 1));
}

export function calcItemPrice(line: SalesOrderDetailLine): Decimal {
    return new Decimal(1).sub(new Decimal(line.LineDiscountPercent).div(100)).times(line.UnitPrice);
}
