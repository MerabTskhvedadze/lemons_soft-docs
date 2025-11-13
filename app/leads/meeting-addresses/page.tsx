'use client'

import * as React from 'react'
import {
    DataGridPremium,
    GridColDef,
    GridToolbarContainer,
    GridToolbarColumnsButton,
    GridToolbarDensitySelector,
    GridToolbarExport,
    GridToolbarQuickFilter,
} from '@mui/x-data-grid-premium'
import { Box, IconButton, Stack, Typography, Button, Tooltip, Divider, Chip } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import RefreshIcon from '@mui/icons-material/Refresh'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import SearchIcon from '@mui/icons-material/Search'
import CloseIcon from '@mui/icons-material/Close'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'

// --- Mock data --------------------------------------------------------------

type LeadRow = {
    id: number
    donor: string
    project: string
    kakey: number
    manager: string
    createdAt: string // ISO string
}

const rowsSeed: LeadRow[] = [
    { id: 16, donor: 'მარინე დუმბაძე', project: 'პროექტი', kakey: 6, manager: 'ბათუმი', createdAt: '2023-04-18' },
    { id: 24, donor: 'იორგი გავაშვილი', project: 'დიდი პროექტი', kakey: 2, manager: 'დიდი ქალაქი', createdAt: '2023-04-18' },
    { id: 25, donor: 'ანა ჩხობოტია', project: 'ბაობა ბიი', kakey: 7, manager: 'დიდი ქალაქი', createdAt: '2023-04-18' },
    { id: 30, donor: 'ანა ჩხობოტია', project: 'გულოვანი', kakey: 4, manager: 'გლდანი', createdAt: '2023-04-18' },
    { id: 46, donor: 'მონიკა გაბუნია', project: 'პროექტი', kakey: 1, manager: 'სამხ. офисი', createdAt: '2023-04-18' },
    { id: 53, donor: 'ანა ჩხობოტია', project: 'პროექტი', kakey: 1, manager: 'სამხ. ოფისი', createdAt: '2023-07-20' },
    { id: 55, donor: 'ირმა გავაშა', project: 'პროექტი', kakey: 1, manager: 'სამხ. ოფისი', createdAt: '2023-08-02' },
    { id: 58, donor: 'მონიკა გაბუნია', project: 'გულოვანი', kakey: 4, manager: 'გლდანი', createdAt: '2023-09-29' },
    { id: 59, donor: 'ლიკა ბიბიჩე', project: 'ფონდჯელა', kakey: 5, manager: 'ფონდი', createdAt: '2023-09-29' },
    { id: 72, donor: 'მონიკა გაბუნია', project: 'ფონდჯელა', kakey: 5, manager: 'ფონდი', createdAt: '2023-10-17' },
    { id: 86, donor: 'მონიკა გაბუნია', project: 'დიდი პროექტი', kakey: 2, manager: 'დიდი ქალაქი', createdAt: '2023-10-18' },
    { id: 90, donor: 'ირაკლი გავაშა', project: 'გლდანი', kakey: 4, manager: 'გლდანი', createdAt: '2023-10-23' },
]

// --- Toolbar ---------------------------------------------------------------

type ToolbarProps = {
    title: string
    total: number
    from: Date | null
    to: Date | null
    onFromChange: (v: Date | null) => void
    onToChange: (v: Date | null) => void
    onAdd: () => void
    onRefresh: () => void
    onClearDates: () => void
}

function LeadsToolbar(props: ToolbarProps) {
    const { title, total, from, to, onFromChange, onToChange, onAdd, onRefresh, onClearDates } = props

    return (
        <GridToolbarContainer>
            <Stack direction="row" spacing={1} alignItems="center" sx={{ p: 1, width: '100%' }}>
                <Typography variant="h6" sx={{ mr: 1 }}>{title}</Typography>
                <Chip label={total} size="small" sx={{ mr: 1 }} />
                <Tooltip title="დამატება">
                    <Button startIcon={<AddIcon />} variant="contained" size="small" onClick={onAdd}>დამატება</Button>
                </Tooltip>
                <Tooltip title="განახლება">
                    <IconButton size="small" onClick={onRefresh}><RefreshIcon /></IconButton>
                </Tooltip>

                <Divider flexItem sx={{ mx: 1 }} />

                <SearchIcon fontSize="small" />
                <GridToolbarQuickFilter variant="outlined" size="small" placeholder="ძებნა" />

                <Divider flexItem orientation="vertical" sx={{ mx: 1 }} />

                <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <Stack direction="row" spacing={1} alignItems="center">
                        <DatePicker
                            value={from}
                            onChange={onFromChange}
                            slotProps={{ textField: { size: 'small', placeholder: 'mm/dd/yyyy' } }}
                        />
                        <DatePicker
                            value={to}
                            onChange={onToChange}
                            slotProps={{ textField: { size: 'small', placeholder: 'mm/dd/yyyy' } }}
                        />
                        {(from || to) && (
                            <Tooltip title="გასუფთავება">
                                <IconButton size="small" onClick={onClearDates}><CloseIcon fontSize="small" /></IconButton>
                            </Tooltip>
                        )}
                    </Stack>
                </LocalizationProvider>

                <Box sx={{ flexGrow: 1 }} />

                <GridToolbarColumnsButton />
                <GridToolbarDensitySelector />
                <GridToolbarExport csvOptions={{ fileName: 'leads' }} />
            </Stack>
        </GridToolbarContainer>
    )
}

// --- Main component ---------------------------------------------------------

export default function LeadsTable() {
    const [rows, setRows] = React.useState<LeadRow[]>(rowsSeed)
    const [from, setFrom] = React.useState<Date | null>(null)
    const [to, setTo] = React.useState<Date | null>(null)

    const columns = React.useMemo<GridColDef<LeadRow>[]>(
        () => [
            { field: 'id', headerName: 'ID', width: 90, filterable: true },
            {
                field: 'donor',
                headerName: 'დონორების სახელი',
                flex: 1.2,
                minWidth: 220,
                filterable: true,
            },
            {
                field: 'project',
                headerName: 'პროექტი',
                flex: 1,
                minWidth: 180,
            },
            { field: 'kakey', headerName: 'kakey', width: 100, type: 'number' },
            { field: 'manager', headerName: 'მენეჯერი', flex: 1, minWidth: 160 },
            {
                field: 'createdAt',
                headerName: 'თარიღი',
                width: 140,
                valueGetter: (params) => new Date(params.value as string),
                valueFormatter: (v) =>
                    v && v.value instanceof Date ? v.value.toLocaleDateString('en-US') : (v?.value as string),
                type: 'date',
                filterable: false,
            },
            {
                field: 'actions',
                headerName: 'ქმედებები',
                sortable: false,
                filterable: false,
                width: 120,
                renderCell: (params) => (
                    <Stack direction="row" spacing={0.5}>
                        <Tooltip title="რედაქტირება"><IconButton size="small" onClick={() => alert(`Edit #${params.row.id}`)}><EditIcon fontSize="small" /></IconButton></Tooltip>
                        <Tooltip title="წაშლა"><IconButton size="small" color="error" onClick={() => setRows((r) => r.filter((x) => x.id !== params.row.id))}><DeleteIcon fontSize="small" /></IconButton></Tooltip>
                    </Stack>
                ),
            },
        ],
        []
    )

    // Simple client-side date range filter
    const visibleRows = React.useMemo(() => {
        if (!from && !to) return rows
        const fromTime = from ? new Date(from.setHours(0, 0, 0, 0)).getTime() : -Infinity
        const toTime = to ? new Date(to.setHours(23, 59, 59, 999)).getTime() : Infinity
        return rows.filter((r) => {
            const t = new Date(r.createdAt).getTime()
            return t >= fromTime && t <= toTime
        })
    }, [rows, from, to])

    return (
        <Box sx={{ height: 640, width: '100%' }}>
            <DataGridPremium
                rows={visibleRows}
                columns={columns}
                checkboxSelection
                disableRowSelectionOnClick
                pagination
                pageSizeOptions={[10, 25, 50]}
                initialState={{
                    pagination: { paginationModel: { pageSize: 25, page: 0 } },
                    columns: { columnVisibilityModel: { kakey: true } },
                    filter: { filterModel: { items: [] } },
                }}
                slots={{
                    toolbar: () => (
                        <LeadsToolbar
                            title="შევყიდა"
                            total={visibleRows.length}
                            from={from}
                            to={to}
                            onFromChange={setFrom}
                            onToChange={setTo}
                            onAdd={() => alert('Add new row')}
                            onRefresh={() => window.location.reload()}
                            onClearDates={() => {
                                setFrom(null)
                                setTo(null)
                            }}
                        />
                    ),
                }}
                slotProps={{
                    toolbar: { showQuickFilter: true, quickFilterProps: { debounceMs: 400 } },
                }}
                sx={{
                    '& .MuiDataGrid-toolbarContainer': { borderBottom: '1px solid', borderColor: 'divider' },
                    '& .MuiDataGrid-columnHeaders': { bgcolor: 'background.paper' },
                }}
            />
        </Box>
    )
}
