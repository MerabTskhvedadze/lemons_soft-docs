import React from 'react'
import {InputAdornment, TextField} from "@mui/material";
import {MdFilterList} from "react-icons/md";

type FilterInputProps = {
    value?: string,
    onChange: (value: string) => void
    placeholder?: string
}

export const FilterInput = (
    {
        value,
        onChange,
        placeholder
    }: FilterInputProps) => {

    return (
        <TextField
            value={value}
            onChange={(e) => onChange(e.target.value)}
            slotProps={{
                input: {
                    startAdornment: (
                        <InputAdornment position="start">
                            <MdFilterList/>
                        </InputAdornment>
                    ),
                },
            }}
            size="small"
            variant="standard"
            placeholder={placeholder}
            fullWidth
        />
    );
}