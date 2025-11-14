"use client";

import * as React from "react";
import {DataGridPremium, GridColDef, GridRenderCellParams} from "@mui/x-data-grid-premium";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import {FilterInput} from "@/components/FilterInput";
import {ScrollTrailText} from "@/animations/ScrollTrailText";
import {Separator} from "@/components/ui/separator"
import {Dropdown} from "@/components/Dropdown";

import {
    MdInfoOutline,
    MdFilterList,
    MdSearch,
    MdDateRange,
    MdEdit,
    MdDeleteForever,
    MdLocalOffer
} from 'react-icons/md';

import {
    Box,
    Typography,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Chip,
    Divider,
    IconButton,
    TextField
} from '@mui/material';


// ---- Mock data (exactly as in the screenshot) ----
type Row = { id: number; name: string; status: string; date: string };

const rows: Row[] = [
    {id: 7, name: "დალაქები", status: 'აქტიური', date: "3/12/2025"},
    {id: 3, name: "80+(საშინლად ბნელი)", status: 'არა აქტიური', date: "1/11/2023"},
    {id: 6, name: "არტემდინე", status: 'აქტიური', date: "3/12/2025"},
    {id: 5, name: "ხველება", status: 'აქტიური', date: "1/13/2023"},
    {id: 2, name: "50-59(ორბი საბავშვო)", status: 'არა აქტიური', date: "1/11/2023"},
    {id: 4, name: "კომენტარი", status: 'აქტიური', date: "1/13/2023"},
    {id: 1, name: "34-54(ზემო საბავშვო)", status: 'არა აქტიური', date: "1/11/2023"},
];

// ---- Columns ----
const ACTIONS_COL_FIELD = "actions";

const columns: GridColDef[] = [
    {
        field: "id",
        headerName: "ID",
        width: 87,
        renderHeaderFilter: () => null
    },
    {
        field: "name",
        headerName: "სახელი",
        flex: 1,
        minWidth: 220,
        sortable: false,
        renderHeaderFilter: () => {
            return <FilterInput onChange={(e) => console.log(e)}/>
        }
    },
    {
        field: "status",
        headerName: "სტატუსი",
        flex: 1,
        minWidth: 220,
        sortable: false,
        renderHeaderFilter: () => <Dropdown
            value={'all'}
            options={[{value: 'active', label: 'აქტიური'}, {value: 'inactive', label: 'არა აქტიური'}]}
            onChange={(e) => console.log(e)}
        />

    },
    {
        field: "date",
        headerName: "თარიღი",
        width: 180,
        sortable: false,
        renderHeaderFilter: () => <TextField type="date" id="date" variant={'standard'}/>

    },
    {
        field: ACTIONS_COL_FIELD,
        headerName: "",
        width: 110,
        sortable: false,
        filterable: false,
        disableColumnMenu: true,
        align: "right",
        headerAlign: "right",
        renderCell: (params: GridRenderCellParams) => (
            <Box sx={{pr: 1}}>
                <IconButton size="small" aria-label={`edit row ${params.id}`}>
                    <EditIcon fontSize="small"/>
                </IconButton>
                <IconButton size="small" aria-label={`delete row ${params.id}`}>
                    <DeleteIcon fontSize="small"/>
                </IconButton>
            </Box>
        ),
        // add a class so we can paint the light blue band like the screenshot
        cellClassName: "actionsCol",
        headerClassName: "actionsColHeader",
    },
];

function PromotionsDoc() {
    return (
        <Box sx={{pl: 2.5}}>
            <Typography className={'title_font'}>
                სვეტები
            </Typography>
            <List dense>
                <Tip
                    icon={<MdLocalOffer/>}
                    title={"სახელი"}
                    desc={
                        <div className={'mt-1'}>
                            <Chip size="small" label="სახელი"/> - პროექტის სახელწოდება.
                        </div>
                    }
                />
                <Tip
                    icon={<MdInfoOutline/>}
                    title="სტატუსი"
                    desc={
                        <div className={'mt-1'}>
                            <Chip size="small" label="აქტიური"/> - სტატუსი აქტიური ნიშნავს რომ აქცია მოქმედებს კონკრეტულ პროექტზე;
                            <span className={'block my-2'}/>
                            <Chip size="small" label="არა აქტიური"/> - არა აქტიური სტატუსით მონიშნულია ის პროექტები რომლებზეც არ გვაქვს მიმდინარე აქცია.
                        </div>
                    }
                />
                <Tip
                    icon={<MdDateRange/>}
                    title="თარიღი"
                    desc="ჩანაწერის შექმნის ან განახლების თარიღი."
                />
            </List>

            <Divider sx={{my: 1.5}}/>

            <Typography className={'title_font'}>
                ცხრილის პრინციპები
            </Typography>
            <List dense>
                <Tip
                    icon={<MdFilterList/>}
                    title="ფილტრაცია სვეტებიდან"
                    desc={
                        <>
                            <b>სახელი</b> - ტექსტური ძებნა <InlineIcon><MdSearch/></InlineIcon>. {' '}
                            <b>სტატუსი</b> - ჩამოსაშლელით „აქტიური/არა აქტიური“.{' '}
                            <b>თარიღი</b> - აირჩიეთ კალენდარით <InlineIcon><MdDateRange/></InlineIcon>.
                        </>
                    }
                />
                <Tip
                    icon={<MdEdit/>}
                    title="რედაქტირება"
                    desc="სვეტში ფანქრის ღილაკით შეგვიძლია დავარედაქტიროთ რიგები(აღწერა/სახელი/სტატუსი)."
                />
                <Tip
                    icon={<MdDeleteForever/>}
                    title="წაშლა"
                    desc="ნაგვის ყუთის ღილაკი შლის ჩანაწერს."
                />
            </List>
        </Box>
    );
}

/* helpers */
function Tip({icon, title, desc}: { icon: React.ReactNode; title: string; desc: React.ReactNode }) {
    return (
        <ListItem>
            <ListItemIcon>{icon}</ListItemIcon>
            <ListItemText
                primary={title}
                secondary={<Typography variant="body2" color="text.secondary">{desc}</Typography>}
            />
        </ListItem>
    );
}

function InlineIcon({children}: { children: React.ReactNode }) {
    return <Box component="span" sx={{display: 'inline-flex', verticalAlign: 'middle', mx: 0.25}}>{children}</Box>;
}

export default function Promotions() {
    return (
        <>
            {/* overview */}
            <header className=" flex flex-col gap-3">
                <div className={'flex items-center gap-3'}>
                    <ScrollTrailText className={'title_font text-lg'}>🔹 გვერდის დანიშნულება</ScrollTrailText>
                </div>

                <ScrollTrailText className="pl-5">
                    ეს გვერდი წარმოადგენს <b>აქციების/კამპანიების სიას</b>, რომლებსაც იყენებთ სისტემაში (მაგ. ლიდების
                    მონიშვნა, ფილტრაცია, რეპორტინგი).
                    აქ შეგიძლიათ სწრაფი <i>ფილტრაცია</i>, <i>დათვალიერება</i> და საბაზისო <i>მართვა</i>.
                </ScrollTrailText>
            </header>

            <Separator className="my-4 bg-transparent"/>
            <DataGridPremium
                headerFilters
                rows={rows}
                columns={columns}
                showColumnVerticalBorder
                checkboxSelection
                disableRowSelectionOnClick
                disableColumnFilter
                disableDensitySelector
                initialState={{
                    // sorting: {sortModel: [{field: "id", sort: "desc"}]},
                    pagination: {paginationModel: {pageSize: 25, page: 0}},
                }}
                pageSizeOptions={[25, 50, 100]}
                slotProps={{toolbar: {showQuickFilter: true, quickFilterProps: {debounceMs: 300}}}}
            />
            <Separator className="my-4 bg-transparent"/>

            <PromotionsDoc/>
        </>
    );
}
