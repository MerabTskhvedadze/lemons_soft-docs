'use client'

import React from 'react'
import Link from 'next/link'
import {Separator} from "@/components/ui/separator";
import {FadeInSection} from "@/animations/FadeInSection";


import {
    Table,
    TableHeader,
    TableRow,
    TableHead,
    TableBody,
    TableCell,
} from "@/components/ui/table";

import {
    FaDesktop, FaBars, FaAddressBook, FaShoppingBag,
    FaHandshake, FaUsers, FaPhone, FaMobile, FaComments,
    FaBookmark, FaCreditCard, FaHourglassStart, FaMap,
    FaUniversity, FaBuilding, FaFile, FaArchive, FaLanguage, FaBook,
    FaDollarSign, FaCheck
} from "react-icons/fa"
import {MdListAlt, MdNotes, MdOutlineWatchLater, MdTimelapse} from "react-icons/md";
import {IoMdPause} from "react-icons/io";
import {RiVoiceprintFill, RiCupFill} from "react-icons/ri";
import {Button} from "@/components/ui/button";

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
        // {label: "REST API", href: "/dashboard", desc: 'ინტეგრაცია სხვა სისტემებთან', icon: <FaCubes/>},
    ]

    const topNavItems = [
        {
            label: 'გვერდითი პანელი',
            desc: 'ხსნის/კეტავს მარცხენა ნავიგაციას ნებისმიერი გვერდიდან.',
            href: "#dashboard",
        },
        {
            label: 'SCRIPTS',
            desc: 'ღილაკი რომელიც ხსნის სკრიპტების საიტს(კითხვა პასუხის შაბლონი).',
            href: "#dashboard",
            button: <Button size={'sm'} className={'bg-[#20c997]'}>
                <div className={'flex items-center gap-2'}>
                    <MdListAlt/>
                    <span className={'text-xs'}>SCRIPTS</span>
                </div>
            </Button>
        },
        {
            label: 'გრაფიკი',
            desc: 'თანამშრომლების სამუშაო საათების გრაფიკი.',
            href: "#dashboard",
            button: <Button size={'sm'} className={'bg-[#0047b0]'}>
                <div className={'flex items-center gap-2'}>
                    <RiVoiceprintFill/>
                    <span className={'text-xs'}>გრაფიკი</span>
                </div>
            </Button>
        },
        {
            label: 'სანიშნი',
            desc: 'სწრაფი სანიშნი (sticky notes).',
            href: "#dashboard",
            button: <Button size={'sm'}>
                <div className={'flex items-center gap-2'}>
                    <MdNotes/>
                    <span className={'text-xs'}>სანიშნი</span>
                </div>
            </Button>
        },
        {
            label: 'საათი',
            desc: 'საათი.',
            href: "#dashboard",
            button: <Button size={'sm'} className={'bg-[#3b7ddd]'}>
                <div className={'flex items-center gap-2'}>
                    <MdOutlineWatchLater/>
                    <span className={'text-xs'}>00:00:00</span>
                </div>
            </Button>
        },
        {
            label: 'დოლარის კურსი',
            desc: 'დოლარის კურსის მაჩვენებელი შორთქათი.',
            href: "#dashboard",
            button: <Button size={'sm'} className={'bg-[#28a745]'}>
                <div className={'flex items-center gap-2'}>
                    <FaDollarSign/>
                    <span className={'text-xs'}>0.0000</span>
                </div>
            </Button>
        },
        {
            label: 'ნამუშევარი დრო',
            desc: 'სრული სესიის ხანგრძლივობა',
            href: "#dashboard",
            button: <div className={'flex items-center gap-5 p-2 bg-[#486794]/60 rounded'}>
                <div className={'flex items-center gap-3'}>
                    <div className={'flex items-center gap-2'}>
                        <MdTimelapse size={20} className={'text-white'}/>
                        <span>0:00:00</span>
                    </div>
                    <div className={'flex items-center gap-1'}>
                        <RiCupFill size={20} className={'text-white'}/>
                        <span>0:00:00</span>
                    </div>
                </div>

                <div className={'flex items-center gap-2'}>
                    <Button size={'sm'} className={'bg-[#fd7e14]'}>
                        <IoMdPause size={20}/>
                    </Button>

                    <Button size={'sm'} className={'bg-[#dc3545]'}>
                        <div className={'flex items-center gap-2 text-xs'}>
                            <FaCheck size={20}/>
                            <span>დასრულება</span>
                        </div>
                    </Button>
                </div>
            </div>
        }
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
                    <ul className={'list-decimal pl-9 flex flex-col gap-3 title_font text-sm'}>
                        <li>
                            <span>კომპანიის მენეჯმენტი</span>
                            <ul className={'mt-1 list-disc pl-3.5 flex flex-col gap-1 text_font text-sm'}>
                                <li>გაყიდვები</li>
                                <li>მარკეტინგი</li>
                                <li>ქოლცენტრი</li>
                                <li>HR - დეპარტამენტი</li>
                                <li>მობინადრეებთან ურთიერთობის მენეჯმენტი</li>
                            </ul>
                        </li>
                        <li>
                            <span>კლიენტების მონაცემების უსაფრთხო მართვა</span>
                            <ul className={'mt-1 list-disc pl-3.5 flex flex-col gap-1 text_font text-sm'}>
                                <li>მობინადრეების პანელი</li>
                                <li>ხელშეკრულებები და გადახდები</li>
                            </ul>
                        </li>
                        <li>ზარების და SMS-ების ისტორია</li>
                        <li>გაყიდვების პროცესის თვალყურის დევნება ლაივ რეჟიმში</li>
                        <li>
                            <span>სტატისტიკური ანალიტიკა</span>
                            <ul className={'mt-1 list-disc pl-3.5 flex flex-col gap-1 text_font text-sm'}>
                                <li>დღის ზარების რაოდენობა</li>
                                <li>დღის შეხვედრები</li>
                                <li>მომლოდინე ლიდები</li>
                            </ul>
                        </li>
                        {/*<li>REST API ინტეგრაცია სხვა სისტემებთან</li>*/}
                    </ul>
                </div>
            </section>

            <Separator className="my-5"/>

            {/*header*/}
            <FadeInSection>
                <section className={'flex flex-col gap-3'}>
                    <div>
                        <h1 className={'title_font text-lg'}>ზედა ნავიგაცია (ჰედერი)</h1>
                        <p className={'pl-5'}>
                            ზედა ნავიგაციაში წარმოდგენილია შორთქათები და
                            დამხმარე ფუნქციები:

                            <span className={'mt-2 text-xs block italic text-gray-600'}>
                                *შორთქათი: სწრაფი ღილაკი კონკრეტული ფუნქციის გასააქტიურებლად*
                            </span>
                        </p>
                    </div>

                    <div className={'pl-3 max-w-full'}>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className={'title_font text-gray-500'}>ელემენტი</TableHead>
                                    <TableHead className={'title_font text-gray-500'}>ფუნქცია</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {topNavItems.map((i) => (
                                    <TableRow key={i.label}>
                                        <TableCell className={'title_font'}>
                                            <Link href={i.href} className={`${!(i.button) ? 'underline' : ''}`}>
                                                {i?.button ?
                                                    i.button
                                                    :
                                                    i.label
                                                }
                                            </Link>
                                        </TableCell>
                                        <TableCell>{i.desc}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                </section>
            </FadeInSection>

            <Separator className="my-5"/>

            {/*sidebar*/}
            <FadeInSection>
                <section className={'flex flex-col gap-3 scroll-mt-28'} id={'dashboard'}>
                    <div>
                        <h1 className={'title_font text-lg'}>გვერდითი პანელი და გვერდების სტრუქტურა</h1>
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
                                    <TableHead className={'title_font text-gray-500'}>ელემენტები</TableHead>
                                    <TableHead className={'title_font text-gray-500'}>ფუნქცია</TableHead>
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
            </FadeInSection>
        </>
    );
}
