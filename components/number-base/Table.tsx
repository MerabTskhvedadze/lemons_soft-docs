'use client';

import React, {useMemo, useState} from 'react';
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
} from '@mui/x-data-grid-premium';

import {IconButton, Tooltip} from '@mui/material';

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
    MdCached, MdSearch, MdDashboard, MdGroups, MdHelpOutline
} from 'react-icons/md';

import {Dropdown, FilterInput} from '../'

import {DatePicker} from 'antd'
import {Button} from "@/components/ui/button";
import {FaExchangeAlt, FaPhone, FaSlidersH, FaUserClock} from "react-icons/fa";

import {driver} from 'driver.js';
import 'driver.js/dist/driver.css';

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

export default function Table() {
    const {RangePicker} = DatePicker
    const apiRef = useGridApiRef();
    const [paginationModel, setPaginationModel] = useState({page: 0, pageSize: 30});
    const [rows, setRows] = useState<RowData[]>([]);
    const [rowModesModel, setRowModesModel] = useState<GridRowModesModel>({});

    // ---------- small helper to attach tour ids ----------
    const withTourId = (id: string, node: React.ReactNode) => (
        <span id={id} className="inline-flex items-center">{node}</span>
    );

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

    // Search filter
    const SearchFormFilter = ({id}: { id: string }) => {
        return withTourId(
            id,
            <div className={'w-full flex items-center gap-1'}>
                <input
                    className={'border border-black rounded-[2px] p-1.5 w-full'}
                    placeholder={''}
                />
                <IconButton className={'bg-gray-200! rounded-[2px]! p-1.5!'} id={`${id}-btn`}>
                    <MdSearch size={20}/>
                </IconButton>
            </div>
        )
    }

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

    const handleRowEditStop = (params: any, event: any) => {
        if (event.key === 'Escape') {
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
                <RangePicker placeholder={['დაწყება', 'დასრულება']}/>
            )
        },
        {
            field: 'phone', headerName: 'მობილური', width: 104,
            renderHeader: renderTableHeader,
            editable: true,
            renderHeaderFilter: () => <SearchFormFilter id="tour-filter-phone"/>
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
                    />
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

                <div
                    className="bg-gray-100 border-b border-gray-200 py-4 px-4 title_font flex justify-end items-center gap-2">
                    <Button size={'xs'} className=" bg-blue-500/90 hover:bg-blue-700" id="tour-cta-move">
                        <MdDashboard/>
                        გადატანა
                    </Button>

                    <Button size={'xs'} className=" bg-green-600 hover:bg-green-700" id="tour-cta-fullsearch">
                        <MdSearch/>
                        სრული ძებნა
                    </Button>

                    <Button size={'xs'} className="" variant={'destructive'} id="tour-cta-filters">
                        <FaSlidersH/>
                    </Button>

                    <Button size={'xs'} className=" bg-blue-500/90 hover:bg-blue-700" id="tour-cta-replace">
                        <MdSearch/>
                        <FaExchangeAlt/>
                        კომ.ჩანაცვლება
                    </Button>

                    <Button size={'xs'} className=" bg-blue-500/90 hover:bg-blue-700" id="tour-cta-myLeads">
                        <FaUserClock/>
                        ჩემი ლიდები
                    </Button>

                    <Button size={'xs'} className=" bg-yellow-600 hover:bg-yellow-700" id="tour-cta-requestLead">
                        <FaPhone/>
                        ლიდის მოთხოვნა
                    </Button>

                    <Button size={'xs'} className=" bg-blue-700 hover:bg-blue-800" id="tour-cta-distribute">
                        <MdGroups/>
                        განაწილება
                    </Button>
                </div>
            </div>
        );
    }

    // ---------- driver.js tour definition ----------
    function startTour() {
        const drv = driver({
            showProgress: true,
            showButtons: ['next', 'previous', 'close'],
            nextBtnText: 'შემდეგი',
            prevBtnText: 'უკან',
            doneBtnText: 'დასრულება',
            overlayOpacity: 0.5,
            stagePadding: 6,
            overlayClickBehavior: 'nextStep',
            smoothScroll: true,
        });

        // Build steps just once (memoized) or inline:
        const steps = [
            {
                element: '#tour-btn-columns',
                popover: {
                    title: 'სვეტები ცხრილში',
                    description: 'ცხრილში სვეტების მართვა, დამალე ან გმაოაჩინე სვეტები ცხრილში',
                    side: 'bottom'
                }
            },
            {
                element: '#tour-btn-export',
                popover: {title: 'ექსპორტი', description: 'გადმოწერე ცხრილი ექსელ ფაილად', side: 'bottom'}
            },
            {
                element: '#tour-btn-upload',
                popover: {
                    title: 'ატვირთვა',
                    description: 'დაამატე ახალი ჩანაწერები ექსელ ფაილის გამოყენებით',
                    side: 'bottom'
                }
            },
            {
                element: '#tour-btn-duplicate',
                popover: {
                    title: 'დუბლები',
                    description: 'დუბლირებული ნომერბის სწრაფი ფილტრაცია და მონიშვნა',
                    side: 'bottom'
                }
            },
            {
                element: '#tour-btn-refresh',
                popover: {title: 'განახლება', description: 'ცრილის მონაცემების განახლება', side: 'bottom'}
            },
            {
                element: '#tour-btn-recompute',
                popover: {title: 'სრული განახლება', description: 'გვერდის სრული განახლება', side: 'bottom'}
            },
            {
                element: '#tour-btn-add',
                popover: {title: 'დამატება', description: 'დაამატე ახალი ლიდი ცხრილში მექანიკურად', side: 'bottom'}
            },

            // CTA row
            {
                element: '#tour-cta-move',
                popover: {title: 'გადატანა', description: 'ნომრის გადატანა სხვა ცხრილში', side: 'top'}
            },
            {
                element: '#tour-cta-fullsearch',
                popover: {
                    title: 'სრული ძებნა',
                    description: 'ნომრის მოძებნის ფუნქცია მთლიან ბაზაში',
                    side: 'top'
                }
            },
            {
                element: '#tour-cta-filters',
                popover: {
                    title: 'სტატისტიკა',
                    description: 'ნომრების ბაზის სტატისტიკა, შემომავალი ნომრები, დამუშავებული და დაუმუშავებელი ნომრების რაოდენობა და სხვა...',
                    side: 'top'
                }
            },
            {
                element: '#tour-cta-replace',
                popover: {
                    title: 'ჩანაცვლება',
                    description: 'კონკრეტული სიტყვის ან წინადადების მოძებნა კომენტარში და მათი ერთიანად ჩანაცვლება მითითებული სიტყვით',
                    side: 'top'
                }
            },
            {
                element: '#tour-cta-myLeads',
                popover: {title: 'ჩემი ლიდები', description: 'ჩემთვის განაწილებული ლიდების ნახვა', side: 'top'}
            },
            {
                element: '#tour-cta-requestLead',
                popover: {title: 'ლიდის მოთხოვნა', description: 'კონკრეტული ლიდის მოთხოვნა', side: 'top'}
            },
            {
                element: '#tour-cta-distribute',
                popover: {title: 'განაწილება', description: 'გუნდის წევრებისთვის ლიდების განაწილება', side: 'top'}
            },

            // Header filters (representative; you can add/remove easily)
            {
                element: '#tour-filter-created_at',
                popover: {
                    title: 'თარიღის ფილტრი',
                    description: 'სვეტების გაფილტვრა კონკრეტული თარიღით შემომავალი ლიდის მიხედვით',
                    side: 'bottom'
                }
            },
            {
                element: '#tour-filter-phone',
                popover: {title: 'მობილური', description: 'კონკრეტული ნომრის მოძებნა ცხრილში', side: 'bottom'}
            },
            {
                element: '#tour-filter-status',
                popover: {
                    title: 'სტატუსი',
                    description: 'ცხრილის სვეტების გაფილტვრა ლიდის სტატუსის მიხედვით',
                    side: 'bottom'
                }
            },
            {
                element: '#tour-filter-subStatus',
                popover: {title: 'ქვესტატუსი', description: 'ლიდის ქვესტატუსის ფილტრი', side: 'bottom'}
            },
            {
                element: '#tour-filter-area',
                popover: {title: 'კვადრატი', description: 'ფილტრი კვადრატულობის მიხედვით', side: 'bottom'}
            },
            {
                element: '#tour-filter-name',
                popover: {title: 'სახელი', description: 'მომხმარებლის სახელით გაფილტვრა', side: 'bottom'}
            },
            {
                element: '#tour-filter-comment',
                popover: {title: 'კომენტარი', description: 'კომენტარის მიხედვით ძებნა', side: 'bottom'}
            },
            {
                element: '#tour-filter-call_date',
                popover: {
                    title: 'დარეკვის თარიღი',
                    description: 'გაფილტრე ცხრილი დარეკვის თარიღის მიხედვით',
                    side: 'bottom'
                }
            },
            {
                element: '#tour-filter-liddy_status',
                popover: {title: 'ლიდ სტატუსი', description: 'ლიდის სტატუსით ფილტრაცია', side: 'bottom'}
            },
            {
                element: '#tour-filter-special_offers',
                popover: {title: 'აქციები', description: 'აქციების მიხედვით გაფილტვრა', side: 'bottom'}
            },
            {
                element: '#tour-filter-sales_agent',
                popover: {
                    title: 'გაყიდვების მენეჯერი',
                    description: 'გაფილტრე მენეჯერის მიხედვით',
                    side: 'bottom'
                }
            },
            {
                element: '#tour-filter-operator',
                popover: {title: 'ოპერატორი', description: 'ფილტრი ოპერატორის მიხედვით', side: 'bottom'}
            },
            {
                element: '#tour-filter-projects',
                popover: {title: 'პროექტები', description: 'სასურველი პროექტ(ებ)ი', side: 'bottom'}
            },
            {
                element: '#tour-filter-answer',
                popover: {title: 'პასუხი', description: 'ფილტრი კლიენტის პასუხით', side: 'bottom'}
            },
            {
                // element: '#tour-filter-meeting',
                element: () => {
                    scrollColumnIntoView('meeting');
                    return document.querySelector('#tour-filter-meeting')!;
                },
                popover: {title: 'შეხვედრა', description: 'შეხვედრის სტატუსი', side: 'bottom'}
            },
            {element: '#tour-filter-lang', popover: {title: 'ენა', description: 'ენის ფილტრი', side: 'bottom'}},
            {
                element: '#tour-filter-w_v',
                popover: {title: 'W/V', description: 'კავშირის ფილტრი, რა ეტაპზეა ლიდის დამუშავება', side: 'bottom'}
            },
            {
                element: '#tour-filter-date',
                popover: {title: 'თარიღი', description: 'დამუშავების თარიღი', side: 'bottom'}
            },
            {
                element: '#tour-filter-from_user_id',
                popover: {title: 'გადამისამართება', description: 'ვისგან არის ლიდი ჩაგდებული ჩემთან', side: 'bottom'}
            },
            {
                element: '#tour-filter-sms',
                popover: {title: 'SMS', description: 'შესაბამისი შეტყობინებებით', side: 'bottom'}
            },
            {
                element: '#tour-filter-whatsapp',
                popover: {title: 'WhatsApp', description: 'ვიციით კომუნიკაცია WhatsApp-ით.', side: 'bottom'}
            },

            // Actions column (use header cell as anchor; per-row buttons appear dynamically)
            {
                element: '.MuiDataGrid-columnHeader[data-field="actions"]',
                popover: {title: 'ქმედებები', description: 'რედაქტირება, შენახვა, გაუქმება, წაშლა.', side: 'bottom'}
            },
            {
                element: '#tour-action-edit',
                popover: {title: 'რედაქტირება', description: 'გახსენით სტრიქონი რედაქტირებისთვის.', side: 'left'},
            },
            {
                element: '#tour-action-save',
                popover: {title: 'შენახვა', description: 'დანაშაულების შენახვა.', side: 'left'}
            },
            {
                element: '#tour-action-cancel',
                popover: {title: 'გაუქმება', description: 'რედაქტირების გაუქმება.', side: 'left'}
            },
            {element: '#tour-action-delete', popover: {title: 'წაშლა', description: 'სტრიქონის წაშლა.', side: 'left'}},
        ];

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
