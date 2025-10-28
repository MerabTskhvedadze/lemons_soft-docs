'use client'

import React, {useEffect, useRef, useCallback} from 'react'
import {driver, Driver} from 'driver.js'
import 'driver.js/dist/driver.css' // ← important
import {DatePicker, Select} from 'antd'

import {Separator} from '@/components/ui/separator'
import {FadeInSection} from '@/animations/FadeInSection'
import {ScrollTrailText} from '@/animations/ScrollTrailText'

import {FaTimes} from 'react-icons/fa'
import {CgTimelapse} from 'react-icons/cg'
import {IoMdRefresh} from 'react-icons/io'
import {FaLariSign} from 'react-icons/fa6'
import {BiDollarCircle} from 'react-icons/bi'
import {
    MdPhone,
    MdOutlineTableChart,
    MdRemoveRedEye,
    MdGroup,
    MdAccessTime,
    MdRefresh
} from 'react-icons/md'

export default function Dashboard() {
    const {RangePicker} = DatePicker
    const [show, setShow] = React.useState(false)
    const tourRef = useRef<Driver | null>(null)

    useEffect(() => {
        tourRef.current = driver({
            showProgress: true,
            overlayClickBehavior: 'nextStep',
            allowClose: true,
            animate: true,
            stagePadding: 6,
        })
        return () => {
            tourRef.current?.destroy()
        }
    }, [])

    const startTour = useCallback(() => {
        tourRef.current?.setSteps([
            {
                element: '.tour-intro',
                popover: {
                    title: 'მოგესალმებით 👋',
                    description:
                        'ეს არის მონიტორინგის მთავარი პანელი. ქვემოთ გავიაროთ ძირითადი სექციები და ელემენტები.',
                    side: 'bottom',
                    align: 'start'
                }
            },
            {
                element: '.tour-range',
                popover: {
                    title: 'თარიღის ფილტრი',
                    description:
                        'აირჩიეთ დროის შუალედი – დეშბორდის მთელი სტატისტიკა განახლდება ამ ფილტრით.',
                    side: 'bottom'
                }
            },
            {
                element: '.tour-today-badge',
                popover: {
                    title: 'დღის სტატისტიკა',
                    description:
                        'აქ ხედავთ რომელი თარიღის (დღის) მონაცემებს უყურებთ ამჟამად.',
                    side: 'bottom'
                }
            },
            {
                element: '.tour-employee',
                popover: {
                    title: 'თანამშრომლის არჩევა',
                    description:
                        'გაფილტრეთ დეშბორდი კონკრეტულ ოპერატორზე/თანამშრომელზე.',
                    side: 'bottom'
                }
            },
            {
                element: '.tour-counters',
                popover: {
                    title: 'სწრაფი რიცხვები',
                    description:
                        'შემაჯამებელი მინი-მეტრიკები: ზარები სულ, ნასაუბრები, შეხვედრები და გაყიდვები.',
                    side: 'bottom'
                }
            },
            {
                element: '.tour-actions',
                popover: {
                    title: 'ქმედებები',
                    description:
                        'რეფრეში – მონაცემების განახლება. ცხრილი – დეტალური ნახვა/ეგზპორტი.',
                    side: 'left'
                }
            },
            {
                element: '.tour-calls-plan',
                popover: {
                    title: '📞 ზარების გეგმა',
                    description:
                        'საათობრივი და დღიური გეგმის პროგრესი. გამოიყენეთ ღილაკები ისტორიასა და რეფრეშზე.',
                    side: 'bottom'
                }
            },
            {
                element: '.tour-hourly-plan',
                popover: {
                    title: 'საათობრივი გეგმა',
                    description:
                        'სატელეფონო აქტივობის მიზანი თითო საათზე და შესრულების პროცენტი.',
                    side: 'bottom'
                }
            },
            {
                element: '.tour-daily-plan',
                popover: {
                    title: 'დღიური გეგმა',
                    description:
                        'დღის ბოლოსთვის მიზნადი ზარების რაოდენობა და პროგრესი.',
                    side: 'bottom'
                }
            },
            {
                element: '.tour-meetings-today',
                popover: {
                    title: 'დღევანდელი შეხვედრები',
                    description:
                        'გუნდური გეგმის შესრულება: სულ, შესრულებული და დარჩენილი შეხვედრები.',
                    side: 'bottom'
                }
            },
            {
                element: '.tour-card-calls',
                popover: {
                    title: 'ზარები',
                    description:
                        'ნაჩვენებია ნასაუბრები და სულ ზარები + თვის გეგმის პროგრესი.',
                    side: 'top'
                }
            },
            {
                element: '.tour-card-waiting',
                popover: {
                    title: 'მომლოდინე',
                    description:
                        'მიმდინარე პაიპლაინის მოცულობა და დღიური/თვიური ბონუსის ორიენტირი.',
                    side: 'top'
                }
            },
            {
                element: '.tour-card-meeting',
                popover: {
                    title: 'შეხვედრები',
                    description:
                        'გეგმიური შეხვედრების შესრულება და ბონუსები – გაყიდვამდე ძირითადი საფეხური.',
                    side: 'top'
                }
            },
            {
                element: '.tour-card-sales',
                popover: {
                    title: 'გაყიდვები',
                    description:
                        'დადასტურებული გაყიდვები და დაგეგმილი დღიური მიზანი.',
                    side: 'top'
                }
            },
            {
                element: '.tour-card-salary',
                popover: {
                    title: 'ხელფასი',
                    description:
                        'ზეგანაკვეთური და მოსალოდნელი ბონუსი. თვალის ღილოთი შეგიძლიათ დამალვა/ჩვენება.',
                    side: 'left'
                }
            },
            {
                element: '.tour-card-late',
                popover: {
                    title: 'დაგვიანება',
                    description:
                        'დასწრების მონიტორინგი – დაფიქსირებული დაგვიანებები გამოჩნდება აქ.',
                    side: 'top'
                }
            },
            {
                element: '.tour-empty-stats-1',
                popover: {
                    title: 'დეტალური ბლოკები',
                    description:
                        'თუ მონაცემი არ არის, ბლოკი შემოგთავაზებთ მოკლე აღწერას/სტატუსს.',
                    side: 'top'
                }
            },
            {
                element: '.tour-empty-stats-2',
                popover: {
                    title: 'თუ სტატისტიკა არ არის',
                    description:
                        'სისტემა მაინც ინახავს ვიზუალურ სტრუქტურას, რომ იცოდეთ სად რას ელოდოთ.',
                    side: 'top'
                }
            },
            {
                element: '.tour-waiting-tomorrow',
                popover: {
                    title: 'მომლოდინეები — ხვალ',
                    description:
                        'ხვალინდელი დღის პროგნოზი/გეგმა: დაეხმარება რესურსის სწორად გადანაწილებას.',
                    side: 'top'
                }
            },
            {
                element: '.tour-outro',
                popover: {
                    title: 'მორჩა! 🎉',
                    description:
                        'ახლა უკვე შეგიძლიათ თავისუფლად იმოძრაოთ დეშბორდზე. სურვილის შემთხვევაში, გაამეორეთ ტური.',
                    side: 'bottom',
                    align: 'start'
                }
            }
        ])
        tourRef.current?.drive()
    }, [])

    // Auto-run once per browser
    useEffect(() => {
        const k = 'dashboard-tour-seen-v1'
        if (!localStorage.getItem(k)) {
            startTour()
            localStorage.setItem(k, '1')
        }
    }, [startTour])

    return (
        <>
            {/* overview */}
            <FadeInSection>
                <section className="flex flex-col gap-3 tour-intro">
                    <div>
                        <h1 className="title_font text-lg">
                            <ScrollTrailText>🔹 გვერდის დანიშნულება</ScrollTrailText>
                        </h1>
                        <ScrollTrailText className="pl-5">
                            დეშბორდის გვერდი წარმოადგენს სისტემის მთავარ მონიტორინგის პანელს, სადაც მომხმარებელი
                            ხედავს დღის სტატისტიკას, ზარების რაოდენობას, შეხვედრებს, ქოლცენტრის და გაყიდვების აქტივობას,
                            ასევე
                            პირად და გუნდურ შედეგებს. გვერდი განკუთვნილია ოპერატორებისთვის, მენეჯერებისთვის და
                            ადმინისტრატორებისთვის - სამუშაო
                            პროცესის ყოველდღიური კონტროლისთვის.
                        </ScrollTrailText>
                    </div>

                    {/* manual trigger */}
                    <div className="mt-2">
                        <button
                            onClick={startTour}
                            className="px-3 py-1 text-xs rounded-md bg-blue-600 text-white hover:opacity-90"
                        >
                            გაეცანი გვერდს
                        </button>
                    </div>
                </section>
            </FadeInSection>

            <Separator className="my-5"/>

            <div
                className="flex flex-wrap gap-3 items-center justify-between py-4 px-5 bg-gray-50 rounded-lg tour-outro">
                <RangePicker placeholder={['საწყისი', 'დასასრული']} className="tour-range"/>

                <div
                    className="text-nowrap title_font bg-[#e9ecef] text-[#153d77] py-2 px-4 text-xs rounded-sm tour-today-badge">
                    {new Date().toLocaleDateString('ka-GE', {
                        day: '2-digit',
                        month: 'long',
                        year: 'numeric'
                    })}-ის სტატისტიკა
                </div>

                <Select
                    className="tour-employee"
                    style={{maxWidth: 300, width: '100%'}}
                    showSearch
                    placeholder="აირჩიეთ თანამშრომელი"
                    optionFilterProp="label"
                    options={[
                        {value: 'jack', label: 'Jack'},
                        {value: 'lucy', label: 'Lucy'},
                        {value: 'tom', label: 'Tom'}
                    ]}
                />
            </div>

            <Separator className="my-1 bg-transparent"/>

            <div
                className="flex gap-3 flex-wrap justify-center items-center sm:justify-between bg-gray-50 rounded-lg py-4 px-5"
            >
                <div className="flex flex-wrap justify-center gap-3 items-center tour-counters">
                    {[
                        {bg: '#f1f3f5', label: 'ზარები სულ', value: '0'},
                        {bg: '#e6f9f0', label: 'ნასაუბრები', value: '0'},
                        {bg: '#fff5e6', label: 'შეხვედრები', value: '0'},
                        {bg: '#fdeaea', label: 'გაყიდვები', value: '0'}
                    ].map((item, i) => {
                        return (
                            <div
                                key={i}
                                style={{background: item.bg}}
                                className="py-2 px-4 text-xs rounded-4xl transition duration-200 ease-in"
                            >
                                {item.label} {item.value}
                            </div>
                        )
                    })}
                </div>

                <div className="flex gap-3 items-center tour-actions">
          <span className="py-1 px-3 bg-blue-600 rounded-full">
            <IoMdRefresh color="white" size={20}/>
          </span>
                    <span className="py-1 px-3 bg-yellow-600 rounded-full">
            <MdOutlineTableChart color="white" size={20}/>
          </span>
                </div>
            </div>

            <Separator className="my-1 bg-transparent"/>

            <section className="lg:flex gap-3 bg-gray-50">
                <div className="lg:max-w-[420px] w-full shrink flex flex-col gap-3 rounded-lg p-2 sm:px-5 sm:py-4">
                    {/* calls plan */}
                    <div className="shadow bg-white p-3 rounded-lg border flex flex-col gap-3 tour-calls-plan">
                        <div className="flex items-center gap-2 justify-between">
                            <h1 className="title_font text-xs">📞 ზარების გეგმა</h1>
                            <p className="flex items-center gap-2">
                <span className="history p-1 border border-gray-200 rounded-full">
                  <MdAccessTime size={20} color="blue"/>
                </span>
                                <span className="refresh p-1 border border-gray-200 rounded-full">
                  <MdRefresh size={20} color="blue"/>
                </span>
                            </p>
                        </div>

                        <div className="flex items-center gap-2 ">
                            <Card
                                title={
                                    <div className="flex flex-col gap-2 tour-hourly-plan">
                                        <span>საათობრივი გეგმა</span>
                                        <ProgressBar onlyBar/>
                                        <div className="flex items-center justify-between gap-2">
                                            <p>0 / 253</p>
                                            <p className="title_font font-extrabold">0.0%</p>
                                        </div>
                                    </div>
                                }
                                className="border"
                            />

                            <Card
                                title={
                                    <div className="flex flex-col gap-2 tour-daily-plan">
                                        <span>დღიური გეგმა</span>
                                        <ProgressBar onlyBar/>
                                        <div className="flex items-center justify-between gap-2">
                                            <p>0 / 253</p>
                                            <p className="title_font font-extrabold">0.0%</p>
                                        </div>
                                    </div>
                                }
                                className="border"
                            />
                        </div>
                    </div>

                    {/* today's planned meetings */}
                    <div className="shadow bg-white p-3 rounded-lg border flex flex-col gap-3 tour-meetings-today">
                        <div className="flex items-center gap-2 justify-between">
                            <h1 className="text-xs title_font flex items-center gap-2">
                                <MdGroup size={20} color="blue"/>
                                <span>დღეს ჩანიშნული შეხვედრები</span>
                            </h1>
                            <p className="flex items-center gap-2">
                <span className="refresh-meetings p-1 border border-gray-300 rounded-full">
                  <MdRefresh size={20} color="blue"/>
                </span>
                            </p>
                        </div>

                        <div className="w-full meetings-list flex flex-col gap-3 ">
                            {Array.from({length: 3}).map((_, idx) => (
                                <div key={idx} className="flex flex-col gap-1">
                                    <div className="flex items-center gap-2 justify-between">
                                        <span className="text-sm">მარიამ დუმბაძე</span>
                                        <span className="text-sm">სულ 8</span>
                                    </div>
                                    <ProgressBar onlyBar height={0.8}/>
                                    <div className="flex items-center gap-2 justify-between">
                                        <span className="text-xs">შემდგარი შეხვედრა 3</span>
                                        <span className="text-xs">შესასრულებელი დარჩა 5</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div
                    className="flex-1 min-w-0 grid grid-cols-1 sm:grid-cols-4 2xl:grid-cols-3 gap-4 rounded-lg p-2 sm:px-5 sm:py-4 w-full">
                    <Card
                        title="ზარები"
                        icon={<MdPhone size={20} color="white"/>}
                        footer={<Action icon={<FaTimes/>} text="დღის გეგმა 100"/>}
                        className="sm:col-span-2 2xl:col-span-1 tour-card-calls"
                    >
                        <div className="flex items-center gap-2 justify-between">
                            <p className="text-xs flex flex-col">
                                <span className="text-gray-400">ნასაუბრები</span>
                                <span>0</span>
                            </p>
                            <p className="text-xs text-right flex flex-col">
                                <span className="text-gray-400">სულ</span>
                                <span>0</span>
                            </p>
                        </div>
                        <ProgressBar goal="2,638"/>
                    </Card>

                    <Card
                        title="მომლოდინე"
                        icon={<CgTimelapse size={20} color="white"/>}
                        footer={<Action icon={<FaTimes/>} text="დღის გეგმა 15"/>}
                        className="sm:col-span-2 2xl:col-span-1 tour-card-waiting"
                    >
                        <p>0</p>
                        <div className="flex flex-col text-xs">
                            <p>დღის ბონუსი: <span className="text-red-400">0 ₾</span></p>
                            <p>მოს. თვის ბონუსი: <span className="text-red-400">0 ₾</span></p>
                        </div>
                        <ProgressBar goal="40"/>
                    </Card>

                    <Card
                        title="შეხვედრა"
                        icon={<MdGroup size={20} color="white"/>}
                        footer={<Action icon={<FaTimes/>} text="დღის გეგმა 5"/>}
                        className="sm:col-span-4 2xl:col-span-1 tour-card-meeting"
                    >
                        <p>0</p>
                        <div className="flex flex-col text-xs">
                            <p>დღის ბონუსი: <span className="text-red-400">0 ₾</span></p>
                            <p>მოს. თვის ბონუსი: <span className="text-red-400">0 ₾</span></p>
                        </div>
                        <ProgressBar goal="10"/>
                    </Card>

                    <Card
                        title="გაყიდვები"
                        icon={<BiDollarCircle size={20} color="white"/>}
                        footer={<Action icon={<FaTimes/>} text="დღის გეგმა 5"/>}
                        className="sm:col-span-2 2xl:col-span-1 tour-card-sales"
                    >
                        <p>0</p>
                        <div className="flex flex-col text-xs">
                            <p className="text-gray-400">მოს. თვის ბონუსი: <span className="text-red-500">0 ₾</span></p>
                        </div>
                    </Card>

                    <Card
                        title={
                            <div className="flex items-center gap-1">
                                <h1>ხელფასი</h1>
                                <div className="p-1 bg-gray-300 rounded-full">
                                    <MdRemoveRedEye
                                        size={18}
                                        className="cursor-pointer"
                                        onClick={() => setShow(prev => !prev)}
                                    />
                                </div>
                            </div>
                        }
                        icon={<FaLariSign size={20} color="white"/>}
                        footer={<h1 className="title_font">სულ: {show ? '0₾' : '---'}</h1>}
                        className="sm:col-span-2 2xl:col-span-1 tour-card-salary"
                    >
                        <div className="flex flex-col text-xs text-gray-400">
                            <p>ზეგანაკვეთური:</p>
                            <p>{show ? <span className="text-green-500">0₾</span> : '---'}</p>
                            <p>მოს. ბონუსი:</p>
                            <p>{show ? <span className="text-green-500">0₾</span> : '---'}</p>
                        </div>
                    </Card>

                    <Card
                        title="დაგვიანება"
                        icon={<MdRemoveRedEye size={20} color="white"/>}
                        className="sm:col-span-4 2xl:col-span-1 tour-card-late"
                    >
                        <p className="text-sm">დაგვიანება არ ფიქსირდება</p>
                    </Card>

                    <div className="sm:col-span-4 xl:col-span-3 flex flex-col sm:flex-row gap-4">
                        <Card
                            title={
                                <div className="flex items-center gap-4">
                                    <MdRemoveRedEye size={20} color="blue"/>
                                    <span>სტატისტიკის ჩანაწერი არ არის</span>
                                </div>
                            }
                            className="sm:col-span-4 2xl:col-span-1 tour-empty-stats-1"
                        />

                        <Card
                            title={
                                <div className="flex items-center gap-4">
                                    <MdRemoveRedEye size={20} color="blue"/>
                                    <span>სტატისტიკის ჩანაწერი არ არის</span>
                                </div>
                            }
                            className="sm:col-span-4 2xl:col-span-1 tour-empty-stats-2"
                        />
                    </div>

                    <Card
                        title={
                            <div className="flex items-center gap-4">
                                <BiDollarCircle size={20} color="blue"/>
                                <div>
                                    <h1>მომლოდინეები — ხვალ</h1>
                                    <p className="text_font text-[0.6rem] text-gray-400">
                                        <span className="title_font">თარიღი: </span>
                                        წწწწ-თთ-დდ
                                    </p>
                                </div>
                            </div>
                        }
                        icon={<BiDollarCircle size={20} color="white"/>}
                        footer={<Action icon={<FaTimes/>} text="დღის გეგმა 5"/>}
                        className="sm:col-span-4 2xl:col-span-3 tour-waiting-tomorrow"
                    >
                        <p>0</p>
                        <div className="flex flex-col text-xs">
                            <p className="text-gray-400">მოს. თვის ბონუსი: <span className="text-red-500">0 ₾</span></p>
                        </div>
                    </Card>
                </div>
            </section>
        </>
    )
}

function Card(
    {
        title, icon, footer, children, className
    }: {
        title: string | React.ReactNode,
        icon?: React.ReactNode,
        footer?: React.ReactNode,
        children?: React.ReactNode,
        className?: string
    }) {
    return (
        <div className={`shadow w-full bg-white p-3 flex flex-col gap-3 ${className || ''}`}>
            <header className="flex items-center gap-2 justify-between">
                <div className="title_font text-xs w-full">{title}</div>
                {icon && (
                    <p className="flex items-center gap-2">
            <span className="history p-1 bg-blue-700 rounded-full">
              {icon}
            </span>
                    </p>
                )}
            </header>

            {children}

            {footer && <footer className="mt-auto">{footer}</footer>}
        </div>
    )
}

function ProgressBar({goal, onlyBar = false, height = 0.25}: { goal?: string, onlyBar?: boolean, height?: number }) {
    if (onlyBar) {
        return <div className="w-full rounded-2xl bg-gray-300" style={{height: `${height}rem`}}/>
    }
    return (
        <div className="flex flex-col gap-1">
            <p className="flex items-center justify-between font-bold text-[10px]">
                <span>თვის გეგმა</span>
                <span className="text-red-500">0%</span>
            </p>
            <div className="rounded-2xl h-1 bg-gray-300"/>
            <p className="flex items-center justify-between text-[10px]">
                <span>0</span>
                <span>{goal}</span>
            </p>
        </div>
    )
}

function Action({icon, text}: { icon: React.ReactNode, text: string }) {
    return (
        <div
            className="select-none cursor-pointer py-[2px] text-[12px] title_font border text-red-500 flex items-center gap-1 justify-center border-red-500 rounded-2xl hover:text-white hover:bg-red-500 transition duration-300 ease-in"
        >
            {icon}
            <span>{text}</span>
        </div>
    )
}