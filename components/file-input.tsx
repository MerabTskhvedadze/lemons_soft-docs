'use client';

import * as React from 'react';
import {
    Box,
    Button,
    Chip,
    FormControl,
    Paper,
    Stack,
    Typography,
} from '@mui/material';
import UploadFileRoundedIcon from '@mui/icons-material/UploadFileRounded';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';

type FileInputProps = {
    label?: string;
    accept?: string;              // e.g. "image/*,.pdf"
    multiple?: boolean;
    maxFiles?: number;            // limit number of files
    maxSizeMB?: number;           // per-file size
    onFilesChange?: (files: File[]) => void;
    required?: boolean;
    disabled?: boolean;
};

export default function FileInput(
    {
        label = 'ატვითე ფაილი',
        accept,
        multiple = true,
        maxFiles,
        maxSizeMB,
        onFilesChange,
        required,
        disabled,
    }:
    FileInputProps
) {
    const inputRef = React.useRef<HTMLInputElement | null>(null);
    const [files, setFiles] = React.useState<File[]>([]);
    const [error, setError] = React.useState<string | null>(null);
    const dropRef = React.useRef<HTMLDivElement | null>(null);
    const [isDragging, setDragging] = React.useState(false);

    const validateAndSet = React.useCallback(
        (incoming: File[]) => {
            setError(null);

            if (maxFiles && incoming.length > maxFiles) {
                setError(`You can select up to ${maxFiles} file${maxFiles > 1 ? 's' : ''}.`);
                incoming = incoming.slice(0, maxFiles);
            }

            if (maxSizeMB) {
                const tooBig = incoming.find((f) => f.size > maxSizeMB * 1024 * 1024);
                if (tooBig) {
                    setError(`"${tooBig.name}" exceeds the ${maxSizeMB} MB limit.`);
                    incoming = incoming.filter((f) => f.size <= maxSizeMB * 1024 * 1024);
                }
            }

            setFiles(incoming);
            onFilesChange?.(incoming);
        },
        [maxFiles, maxSizeMB, onFilesChange]
    );

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const list = e.target.files;
        if (!list) return;
        validateAndSet(Array.from(list));
    };

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setDragging(false);
        if (disabled) return;

        const dt = e.dataTransfer;
        const list = dt.files;
        if (!list?.length) return;

        let arr = Array.from(list);
        if (!multiple) arr = arr.slice(0, 1);
        validateAndSet(arr);
    };

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        if (!disabled) setDragging(true);
    };

    const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
        // only reset when leaving the drop zone, not when entering children
        if (dropRef.current && !dropRef.current.contains(e.relatedTarget as Node)) {
            setDragging(false);
        }
    };

    const removeAt = (idx: number) => {
        const next = files.filter((_, i) => i !== idx);
        validateAndSet(next);
        // also reset native input to allow re-selecting the same file name
        if (inputRef.current) inputRef.current.value = '';
    };

    return (
        <FormControl className={'bg-white rounded'} fullWidth disabled={disabled} error={!!error} required={required}>
            <input
                ref={inputRef}
                type="file"
                hidden
                accept={accept}
                multiple={multiple}
                onChange={handleInputChange}
            />

            <Stack spacing={1.5}>
                <Paper
                    ref={dropRef}
                    variant="outlined"
                    onDrop={handleDrop}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    sx={{
                        p: 2,
                        borderStyle: 'dashed',
                        outline: 'none',
                        bgcolor: (t) => (isDragging ? t.palette.action.hover : 'transparent'),
                        transition: 'background-color .15s ease',
                        cursor: disabled ? 'not-allowed' : 'pointer',
                    }}
                    onClick={() => !disabled && inputRef.current?.click()}
                    aria-label={label}
                    role="button"
                >
                    <Stack direction="row" alignItems="center" spacing={1.5} justifyContent="space-between">
                        <Stack direction="row" alignItems="center" spacing={1.5}>
                            <UploadFileRoundedIcon fontSize="small"/>
                            <Box>
                                <Typography variant="subtitle2" className={'title_font'}>{label}</Typography>
                                <Typography variant="caption" color="text.secondary" className={'title_font'}>
                                    ჩააგდე {multiple ? 'ფაილი' : 'ფაილები'} აქ, ან დააკლიკე მოსაძებნად
                                    {accept ? ` • ${accept}` : ''}
                                    {maxSizeMB ? ` • max ${maxSizeMB}MB each` : ''}
                                </Typography>
                            </Box>
                        </Stack>

                        <Button
                            size="small"
                            variant="contained"
                            onClick={(e) => {
                                e.stopPropagation();
                                inputRef.current?.click();
                            }}
                            disabled={disabled}
                            className={'title_font'}
                        >
                            ატვირთვა
                        </Button>
                    </Stack>
                </Paper>

                {files.length > 0 && (
                    <Stack direction="row" flexWrap="wrap" gap={1}>
                        {files.map((file, i) => (
                            <Chip
                                key={`${file.name}-${i}`}
                                label={`${file.name} • ${(file.size / (1024 * 1024)).toFixed(2)}MB`}
                                onDelete={() => removeAt(i)}
                                deleteIcon={<DeleteRoundedIcon className={'ml-3! text-red-500!'}/>}
                                variant="outlined"
                            />
                        ))}
                    </Stack>
                )}
            </Stack>
        </FormControl>
    );
}
