import {useAppDispatch, useAppSelector} from "@/app/configureStore";
import SearchIcon from "@mui/icons-material/Search";
import TextField from "@mui/material/TextField";
import React, {ChangeEvent} from "react";
import {setInvoicesFilterSearch, setInvoicesFilterShipToCode, setShowPaidInvoices} from "../actions";
import {selectInvoicesSearch, selectInvoicesShipToFilter, selectInvoicesShowPaid} from "../selectors";
import ShipToSelect, {allLocationsValue} from "../../customer/components/ShipToSelect";
import FormGroup from "@mui/material/FormGroup";
import Button from '@mui/material/Button'
import Checkbox from '@mui/material/Checkbox'
import FormControlLabel from '@mui/material/FormControlLabel'
import InputAdornment from '@mui/material/InputAdornment'
import Grid from "@mui/material/Grid";

const InvoiceListFilter = ({onReload}: { onReload: () => void }) => {
    const dispatch = useAppDispatch();
    const search = useAppSelector(selectInvoicesSearch);
    const shipTo = useAppSelector(selectInvoicesShipToFilter);
    const showPaid = useAppSelector(selectInvoicesShowPaid);

    const searchChangeHandler = (ev: ChangeEvent<HTMLInputElement>) => {
        dispatch(setInvoicesFilterSearch(ev.target.value));
    }

    const shipToChangeHandler = (shipToCode: string | null) => {
        dispatch(setInvoicesFilterShipToCode(shipToCode))
    }

    const prepaidChangeHandler = (ev: ChangeEvent<HTMLInputElement>) => {
        dispatch(setShowPaidInvoices(ev.target.checked))
    }

    return (
        <Grid container direction="row" spacing={2}>
            <Grid sx={{flex: '1 1 auto'}}>
                <TextField type="search" value={search} onChange={searchChangeHandler} variant="standard" size="small"
                           label="Search" fullWidth
                           slotProps={{
                               htmlInput: {maxLength: 30},
                               input: {
                                   startAdornment: (
                                       <InputAdornment position="start"><SearchIcon/></InputAdornment>
                                   ),
                               }
                           }}
                           placeholder={'Invoice or PO #'}/>
            </Grid>
            <Grid sx={{flex: '1 1 auto'}}>
                <ShipToSelect value={shipTo ?? allLocationsValue} onChange={shipToChangeHandler} variant="standard"
                              allowAllLocations/>
            </Grid>
            <Grid sx={{flex: '1 1 auto'}}>
                <FormGroup>
                    <FormControlLabel control={<Checkbox checked={showPaid} onChange={prepaidChangeHandler}/>}
                                      label="Show paid invoices?"/>
                </FormGroup>
            </Grid>
            <Grid>
                <Button type="button" variant="text" onClick={onReload}>
                    Reload
                </Button>
            </Grid>
        </Grid>
    )
}

export default InvoiceListFilter;
