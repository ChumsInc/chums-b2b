'use client';

import React, {type SyntheticEvent, useEffect, useState} from 'react';
import {useAppDispatch, useAppSelector} from "@/app/configureStore";
import {getSearchResults, selectSearchResults} from "../index";
import {useNavigate} from 'react-router';
import type {SearchResult} from "chums-types/b2b";
import {useDebounceValue} from '@/hooks/use-debounce'
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import SearchBarResult from "@/ducks/search/components/SearchBarResult";
import {searchItemLink} from "@/ducks/search/utils";

export default function SearchBar() {
    const dispatch = useAppDispatch();
    const results = useAppSelector(selectSearchResults);
    const navigate = useNavigate();

    const [value, setValue] = useState(null);
    const [inputValue, setInputValue] = useState('');
    const [searchTerm, setSearchTerm] = useDebounceValue<string>(inputValue, 500);

    useEffect(() => {
        setSearchTerm(inputValue);
    }, [inputValue]);

    const [options, setOptions] = useState<SearchResult[]>(results ?? []);

    useEffect(() => {
        setOptions(results ?? []);
    }, [results]);

    useEffect(() => {
        dispatch(getSearchResults(searchTerm));
    }, [searchTerm]);

    const changeHandler = (ev: React.SyntheticEvent, newValue: SearchResult | null) => {
        setValue(null);
        setInputValue('');
        if (newValue) {
            const path = searchItemLink(newValue);
            navigate(path);
        }
    }

    const inputChangeHandler = (ev: SyntheticEvent, value: string) => {
        setInputValue(value);
    }

    return (
        <Autocomplete
            sx={{width: 300, display: 'inline-block'}}
            renderInput={({inputProps, ...params}) => (
                <TextField {...params}
                           slotProps={{
                               htmlInput: {...inputProps, maxLength: 30}
                           }}
                           variant="outlined" size="small" label="Search" fullWidth/>
            )}
            inputValue={inputValue}
            onInputChange={inputChangeHandler}
            options={options}
            noOptionsText={"No results found."}
            blurOnSelect
            getOptionLabel={(option) => option.title}
            filterOptions={(x) => x}
            onChange={changeHandler}
            renderOption={(props, option) => {
                return (
                    <SearchBarResult option={option} {...props} />
                )
            }}
            value={value}/>
    )
}
