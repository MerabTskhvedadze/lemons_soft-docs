import React, {useState} from 'react'
import {FormControl, MenuItem, Select} from "@mui/material";

type DropdownItem = { value: string, label: string };

type DropdownProps = {
    value: string;
    options: DropdownItem[];
    onChange: (item: React.ChangeEvent<Omit<HTMLInputElement, "value"> & {
        value: string
    }> | (Event & {
        target: {
            value: string
            name: string
        }
    })) => void;
}

export const Dropdown = ({options, onChange, value}: DropdownProps) => {
    const [selected, setSelected] = useState(value);

    return (
        <FormControl size="small" fullWidth>
            <Select
                labelId="filter-label"
                variant={'standard'}
                value={selected}
                onChange={(e) =>{
                    setSelected(e.target.value);
                    onChange(e)
                }}
                className={'title_font text-xs!'}
            >
                {options.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                        {option.label}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
}