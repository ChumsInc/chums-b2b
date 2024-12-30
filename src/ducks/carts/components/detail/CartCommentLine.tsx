import React, {ChangeEvent, useEffect, useState} from 'react';
import classNames from "classnames";
import TextSnippetIcon from '@mui/icons-material/TextSnippet';
import Box from "@mui/material/Box";
import ClearIcon from '@mui/icons-material/Clear';
import IconButton from "@mui/material/IconButton";
import TableRow from '@mui/material/TableRow';
import TableCell from "@mui/material/TableCell";
import TextField from "@mui/material/TextField";
import {useAppDispatch, useAppSelector} from "@app/configureStore";
import {selectCartItemById} from "@ducks/carts/selectors";
import {useDebounceValue} from "@hooks/use-debounce";
import {setCartItem} from "@ducks/carts/actions";


export interface CartCommentLineProps {
    cartId: number;
    lineId: number;
    readOnly?: boolean;
}

export default React.forwardRef(function CartCommentLine({
                                                                   cartId,
                                                                   lineId,
                                                                   readOnly,
                                                               }: CartCommentLineProps,
                                                         ref: React.Ref<HTMLInputElement>) {
    const dispatch = useAppDispatch();
    const line = useAppSelector((state) => selectCartItemById(state, cartId, lineId));
    const [value, setValue] = useState<string>(line.commentText);
    const [commentText, setCommentText] = useDebounceValue<string>(line.commentText, 500);

    useEffect(() => {
        if (readOnly || line.commentText === commentText) {
            return;
        }
        dispatch(setCartItem({cartHeaderId: cartId, id: lineId, commentText: commentText}));
    }, [commentText, line, readOnly]);

    const rowClassName = {
        'table-warning': line.changed,
        'table-info': !line.id,
    }

    const changeHandler = (ev: ChangeEvent<HTMLTextAreaElement>) => {
        setValue(ev.target.value);
        setCommentText(ev.target.value);
    }

    const deleteCommentHandler = () => {
        if (readOnly) {
            return;
        }
        dispatch(setCartItem({cartHeaderId: cartId, id: lineId, commentText: ''}));
    }

    return (
        <TableRow className={classNames(rowClassName)}>
            {line.itemType === '4' && (<TableCell className="text-center"><TextSnippetIcon/></TableCell>)}
            <TableCell colSpan={3}>
                <Box sx={{display: 'flex', flexDirection: 'row'}}>
                    <TextField value={value ?? ''} fullWidth size="small" variant="filled"
                               ref={ref}
                               label="Item Comment"
                               sx={{flex: '1 1 auto'}}
                               inputProps={{readOnly, maxLength: 2048}}
                               multiline maxRows={4} minRows={1}
                               onChange={changeHandler}
                               InputProps={{
                                   endAdornment: <IconButton size="small" onClick={deleteCommentHandler}><ClearIcon/></IconButton>,
                               }}

                    />
                </Box>
            </TableCell>
            <TableCell colSpan={4}>&nbsp;</TableCell>
            {line.itemType === '4' && (<TableCell>&nbsp;</TableCell>)}
        </TableRow>
    )
})

