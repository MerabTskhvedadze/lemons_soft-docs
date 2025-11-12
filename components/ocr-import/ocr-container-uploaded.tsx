'use client';
import Image from 'next/image'
import React from 'react';
import {
    Box, Paper, Typography, Chip, IconButton, TextField, MenuItem, Button, Divider, Tooltip
} from '@mui/material';
import {
    MdVisibility, MdFormatListNumbered, MdWarningAmber, MdClose,
    MdPlaylistAdd, MdTableChart, MdCode, MdContentCopy, MdFileDownload
} from 'react-icons/md';

type Props = {
    // თუ გინდა ნამდვილი გამოსახულება ჩასვა, გადაეცი src; თუ არა, გამოჩნდება Placeholder.
    previewSrc?: string;
};

export default function OcrContainersVisual({previewSrc}: Props) {
    const json = `[
    {
        "phone_status": "invalid",
        "phone": "+14198633726"
    },
    {
         "phone_status": "invalid",
         "phone": "413002524916"
    }
]`;

    return (
        <Box sx={{display: 'flex', flexDirection: 'column', gap: 2}}>
            {/* მთავარი განლაგება: მარცხნივ Preview, მარჯვნივ კონტეინერი */}
            <Box sx={{display: 'grid', gridTemplateColumns: {xs: '1fr', md: '280px 1fr'}, gap: 2}}>
                {/* Preview */}
                <Paper variant="outlined" sx={{p: 1.5, display: 'flex', flexDirection: 'column', gap: 1}}>
                    <Box sx={{display: 'flex', alignItems: 'center', gap: 1}}>
                        <MdVisibility/>
                        <Typography variant="subtitle2">Preview</Typography>
                    </Box>
                    <Box
                        sx={{
                            position: 'relative',
                            width: '100%',
                            height: 220,
                            borderRadius: 1,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            overflow: 'hidden',
                            border: '1px solid',
                            borderColor: 'divider'
                        }}
                    >
                        {previewSrc ? (
                            <Image src={previewSrc} alt="Numerical data" fill/>
                        ) : (
                            <Typography variant="caption" color="text.secondary">
                                Preview image
                            </Typography>
                        )}
                    </Box>
                </Paper>

                {/* Container card (Set #1) */}
                <Paper variant="outlined" sx={{p: 1.5}}>
                    {/* header */}
                    <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1}}>
                        <Box sx={{display: 'flex', alignItems: 'center', gap: 1}}>
                            <MdFormatListNumbered/>
                            <Typography variant="subtitle2">სეტი #1</Typography>
                            <Chip size="small" label="type: phone"/>
                        </Box>
                        <Box sx={{display: 'flex', gap: 0.5}}>
                            <Tooltip title="დაახურე სეტი">
                                <IconButton size="small"><MdClose/></IconButton>
                            </Tooltip>
                        </Box>
                    </Box>

                    {/* rows */}
                    <Box sx={{display: 'flex', flexDirection: 'column', gap: 1.25}}>
                        <TextField
                            size="small"
                            value="+14198633726"
                            error
                            helperText={<RowHint text="არასწორი ფორმატი"/>}
                            fullWidth
                        />
                        <TextField
                            size="small"
                            value="413002524916"
                            error
                            helperText={<RowHint text="არასწორი ფორმატი"/>}
                            fullWidth
                        />
                    </Box>

                    {/* per-row remove legend */}
                    <Box sx={{display: 'flex', alignItems: 'center', gap: 1, mt: 1}}>
                        <MdWarningAmber color="orange"/>
                        <Typography variant="caption" color="text.secondary">
                            წითელი საზღვარი მიუთითებს ვალიდაციის შეცდომაზე. სტრიქონის ბოლოს მდებარე „−“ ხსნის ამ
                            სტრიქონს.
                        </Typography>
                    </Box>

                    <Divider sx={{my: 1.25}}/>

                    {/* set-level controls */}
                    <Box sx={{display: 'flex', alignItems: 'center', gap: 1, flexWrap: 'wrap'}}>
                        <Tooltip title="სეტის დამატება">
                            <Button size="small" variant="outlined" startIcon={<MdPlaylistAdd/>}>
                                სეტის დამატება
                            </Button>
                        </Tooltip>

                        <Box sx={{flex: 1}}/>

                        <Tooltip title="აირჩიე სამიზნე ცხრილი">
                            <Box sx={{display: 'flex', alignItems: 'center', gap: 1}}>
                                <MdTableChart/>
                                <TextField select size="small" defaultValue="numbers" sx={{minWidth: 180}}>
                                    <MenuItem value="numbers">📞 Numbers Base</MenuItem>
                                    <MenuItem value="other">Other (example)</MenuItem>
                                </TextField>
                            </Box>
                        </Tooltip>

                        <Button variant="contained" color="success" size="small">
                            ატვირთვა
                        </Button>
                    </Box>
                </Paper>
            </Box>

            {/* payload preview */}
            <Paper variant="outlined" sx={{p: 1.5}}>
                <Box sx={{display: 'flex', alignItems: 'center', gap: 1, mb: 1}}>
                    <MdCode/>
                    <Typography variant="subtitle2">Payload Preview</Typography>
                    <Box sx={{flex: 1}}/>
                    <Button size="small" variant="outlined" startIcon={<MdContentCopy/>}>Copy JSON</Button>
                    <Button size="small" variant="contained" color="warning" startIcon={<MdFileDownload/>}>Export
                        CSV</Button>
                </Box>

                <Box
                    component="pre"
                    sx={{
                        p: 1.25,
                        border: '1px solid',
                        borderColor: 'divider',
                        borderRadius: 1,
                        fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
                        fontSize: 12,
                        overflow: 'auto',
                        maxHeight: 220,
                        m: 0
                    }}
                >
                    {json}
                </Box>
            </Paper>
        </Box>
    );
}

/* small helper for consistent hint */
function RowHint({text}: { text: string }) {
    return (
        <Box sx={{display: 'inline-flex', alignItems: 'center', gap: 0.5}}>
            <MdWarningAmber size={14}/>
            <Typography variant="caption" color="text.secondary">{text}</Typography>
        </Box>
    );
}
