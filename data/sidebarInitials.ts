import type { MenuSection } from "@/types/menu";

export const sidebarInitial: MenuSection[] = [
    { id: "home", label: "მთავარი", icon: "home", link: "/" },
    { id: "dashboard", label: "დეშბორდი", icon: "desktop", link: "/dashboard" },
    { id: "menu", label: "მენიუ", icon: "bars", link: "/menu" },

    {
        id: "leads", label: "ლიდები", icon: "addressBook", link: "/",
        items: [
            { id: "phone-database", label: "ნომრების ბაზა", href: "/leads/phone-database" },
            { id: "facebook-numbers", label: "FACEBOOK ნომრები", href: "/leads/facebook-numbers" },
            { id: "orc-import", label: "Orc import", href: "/leads/orc-import" },
            { id: "duplicates", label: "დუბლირებული", href: "/leads/duplicates" },
            { id: "not-in-meetings", label: "შეხვედრებში არ არის", href: "/leads/not-in-meetings" },
            { id: "do-not-contact", label: "აღარ დაუკავშირდეთ", href: "/leads/do-not-contact" },
            { id: "quadrant", label: "კვადრატული", href: "/leads/quadrant" },
            { id: "promotions", label: "აქციები", href: "/leads/promotions" },
            { id: "categories", label: "ლიდის კატეგორია", href: "/leads/categories" },
            { id: "history", label: "ისტორია", href: "/leads/history" },
            { id: "meeting-addresses", label: "შეხვედრის მისამართები", href: "/leads/meeting-addresses" },
            { id: "statuses", label: "ლიდის სტატუსები", href: "/leads/statuses" },
        ],
    },

    {
        id: "commercials", label: "კომერციულები", icon: "shoppingBag", link: "/",
        items: [
            { id: "my-tasks", label: "ჩემი დავალებები", href: "/commercials/my-tasks" },
            { id: "all", label: "ყველა კომერციული", href: "/commercials/all" },
        ],
    },

    {
        id: "meetings", label: "შეხვედრები", icon: "handshake", link: "/",
        items: [
            { id: "my-tasks-m", label: "ჩემი დავალებები", href: "/meetings/my-tasks" },
            { id: "all-m", label: "ყველა შეხვედრა", href: "/meetings/all" },
        ],
    },

    {
        id: "residents", label: "მობინადრეები", icon: "users", link: "/",
        items: [
            { id: "my-sales", label: "ჩემი გაყიდვები", href: "/residents/my-sales" },
            { id: "residents", label: "მობინადრეები", href: "/residents" },
            { id: "debt-archive", label: "დავალიანების არქივი", href: "/residents/debt-archive" },
            { id: "chairpersons", label: "თავმჯდომარეები", href: "/residents/chairpersons" },
            { id: "history-r", label: "ისტორია", href: "/residents/history" },
        ],
    },

    { id: "waitlist", label: "მომლოდინეები", icon: "phone", link: "/",
        items: [{ id: "leads-w", label: "მომლოდინე ლიდები", href: "/waitlist/leads" }] },

    {
        id: "sms", label: "SMS", icon: "mobile", link: "/",
        items: [
            { id: "send-by-projects", label: "პროექრებში გაგზავნა", href: "/sms/send-by-projects" },
            { id: "templates", label: "შაბლონები", href: "/sms/templates" },
            { id: "bot-settings", label: "SMS Bot Settings", href: "/sms/bot-settings" },
        ],
    },

    {
        id: "messages", label: "შეტყობინებები", icon: "comments", link: "/",
        items: [
            { id: "messenger", label: "Messenger", href: "/messages/messenger" },
            { id: "compose", label: "შეტყობინების გაგზავნა", href: "/messages/compose" },
        ],
    },

    {
        id: "salaries-sales", label: "SALE ხელფასები", icon: "bookmark", link: "/",
        items: [
            { id: "stats", label: "სტატისტიკა", href: "/salaries/sales/stats" },
            { id: "plan", label: "ხელფასის დაგეგმვა", href: "/salaries/sales/plan" },
            { id: "bonus-plan", label: "ბონუსის დაგეგმვა", href: "/salaries/sales/bonus-plan" },
            { id: "levels", label: "დონე", href: "/salaries/sales/levels" },
            { id: "to-approve", label: "დასადასტურებელი", href: "/salaries/sales/to-approve" },
            { id: "to-pay", label: "გასაცემი", href: "/salaries/sales/to-pay" },
        ],
    },

    {
        id: "salaries-call", label: "CALL ხელფასები", icon: "creditCard", link: "/",
        items: [
            { id: "call-plan", label: "დაგეგმვა", href: "/salaries/call/plan" },
            { id: "call-approve", label: "დასადასტურებელი", href: "/salaries/call/to-approve" },
            { id: "call-pay", label: "გასაცემი", href: "/salaries/call/to-pay" },
            { id: "meeting-bonus", label: "შეხვედრების ბონუსი", href: "/salaries/call/meeting-bonus" },
            { id: "log", label: "LOG", href: "/salaries/call/log" },
        ],
    },

    {
        id: "management", label: "მენეჯმენტი", icon: "hourglass", link: "/",
        items: [
            { id: "schedule", label: "გრაფიკი", href: "/management/schedule" },
            { id: "vacation", label: "შვებულება", href: "/management/vacation" },
            { id: "vacation-report", label: "შვებულების რეპორტი", href: "/management/vacation-report" },
            { id: "holidays", label: "დასვენების დღეები", href: "/management/holidays" },
            { id: "work-hours", label: "სამუშაო საათები", href: "/management/work-hours" },
            { id: "ip-whitelist", label: "IP ნებართვები", href: "/management/ip-whitelist" },
        ],
    },

    {
        id: "stats", label: "სტატისტიკა", icon: "map", link: "/",
        items: [
            { id: "incoming-numbers", label: "შემოსული ნომრები", href: "/stats/incoming-numbers" },
            { id: "outgoing-numbers", label: "გაცემული ნომრები", href: "/stats/outgoing-numbers" },
            { id: "plus18", label: "+18 სტატისტიკა", href: "/stats/plus18" },
        ],
    },

    {
        id: "team", label: "გუნდი", icon: "university", link: "/",
        items: [
            { id: "employees", label: "თანამშრომლები", href: "/team/employees" },
            { id: "realtors", label: "რეალტორი", href: "/team/realtors" },
            { id: "positions", label: "პოზიცია", href: "/team/positions" },
        ],
    },

    {
        id: "construction", label: "სამშენებლო", icon: "building", link: "/",
        items: [
            { id: "c-incoming", label: "შემოსული ნომრები", href: "/construction/incoming-numbers" },
            { id: "c-outgoing", label: "გაცემული ნომრები", href: "/construction/outgoing-numbers" },
            { id: "c-plus18", label: "+18 სტატისტიკა", href: "/construction/plus18" },
        ],
    },

    {
        id: "pages", label: "გვერდები", icon: "file", link: "/",
        items: [
            { id: "p-incoming", label: "შემოსული ნომრები", href: "/pages/incoming-numbers" },
            { id: "p-outgoing", label: "გაცემული ნომრები", href: "/pages/outgoing-numbers" },
            { id: "p-plus18", label: "+18 სტატისტიკა", href: "/pages/plus18" },
        ],
    },

    {
        id: "access-logs", label: "Access Logs", icon: "archive", link: "/",
        items: [{ id: "fields", label: "Fields Logs", href: "/access-logs/fields" }],
    },

    { id: "languages", label: "ენები", icon: "language", link: "/languages" },
    { id: "dictionary", label: "ლექსიკონი", icon: "book", link: "/dictionary" },
    { id: "api", label: "REST API", icon: "cubes", link: "/api" },
];
