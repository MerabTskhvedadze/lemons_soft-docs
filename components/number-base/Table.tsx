'use client';

import React, {useState} from 'react';
import {
    ColumnsPanelTrigger,
    DataGridPremium,
    GRID_CHECKBOX_SELECTION_COL_DEF,
    GridColDef,
    GridRowId,
    GridRowModes,
    GridRowModesModel,
    Toolbar,
    ToolbarButton,
    useGridApiRef,
    ExportCsv,
    GridRowEditStopParams,
    GridRowEditStopReasons
} from '@mui/x-data-grid-premium';

import {Box, IconButton, Tooltip} from '@mui/material';

import {
    MdAddBox,
    MdViewColumn,
    MdEdit,
    MdDelete,
    MdSave,
    MdCancel,
    MdOutlineSaveAlt,
    MdCloudUpload,
    MdFileCopy,
    MdRefresh,
    MdCached, MdSearch
} from 'react-icons/md';

import {Tooltip as CToolTip} from '@/components/tooltip'

import {Dropdown, FilterInput} from '../'

import {DatePicker} from 'antd'
import {Button} from "@/components/ui/button";
import {TextField} from '@mui/material'
import {driver} from 'driver.js';
import 'driver.js/dist/driver.css';
import {useCursor} from "@/context/cursor-context";

import {
    MoveModal,
    SearchModal,
    SplitModal,
    AnalyzesModal,
    MyLiddyModal,
    RequestLiddyModal,
    ReplaceModal
} from '@/components/modals'

interface RowData {
    id: number;
    phone: string;
    status: string;
    subStatus: number | null;
    area_id: number | null;
    name: string;
    comment: string;
    call_date: string;
    liddy_status: number | null;
    share_id: number | null;
    sale_manager_id: number | null;
    operator: string;
    projects: number | null;
    answer: string | null;
    call_status: number | null;
    meeting_address_id: number | null;
    lang: number | null;
    w_v: number | null;
    active: number;
    from_user_id: number | null;
    created_at: string;
    updated_at: string;
    isNew?: boolean;
}

type TourItem = {
    id: string;                 // DOM id like "tour-filter-phone" or "tour-btn-export"
    title: string;
    description: string;
    side?: 'top' | 'bottom' | 'left' | 'right';
    field?: string;             // DataGrid column field for auto-scroll (optional)
};

type DriverTarget = string | Element | (() => Element);

export default function Table({modals, hideCustomTooltip}: { modals?: React.ReactNode, hideCustomTooltip?: boolean }) {
    const {setCursor} = useCursor()
    const {RangePicker} = DatePicker
    const apiRef = useGridApiRef();
    const [paginationModel, setPaginationModel] = useState({page: 0, pageSize: 30});
    const [rows, setRows] = useState<RowData[]>([]);
    const [rowModesModel, setRowModesModel] = useState<GridRowModesModel>({});

    // ---------- small helper to attach tour ids ----------
    const withTourId = (
        id: string,
        node: React.ReactNode
    ) => {
        const desc = hoverDesc(id);

        const onEnter = () => {
            if (!desc) return;
            setCursor(
                <CToolTip title={desc.title} description={desc.description}/>
            );
        };

        const onLeave = () => setCursor(null);

        return (
            <div
                id={id}
                className="inline-flex w-full h-full items-center"
                onMouseEnter={onEnter}
                onMouseLeave={onLeave}
            >
                {node}
            </div>
        );
    };
    const TOUR_ITEMS: TourItem[] = [
        // Toolbar
        {
            id: 'tour-btn-columns',
            title: 'სვეტები ცხრილში',
            description: 'ცხრილში სვეტების მართვა, დამალე ან გამოაჩინე სვეტები',
            side: 'bottom'
        },
        {id: 'tour-btn-export', title: 'ექსპორტი', description: 'გადმოწერე ცხრილი Excel ფაილად', side: 'bottom'},
        {
            id: 'tour-btn-upload',
            title: 'ატვირთვა',
            description: 'დაამატე ჩანაწერები Excel-ის საშუალებით',
            side: 'bottom'
        },
        {
            id: 'tour-btn-duplicate',
            title: 'დუბლები',
            description: 'დუბლირებული ნომრების სწრაფი ამოცნობა',
            side: 'bottom'
        },
        {id: 'tour-btn-refresh', title: 'განახლება', description: 'მონაცემების განახლება', side: 'bottom'},
        {id: 'tour-btn-recompute', title: 'სრული განახლება', description: 'გვერდის სრული განახლება', side: 'bottom'},
        {id: 'tour-btn-add', title: 'დამატება', description: 'ახალი ლიდის ხელით დამატება', side: 'bottom'},

        // CTAs
        {id: 'tour-cta-move', title: 'გადატანა', description: 'ნომრის გადატანა სხვა ცხრილში', side: 'top'},
        {id: 'tour-cta-fullsearch', title: 'სრული ძებნა', description: 'ძებნა მთელ ბაზაში', side: 'top'},
        {id: 'tour-cta-filters', title: 'სტატისტიკა', description: 'ბაზის სტატისტიკა და მეტრიკები', side: 'top'},
        {
            id: 'tour-cta-replace',
            title: 'ჩანაცვლება',
            description: 'კომენტარებში ტექსტის მასობრივი ჩანაცვლება',
            side: 'top'
        },
        {id: 'tour-cta-myLeads', title: 'ჩემი ლიდები', description: 'ჩემზე გამანაწილებელი ლიდები', side: 'top'},
        {id: 'tour-cta-requestLead', title: 'ლიდის მოთხოვნა', description: 'კონკრეტული ლიდის მოთხოვნა', side: 'top'},
        {id: 'tour-cta-distribute', title: 'განაწილება', description: 'ლიდების განაწილება გუნდზე', side: 'top'},

        // Filters (add field for auto-scroll)
        {
            id: 'tour-filter-created_at',
            title: 'თარიღის ფილტრი',
            description: 'გაფილტრე შემოსვლის თარიღით',
            side: 'bottom',
            field: 'created_at'
        },
        {
            id: 'tour-filter-phone',
            title: 'მობილური',
            description: 'ნომრის მიხედვით ძებნა',
            side: 'bottom',
            field: 'phone'
        },
        {
            id: 'tour-filter-status',
            title: 'სტატუსი',
            description: 'ლიდის სტატუსით ფილტრი',
            side: 'bottom',
            field: 'status'
        },
        {
            id: 'tour-filter-subStatus',
            title: 'ქვესტატუსი',
            description: 'ქვესტატუსით ფილტრი',
            side: 'bottom',
            field: 'subStatus'
        },
        {id: 'tour-filter-area', title: 'კვადრატი', description: 'ფილტრი კვადრატულობით', side: 'bottom', field: 'area'},
        {id: 'tour-filter-name', title: 'სახელი', description: 'სახელით ძებნა', side: 'bottom', field: 'name'},
        {
            id: 'tour-filter-comment',
            title: 'კომენტარი',
            description: 'კომენტარით ძებნა',
            side: 'bottom',
            field: 'comment'
        },
        {
            id: 'tour-filter-call_date',
            title: 'დარეკვის თარიღი',
            description: 'დარეკვის თარიღით ფილტრი',
            side: 'bottom',
            field: 'call_date'
        },
        {
            id: 'tour-filter-liddy_status',
            title: 'ლიდ სტატუსი',
            description: 'ლიდის სტატუსით',
            side: 'bottom',
            field: 'liddy_status'
        },
        {
            id: 'tour-filter-special_offers',
            title: 'აქციები',
            description: 'აქციების მიხედვით',
            side: 'bottom',
            field: 'special_offers'
        },
        {
            id: 'tour-filter-sales_agent',
            title: 'გაყიდვების მენეჯერი',
            description: 'მენეჯერის მიხედვით',
            side: 'bottom',
            field: 'sales_agent'
        },
        {
            id: 'tour-filter-operator',
            title: 'ოპერატორი',
            description: 'ოპერატორის მიხედვით',
            side: 'bottom',
            field: 'operator'
        },
        {
            id: 'tour-filter-projects',
            title: 'პროექტები',
            description: 'პროექტ(ებ)ის მიხედვით',
            side: 'bottom',
            field: 'projects'
        },
        {id: 'tour-filter-answer', title: 'პასუხი', description: 'კლიენტის პასუხი', side: 'bottom', field: 'answer'},
        {
            id: 'tour-filter-meeting',
            title: 'შეხვედრა',
            description: 'შეხვედრის სტატუსი',
            side: 'bottom',
            field: 'meeting'
        },
        {id: 'tour-filter-lang', title: 'ენა', description: 'ენის ფილტრი', side: 'bottom', field: 'lang'},
        {id: 'tour-filter-w_v', title: 'W/V', description: 'დამუშავების ეტაპი', side: 'bottom', field: 'w_v'},
        {id: 'tour-filter-date', title: 'თარიღი', description: 'დამუშავების თარიღი', side: 'bottom', field: 'date'},
        {
            id: 'tour-filter-from_user_id',
            title: 'გადამისამართება',
            description: 'ვისგან ჩაიგდო ლიდი',
            side: 'bottom',
            field: 'from_user_id'
        },
        {id: 'tour-filter-sms', title: 'SMS', description: 'SMS-ის მიხედვით', side: 'bottom', field: 'sms'},
        {
            id: 'tour-filter-whatsapp',
            title: 'WhatsApp',
            description: 'WhatsApp კომუნიკაცია',
            side: 'bottom',
            field: 'whatsapp'
        },

        // Actions
        {
            id: '.MuiDataGrid-columnHeader[data-field="actions"]',
            title: 'ქმედებები',
            description: 'რედაქტირება/შენახვა/გაუქმება/წაშლა',
            side: 'bottom'
        },
        {id: 'tour-action-edit', title: 'რედაქტირება', description: 'გახსენით სტრიქონი რედაქტირებისთვის', side: 'left'},
        {id: 'tour-action-save', title: 'შენახვა', description: 'ცვლილებების შენახვა', side: 'left'},
        {id: 'tour-action-cancel', title: 'გაუქმება', description: 'რედაქტირების გაუქმება', side: 'left'},
        {id: 'tour-action-delete', title: 'წაშლა', description: 'სტრიქონის წაშლა', side: 'left'},
    ];

    const TOUR_MAP = Object.fromEntries(TOUR_ITEMS.map(i => [i.id, i]))

    // Get tooltip content by id
    const hoverDesc = (id: string) => TOUR_MAP[id] ? {
        title: TOUR_MAP[id].title,
        description: TOUR_MAP[id].description
    } : undefined;

    // Simple query helper
    const q = (sel: string) => document.querySelector(sel) as HTMLElement | null;

    // Smoothly bring a column’s header filter into view
    const scrollColumnIntoView = (field: string) => {
        requestAnimationFrame(() => {
            const gridRoot = document.querySelector('[role="grid"]') as HTMLElement | null;
            const header = document.querySelector(
                `.MuiDataGrid-columnHeader[data-field="${field}"]`
            ) as HTMLElement | null;

            // main virtual scroller where horizontal scroll lives
            const scroller =
                gridRoot?.querySelector('.MuiDataGrid-virtualScroller') as HTMLElement | null;

            if (scroller && header) {
                const targetLeft = header.offsetLeft + header.offsetWidth / 2;
                const desiredLeft = targetLeft - scroller.clientWidth / 2;
                scroller.scrollTo({left: Math.max(0, desiredLeft), behavior: 'smooth'});
            }

            // Also ensure the header filter node itself is centered vertically/horizontally
            const idEl = document.querySelector(
                `#tour-filter-${field}`
            ) as HTMLElement | null;
            idEl?.scrollIntoView({behavior: 'smooth', block: 'center', inline: 'center'});
        });
    };

    const handleEditClick = (id: GridRowId) => () => {
        setRowModesModel({...rowModesModel, [id]: {mode: GridRowModes.Edit}});
    };

    const handleSaveClick = (id: GridRowId) => () => {
        setRowModesModel({...rowModesModel, [id]: {mode: GridRowModes.View}});
    };

    const handleDeleteClick = (id: GridRowId) => () => {
        setRows(rows.filter((row) => row.id !== id));
    };

    const handleCancelClick = (id: GridRowId) => () => {
        setRowModesModel({
            ...rowModesModel,
            [id]: {mode: GridRowModes.View, ignoreModifications: true},
        });

        const editedRow = rows.find((row) => row.id === id);
        if (editedRow?.isNew) {
            setRows(rows.filter((row) => row.id !== id));
        }
    };

    const processRowUpdate = (newRow: RowData) => {
        const updatedRow = {...newRow, isNew: false};
        setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
        return updatedRow;
    };

    const handleRowModesModelChange = (newRowModesModel: GridRowModesModel) => {
        setRowModesModel(newRowModesModel);
    };

    const handleRowEditStop = (params: GridRowEditStopParams) => {
        // use reason instead of peeking at the keyboard event
        if (params.reason === GridRowEditStopReasons.escapeKeyDown) {
            const editedRow = rows.find((row) => row.id === params.id);
            if (editedRow?.isNew) {
                setTimeout(() => {
                    setRows(rows.filter((row) => row.id !== params.id));
                }, 0);
            }
        }
    };
    const handleAddNewRow = () => {
        const newId = Math.max(...rows.map(r => r.id), 0) + 1;
        const newRow: RowData = {
            id: newId,
            phone: '',
            status: '',
            subStatus: null,
            area_id: null,
            name: '',
            comment: '',
            call_date: '',
            liddy_status: null,
            share_id: null,
            sale_manager_id: null,
            operator: '',
            projects: null,
            answer: null,
            call_status: null,
            meeting_address_id: null,
            lang: null,
            w_v: null,
            active: 1,
            from_user_id: null,
            created_at: new Date().toISOString().split('T')[0],
            updated_at: new Date().toISOString().split('T')[0],
            isNew: true,
        };
        setRows([newRow, ...rows]);
        setRowModesModel((oldModel) => ({
            ...oldModel,
            [newId]: {mode: GridRowModes.Edit, fieldToFocus: 'phone'},
        }));
    };

    const renderTableHeader = ({colDef}: { colDef: GridColDef }) => {
        return (
            <p className="title_font">
                {colDef.headerName}
            </p>
        )
    }

    // ---------- Columns with tour ids on each header filter ----------
    const columns: GridColDef[] = [
        {
            field: 'created_at', headerName: 'თარიღი', width: 92,
            renderHeader: renderTableHeader,
            editable: true,
            renderHeaderFilter: () => withTourId('tour-filter-created_at',
                <RangePicker placeholder={['დაწყება', 'დასრულება']}/>)
        },
        {
            field: 'phone', headerName: 'მობილური', width: 104,
            renderHeader: renderTableHeader,
            editable: true,
            renderHeaderFilter: () => withTourId('tour-filter-phone',
                <Box sx={{display: 'flex', alignItems: 'flex-center'}}>
                    <TextField size={'small'}/>
                    <IconButton className={'bg-gray-200! rounded-[2px]! p-1.5!'}>
                        <MdSearch size={18}/>
                    </IconButton>
                </Box>
            )
        },
        {
            field: 'status', headerName: 'სტატუსი', width: 64,
            renderHeader: renderTableHeader,
            editable: true,
            renderHeaderFilter: () =>
                withTourId('tour-filter-status',
                    <Dropdown
                        options={[
                            {value: 'sos', label: 'SOS'},
                            {value: 'to_call', label: 'დასარეკი'},
                            {value: 'closed', label: 'დახურული'},
                            {value: 'commercial', label: 'კომერციული'},
                            {value: 'waiting', label: 'მომლოდინე'},
                            {value: 'foreign', label: 'საზღვარგარეთი'},
                            {value: 'to_work', label: 'სამუშაო'},
                            {value: 'city_number', label: 'ქალაქის ნომერი'},
                        ]}
                        value={''}
                        onChange={(e) => console.log(e.target.value)}
                    />,
                )
        },
        {
            field: 'subStatus', headerName: 'ქვესტატუსი', width: 82,
            renderHeader: renderTableHeader,
            editable: true,
            renderHeaderFilter: () =>
                withTourId('tour-filter-subStatus',
                    <Dropdown options={[{value: 'all', label: 'ყველა'}]} value={''}
                              onChange={(e) => console.log(e.target.value)}/>
                )
        },
        {
            field: 'area', headerName: 'კვადრატი', width: 74,
            renderHeader: renderTableHeader,
            editable: true,
            renderHeaderFilter: () =>
                withTourId('tour-filter-area',
                    <Dropdown options={[{value: 'all', label: 'ყველა'}]} value={''}
                              onChange={(e) => console.log(e.target.value)}/>
                )
        },
        {
            field: 'name', headerName: 'სახელი', width: 62,
            renderHeader: renderTableHeader,
            renderHeaderFilter: () => withTourId('tour-filter-name', <FilterInput onChange={(e) => console.log(e)}/>),
            editable: true
        },
        {
            field: 'comment', headerName: 'კომენტარი', width: 78,
            renderHeader: renderTableHeader,
            renderHeaderFilter: () => withTourId('tour-filter-comment', <FilterInput
                onChange={(e) => console.log(e)}/>),
            editable: true
        },
        {
            field: 'call_date', headerName: 'დარ.. თარიღი', width: 92,
            renderHeader: renderTableHeader,
            editable: true,
            renderHeaderFilter: () => withTourId('tour-filter-call_date', <RangePicker
                placeholder={['დაწყება', 'დასრულება']}/>)
        },
        {
            field: 'liddy_status', headerName: 'ლიდ სტატუსი', width: 92,
            renderHeader: renderTableHeader,
            editable: true,
            renderHeaderFilter: () =>
                withTourId('tour-filter-liddy_status',
                    <Dropdown options={[{value: 'all', label: 'ყველა'}]} value={''}
                              onChange={(e) => console.log(e.target.value)}/>
                )
        },
        {
            field: 'special_offers', headerName: 'აქციები', width: 62,
            renderHeader: renderTableHeader,
            renderHeaderFilter: () =>
                withTourId('tour-filter-special_offers',
                    <Dropdown options={[{value: 'all', label: 'ყველა'}]} value={''}
                              onChange={(e) => console.log(e.target.value)}/>
                ),
            editable: true
        },
        {
            field: 'sales_agent', headerName: 'გაყიდვების მენეჯერი', width: 132,
            renderHeader: renderTableHeader,
            editable: true,
            renderHeaderFilter: () =>
                withTourId('tour-filter-sales_agent',
                    <Dropdown options={[{value: 'all', label: 'ყველა'}]} value={''}
                              onChange={(e) => console.log(e.target.value)}/>
                )
        },
        {
            field: 'operator', headerName: 'ოპერატორი', width: 82,
            renderHeader: renderTableHeader,
            editable: true,
            renderHeaderFilter: () =>
                withTourId('tour-filter-operator',
                    <Dropdown options={[{value: 'all', label: 'ყველა'}]} value={''}
                              onChange={(e) => console.log(e.target.value)}/>
                )
        },
        {
            field: 'projects', headerName: 'პროექტები', width: 78,
            renderHeader: renderTableHeader,
            editable: true,
            renderHeaderFilter: () => withTourId('tour-filter-projects', <FilterInput
                onChange={(e) => console.log(e)}/>)
        },
        {
            field: 'answer', headerName: 'პასუხი', width: 58,
            renderHeader: renderTableHeader,
            editable: true,
            renderHeaderFilter: () => withTourId('tour-filter-answer', <FilterInput onChange={(e) => console.log(e)}/>)
        },
        {
            field: 'meeting', headerName: 'შეხვედრა', width: 72,
            renderHeader: renderTableHeader,
            editable: true,
            renderHeaderFilter: () => withTourId('tour-filter-meeting', <FilterInput onChange={(e) => console.log(e)}/>)
        },
        {
            field: 'lang', headerName: 'ენა', width: 32,
            renderHeader: renderTableHeader,
            editable: true,
            renderHeaderFilter: () =>
                withTourId('tour-filter-lang',
                    <Dropdown options={[{value: 'all', label: 'ყველა'}]} value={''}
                              onChange={(e) => console.log(e.target.value)}/>
                )
        },
        {
            field: 'w_v', headerName: 'W/V', width: 32,
            renderHeader: renderTableHeader,
            editable: true,
            renderHeaderFilter: () =>
                withTourId('tour-filter-w_v',
                    <Dropdown options={[{value: 'all', label: 'ყველა'}]} value={''}
                              onChange={(e) => console.log(e.target.value)}/>
                )
        },
        {
            field: 'case', headerName: '', width: 32,
            renderHeader: renderTableHeader,
            editable: true,
            renderHeaderFilter: () =>
                withTourId('tour-filter-case',
                    <Dropdown options={[{value: 'all', label: 'ყველა'}]} value={''}
                              onChange={(e) => console.log(e.target.value)}/>
                )
        },
        {
            field: 'date', headerName: 'თარიღი', width: 92,
            renderHeader: renderTableHeader,
            editable: true,
            renderHeaderFilter: () => withTourId('tour-filter-date', <RangePicker
                placeholder={['დაწყება', 'დასრულება']}/>)
        },
        {
            field: 'from_user_id', headerName: 'გადამისამართება', width: 118,
            renderHeader: renderTableHeader,
            editable: true,
            renderHeaderFilter: () =>
                withTourId('tour-filter-from_user_id',
                    <Dropdown options={[{value: 'all', label: 'ყველა'}]} value={''}
                              onChange={(e) => console.log(e.target.value)}/>
                )
        },
        {
            field: 'sms', headerName: 'SMS', width: 32,
            renderHeader: renderTableHeader,
            editable: true,
            renderHeaderFilter: () => withTourId('tour-filter-sms', <FilterInput onChange={(e) => console.log(e)}/>)
        },
        {
            field: 'whatsapp', headerName: 'WhatsApp', width: 64,
            renderHeader: renderTableHeader,
            editable: true,
            renderHeaderFilter: () => withTourId('tour-filter-whatsapp', <FilterInput
                onChange={(e) => console.log(e)}/>)
        },
        {
            field: 'actions',
            headerName: '',
            type: 'actions',
            renderHeader: renderTableHeader,
            renderHeaderFilter: () => null,
            getActions: ({id}) => {
                const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

                if (isInEditMode) {
                    return [
                        <Tooltip title="Save" key="save">
                            <IconButton onClick={handleSaveClick(id)} size="small" id="tour-action-save">
                                <MdSave className="text-green-600 size-5"/>
                            </IconButton>
                        </Tooltip>,
                        <Tooltip title="Cancel" key="cancel">
                            <IconButton onClick={handleCancelClick(id)} size="small" id="tour-action-cancel">
                                <MdCancel className="text-gray-600 size-5"/>
                            </IconButton>
                        </Tooltip>,
                    ];
                }

                return [
                    <Tooltip title="Edit" key="edit">
                        <IconButton onClick={handleEditClick(id)} size="small" id="tour-action-edit">
                            <MdEdit className="text-blue-600 size-5"/>
                        </IconButton>
                    </Tooltip>,
                    <Tooltip title="Delete" key="delete">
                        <IconButton onClick={handleDeleteClick(id)} size="small" id="tour-action-delete">
                            <MdDelete className="text-red-600 size-5"/>
                        </IconButton>
                    </Tooltip>,
                ];
            },
            hideSortIcons: true,
            disableReorder: true,
        },
    ];

    // ---------- Toolbar with tour triggers ----------
    function CustomToolbar() {
        return (
            <div id="tour-toolbar">
                <Toolbar className="flex items-center justify-start! gap-2!">
                    <h1 className={'title_font text-lg'}>ნომრები</h1>

                    <Tooltip title="Columns">
                        <div id="tour-btn-columns">
                            <ColumnsPanelTrigger render={<ToolbarButton/>}>
                                <MdViewColumn className="text-gray-500 size-6"/>
                            </ColumnsPanelTrigger>
                        </div>
                    </Tooltip>

                    <Tooltip title="Export table">
                        <ExportCsv render={
                            <ToolbarButton id="tour-btn-export">
                                <MdOutlineSaveAlt className="text-gray-500 size-6"/>
                            </ToolbarButton>
                        }/>
                    </Tooltip>

                    <Tooltip title="Upload / Add new row">
                        <ToolbarButton onClick={handleAddNewRow} id="tour-btn-upload">
                            <MdCloudUpload className="text-gray-500 size-6"/>
                        </ToolbarButton>
                    </Tooltip>

                    <Tooltip title="Duplicate">
                        <ToolbarButton onClick={handleAddNewRow} id="tour-btn-duplicate">
                            <MdFileCopy className="text-gray-500 size-6"/>
                        </ToolbarButton>
                    </Tooltip>

                    <Tooltip title="Refresh">
                        <ToolbarButton onClick={() => { /* your refresh */
                        }} id="tour-btn-refresh">
                            <MdRefresh className="text-gray-500 size-6"/>
                        </ToolbarButton>
                    </Tooltip>

                    <Tooltip title="Recompute / Cache">
                        <ToolbarButton onClick={() => { /* your recompute */
                        }} id="tour-btn-recompute">
                            <MdCached className="text-gray-500 size-6"/>
                        </ToolbarButton>
                    </Tooltip>

                    <Tooltip title="Add new row">
                        <ToolbarButton onClick={handleAddNewRow} id="tour-btn-add">
                            <MdAddBox className="text-gray-500 size-6"/>
                        </ToolbarButton>
                    </Tooltip>

                    {/* 👉 Tour start button */}
                    <Tooltip title="გაეცანი გვერდს">
                        <Button
                            className={'bg-blue-700 hover:bg-blue-800'}
                            size={'xs'}
                            onClick={startTour}
                            id="tour-btn-start"
                        >
                            <p className={'title_font text-xs'}>გაეცანი ცხრილს</p>
                        </Button>
                    </Tooltip>
                </Toolbar>

                {!hideCustomTooltip && <div
                    className="bg-gray-100 border-b border-gray-200 py-4 px-4 title_font flex justify-end items-center gap-2">
                    {modals ?
                        modals
                        :
                        <>
                            <MoveModal/>
                            <SearchModal/>
                            <AnalyzesModal/>
                            <ReplaceModal/>
                            <MyLiddyModal/>
                            <RequestLiddyModal/>
                            <SplitModal/>
                        </>
                    }
                </div>}
            </div>
        );
    }

    function startTour() {
        const drv = driver({
            showProgress: true,
            showButtons: ['next', 'previous', 'close'],
            nextBtnText: 'შემდეგი',
            prevBtnText: 'უკან',
            doneBtnText: 'დასრულება',
            overlayOpacity: 0.5,
            overlayClickBehavior: 'nextStep',
            stagePadding: 6,
            smoothScroll: true,
        });


        // In startTour():
        const steps = TOUR_ITEMS.map(item => {
            const element: DriverTarget = item.field
                ? () => {
                    scrollColumnIntoView(item.field!);
                    return q(`#${item.id}`)!; // we assert it's present during the tour
                }
                : (item.id.startsWith('.') ? item.id : `#${item.id}`);

            return {
                element,
                popover: {
                    title: item.title,
                    description: item.description,
                    side: item.side ?? 'bottom',
                }
            };
        });

        drv.setSteps(steps);
        drv.drive();
    }

    return (
        <>
            <DataGridPremium
                columns={columns}
                rows={rows}
                showColumnVerticalBorder
                apiRef={apiRef}
                pageSizeOptions={[30, 50, 100]}
                paginationModel={paginationModel}
                paginationMode="server"
                rowCount={rows.length}
                onPaginationModelChange={setPaginationModel}
                checkboxSelection
                hideFooter
                disableRowSelectionOnClick
                showToolbar
                slots={{toolbar: CustomToolbar, headerFilterMenu: null}}
                editMode="row"
                rowModesModel={rowModesModel}
                onRowModesModelChange={handleRowModesModelChange}
                onRowEditStop={handleRowEditStop}
                processRowUpdate={processRowUpdate}
                onProcessRowUpdateError={(error) => console.error(error)}
                headerFilters
                sx={{
                    maxHeight: '500px',
                    maxWidth: 1212,
                }}
                pinnedColumns={
                    {
                        left: [
                            GRID_CHECKBOX_SELECTION_COL_DEF.field,
                            'checkbox',
                            'id',
                            'created_at',
                            'phone',
                            'status'
                        ]
                    }
                }
            />
        </>
    );
}
