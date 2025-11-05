'use client'
import {useState, useId} from 'react'

import {
    Box,
    Stack,
    TextField,
    Switch,
    FormControlLabel,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Button
} from '@mui/material'

export default function Form() {
    const uid = useId();
    const clipId = `clip-${uid}`;
    const pathId = `path-${uid}`;
    const groupId = `group-${uid}`;

    // form state
    const [title, setTitle] = useState("");
    const [subtitle, setSubtitle] = useState("");
    const [isActive, setIsActive] = useState(false);
    const [isPinned, setIsPinned] = useState(true);
    const [category, setCategory] = useState<string>("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const payload = {title, subtitle, isActive, isPinned, category};
        console.log("submit:", payload);
    };


    return (
        <section className="w-full h-fit shadow-sm rounded">
            <header className="py-3 px-5 flex items-center gap-2 bg-gray-100">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    xmlnsXlink="http://www.w3.org/1999/xlink"
                    viewBox="0 0 300 200"
                    width={22}
                    height={32}
                    preserveAspectRatio="xMidYMid meet" // change to "none" to stretch
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

                <span className={'title_font text-sm'}>მენიუ</span>
            </header>

            <main className="py-3 px-5 shadow">
                <Box component="form" onSubmit={handleSubmit} noValidate>
                    <Stack spacing={2}>
                        <TextField
                            label="Title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            fullWidth
                        />
                        <TextField
                            label="Subtitle"
                            value={subtitle}
                            onChange={(e) => setSubtitle(e.target.value)}
                            size="small"
                            fullWidth
                        />

                        {/* Switches */}
                        <Stack direction="row" spacing={2}>
                            <FormControlLabel
                                control={
                                    <Switch
                                        checked={isActive}
                                        onChange={(e) => setIsActive(e.target.checked)}
                                    />
                                }
                                label="Active"
                            />
                            <FormControlLabel
                                control={
                                    <Switch
                                        checked={isPinned}
                                        onChange={(e) => setIsPinned(e.target.checked)}
                                    />
                                }
                                label="Pinned"
                            />
                        </Stack>

                        {/* Select */}
                        <FormControl fullWidth>
                            <InputLabel id="category-label">Category</InputLabel>
                            <Select
                                labelId="category-label"
                                label="Category"
                                value={category}
                                onChange={(e) => setCategory(e.target.value as string)}
                            >
                                <MenuItem value="">None</MenuItem>
                                <MenuItem value="news">News</MenuItem>
                                <MenuItem value="docs">Docs</MenuItem>
                                <MenuItem value="tools">Tools</MenuItem>
                            </Select>
                        </FormControl>

                        <Stack direction="row" justifyContent="flex-end">
                            <Button type="submit" variant="contained">
                                Save
                            </Button>
                        </Stack>
                    </Stack>
                </Box>
            </main>
        </section>
    )
}