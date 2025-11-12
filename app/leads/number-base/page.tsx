'use client'

import React from "react";
import {ScrollTrailText} from "@/animations/ScrollTrailText";
import {Separator} from "@/components/ui/separator";

import {
    AnalyzesModal,
    MoveModal,
    MyLiddyModal,
    ReplaceModal,
    RequestLiddyModal,
    SearchModal, SplitModal
} from "@/components/modals";

import FbTable, {TourItem} from "@/components/tables/FbTable";

import {Box, List, ListItem, ListItemIcon, ListItemText, Chip} from '@mui/material';
import {
    MdFilterList,
    MdEdit,
    MdSave,
    MdCancel,
    MdAddCircleOutline,
    MdViewColumn,
    MdOutlineSaveAlt,
    MdRefresh,
    MdCached,
    MdSearch,
    MdPhoneIphone
} from 'react-icons/md';

/* ---------- Helpers ---------- */
function InlineIcon({children}: { children: React.ReactNode }) {
    return (
        <Box component="span" sx={{display: 'inline-flex', verticalAlign: 'middle', mx: 0.5}}>
            {children}
        </Box>
    );
}

export default function NumberBase() {
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
    ];

    return (
        <>
            {/* overview */}
            <header className=" flex flex-col gap-3">
                <div className={'flex items-center gap-3'}>
                    <ScrollTrailText className={'title_font text-lg'}>🔹 ნომრების ბაზა</ScrollTrailText>
                </div>

                <ScrollTrailText className="pl-5">
                    ნომრების ბაზა არის ცენტრალური ცხრილი, სადაც ინახება ყველა შემომავალი სამუშაო ნომერი და მათი
                    წყარო, სტატუსი, პასუხისმგებელი პირი და მუშაობის ისტორია. <br/>
                    მიზანია ნომრების ერთიანად აღრიცხვა, თვალყურის დევნება და რეპორტინგი.
                </ScrollTrailText>

                <ScrollTrailText className="pl-5 text-[12.5px] italic text-gray-600">
                    ეს გვერდი აღწერს, როგორ გამოიყენოთ ცხრილი (ფილტრაცია, რედაქტირება და ექსპორტი).
                </ScrollTrailText>
            </header>

            <Separator className="my-5 bg-transparent"/>

            <section>
                <ScrollTrailText className="pl-5 title_font">
                    ძირითადი მოქმედებები
                </ScrollTrailText>
                <List>
                    <ListItem>
                        <ListItemIcon><MdFilterList size={18}/></ListItemIcon>
                        <ListItemText
                            primary="ფილტრაცია სვეტიდან"
                            secondary={
                                <>
                                    თარიღზე გამოიყენეთ დიაპაზონი - "დაწყება" / "დასრულება".
                                    ტექსტურ ველებში შეიყვანეთ საძიებო სიტყვა. ჩამოსაშლელებში აირჩიეთ „ყველა“ ან
                                    კონკრეტული მნიშვნელობა.
                                </>
                            }
                        />
                    </ListItem>

                    <ListItem>
                        <ListItemIcon><MdEdit size={18}/></ListItemIcon>
                        <ListItemText
                            primary="რედაქტირება"
                            secondary={
                                <>
                                    მარჯვენა სვეტიდან გახსენით ✏️ ცვლილებების შესანახად დააჭირეთ{' '}
                                    <InlineIcon><MdSave/></InlineIcon> „შენახვა“, უკან დასაბრუნებლად -{' '}
                                    <InlineIcon><MdCancel/></InlineIcon> „გაუქმება“.
                                </>
                            }
                        />
                    </ListItem>

                    <ListItem>
                        <ListItemIcon><MdAddCircleOutline size={18}/></ListItemIcon>
                        <ListItemText
                            primary="ახალი რიგი"
                            secondary="ზედა პანელზე დამატების ღილაკი ქმნის ცარიელ სტრიქონს ცხრილში"
                        />
                    </ListItem>

                    <ListItem>
                        <ListItemIcon><MdViewColumn size={18}/></ListItemIcon>
                        <ListItemText
                            primary="სვეტების მართვა"
                            secondary="ღილაკიდან დამალეთ/გამოაჩინეთ სასურველი სვეტები ცხრილში."
                        />
                    </ListItem>

                    <ListItem>
                        <ListItemIcon><MdOutlineSaveAlt size={18}/></ListItemIcon>
                        <ListItemText
                            primary="ექსპორტი"
                            secondary="აკეთებს ექსპოერტს ექსელ ფაილში მიმდინარე ცხრილის მიხედვით"
                        />
                    </ListItem>

                    <ListItem>
                        <ListItemIcon><MdRefresh size={18}/></ListItemIcon>
                        <ListItemText
                            primary="ცხრილის განახლება"
                            secondary="ხელახლა ტვირთავს მონაცემებს ცხრილში"
                        />
                    </ListItem>

                    <ListItem>
                        <ListItemIcon><MdCached size={18}/></ListItemIcon>
                        <ListItemText
                            primary="განახლება"
                            secondary="სრული განახლება (შლის ბრაუზერის ქეშს)"
                        />
                    </ListItem>
                </List>
            </section>

            <section>
                <ScrollTrailText className="pl-5 title_font">
                    კარგი პრაქტიკები
                </ScrollTrailText>
                <List>
                    <ListItem>
                        <ListItemIcon><MdPhoneIphone size={18}/></ListItemIcon>
                        <ListItemText
                            primary="ნომრის ფორმატი"
                            secondary="ტელეფონი შეიყვანეთ ფორმატით: +995..."
                        />
                    </ListItem>
                    <ListItem>
                        <ListItemIcon><MdSearch size={18}/></ListItemIcon>
                        <ListItemText
                            primary="დუბლიკატების თავიდან აცილება"
                            secondary="ახალი რიგის ჩამატებამდე მოძებნეთ ნომერი „მობილურის“ ფილტრით."
                        />
                    </ListItem>
                </List>
            </section>

            <Separator className="my-5 bg-transparent"/>

            <FbTable
                toolbarBtns={
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
                touritems={TOUR_ITEMS}
            />
        </>
    )
}