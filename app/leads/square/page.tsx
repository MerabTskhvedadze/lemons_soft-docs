"use client";

import {
    Box,
    Typography,
    IconButton,
    TextField,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Chip,
    Divider
} from '@mui/material';

import {
    MdInfoOutline,
    MdFilterList,
    MdSearch,
    MdDateRange,
    MdEdit,
    MdDeleteForever,
    MdGridOn
} from 'react-icons/md';

import * as React from "react";
import {DataGridPremium, GridColDef, GridRenderCellParams} from "@mui/x-data-grid-premium";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import {FilterInput} from "@/components/FilterInput";
import {ScrollTrailText} from "@/animations/ScrollTrailText";
import {Button} from "@/components/ui/button";
import {Separator} from "@/components/ui/separator"

// ---- Mock data (exactly as in the screenshot) ----
type Row = { id: number; name: string; date: string };

const rows: Row[] = [
    {id: 7, name: "დალაქები", date: "3/12/2025"},
    {id: 6, name: "არტემდინე", date: "3/12/2025"},
    {id: 5, name: "ხველება", date: "1/13/2023"},
    {id: 4, name: "კომენტარი", date: "1/13/2023"},
    {id: 3, name: "80+(საშინლად ბნელი)", date: "1/11/2023"},
    {id: 2, name: "50-59(ორბი საბავშვო)", date: "1/11/2023"},
    {id: 1, name: "34-54(ზემო საბავშვო)", date: "1/11/2023"},
];

// ---- Columns ----
const ACTIONS_COL_FIELD = "actions";

const columns: GridColDef[] = [
    {
        field: "id",
        headerName: "ID",
        width: 110,
        sortable: true,
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

function ProjectsAreasDoc() {
    return (
        <Box sx={{pl: 2.5,}}>
            <Divider sx={{my: 1.75}}/>

            <Typography className={'title_font'}>
                ცხრილის სტრუქტურა
            </Typography>
            <List dense>
                <Tip
                    icon={<MdGridOn/>}
                    title="სვეტები"
                    desc={
                        <>
                            <Chip size="small" label="სახელი"/> და <Chip size="small" label="თარიღი"/>.
                            „სახელი“ სახელის სვეტში მოცემულია პროექტის ფართობები
                        </>
                    }
                />
                <Tip
                    icon={<MdFilterList/>}
                    title="ფილტრაცია სვეტებიდან"
                    desc={
                        <>
                            <b>სახელზე</b> - ტექსტური ძებნა<InlineIcon><MdSearch/></InlineIcon>,{' '}
                            <b>თარიღი</b> - აირჩიეთ დიაპაზონი კალენდარით <InlineIcon><MdDateRange/></InlineIcon>.
                        </>
                    }
                />
                <Tip
                    icon={<MdEdit/>}
                    title="რედაქტირება"
                    desc="ფანქრის ღილაკით შეგიძლიათ პროექტის რედაქტირება."
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

export default function Square() {
    return (
        <>
            {/* overview */}
            <header className=" flex flex-col gap-3">
                <div className={'flex items-center gap-3'}>
                    <ScrollTrailText className={'title_font text-lg'}>🔹 გვერდის დანიშნულება</ScrollTrailText>
                </div>

                <ScrollTrailText className="pl-5">
                    გვერდი წარმოადგენს <b>პროექტების სიას</b> და მათ შესაბამის <b>ფართობებს (m²)</b>.
                    ჩანაწერები მოდის ცენტრალური მონაცემთა წყაროდან.
                </ScrollTrailText>
            </header>


            <Separator className="my-4 bg-transparent" />
            <ProjectsAreasDoc />
            <Separator className="my-4 bg-transparent" />

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
                    sorting: {sortModel: [{field: "id", sort: "desc"}]},
                    pagination: {paginationModel: {pageSize: 25, page: 0}},
                }}
                pageSizeOptions={[25, 50, 100]}
                slotProps={{toolbar: {showQuickFilter: true, quickFilterProps: {debounceMs: 300}}}}
            />
        </>
    );
}
