import {ScrollTrailText} from "@/animations/ScrollTrailText";
import React from "react";
import FbTable, {TourItem} from "@/components/tables/FbTable";
import {Separator} from "@/components/ui/separator";
import TableDocs from "@/components/tables/table-docs";

export default function All(){
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
                    <ScrollTrailText className={'title_font text-lg'}>🔹 ყველა კომერციული</ScrollTrailText>
                </div>

            </header>

            <Separator className="my-5 bg-transparent"/>
            <TableDocs/>
            <Separator className="my-5 bg-transparent"/>

            <FbTable touritems={TOUR_ITEMS}/>
        </>
    )
}