import React from 'react'
import Link from 'next/link'
import {
    Sidebar,
    SidebarContent,
    SidebarGroup, SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem, SidebarMenuSub,
    SidebarMenuSubButton,
    SidebarMenuSubItem,
} from "@/components/ui/sidebar"

import {
    FaDesktop,
    FaBars,
    FaAddressBook,
    FaShoppingBag,
    FaHandshake,
    FaUsers,
    FaPhone,
    FaMobile,
    FaComments,
    FaBookmark,
    FaCreditCard,
    FaHourglassStart,
    FaMap,
    FaUniversity,
    FaBuilding,
    FaFile,
    FaArchive,
    FaLanguage,
    FaBook,
    FaCubes,
    FaHome,
} from "react-icons/fa"

export function AppSidebar() {
    const data = [
        {
            label: "მთავარი",
            icon: <FaHome/>,
            link: "/",
        },
        {
            label: "დეშბორდი",
            icon: <FaDesktop/>,
            link: "/dashboard",
        },
        {
            label: "მენიუ",
            icon: <FaBars/>,
            link: "/menu",
        },

        // ლიდები
        {
            label: "ლიდები",
            icon: <FaAddressBook/>,
            link: '/',
            subItems: [
                {label: "ნომრების ბაზა", href: "/leads/phone-database"},
                {label: "FACEBOOK ნომრები", href: "/leads/facebook-numbers"},
                {label: "Orc import", href: "/leads/orc-import"},
                {label: "დუბლირებული", href: "/leads/duplicates"},
                {label: "შეხვედრებში არ არის", href: "/leads/not-in-meetings"},
                {label: "აღარ დაუკავშირდეთ", href: "/leads/do-not-contact"},
                {label: "კვადრატული", href: "/leads/quadrant"},
                {label: "აქციები", href: "/leads/promotions"},
                {label: "ლიდის კატეგორია", href: "/leads/categories"},
                {label: "ისტორია", href: "/leads/history"},
                {label: "შეხვედრის მისამართები", href: "/leads/meeting-addresses"},
                {label: "ლიდის სტატუსები", href: "/leads/statuses"},
            ],
        },

        // კომერციულები
        {
            label: "კომერციულები",
            icon: <FaShoppingBag/>,
            link: '/',
            subItems: [
                {label: "ჩემი დავალებები", href: "/commercials/my-tasks"},
                {label: "ყველა კომერციული", href: "/commercials/all"},
            ],
        },

        // შეხვედრები
        {
            label: "შეხვედრები",
            icon: <FaHandshake/>,
            link: '/',
            subItems: [
                {label: "ჩემი დავალებები", href: "/meetings/my-tasks"},
                {label: "ყველა შეხვედრა", href: "/meetings/all"},
            ],
        },

        // მობინადრეები
        {
            label: "მობინადრეები",
            icon: <FaUsers/>,
            link: '/',
            subItems: [
                {label: "ჩემი გაყიდვები", href: "/residents/my-sales"},
                {label: "მობინადრეები", href: "/residents"},
                {label: "დავალიანების არქივი", href: "/residents/debt-archive"},
                {label: "თავმჯდომარეები", href: "/residents/chairpersons"},
                {label: "ისტორია", href: "/residents/history"},
            ],
        },

        // მომლოდინეები
        {
            label: "მომლოდინეები",
            icon: <FaPhone/>,
            link: '/',
            subItems: [{label: "მომლოდინე ლიდები", href: "/waitlist/leads"}],
        },

        // SMS
        {
            label: "SMS",
            icon: <FaMobile/>,
            link: '/',
            subItems: [
                {label: "პროექრებში გაგზავნა", href: "/sms/send-by-projects"},
                {label: "შაბლონები", href: "/sms/templates"},
                {label: "SMS Bot Settings", href: "/sms/bot-settings"},
            ],
        },

        // შეტყობინებები
        {
            label: "შეტყობინებები",
            icon: <FaComments/>,
            link: '/',
            subItems: [
                {label: "Messenger", href: "/messages/messenger"},
                {label: "შეტყობინების გაგზავნა", href: "/messages/compose"},
            ],
        },

        // SALE ხელფასები
        {
            label: "SALE ხელფასები",
            icon: <FaBookmark/>,
            link: '/',
            subItems: [
                {label: "სტატისტიკა", href: "/salaries/sales/stats"},
                {label: "ხელფასის დაგეგმვა", href: "/salaries/sales/plan"},
                {label: "ბონუსის დაგეგმვა", href: "/salaries/sales/bonus-plan"},
                {label: "დონე", href: "/salaries/sales/levels"},
                {label: "დასადასტურებელი", href: "/salaries/sales/to-approve"},
                {label: "გასაცემი", href: "/salaries/sales/to-pay"},
            ],
        },

        // CALL ხელფასები
        {
            label: "CALL ხელფასები",
            icon: <FaCreditCard/>,
            link: '/',
            subItems: [
                {label: "დაგეგმვა", href: "/salaries/call/plan"},
                {label: "დასადასტურებელი", href: "/salaries/call/to-approve"},
                {label: "გასაცემი", href: "/salaries/call/to-pay"},
                {label: "შეხვედრების ბონუსი", href: "/salaries/call/meeting-bonus"},
                {label: "LOG", href: "/salaries/call/log"},
            ],
        },

        // მენეჯმენტი
        {
            label: "მენეჯმენტი",
            icon: <FaHourglassStart/>,
            link: '/',
            subItems: [
                {label: "გრაფიკი", href: "/management/schedule"},
                {label: "შვებულება", href: "/management/vacation"},
                {label: "შვებულების რეპორტი", href: "/management/vacation-report"},
                {label: "დასვენების დღეები", href: "/management/holidays"},
                {label: "სამუშაო საათები", href: "/management/work-hours"},
                {label: "IP ნებართვები", href: "/management/ip-whitelist"},
            ],
        },

        // სტატისტიკა
        {
            label: "სტატისტიკა",
            icon: <FaMap/>,
            link: '/',
            subItems: [
                {label: "შემოსული ნომრები", href: "/stats/incoming-numbers"},
                {label: "გაცემული ნომრები", href: "/stats/outgoing-numbers"},
                {label: "+18 სტატისტიკა", href: "/stats/plus18"},
            ],
        },

        // გუნდი
        {
            label: "გუნდი",
            icon: <FaUniversity/>,
            link: '/',
            subItems: [
                {label: "თანამშრომლები", href: "/team/employees"},
                {label: "რეალტორი", href: "/team/realtors"},
                {label: "პოზიცია", href: "/team/positions"},
            ],
        },

        // სამშენებლო
        {
            label: "სამშენებლო",
            icon: <FaBuilding/>,
            link: '/',
            subItems: [
                {label: "შემოსული ნომრები", href: "/construction/incoming-numbers"},
                {label: "გაცემული ნომრები", href: "/construction/outgoing-numbers"},
                {label: "+18 სტატისტიკა", href: "/construction/plus18"},
            ],
        },

        // გვერდები
        {
            label: "გვერდები",
            icon: <FaFile/>,
            link: '/',
            subItems: [
                {label: "შემოსული ნომრები", href: "/pages/incoming-numbers"},
                {label: "გაცემული ნომრები", href: "/pages/outgoing-numbers"},
                {label: "+18 სტატისტიკა", href: "/pages/plus18"},
            ],
        },

        // Access Logs
        {
            label: "Access Logs",
            icon: <FaArchive/>,
            link: '/',
            subItems: [{label: "Fields Logs", href: "/access-logs/fields"}],
        },

        // ენები
        {
            label: "ენები",
            icon: <FaLanguage/>,
            link: "/languages",
        },

        // ლექსიკონი
        {
            label: "ლექსიკონი",
            icon: <FaBook/>,
            link: "/dictionary",
        },

        // REST API
        {
            label: "REST API",
            icon: <FaCubes/>,
            link: "/api",
        },
    ];

    return (
        <Sidebar position="contained">
            <SidebarContent>
                <SidebarGroup>
                    <SidebarHeader>
                        <h1 className={'title_font'}>ნავიგაცია</h1>
                    </SidebarHeader>
                    <SidebarMenu>
                        {data.map(({label, link, icon, subItems}) => (
                            <SidebarMenuItem key={label}>
                                <SidebarMenuButton asChild>
                                    <Link href={link}>
                                        {icon}
                                        <span>{label}</span>
                                    </Link>
                                </SidebarMenuButton>
                                {subItems?.length ? (
                                    <SidebarMenuSub>
                                        {subItems.map((item) => (
                                            <SidebarMenuSubItem key={item.label}>
                                                <SidebarMenuSubButton
                                                    asChild
                                                    // isActive={item.isActive}
                                                >
                                                    <a href={item.href}>{item.label}</a>
                                                </SidebarMenuSubButton>
                                            </SidebarMenuSubItem>
                                        ))}
                                    </SidebarMenuSub>
                                ) : null}
                            </SidebarMenuItem>
                        ))}
                    </SidebarMenu>
                </SidebarGroup>
            </SidebarContent>
        </Sidebar>
    )

}
