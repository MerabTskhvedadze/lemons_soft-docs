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
import {ScrollTrailText} from "@/animations/ScrollTrailText";


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
            href: "#",
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
            href: "#graph",
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
            href: "#notes",
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
            href: "#time",
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
            href: "#dollar",
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
                    <div className={'flex items-center gap-2 text-white'}>
                        <MdTimelapse size={20}/>
                        <span>0:00:00</span>
                    </div>
                    <div className={'flex items-center gap-1 text-white'}>
                        <RiCupFill size={20}/>
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
            <FadeInSection>
                <section className={'flex flex-col gap-3'}>
                    <div>
                        <h1 className={'title_font text-lg'}>
                            <ScrollTrailText>🔹 ზოგადი მიმოხილვა</ScrollTrailText>
                        </h1>
                        <ScrollTrailText className={'pl-5'}>
                            Lemons CRM - არის გუნდის და კლიენტის მენეჯმენტის სისტემა, რომელიც აერთიანებს ყველა ძირითად
                            სამუშაო პროცესს ერთ ინტერფეისში.
                            <br/>
                            Lemons CRM - ში ასახულია კომპანიის ყველა სამუშაო პროცესი ლაივ რეჟიმში: ლიდების მართვა,
                            ზარების
                            და შეტყობინებების მონიტორინგი, გაყიდვების სტატუსების კონტროლი და
                            სტატისტიკის ანალიზი.
                        </ScrollTrailText>
                    </div>

                    <div className={'flex flex-col gap-3'}>
                        <h1 className={'title_font text-sm'}>
                            <ScrollTrailText>მთავარი შესაძლებლობები</ScrollTrailText>
                        </h1>
                        <ul className={'list-decimal pl-9 flex flex-col gap-3 title_font text-sm'}>
                            <li>
                                <ScrollTrailText>კომპანიის მენეჯმენტი</ScrollTrailText>
                                <ul className={'mt-1 list-disc pl-3.5 flex flex-col gap-1 text_font text-sm'}>
                                    <li>
                                        <ScrollTrailText>გაყიდვები</ScrollTrailText>
                                    </li>
                                    <li>
                                        <ScrollTrailText>მარკეტინგი</ScrollTrailText>
                                    </li>
                                    <li>
                                        <ScrollTrailText>ქოლცენტრი</ScrollTrailText>
                                    </li>
                                    <li>
                                        <ScrollTrailText>HR - დეპარტამენტი</ScrollTrailText>
                                    </li>
                                    <li>
                                        <ScrollTrailText>მობინადრეებთან ურთიერთობის მენეჯმენტი </ScrollTrailText>
                                    </li>
                                </ul>
                            </li>
                            <li>
                                <ScrollTrailText>კლიენტების მონაცემების უსაფრთხო მართვა</ScrollTrailText>
                                <ul className={'mt-1 list-disc pl-3.5 flex flex-col gap-1 text_font text-sm'}>
                                    <li><ScrollTrailText>მობინადრეების პანელი</ScrollTrailText></li>
                                    <li><ScrollTrailText>ხელშეკრულებები და გადახდები</ScrollTrailText></li>
                                </ul>
                            </li>
                            <li><ScrollTrailText>ზარების და SMS-ების ისტორია</ScrollTrailText></li>
                            <li><ScrollTrailText>გაყიდვების პროცესის თვალყურის დევნება ლაივ რეჟიმში</ScrollTrailText>
                            </li>
                            <li>
                                <ScrollTrailText>სტატისტიკური ანალიტიკა</ScrollTrailText>
                                <ul className={'mt-1 list-disc pl-3.5 flex flex-col gap-1 text_font text-sm'}>
                                    <li><ScrollTrailText>დღის ზარების რაოდენობა</ScrollTrailText></li>
                                    <li><ScrollTrailText>დღის შეხვედრები</ScrollTrailText></li>
                                    <li><ScrollTrailText>მომლოდინე ლიდები</ScrollTrailText></li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                </section>
            </FadeInSection>

            <Separator className="my-5"/>

            {/*header*/}
            <FadeInSection>
                <section className={'flex flex-col gap-3'}>
                    <div>
                        <h1 className={'title_font text-lg'}>
                            <ScrollTrailText>🔹 ზედა ნავიგაცია (ჰედერი)</ScrollTrailText>
                        </h1>
                        <ScrollTrailText className={'pl-5'}>
                            ზედა ნავიგაციაში წარმოდგენილია შორთქათები და
                            დამხმარე ფუნქციები:

                            <span className={'mt-2 text-xs block italic text-gray-600'}>
                                *შორთქათი: სწრაფი ღილაკი კონკრეტული ფუნქციის გასააქტიურებლად*
                            </span>
                        </ScrollTrailText>
                    </div>

                    <div className={'pl-3 max-w-full'}>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className={'title_font text-gray-500'}>
                                        <ScrollTrailText>ელემენტი</ScrollTrailText>
                                    </TableHead>
                                    <TableHead className={'title_font text-gray-500'}>
                                        <ScrollTrailText>ფუნქცია</ScrollTrailText>
                                    </TableHead>
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
                                        <TableCell>
                                            <ScrollTrailText>{i.desc}</ScrollTrailText>
                                        </TableCell>
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
                        <h1 className={'title_font text-lg'}>
                            <ScrollTrailText>🔹 გვერდითი პანელი და გვერდების სტრუქტურა </ScrollTrailText>
                        </h1>
                        <ScrollTrailText className={'pl-5'}>
                            საიტზე მარცხენა მხარეს მდებარეობს ნავიგაციის მენიუ, რომელიც უზრუნველყოფს წვდომას ყველა
                            მოდულთან.
                            <br/>
                            მოდულებზე წვდომა განსაზღვრულია თანამშრომლის პოზიციის მიხედვით
                        </ScrollTrailText>
                    </div>

                    <div className={'pl-3 max-w-[900px]'}>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead
                                        className={'title_font text-gray-500'}><ScrollTrailText>ელემენტები</ScrollTrailText></TableHead>
                                    <TableHead
                                        className={'title_font text-gray-500'}><ScrollTrailText>ფუნქცია</ScrollTrailText></TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {menuItems.map((item) => (
                                    <TableRow key={item.label}>
                                        <TableCell>
                                            <ScrollTrailText>
                                                <Link href={item.href}
                                                      className={'flex items-center gap-2 hover:underline title_font'}>
                                                    {item.icon}
                                                    <span className={'pt-[1px]'}>{item.label}</span>
                                                </Link>
                                            </ScrollTrailText>
                                        </TableCell>
                                        <TableCell><ScrollTrailText>{item.desc}</ScrollTrailText></TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                </section>
            </FadeInSection>

            <Separator className="my-5"/>

            {/*graph*/}
            <FadeInSection>
                <section className={'flex flex-col gap-3 scroll-mt-28'} id={'graph'}>
                    <div className={'flex items-center gap-2'}>
                        <Button size={'sm'} className={'bg-[#0047b0]'}>
                            <div className={'flex items-center gap-2'}>
                                <RiVoiceprintFill/>
                                <span className={'text-xs'}>გრაფიკი</span>
                            </div>
                        </Button>

                        <h1 className={'title_font'}>
                            <ScrollTrailText>თანამშრომლების სამუშაო საათების გრაფიკი.</ScrollTrailText>
                        </h1>
                    </div>

                    <div className={'pl-3 max-w-[900px]'}>
                        <ScrollTrailText>
                            მოცემული ღილაკზე დაკლიკებისას გაიხსნება ფანჯარა, რომელშიც მოცემულია ცხრილი თანამშრომლების
                            სამუშაო საათებით დეპარტამენტების მიხედვით, ცხრილში მოცემულია მთელი თვის გეგმა
                        </ScrollTrailText>
                    </div>
                </section>
            </FadeInSection>

            <Separator className="my-5"/>

            {/*sticky notes*/}
            <FadeInSection>
                <section className={'flex flex-col gap-3 scroll-mt-28'} id={'notes'}>
                    <div className={'flex items-center gap-2'}>
                        <Button size={'sm'}>
                            <div className={'flex items-center gap-2'}>
                                <MdNotes/>
                                <span className={'text-xs'}>სანიშნი</span>
                            </div>
                        </Button>
                        <h1 className={'title_font'}>
                            <ScrollTrailText>წებოვანი ქაღალდი (Sticky notes)</ScrollTrailText>
                        </h1>
                    </div>

                    <div className={'pl-3 max-w-[900px]'}>
                        <ScrollTrailText>
                            ეს ფუნქციონალი მომხმარებელს აძლევს საშუალებას, საიტზე შექმნას პირადი ან სამუშაო შენიშვნები,
                            რომლებსაც ნებისმიერ დროს დაინახავს საიტის ნებისმიერი გვერდიდან.
                        </ScrollTrailText>
                    </div>
                </section>
            </FadeInSection>

            <Separator className="my-5"/>

            {/*time*/}
            <FadeInSection>
                <section className={'flex flex-col gap-3 scroll-mt-28'} id={'time'}>
                    <div className={'flex items-center gap-2'}>
                        <Button size={'sm'} className={'bg-[#3b7ddd]'}>
                            <div className={'flex items-center gap-2'}>
                                <MdOutlineWatchLater/>
                                <span className={'text-xs'}>00:00:00</span>
                            </div>
                        </Button>
                        <h1 className={'title_font'}>
                            <ScrollTrailText>საათი</ScrollTrailText>
                        </h1>
                    </div>

                    <div className={'pl-3 max-w-[900px]'}>
                        <ScrollTrailText>დროის მაჩვენებელი ბეიჯი</ScrollTrailText>
                    </div>
                </section>
            </FadeInSection>

            <Separator className="my-5"/>

            {/*dollar*/}
            <FadeInSection>
                <section className={'flex flex-col gap-3 scroll-mt-28'} id={'dollar'}>
                    <div className={'flex items-center gap-2'}>
                        <Button size={'sm'} className={'bg-[#28a745]'}>
                            <div className={'flex items-center gap-2'}>
                                <FaDollarSign/>
                                <span className={'text-xs'}>0.0000</span>
                            </div>
                        </Button>
                        <h1 className={'title_font'}>
                            <ScrollTrailText>დოლარის კურსი</ScrollTrailText>
                        </h1>
                    </div>

                    <div className={'pl-3 max-w-[900px]'}>
                        <ScrollTrailText>
                            მოცემული ღილაკი გვიჩვენებს დოლარის კურსს ლართან მიმართებაში, დაკლიკებისას რეფრეშდება და
                            მოაქვს
                            უახლესი კურსი
                        </ScrollTrailText>
                    </div>
                </section>
            </FadeInSection>

            <Separator className="my-5"/>

            {/*working hours*/}
            <FadeInSection>
                <section className={'flex flex-col gap-3 scroll-mt-28'} id={'dollar'}>
                    <div className={'flex items-center gap-2'}>
                        <div className={'flex items-center gap-5 p-2 bg-[#486794]/60 rounded'}>
                            <div className={'flex items-center gap-3'}>
                                <div className={'flex items-center gap-2 text-white'}>
                                    <MdTimelapse size={20}/>
                                    <span>0:00:00</span>
                                </div>
                                <div className={'flex items-center gap-1 text-white'}>
                                    <RiCupFill size={20}/>
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
                        <h1 className={'title_font'}>
                            <ScrollTrailText>სრული სესიის ხანგრძლივობა</ScrollTrailText>
                        </h1>
                    </div>

                    <div className={'pl-3 max-w-[900px]'}>
                        <ScrollTrailText>
                            ეს კონტეინერი გვიჩვენებს სრულ სამუშაო სესიას, დროის ჩართვიდან დასრულებამდე, დაპაუზების
                            შემთხვევაში ირთობა შესვენების ტაიმერი და ითვლის რამდენიხანი იყო თანამშრომელი შესვენებაზე.
                            <br/>
                            დასრულების შემდეგ ნამუშევარ დროს აკლდება შესვენების დრო და ასე ითვლება სამუშაო სესია
                        </ScrollTrailText>
                    </div>
                </section>
            </FadeInSection>
        </>
    );
}
