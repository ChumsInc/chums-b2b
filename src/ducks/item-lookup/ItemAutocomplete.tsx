import {type ChangeEvent, type SyntheticEvent, useCallback, useEffect, useState} from 'react';
import Stack from "@mui/material/Stack";
import CircularProgress from "@mui/material/CircularProgress";
import Autocomplete from '@mui/material/Autocomplete';
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import {styled} from "@mui/material/styles";
import {useAppDispatch, useAppSelector} from "@/app/hooks.js";
import {
    type ItemSearchResult,
    loadItemLookup,
    selectSearchFulfilled,
    selectSearchLoading,
    selectSearchResults
} from "./index.js";
import {useDebounceValue} from '@/hooks/use-debounce.js'
import {CONTENT_PATH_SEARCH_IMAGE} from "@/constants/paths.js";
import {addToCart} from "@/ducks/carts/actions.js";
import {selectCartStatusById} from "@/ducks/carts/cartStatusSlice.js";
import {selectCustomerKey} from "@/ducks/customer/currentCustomerSlice.js";
import AddToCartButton from "@/components/b2b-cart/add-to-cart/AddToCartButton.js";


const NumericTextField = styled(TextField)`
    input[type=number]::-webkit-inner-spin-button,
    input[type=number]::-webkit-outer-spin-button {
        -webkit-appearance: none;
        margin: 0;
    }
`;
export default function ItemAutocomplete({cartId}: {
    cartId: number;
}) {
    const dispatch = useAppDispatch();
    const customerKey = useAppSelector(selectCustomerKey);
    const results = useAppSelector(selectSearchResults);
    const loading = useAppSelector(selectSearchLoading);
    const fulfilled = useAppSelector(selectSearchFulfilled);
    const cartStatus = useAppSelector((state) => selectCartStatusById(state, cartId));

    const [quantity, setQuantity] = useState(1);
    const [value, setValue] = useState<ItemSearchResult | null>(null);
    const [inputValue, setInputValue] = useState('');
    const [searchTerm, setSearchTerm] = useDebounceValue<string>(inputValue, 500);

    const [options, setOptions] = useState(results ?? []);

    const addToCartHandler = useCallback(async () => {
        if (!value || !customerKey || !quantity) {
            return;
        }
        if (globalThis.window?.gtag) {
            globalThis.window.gtag('event', 'add_to_cart', {
                items: [{item_id: value.ItemCode, item_name: value.ItemCodeDesc ?? value.ItemCode, quantity: quantity}]
            })
        }
        await dispatch(addToCart({
            cartId,
            customerKey,
            item: {
                itemCode: value.ItemCode,
                itemType: '1',
                unitOfMeasure: value.SalesUnitOfMeasure,
                quantityOrdered: quantity,
                commentText: '',
            },
        }));
    }, [value, customerKey, quantity])
    useEffect(() => {
        setOptions(results ?? []);
    }, [results]);

    useEffect(() => {
        setSearchTerm(inputValue);
    }, [inputValue]);

    useEffect(() => {
        dispatch(loadItemLookup(searchTerm));
    }, [searchTerm]);

    const changeHandler = (_: SyntheticEvent, newValue: ItemSearchResult | null) => {
        setValue(newValue);
    }

    const inputChangeHandler = (_: SyntheticEvent, value: string) => {
        setInputValue(value);
    }

    const quantityChangeHandler = (ev: ChangeEvent<HTMLInputElement>) => {
        const qty = +ev.target.value;
        setQuantity(Math.max(qty, 1));
    }



    return (
        <Stack direction="row" spacing={1}>
            <Autocomplete
                size="small"
                sx={{width: 300, display: 'inline-block'}}
                renderInput={(params) => (
                    <TextField {...params} variant="filled" size="small" label="Search Items" fullWidth
                               slotProps={{
                                   input: {
                                       ...params.InputProps,
                                       endAdornment: (
                                           <>
                                               {loading && (<CircularProgress color="inherit" size={20}/>)}
                                               {params.InputProps.endAdornment}
                                           </>
                                       )
                                   }
                               }}
                    />
                )}
                inputValue={inputValue}
                onInputChange={inputChangeHandler}
                isOptionEqualToValue={(option, value) => option.ItemCode === value.ItemCode}
                options={options}
                noOptionsText={fulfilled ? 'Item Not Found' : null}
                blurOnSelect
                getOptionLabel={(option) => option.ItemCode}
                filterOptions={(x) => x}
                onChange={changeHandler}
                renderOption={(props, option) => {
                    const src = CONTENT_PATH_SEARCH_IMAGE
                        .replace(':image', encodeURIComponent(option.filename ?? 'missing.png'));
                    return (
                        <li {...props} key={option.ItemCode}>
                            <div className="search-result row g-3">
                                <div className="col-auto">
                                    {!!option.filename && <img src={src} alt={option.ItemCodeDesc ?? option.ItemCode}
                                                               className="img-fluid"/>}
                                </div>
                                <div className="col">
                                    <div>{option.ItemCode}</div>
                                    {!!option.ItemCodeDesc &&
                                        <div className="text-muted small">{option.ItemCodeDesc}</div>}
                                </div>
                                <div className="col-auto">{option.SalesUnitOfMeasure ?? 'EA'}</div>
                            </div>
                        </li>
                    )
                }}
                value={value}/>
            <NumericTextField size="small" variant="filled"
                              type="number"
                              inputProps={{inputMode: 'numeric', min: 1, pattern: '[0-9]*', maxLength: 4}}
                              label="Quantity" value={quantity}
                              onChange={quantityChangeHandler}
                              InputProps={{
                                  endAdornment: (
                                      <InputAdornment position="end">
                                          {value?.SalesUnitOfMeasure ?? 'EA'}
                                      </InputAdornment>
                                  )
                              }}
            />
            <AddToCartButton disabled={!quantity || !value || cartStatus !== 'idle'}
                             type="button" size="small" color="primary" fullWidth={false}
                             onClick={addToCartHandler}/>
            <div/>
        </Stack>
    )
}
