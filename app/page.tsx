import Link from 'next/link'
import {Separator} from "@/components/ui/separator";
import {
    Table,
    TableHeader,
    TableRow,
    TableHead,
    TableBody,
    TableCell,
} from "@/components/ui/table";

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
} from "react-icons/fa"

export default function Home() {
    const menuItems = [
        {label: "დეშბორდი", href: "/dashboard", desc: 'ზოგადი აქტივობის მიმოხილვა', icon: <FaDesktop/>},
        {label: "მენიუ", href: "/dashboard", desc: 'ნავიგაციის მენიუს მართვა', icon: <FaBars/>},
        {label: "ლიდები", href: "/dashboard", desc: 'ლიდების მენეჯმენტი', icon: <FaAddressBook/>},
        {label: "კომერციულები", href: "/dashboard", desc: 'ზარები, შეტყობინებები, ელ.ფოსტა', icon: <FaShoppingBag/>},
        {
            label: "შეხვედრები",
            href: "/dashboard",
            desc: 'შეხვედრების მენეჯმენტი და ჩემი შეხვედრები',
            icon: <FaHandshake/>
        },
        {
            label: "მობინადრეები",
            href: "/dashboard",
            desc: 'ყველა მობინადრის არქივი, მათი საკონტაქტო, დავალიანებები და თავმჯდომარეები',
            icon: <FaUsers/>
        },
        {
            label: "მომლოდინეები",
            href: "/dashboard",
            desc: 'მომლოდინე ლიდები, რომლებიც ელოდებიან ზარს ჩვენგან',
            icon: <FaPhone/>
        },
        {
            label: "SMS",
            href: "/dashboard",
            desc: 'SMS - ის გაგზავნა, შაბლონები და SMS - ბოტის მართვა',
            icon: <FaMobile/>
        },
        {label: "შეტყობინებები", href: "/dashboard", desc: 'შეტყობინებების მართვა ყველა პროექტზე', icon: <FaComments/>},
        {
            label: "SALE ხელფასები",
            href: "/dashboard",
            desc: 'გაყიდვების გუნდის ხელფასების მართვის პანელი',
            icon: <FaBookmark/>
        },
        {
            label: "CALL ხელფასები",
            href: "/dashboard",
            desc: 'ქოლცენტრის გუნდის ხელფასების მართვის პანელი',
            icon: <FaCreditCard/>
        },
        {
            label: "მენეჯმენტი",
            href: "/dashboard",
            desc: 'გრაფიკის მართვის პანელი (შვებულებები, გრაფიკი და სხვა...)',
            icon: <FaHourglassStart/>
        },
        {label: "სტატისტიკა", href: "/dashboard", desc: 'შემოსული და გაცემული ნომრების სტატისტიკა', icon: <FaMap/>},
        {
            label: "გუნდი",
            href: "/dashboard",
            desc: 'გუნდის მენეჯმენტი, შეზღუდვები როლების  მიხედვით',
            icon: <FaUniversity/>
        },
        {
            label: "სამშენებლო",
            href: "/dashboard",
            desc: 'პროექტების საინფორმაციო პანელი, პროექტის სტატუსი, კატეგორია და სხვა...',
            icon: <FaBuilding/>
        },
        {label: "გვერდები", href: "/dashboard", desc: 'გვერდების შექმნის მოდული', icon: <FaFile/>},
        {label: "Access Logs", href: "/dashboard", desc: 'ნებართვების ისტორია', icon: <FaArchive/>},
        {label: "ენები", href: "/dashboard", desc: 'ენის შეცვლა და დამატება', icon: <FaLanguage/>},
        {label: "ლექსიკონი", href: "/dashboard", desc: 'სიტყვების დამატება ენების მიხედვით', icon: <FaBook/>},
        {label: "REST API", href: "/dashboard", desc: 'ინტეგრაცია სხვა სისტემებთან', icon: <FaCubes/>},
    ]

    return (
        <>
            {/*overview*/}
            <section className={'flex flex-col gap-3'}>
                <div>
                    <h1 className={'title_font text-lg'}>ზოგადი მიმოხილვა</h1>
                    <p className={'pl-5'}>
                        Lemons CRM - არის გუნდის და კლიენტის მენეჯმენტის სისტემა, რომელიც აერთიანებს ყველა ძირითად
                        სამუშაო პროცესს ერთ ინტერფეისში.
                        <br/>
                        Lemons CRM - ში ასახულია კომპანიის ყველა სამუშაო პროცესი ლაივ რეჟიმში: ლიდების მართვა, ზარების
                        და შეტყობინებების მონიტორინგი, გაყიდვების სტატუსების კონტროლი და
                        სტატისტიკის ანალიზი.
                    </p>
                </div>

                <div className={'flex flex-col gap-3'}>
                    <h1 className={'title_font text-sm'}>მთავარი შესაძლებლობები</h1>
                    <ul className={'list-disc pl-9 flex flex-col gap-3'}>
                        <li>გუნდის მენეჯმენტი</li>
                        <li>კლიენტების მონაცემების უსაფრთხო მართვა</li>
                        <li>ზარების, SMS-ის და აქტივობების ისტორიის ნახვა</li>
                        <li>გაყიდვების პროცესის თვალყურის დევნება ლაივ რეჟიმში</li>
                        <li>სტატისტიკური ანალიტიკა</li>
                        <li>REST API ინტეგრაცია სხვა სისტემებთან</li>
                    </ul>
                </div>
            </section>

            <Separator className="my-5"/>

            {/*navigation*/}
            <section className={'flex flex-col gap-3'}>
                <div>
                    <h1 className={'title_font text-lg'}>ნავიგაცია და გვერდის სტრუქტურა</h1>
                    <p className={'pl-5'}>
                        საიტზე მარცხენა მხარეს მდებარეობს ნავიგაციის მენიუ, რომელიც უზრუნველყოფს წვდომას ყველა
                        მოდულთან.
                        <br/>
                        მოდულებზე წვდომა განსაზღვრულია თანამშრომლის პოზიციის მიხედვით
                    </p>
                </div>

                <div className={'pl-3 max-w-[900px]'}>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className={'title_font'}>მენიუს ელემენტები</TableHead>
                                <TableHead className={'title_font'}>დანიშნულება</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {menuItems.map((item) => (
                                <TableRow key={item.label}>
                                    <TableCell>
                                        <Link href={item.href}
                                              className={'flex items-center gap-2 hover:underline title_font'}>
                                            {item.icon}
                                            <span className={'pt-[1px]'}>{item.label}</span>
                                        </Link>
                                    </TableCell>
                                    <TableCell>{item.desc}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </section>
        </>
    );
}
