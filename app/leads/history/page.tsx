'use client'

import React, {useMemo, useState} from "react";

import {ScrollTrailText} from "@/animations/ScrollTrailText";
import {Button} from "@/components/ui/button";
import {Separator} from "@/components/ui/separator";
import TextField from '@mui/material/TextField';

import Select, {SelectChangeEvent} from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';

import {
    LocalizationProvider
} from '@mui/x-date-pickers-pro/LocalizationProvider';
import {AdapterDayjs} from '@mui/x-date-pickers-pro/AdapterDayjs';
import {DateRangePicker} from '@mui/x-date-pickers-pro/DateRangePicker';
import customParseFormat from 'dayjs/plugin/customParseFormat';
dayjs.extend(customParseFormat);

import {
    Box,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Chip,
    Stack
} from "@mui/material";
import dayjs, {Dayjs} from "dayjs";
import {DateRange} from "@mui/lab";

// ---------- Mock history data ----------
type HistoryRow = {
    id: number;
    number: string;
    action: 'action1' | 'action2' | 'action3';
    status: 'status1' | 'status2' | 'status3';
    worker: 'worker1' | 'worker2' | 'worker3';
    date: string;        // ISO or "M/D/YYYY"
    description: string;
};

const HISTORY: HistoryRow[] = [
    {
        id: 101,
        number: "555-123",
        action: "action1",
        status: "status2",
        worker: "worker1",
        date: "1/11/2023",
        description: "განახლდა სტატუსი"
    },
    {
        id: 102,
        number: "555-456",
        action: "action2",
        status: "status1",
        worker: "worker2",
        date: "1/13/2023",
        description: "მომხმარებელმა შეცვალა სახელი"
    },
    {
        id: 103,
        number: "555-789",
        action: "action3",
        status: "status3",
        worker: "worker3",
        date: "3/12/2025",
        description: "დაემატა კომენტარი"
    },
    {
        id: 104,
        number: "555-000",
        action: "action1",
        status: "status1",
        worker: "worker3",
        date: "3/12/2025",
        description: "დავალება დასრულდა"
    },
    {
        id: 105,
        number: "595-111",
        action: "action2",
        status: "status2",
        worker: "worker1",
        date: "2/01/2024",
        description: "ნომერი გადაანაწილეს"
    },
    {
        id: 106,
        number: "577-333",
        action: "action3",
        status: "status2",
        worker: "worker2",
        date: "2/15/2024",
        description: "დაემატა ახალი ველი"
    },
];

// ---------- Page ----------
export default function History() {
    // filters
    const [actions, setActions] = useState<string>('all-action');
    const [status, setStatus] = useState<string>('all-status');
    const [worker, setWorker] = useState<string>('all-worker');
    const [numberQuery, setNumberQuery] = useState<string>('');
    const [range, setRange] = useState<DateRange<Dayjs>>([null, null]);

    const handleChangeAction = (event: SelectChangeEvent) => setActions(event.target.value as string);
    const handleChangeStatus = (event: SelectChangeEvent) => setStatus(event.target.value as string);
    const handleChangeWorker = (event: SelectChangeEvent) => setWorker(event.target.value as string);

    const clearFilters = () => {
        setActions('all-action');
        setStatus('all-status');
        setWorker('all-worker');
        setNumberQuery('');
        setRange([null, null]);
    };

    // filtering
    const filtered = useMemo(() => {
        const start = range[0];
        const end = range[1];

        return HISTORY.filter((row) => {
            // action
            if (actions !== 'all-action' && row.action !== actions) return false;
            // status
            if (status !== 'all-status' && row.status !== status) return false;
            // worker
            if (worker !== 'all-worker' && row.worker !== worker) return false;
            // number search (substring)
            if (numberQuery.trim()) {
                const q = numberQuery.trim().toLowerCase();
                if (!row.number.toLowerCase().includes(q)) return false;
            }
            // date range (inclusive)
            if (start || end) {
                // try strict parse for known formats first; if invalid, fall back to native/ISO parse
                let d = dayjs(row.date, ["M/D/YYYY", "MM/DD/YYYY"], true);
                if (!d.isValid()) d = dayjs(row.date); // handles ISO 8601 without any casts

                if (!d.isValid()) return false;
                if (start && d.isBefore(start, 'day')) return false;
                if (end && d.isAfter(end, 'day')) return false;
            }
            return true;
        });
    }, [actions, status, worker, numberQuery, range]);

    return (
        <>
            {/* overview */}
            <header className=" flex flex-col gap-3">
                <div className={'flex items-center gap-3'}>
                    <ScrollTrailText className={'title_font text-lg'}>🔹 გვერდის დანიშნულება</ScrollTrailText>
                    <Button className="title_font bg-blue-700 text-sm" size={'sm'}>
                        გაეცანი გვერდს
                    </Button>
                </div>

                <ScrollTrailText className="pl-5">
                    ნომრების ბაზაზე წარმოდგენილია ნომრების ცხრილი
                </ScrollTrailText>
            </header>

            <Separator className="my-5 bg-transparent"/>

            <div className={'bg-gray-50 rounded overflow-hidden'}>
                <div className={'bg-gray-200 p-4 flex items-center justify-between'}>
                    <h1 className={'title_font text-sm'}>
                        აქტივობების ჩანაწერი {filtered.length}
                    </h1>

                    <Stack direction="row" spacing={1}>
                        {/* little legend: active filters */}
                        {actions !== 'all-action' && <Chip size="small" label={`მოქმედება: ${actions}`}/>}
                        {status !== 'all-status' && <Chip size="small" label={`სტატუსი: ${status}`}/>}
                        {worker !== 'all-worker' && <Chip size="small" label={`თანამშრომელი: ${worker}`}/>}
                        {numberQuery && <Chip size="small" label={`ნომერი: ${numberQuery}`}/>}
                        {(range[0] || range[1]) && (
                            <Chip
                                size="small"
                                label={`დან: ${range[0]?.format('YYYY-MM-DD') ?? '—'}  •  მდე: ${range[1]?.format('YYYY-MM-DD') ?? '—'}`}
                            />
                        )}
                    </Stack>
                </div>

                <div className={'p-4 flex justify-between gap-4 flex-wrap'}>
                    <FormControl className={'max-w-[204px] w-full'}>
                        <InputLabel id="actions-select">მოქმედებები</InputLabel>
                        <Select
                            labelId="actions-select"
                            id="actions-select"
                            value={actions}
                            label="მოქმედებები"
                            onChange={handleChangeAction}
                            slotProps={{input: {className: 'bg-white!'}}}
                        >
                            <MenuItem value={'all-action'}>ყველა</MenuItem>
                            <MenuItem value={'action1'}>მოქმედება 1</MenuItem>
                            <MenuItem value={'action2'}>მოქმედება 2</MenuItem>
                            <MenuItem value={'action3'}>მოქმედება 3</MenuItem>
                        </Select>
                    </FormControl>

                    <FormControl className={'max-w-[204px] w-full'}>
                        <InputLabel id="status-select">სტატუსი</InputLabel>
                        <Select
                            labelId="status-select"
                            id="status-select"
                            value={status}
                            label="სტატუსი"
                            onChange={handleChangeStatus}
                            slotProps={{input: {className: 'bg-white!'}}}
                        >
                            <MenuItem value={'all-status'}>ყველა</MenuItem>
                            <MenuItem value={'status1'}>სტატუსი 1</MenuItem>
                            <MenuItem value={'status2'}>სტატუსი 2</MenuItem>
                            <MenuItem value={'status3'}>სტატუსი 3</MenuItem>
                        </Select>
                    </FormControl>

                    <FormControl className={'max-w-[204px] w-full'}>
                        <InputLabel id="worker-select">თანამშრომელი</InputLabel>
                        <Select
                            labelId="worker-select"
                            id="worker-select"
                            value={worker}
                            label="თანამშრომელი"
                            onChange={handleChangeWorker}
                            slotProps={{input: {className: 'bg-white!'}}}
                        >
                            <MenuItem value={'all-worker'}>ყველა</MenuItem>
                            <MenuItem value={'worker1'}>თანამშრომელი 1</MenuItem>
                            <MenuItem value={'worker2'}>თანამშრომელი 2</MenuItem>
                            <MenuItem value={'worker3'}>თანამშრომელი 3</MenuItem>
                        </Select>
                    </FormControl>

                    <TextField
                        className={'bg-white'}
                        id="number-search"
                        label="ნომრით ძებნა"
                        variant="outlined"
                        value={numberQuery}
                        onChange={(e) => setNumberQuery(e.target.value)}
                    />

                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DateRangePicker
                            className={'bg-white'}
                            value={range}
                            onChange={(v) => setRange(v)}
                        />
                    </LocalizationProvider>

                    <Button size={'xs'} className="title_font bg-red-600 hover:bg-red-800" onClick={clearFilters}>
                        გასუფთავება
                    </Button>
                </div>

                {/* Results table */}
                <Box sx={{p: 2}}>
                    <TableContainer component={Paper} variant="outlined">
                        <Table size="small">
                            <TableHead>
                                <TableRow>
                                    <TableCell>ID</TableCell>
                                    <TableCell>ნომერი</TableCell>
                                    <TableCell>მოქმედება</TableCell>
                                    <TableCell>სტატუსი</TableCell>
                                    <TableCell>თანამშრომელი</TableCell>
                                    <TableCell>თარიღი</TableCell>
                                    <TableCell>აღწერა</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {filtered.map((r) => (
                                    <TableRow key={r.id} hover>
                                        <TableCell>{r.id}</TableCell>
                                        <TableCell>{r.number}</TableCell>
                                        <TableCell>{r.action}</TableCell>
                                        <TableCell>{r.status}</TableCell>
                                        <TableCell>{r.worker}</TableCell>
                                        <TableCell>{r.date}</TableCell>
                                        <TableCell>{r.description}</TableCell>
                                    </TableRow>
                                ))}

                                {filtered.length === 0 && (
                                    <TableRow>
                                        <TableCell colSpan={7} align="center" style={{padding: 24}}>
                                            ჩანაწერები არ მოიძებნა
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Box>
            </div>
        </>
    )
}
