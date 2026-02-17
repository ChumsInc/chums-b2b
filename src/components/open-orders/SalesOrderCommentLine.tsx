import classNames from "classnames";
import type {Editable, SalesOrderDetailLine} from "chums-types/b2b";
import type {Appendable} from "@/types/generic";
import TextSnippetIcon from '@mui/icons-material/TextSnippet';
import TableRow from '@mui/material/TableRow';
import TableCell from "@mui/material/TableCell";


export interface SalesOrderCommentLineProps {
    line: SalesOrderDetailLine & Editable & Appendable;
}

export default function SalesOrderCommentLine({line}: SalesOrderCommentLineProps) {
    const rowClassName = {
        'table-warning': line.changed,
        'table-info': line.newLine,
    }

    return (
        <TableRow className={classNames(rowClassName)}>
            {line.ItemType === '4' && (<TableCell className="text-center"><TextSnippetIcon/></TableCell>)}
            <TableCell colSpan={3}>
                {line.CommentText}
            </TableCell>
            <TableCell colSpan={4}>&nbsp;</TableCell>
            {line.ItemType === '4' && (<TableCell>&nbsp;</TableCell>)}
        </TableRow>
    )
}

