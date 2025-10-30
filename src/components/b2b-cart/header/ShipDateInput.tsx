import {type ChangeEvent, type RefObject, type MouseEvent, useEffect, useId, useState} from "react";
import {DateCalendar,} from "@mui/x-date-pickers/DateCalendar";
import dayjs, {Dayjs} from "dayjs";
import FilledInput from "@mui/material/FilledInput";
import IconButton from "@mui/material/IconButton";
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import FormControl, {type FormControlProps} from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import Popover from "@mui/material/Popover";
import {type InputBaseComponentProps} from "@mui/material/InputBase";
import {useAppSelector} from "@/app/configureStore";
import {selectNextShipDate} from "@/ducks/carts/activeCartSlice";

export interface ShipDateInputProps extends Omit<FormControlProps, 'onChange'> {
    value: string | null;
    readOnly?: boolean;
    disabled?: boolean;
    onChange: (value: string | null) => void;
    inputProps: InputBaseComponentProps;
    hasCustomization?: boolean;
    ref?: RefObject<HTMLInputElement | null>;
}

export default function ShipDateInput({
                                          value,
                                          onChange,
                                          inputProps,
                                          readOnly,
                                          disabled,
                                          ref,
                                          ...formControlProps
                                      }: ShipDateInputProps) {
    const nextShipDate = useAppSelector(selectNextShipDate)
    const [min, setMin] = useState<string>(nextShipDate ?? dayjs().add(7, 'days').format('YYYY-MM-DD'));
    const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);


    const id = useId();
    const popoverId = useId();

    useEffect(() => {
        setMin(nextShipDate ?? dayjs().add(7, 'days').format('YYYY-MM-DD'));
    }, [nextShipDate]);


    const changeHandler = (ev: ChangeEvent<HTMLInputElement>) => {
        const value = ev.target.value;
        if (!dayjs(value).isValid() || dayjs(value).isBefore(min)) {
            return onChange(dayjs(min).toISOString())
        }
        onChange(dayjs(value).toISOString());
    }

    const dateValue = (value: string | null): string => {
        if (!dayjs(value).isValid() || dayjs(value).isBefore(min)) {
            return dayjs(min).format('YYYY-MM-DD');
        }
        const offset = dayjs(value).toDate().getTimezoneOffset();
        return dayjs(value).add(offset, 'minutes').format('YYYY-MM-DD');
    }

    const buttonClickHandler = (ev: MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(ev.currentTarget);
    }

    const calendarChangeHandler = (value: Dayjs | null) => {
        setAnchorEl(null);
        if (!dayjs(value).isValid() || dayjs(value).isBefore(min)) {
            return onChange(dayjs(min).toISOString())
        }
        onChange(dayjs(value).toISOString());
    }

    return (
        <FormControl variant="filled" fullWidth size="small" {...formControlProps}>
            <InputLabel htmlFor={id}>
                Requested Ship Date
            </InputLabel>
            <FilledInput type="date" value={dateValue(value)} inputRef={ref}
                         onChange={changeHandler}
                         disabled={disabled}
                         inputProps={{
                             readOnly, id, ref,
                             min: dayjs(min).format('YYYY-MM-DD'),
                             max: dayjs(min).add(1, 'year').format('YYYY-MM-DD'),
                             ...inputProps
                         }}
                         startAdornment={
                             <InputAdornment position="start">
                                 <IconButton aria-label="Show available ship dates"
                                             onClick={buttonClickHandler}>
                                     <CalendarMonthIcon/>
                                 </IconButton>
                             </InputAdornment>
                         }/>
            <Popover id={popoverId} open={!!anchorEl} anchorEl={anchorEl} onClose={() => setAnchorEl(null)}>
                <DateCalendar value={dayjs(dateValue(value))} onChange={calendarChangeHandler} minDate={dayjs(min)}/>
            </Popover>
        </FormControl>
    )
}

