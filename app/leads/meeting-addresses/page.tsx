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
import {
    Box,
    IconButton,
    Stack,
    Typography,
    Button,
    Tooltip,
    Divider,
    Chip,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
} from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import RefreshIcon from '@mui/icons-material/Refresh'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import SearchIcon from '@mui/icons-material/Search'
import CloseIcon from '@mui/icons-material/Close'
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined'
import PlaceIcon from '@mui/icons-material/Place'
import MapIcon from '@mui/icons-material/Map'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline'
import FilterListIcon from '@mui/icons-material/FilterList'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'

/* -------------------------------------------------------------------------- */
/*                               Mock data                                    */
/*  ეს უკვე „შეხვედრის მისამართების“ მონაცემებია – სად შეიძლება კლიენტმა     */
/*  შეხვედრა დანიშნოს აგენტთან.                                               */
/* -------------------------------------------------------------------------- */

type MeetingRow = {
    id: number
    address: string      // მისამართის/ლოკაციის დასახელება
    zone: string         // ზონა / ობიექტის ტიპი (ოფისი, მოლი და ა.შ.)
    kakey: number        // შიდა ka:key კოდი
    city: string         // ქალაქი / რეგიონი
    createdAt: string    // ISO თარიღი
}

const rowsSeed: MeetingRow[] = [
    {
        id: 16,
        address: 'თბილისი, პეკინის ქ. 12',
        zone: 'ოფისი - ცენტრალი',
        kakey: 6,
        city: 'თბილისი',
        createdAt: '2023-04-18',
    },
    {
        id: 24,
        address: 'თბილისი, ვაჟა-ფშაველას 71',
        zone: 'ოფისი - საბურთალო',
        kakey: 2,
        city: 'თბილისი',
        createdAt: '2023-04-18',
    },
    {
        id: 25,
        address: 'ბათუმი, გორგილაძის ქ. 45',
        zone: 'ფილიალი - ბათუმი',
        kakey: 7,
        city: 'ბათუმი',
        createdAt: '2023-04-18',
    },
    {
        id: 30,
        address: 'ქუთაისი, წერეთლის ქ. 3',
        zone: 'ფილიალი - ქუთაისი',
        kakey: 4,
        city: 'ქუთაისი',
        createdAt: '2023-04-18',
    },
    {
        id: 46,
        address: 'თბილისი, ელბაქიძის ჩასახვევი 2',
        zone: 'ოფისი - ვაკე',
        kakey: 1,
        city: 'თბილისი',
        createdAt: '2023-04-18',
    },
    {
        id: 53,
        address: 'თბილისი, აღმაშენებლის გამზირი 120',
        zone: 'ფილიალი - მარჯანიშვილი',
        kakey: 1,
        city: 'თბილისი',
        createdAt: '2023-07-20',
    },
    {
        id: 55,
        address: 'ბათუმი, ჭავჭავაძის ქ. 77',
        zone: 'შეხვედრის სივრცე',
        kakey: 1,
        city: 'ბათუმი',
        createdAt: '2023-08-02',
    },
    {
        id: 58,
        address: 'რუსთავი, მერიის მიმდებარედ',
        zone: 'გარე შეხვედრა',
        kakey: 4,
        city: 'რუსთავი',
        createdAt: '2023-09-29',
    },
    {
        id: 59,
        address: 'თბილისი, გლდანი, ხიზანიშვილის 15',
        zone: 'ფილიალი - გლდანი',
        kakey: 5,
        city: 'თბილისი',
        createdAt: '2023-09-29',
    },
    {
        id: 72,
        address: 'ქობულეთი, ცენტრალური პარკი',
        zone: 'გარე შეხვედრა',
        kakey: 5,
        city: 'ქობულეთი',
        createdAt: '2023-10-17',
    },
    {
        id: 86,
        address: 'თბილისი, სმარტი - ისანი',
        zone: 'შეხვედრა სავაჭრო ცენტრში',
        kakey: 2,
        city: 'თბილისი',
        createdAt: '2023-10-18',
    },
    {
        id: 90,
        address: 'თბილისი, ტაბახმელა - კაფე „ვიუ“',
        zone: 'გარე შეხვედრა',
        kakey: 4,
        city: 'თბილისი',
        createdAt: '2023-10-23',
    },
]

/* -------------------------------------------------------------------------- */
/*                                Helpers (docs)                              */
/* -------------------------------------------------------------------------- */

function Section({ title, children }: { title: string; children: React.ReactNode }) {
    return (
        <Box sx={{ mb: 2.5 }}>
            <Typography className={'title_font'}>{title}</Typography>
            {children}
        </Box>
    )
}

function Step({ icon, title, desc }: { icon: React.ReactNode; title: string; desc: React.ReactNode }) {
    return (
        <ListItem>
            <ListItemIcon>{icon}</ListItemIcon>
            <ListItemText primary={title} secondary={desc} />
        </ListItem>
    )
}

function Bullet({ title, children }: { title: string; children: React.ReactNode }) {
    return (
        <ListItem>
            <ListItemIcon>
                <InfoOutlinedIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText
                primary={title}
                secondary={
                    <Typography variant="body2" color="text.secondary">
                        {children}
                    </Typography>
                }
            />
        </ListItem>
    )
}

function SmallPrint() {
    return (
        <Box sx={{ color: 'text.secondary', fontSize: 12 }}>
            <b>შენიშვნა:</b> მისამართების შეცვლის შემდეგ გადაამოწმე, რომ ახალი სია სწორად ჩანს
            შეხვედრის შექმნის ფორმებში (მაგ.: „შეხვედრის ადგილმდებარეობა“ dropdown-ში).
        </Box>
    )
}

/* -------------------------------------------------------------------------- */
/*                                Toolbar                                     */
/* -------------------------------------------------------------------------- */

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

function MeetingToolbar(props: ToolbarProps) {
    const { title, total, from, to, onFromChange, onToChange, onAdd, onRefresh, onClearDates } = props

    return (
        <GridToolbarContainer>
            <Stack direction="row" spacing={1} alignItems="center" sx={{ p: 1, width: '100%' }}>
                <Typography variant="h6" sx={{ mr: 1 }}>
                    {title}
                </Typography>
                <Chip label={total} size="small" sx={{ mr: 1 }} />

                <Tooltip title="ახალი მისამართის დამატება">
                    <Button startIcon={<AddIcon />} variant="contained" size="small" onClick={onAdd}>
                        დამატება
                    </Button>
                </Tooltip>

                <Tooltip title="განახლება">
                    <IconButton size="small" onClick={onRefresh}>
                        <RefreshIcon />
                    </IconButton>
                </Tooltip>

                <Divider flexItem sx={{ mx: 1 }} />

                <SearchIcon fontSize="small" />
                <GridToolbarQuickFilter variant="outlined" size="small" placeholder="ძებნა მისამართით ან ქალაქით" />

                <Divider flexItem orientation="vertical" sx={{ mx: 1 }} />

                <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <Stack direction="row" spacing={1} alignItems="center">
                        <DatePicker
                            value={from}
                            onChange={onFromChange}
                            slotProps={{
                                textField: { size: 'small', placeholder: 'mm/dd/yyyy' },
                            }}
                        />
                        <DatePicker
                            value={to}
                            onChange={onToChange}
                            slotProps={{
                                textField: { size: 'small', placeholder: 'mm/dd/yyyy' },
                            }}
                        />
                        {(from || to) && (
                            <Tooltip title="თარიღების გაწმენდა">
                                <IconButton size="small" onClick={onClearDates}>
                                    <CloseIcon fontSize="small" />
                                </IconButton>
                            </Tooltip>
                        )}
                    </Stack>
                </LocalizationProvider>

                <Box sx={{ flexGrow: 1 }} />

                <GridToolbarColumnsButton />
                <GridToolbarDensitySelector />
                <GridToolbarExport csvOptions={{ fileName: 'meeting-addresses' }} />
            </Stack>
        </GridToolbarContainer>
    )
}

/* -------------------------------------------------------------------------- */
/*                              Main component                                */
/* -------------------------------------------------------------------------- */

export default function LeadsTable() {
    const [rows, setRows] = React.useState<MeetingRow[]>(rowsSeed)
    const [from, setFrom] = React.useState<Date | null>(null)
    const [to, setTo] = React.useState<Date | null>(null)

    const columns = React.useMemo<GridColDef<MeetingRow>[]>(
        () => [
            { field: 'id', headerName: 'ID', width: 90, filterable: true },
            {
                field: 'address',
                headerName: 'მისამართი',
                flex: 1.4,
                minWidth: 260,
                filterable: true,
            },
            {
                field: 'zone',
                headerName: 'ლოკაცია / ზონა',
                flex: 1,
                minWidth: 200,
                filterable: true,
            },
            { field: 'kakey', headerName: 'ka:key', width: 100, type: 'number' },
            {
                field: 'city',
                headerName: 'ქალაქი / რეგიონი',
                flex: 0.9,
                minWidth: 160,
            },
            {
                field: 'createdAt',
                headerName: 'დამატების თარიღი',
                width: 160,
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
                        <Tooltip title="რედაქტირება">
                            <IconButton
                                size="small"
                                onClick={() => alert(`Edit meeting address #${params.row.id}`)}
                            >
                                <EditIcon fontSize="small" />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="წაშლა">
                            <IconButton
                                size="small"
                                color="error"
                                onClick={() => setRows((r) => r.filter((x) => x.id !== params.row.id))}
                            >
                                <DeleteIcon fontSize="small" />
                            </IconButton>
                        </Tooltip>
                    </Stack>
                ),
            },
        ],
        [setRows]
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
        <>
            {/* გვერდის ფუნქცია */}
            <Section title="გვერდის ფუნქცია">
                <Typography variant="body2" color="text.secondary">
                    ეს გვერდი გამოიყენება <b>შეხვედრის მისამართების სიის სამართავად</b> – ადგილები, სადაც
                    კლიენტს შეუძლია შეხვდეს გაყიდვების აგენტს (ოფისი, ფილიალი, სავაჭრო ცენტრი, გარე სივრცე და სხვ.).
                    <br />
                    <br />
                    ცხრილში თითოეული სტრიქონი წარმოადგენს ერთ კონკრეტულ ლოკაციას, რომელიც შემდგომ გამოიყენება
                    შეხვედრის შექმნის ფორმებში, როგორც არჩევანი „სად გაიმართება შეხვედრა“.
                </Typography>
            </Section>

            <Divider sx={{ my: 3 }} />

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
                            <MeetingToolbar
                                title="შეხვედრის მისამართები"
                                total={visibleRows.length}
                                from={from}
                                to={to}
                                onFromChange={setFrom}
                                onToChange={setTo}
                                onAdd={() => alert('Add new meeting address')}
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
                        '& .MuiDataGrid-toolbarContainer': {
                            borderBottom: '1px solid',
                            borderColor: 'divider',
                        },
                        '& .MuiDataGrid-columnHeaders': { bgcolor: 'background.paper' },
                    }}
                />
            </Box>

            {/* --- დოკუმენტაცია / User Guide — OrcImport სტილში --- */}
            <Divider sx={{ my: 3 }} />

            <section>
                {/* გამოყენების ინსტრუქცია */}
                <Section title="გამოყენების ინსტრუქცია">
                    <List dense>
                        <Step
                            icon={<PlaceIcon />}
                            title="მიმდინარე მისამართების ნახვა"
                            desc={
                                <>
                                    ცხრილში ხედავ ყველა აქტიურ მისამართს – <b>მისამართი</b>,{' '}
                                    <b>ლოკაცია/ზონა</b>, <b>ქალაქი</b>, <b>ka:key</b> და{' '}
                                    <b>დამატების თარიღი</b>.
                                </>
                            }
                        />
                        <Step
                            icon={<AddIcon />}
                            title="ახალი შეხვედრის მისამართის დამატება"
                            desc={
                                <>
                                    ზედა მარცხენა მხარეს მდებარე ღილაკით <b>„დამატება“</b> შექმენი ახალი ლოკაცია.
                                    ჩვეულებრივ გახსნის მოდალს/ფორმას, სადაც შეიყვან:
                                    მისამართს, ქალაქს, ზონას და საჭირო დამატებით ინფორმაციას.
                                </>
                            }
                        />
                        <Step
                            icon={<EditIcon />}
                            title="მისამართის რედაქტირება"
                            desc={
                                <>
                                    თითოეული სტრიქონის ბოლოს აიქონით <b>✏ (რედაქტირება)</b> შეგიძლია შეცვალო
                                    არსებული ლოკაციის დეტალები – მაგალითად, ქუჩის სახელი ან ზონის აღწერა.
                                </>
                            }
                        />
                        <Step
                            icon={<DeleteIcon color="error" />}
                            title="მისამართის წაშლა"
                            desc={
                                <>
                                    <b>წაშლის აიქონი</b> შლის ლოკაციას სიიდან. სასურველია გამოიყენო მხოლოდ მაშინ,
                                    როდესაც მისამართი სრულად აღარ გამოიყენება. ალტერნატივად, სისტემაში შეიძლება
                                    გქონდეს „სტატუსის“ გამორთვა.
                                </>
                            }
                        />
                        <Step
                            icon={<MapIcon />}
                            title="მისამართების დაფილტვრა ქალაქით და თარიღით"
                            desc={
                                <>
                                    ზედა პანელში შეგიძლია გამოიყენო <b>სწრაფი ძებნა</b> (ქუჩის, ქალაქის ან ზონის
                                    მიხედვით) და <b>თარიღის ფილტრები</b>, რომ ნახო მხოლოდ გარკვეულ პერიოდში დამატებული
                                    ადგილები.
                                </>
                            }
                        />
                    </List>
                </Section>

                <Divider sx={{ my: 3 }} />

                {/* ველების აღწერა */}
                <Section title="ველების აღწერა">
                    <List dense>
                        <Bullet title="მისამართი">
                            სრული აღწერა, სადაც მიმდინარეობს შეხვედრა – ქალაქი + ქუჩა + ნომერი (ან ობიექტის
                            დასახელება, თუ საკმარისად ცნობადია).
                        </Bullet>
                        <Bullet title="ლოკაცია / ზონა">
                            მოკლე აღწერა, რა ტიპის ადგილია: „ოფისი - ცენტრალი“, „ფილიალი - ბათუმი“, „გარე
                            შეხვედრა“, „შეხვედრა მოლში“ და ა.შ.
                        </Bullet>
                        <Bullet title="ka:key">
                            შიდა იდენტიფიკატორი (ზარის სისტემასთან, კამპანიებთან ან სხვა მოდულებთან შესაკავშირებლად).
                            ამ მნიშვნელობის შეცვლა გააკეთე მხოლოდ მკაფიო საჭიროების შემთხვევაში.
                        </Bullet>
                        <Bullet title="ქალაქი / რეგიონი">
                            ქალაქი ან რეგიონი, სადაც ეს მისამართი მდებარეობს. ეხმარება ოპერატორებს სწრაფად
                            მოძებნონ კლიენტთან ყველაზე ახლო ლოკაცია.
                        </Bullet>
                        <Bullet title="დამატების თარიღი">
                            როდის შეიქმნა ჩანაწერი. გამოიყენება მონიტორინგისთვის ან ძველი/არაქტუალური
                            მისამართების გასასუფთავებლად.
                        </Bullet>
                    </List>
                </Section>

                <Divider sx={{ my: 3 }} />

                {/* კარგი პრაქტიკები */}
                <Section title="კარგი პრაქტიკები">
                    <List dense>
                        <Bullet title="ადვილი გასაგები სახელები">
                            მისამართისა და ზონის ტექსტი უნდა იყოს ისეთი, რომ ოპერატორმა ერთი შეხედვით მიხვდეს,
                            სად არის ლოკაცია და რა ტიპის შეხვედრა ტარდება.
                        </Bullet>
                        <Bullet title="ქალაქების მიხედვით ჯგუფირება">
                            დიდი რაოდენობის მისამართის შემთხვევაში სასურველია დასახელებაში ან ზონაში
                            ჩაწერო ქალაქი, რომ ძებნა უფრო მარტივი გახდეს (მაგ.: „[თბილისი] პეკინის 12“).
                        </Bullet>
                        <Bullet title="არ მოაშორო მისამართი, თუ ისტორიულად საჭიროა">
                            თუ მისამართს აქვს ისტორიული შეხვედრები, მის წაშლას შეიძლება მოჰყვეს
                            „დაკარგული“ მონაცემები რეპორტებში. ასეთ შემთხვევებში სჯობს მხოლოდ დეაქტივაცია.
                        </Bullet>
                        <Bullet title="ფილტრებისა და ძებნის აქტიური გამოყენება">
                            ზარის ცენტრსა და გაყიდვებში ხშირად საჭიროა სწრაფად ნახო „თბილისის ყველა ოფისი“ ან
                            „გარე შეხვედრის ადგილები“. გამოიყენე სწრაფი ძებნა და თარიღის ფილტრები ამისთვის.
                        </Bullet>
                    </List>
                </Section>

                <Divider sx={{ my: 3 }} />

                <SmallPrint />
            </section>
        </>
    )
}








// 'use client'
//
// import * as React from 'react'
// import {
//     DataGridPremium,
//     GridColDef,
//     GridToolbarContainer,
//     GridToolbarColumnsButton,
//     GridToolbarDensitySelector,
//     GridToolbarExport,
//     GridToolbarQuickFilter,
// } from '@mui/x-data-grid-premium'
// import { Box, IconButton, Stack, Typography, Button, Tooltip, Divider, Chip } from '@mui/material'
// import AddIcon from '@mui/icons-material/Add'
// import RefreshIcon from '@mui/icons-material/Refresh'
// import EditIcon from '@mui/icons-material/Edit'
// import DeleteIcon from '@mui/icons-material/Delete'
// import SearchIcon from '@mui/icons-material/Search'
// import CloseIcon from '@mui/icons-material/Close'
// import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
// import { DatePicker } from '@mui/x-date-pickers/DatePicker'
//
// // --- Mock data --------------------------------------------------------------
//
// type LeadRow = {
//     id: number
//     donor: string
//     project: string
//     kakey: number
//     manager: string
//     createdAt: string // ISO string
// }
//
// const rowsSeed: LeadRow[] = [
//     { id: 16, donor: 'მარინე დუმბაძე', project: 'პროექტი', kakey: 6, manager: 'ბათუმი', createdAt: '2023-04-18' },
//     { id: 24, donor: 'იორგი გავაშვილი', project: 'დიდი პროექტი', kakey: 2, manager: 'დიდი ქალაქი', createdAt: '2023-04-18' },
//     { id: 25, donor: 'ანა ჩხობოტია', project: 'ბაობა ბიი', kakey: 7, manager: 'დიდი ქალაქი', createdAt: '2023-04-18' },
//     { id: 30, donor: 'ანა ჩხობოტია', project: 'გულოვანი', kakey: 4, manager: 'გლდანი', createdAt: '2023-04-18' },
//     { id: 46, donor: 'მონიკა გაბუნია', project: 'პროექტი', kakey: 1, manager: 'სამხ. офисი', createdAt: '2023-04-18' },
//     { id: 53, donor: 'ანა ჩხობოტია', project: 'პროექტი', kakey: 1, manager: 'სამხ. ოფისი', createdAt: '2023-07-20' },
//     { id: 55, donor: 'ირმა გავაშა', project: 'პროექტი', kakey: 1, manager: 'სამხ. ოფისი', createdAt: '2023-08-02' },
//     { id: 58, donor: 'მონიკა გაბუნია', project: 'გულოვანი', kakey: 4, manager: 'გლდანი', createdAt: '2023-09-29' },
//     { id: 59, donor: 'ლიკა ბიბიჩე', project: 'ფონდჯელა', kakey: 5, manager: 'ფონდი', createdAt: '2023-09-29' },
//     { id: 72, donor: 'მონიკა გაბუნია', project: 'ფონდჯელა', kakey: 5, manager: 'ფონდი', createdAt: '2023-10-17' },
//     { id: 86, donor: 'მონიკა გაბუნია', project: 'დიდი პროექტი', kakey: 2, manager: 'დიდი ქალაქი', createdAt: '2023-10-18' },
//     { id: 90, donor: 'ირაკლი გავაშა', project: 'გლდანი', kakey: 4, manager: 'გლდანი', createdAt: '2023-10-23' },
// ]
//
// // --- Toolbar ---------------------------------------------------------------
//
// type ToolbarProps = {
//     title: string
//     total: number
//     from: Date | null
//     to: Date | null
//     onFromChange: (v: Date | null) => void
//     onToChange: (v: Date | null) => void
//     onAdd: () => void
//     onRefresh: () => void
//     onClearDates: () => void
// }
//
// function LeadsToolbar(props: ToolbarProps) {
//     const { title, total, from, to, onFromChange, onToChange, onAdd, onRefresh, onClearDates } = props
//
//     return (
//         <GridToolbarContainer>
//             <Stack direction="row" spacing={1} alignItems="center" sx={{ p: 1, width: '100%' }}>
//                 <Typography variant="h6" sx={{ mr: 1 }}>{title}</Typography>
//                 <Chip label={total} size="small" sx={{ mr: 1 }} />
//                 <Tooltip title="დამატება">
//                     <Button startIcon={<AddIcon />} variant="contained" size="small" onClick={onAdd}>დამატება</Button>
//                 </Tooltip>
//                 <Tooltip title="განახლება">
//                     <IconButton size="small" onClick={onRefresh}><RefreshIcon /></IconButton>
//                 </Tooltip>
//
//                 <Divider flexItem sx={{ mx: 1 }} />
//
//                 <SearchIcon fontSize="small" />
//                 <GridToolbarQuickFilter variant="outlined" size="small" placeholder="ძებნა" />
//
//                 <Divider flexItem orientation="vertical" sx={{ mx: 1 }} />
//
//                 <LocalizationProvider dateAdapter={AdapterDateFns}>
//                     <Stack direction="row" spacing={1} alignItems="center">
//                         <DatePicker
//                             value={from}
//                             onChange={onFromChange}
//                             slotProps={{ textField: { size: 'small', placeholder: 'mm/dd/yyyy' } }}
//                         />
//                         <DatePicker
//                             value={to}
//                             onChange={onToChange}
//                             slotProps={{ textField: { size: 'small', placeholder: 'mm/dd/yyyy' } }}
//                         />
//                         {(from || to) && (
//                             <Tooltip title="გასუფთავება">
//                                 <IconButton size="small" onClick={onClearDates}><CloseIcon fontSize="small" /></IconButton>
//                             </Tooltip>
//                         )}
//                     </Stack>
//                 </LocalizationProvider>
//
//                 <Box sx={{ flexGrow: 1 }} />
//
//                 <GridToolbarColumnsButton />
//                 <GridToolbarDensitySelector />
//                 <GridToolbarExport csvOptions={{ fileName: 'leads' }} />
//             </Stack>
//         </GridToolbarContainer>
//     )
// }
//
// // --- Main component ---------------------------------------------------------
//
// export default function LeadsTable() {
//     const [rows, setRows] = React.useState<LeadRow[]>(rowsSeed)
//     const [from, setFrom] = React.useState<Date | null>(null)
//     const [to, setTo] = React.useState<Date | null>(null)
//
//     const columns = React.useMemo<GridColDef<LeadRow>[]>(
//         () => [
//             { field: 'id', headerName: 'ID', width: 90, filterable: true },
//             {
//                 field: 'donor',
//                 headerName: 'დონორების სახელი',
//                 flex: 1.2,
//                 minWidth: 220,
//                 filterable: true,
//             },
//             {
//                 field: 'project',
//                 headerName: 'პროექტი',
//                 flex: 1,
//                 minWidth: 180,
//             },
//             { field: 'kakey', headerName: 'kakey', width: 100, type: 'number' },
//             { field: 'manager', headerName: 'მენეჯერი', flex: 1, minWidth: 160 },
//             {
//                 field: 'createdAt',
//                 headerName: 'თარიღი',
//                 width: 140,
//                 valueGetter: (params) => new Date(params.value as string),
//                 valueFormatter: (v) =>
//                     v && v.value instanceof Date ? v.value.toLocaleDateString('en-US') : (v?.value as string),
//                 type: 'date',
//                 filterable: false,
//             },
//             {
//                 field: 'actions',
//                 headerName: 'ქმედებები',
//                 sortable: false,
//                 filterable: false,
//                 width: 120,
//                 renderCell: (params) => (
//                     <Stack direction="row" spacing={0.5}>
//                         <Tooltip title="რედაქტირება"><IconButton size="small" onClick={() => alert(`Edit #${params.row.id}`)}><EditIcon fontSize="small" /></IconButton></Tooltip>
//                         <Tooltip title="წაშლა"><IconButton size="small" color="error" onClick={() => setRows((r) => r.filter((x) => x.id !== params.row.id))}><DeleteIcon fontSize="small" /></IconButton></Tooltip>
//                     </Stack>
//                 ),
//             },
//         ],
//         []
//     )
//
//     // Simple client-side date range filter
//     const visibleRows = React.useMemo(() => {
//         if (!from && !to) return rows
//         const fromTime = from ? new Date(from.setHours(0, 0, 0, 0)).getTime() : -Infinity
//         const toTime = to ? new Date(to.setHours(23, 59, 59, 999)).getTime() : Infinity
//         return rows.filter((r) => {
//             const t = new Date(r.createdAt).getTime()
//             return t >= fromTime && t <= toTime
//         })
//     }, [rows, from, to])
//
//     return (
//         <Box sx={{ height: 640, width: '100%' }}>
//             <DataGridPremium
//                 rows={visibleRows}
//                 columns={columns}
//                 checkboxSelection
//                 disableRowSelectionOnClick
//                 pagination
//                 pageSizeOptions={[10, 25, 50]}
//                 initialState={{
//                     pagination: { paginationModel: { pageSize: 25, page: 0 } },
//                     columns: { columnVisibilityModel: { kakey: true } },
//                     filter: { filterModel: { items: [] } },
//                 }}
//                 slots={{
//                     toolbar: () => (
//                         <LeadsToolbar
//                             title="შევყიდა"
//                             total={visibleRows.length}
//                             from={from}
//                             to={to}
//                             onFromChange={setFrom}
//                             onToChange={setTo}
//                             onAdd={() => alert('Add new row')}
//                             onRefresh={() => window.location.reload()}
//                             onClearDates={() => {
//                                 setFrom(null)
//                                 setTo(null)
//                             }}
//                         />
//                     ),
//                 }}
//                 slotProps={{
//                     toolbar: { showQuickFilter: true, quickFilterProps: { debounceMs: 400 } },
//                 }}
//                 sx={{
//                     '& .MuiDataGrid-toolbarContainer': { borderBottom: '1px solid', borderColor: 'divider' },
//                     '& .MuiDataGrid-columnHeaders': { bgcolor: 'background.paper' },
//                 }}
//             />
//         </Box>
//     )
// }
