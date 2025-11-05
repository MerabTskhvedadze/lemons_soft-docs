"use client";

import React, {useId, useState} from "react";
import {
    Box,
    Grid,
    Stack,
    TextField,
    Switch,
    FormControlLabel,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Button,
    Typography,
} from "@mui/material";
import SaveIcon from '@mui/icons-material/Save';

export default function Form() {
    const uid = useId();
    const clipId = `clip-${uid}`;
    const pathId = `path-${uid}`;
    const groupId = `group-${uid}`;

    // form state
    const [title, setTitle] = useState("");
    const [template, setTemplate] = useState("");
    const [status, setStatus] = useState(true);
    const [toggleB, setToggleB] = useState(false);
    const [icon, setIcon] = useState("");

    return (
        <aside className="w-full h-fit shadow-sm rounded">
            {/* header with your fixed SVG */}
            <header className="py-3 px-5 flex items-center gap-2 bg-gray-100">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    xmlnsXlink="http://www.w3.org/1999/xlink"
                    viewBox="0 0 300 200"
                    width={22}
                    height={32}
                    preserveAspectRatio="xMidYMid meet"
                >
                    <defs>
                        <g id={groupId}>
                            <clipPath id={clipId}>
                                <path d="M-109 104a104 104 0 000-208h218a104 104 0 000 208z"/>
                            </clipPath>
                            <path
                                id={pathId}
                                d="M-55 74a55 55 0 01110 0V-74a55 55 0 01-110 0z"
                                clipPath={`url(#${clipId})`}
                            />
                            <use xlinkHref={`#${pathId}`} transform="rotate(90)"/>
                        </g>
                    </defs>
                    <path fill="#fff" d="M0 0h300v200H0z"/>
                    <path d="M130 0v80H0v40h130v80h40v-80h130V80H170V0h-40z" fill="red"/>
                    <use xlinkHref={`#${groupId}`} transform="translate(64.45 39.45)" fill="red"/>
                    <use xlinkHref={`#${groupId}`} transform="translate(235.55 160.55)" fill="red"/>
                    <use xlinkHref={`#${groupId}`} transform="translate(235.55 39.45)" fill="red"/>
                    <use xlinkHref={`#${groupId}`} transform="translate(64.45 160.55)" fill="red"/>
                </svg>

                <span className="title_font text-sm">მენიუ</span>
            </header>

            <main className="py-3 px-5 flex flex-col gap-4 shadow">
                <div className={'flex items-center gap-5'}>
                    {/* Left column */}
                    <div className={'grow flex flex-col gap-3'} >
                        <div>
                            <p>სახელი</p>
                            <TextField
                                placeholder="სახელი"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                fullWidth
                                size={'small'}
                            />
                        </div>

                        <div>
                            <p>შაბლონი</p>
                            <FormControl fullWidth>
                                <InputLabel id="tmpl-label">აირჩიე შაბლონი</InputLabel>
                                <Select
                                    labelId="tmpl-label"
                                    label=""
                                    value={template}
                                    onChange={(e) => setTemplate(e.target.value as string)}
                                    size={'small'}
                                >
                                    <MenuItem value="base">საბაზო</MenuItem>
                                    <MenuItem value="docs">დოკუმენტები</MenuItem>
                                    <MenuItem value="tools">ინსტრუმენტები</MenuItem>
                                </Select>
                            </FormControl>
                        </div>
                    </div>

                    {/* Right column */}
                    <div className={'flex flex-col gap-3'}>
                        {/* Top row: two switches aligned to screenshot style */}
                        <div className={'flex items-center gap-5'}>
                            <div>
                                <p>სტატუსი</p>
                                <FormControlLabel
                                    sx={{m: 0}}
                                    control={
                                        <Switch
                                            checked={status}
                                            onChange={(e) => setStatus(e.target.checked)}
                                        />
                                    }
                                    label=""
                                />
                            </div>
                            <div>
                                <p>მორგებული</p>
                                <FormControlLabel
                                    sx={{m: 0}}
                                    control={
                                        <Switch
                                            checked={toggleB}
                                            onChange={(e) => setToggleB(e.target.checked)}
                                        />
                                    }
                                    label=""
                                />
                            </div>
                        </div>

                        {/* Small TextField with label + placeholder to the right column */}
                        <div>
                            <p>
                                აიქონი <span style={{opacity: 0.7}}>აირჩიოთ აიქონი</span>
                            </p>
                            <TextField
                                placeholder="აიქონი"
                                size="small"
                                value={icon}
                                onChange={(e) => setIcon(e.target.value)}
                                fullWidth
                            />
                        </div>
                    </div>
                </div>

                {/* Submit button bottom-left */}
                <Button
                    size={'small'}
                    type="submit"
                    variant="contained"
                    startIcon={<SaveIcon/>}
                    className={'title_font self-start'}
                >
                    შენახვა
                </Button>
            </main>
        </aside>
    );
}
