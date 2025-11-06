'use client'

import React, {useState, useEffect, useRef, useCallback} from 'react'
import {driver, Driver} from 'driver.js'
import {DatePicker, Select} from 'antd'

import {Chip} from '@/components/chip'
import {Button} from '@/components/ui/button'
import {Card} from "@/components/dashboard/card"
import {getGeorgianDateString} from "@/lib/utils";
import {Separator} from '@/components/ui/separator'
import {ProgressBar} from "@/components/progress-bar";
import {ScrollTrailText} from '@/animations/ScrollTrailText'
import {MeetingsCard} from "@/components/dashboard/meetings-card";

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
    MdRefresh,
    MdTimeline
} from 'react-icons/md'
import {useCursor} from "@/context/cursor-context";
import {Tooltip} from '@/components/tooltip'

export default function Dashboard() {
    const {setCursor} = useCursor()
    const today = getGeorgianDateString();
    const tomorrow = getGeorgianDateString({addDays: 1, format: 'DD-MM-YYYY'});
    const {RangePicker} = DatePicker
    const [show, setShow] = useState(false)
    const [tourStatus, setTourStatus] = useState(false)
    const tourRef = useRef<Driver | null>(null)

    const meetings = [
        {agent: 'თორნიკე ოსეფაშვილი', total: 2, meeting: [{project: 'სხვა უბანი დიდ დიღომი', count: 2}]},
        {agent: 'მარიამ დუმბაძე', total: 2, meeting: [{project: 'სხვა უბანი დიდ დიღომი', count: 2}]},
        {
            agent: 'მატილდა ბარკალაია',
            total: 10,
            meeting: [
                {project: 'სხვა უბანი დიდ დიღომში', count: 5},
                {project: 'სოლუმ გლდანი 2', count: 1},
                {project: 'გლდანი', count: 3},
                {project: 'დიდი დიღომი', count: 1},
            ]
        },
        {agent: 'ლიზი ბიწაძე', total: 4, meeting: [{project: 'ფონიჭალა', count: 4}]},
    ]

    useEffect(() => {
        tourRef.current = driver({
            showProgress: true,
            overlayClickBehavior: 'nextStep',
            allowClose: true,
            animate: true,
            stagePadding: 6,
            onHighlightStarted: () => {
                setTourStatus(true)
            },
            onDestroyed: () => {
                setTourStatus(false)
            }
        })
        return () => {
            tourRef.current?.destroy()
        }
    }, [])

    const startTour = useCallback(() => {
        tourRef.current?.setSteps([
            {
                element: '.tour-range',
                popover: {
                    title: 'თარიღის ფილტრი',
                    description:
                        'აირჩიეთ დროის შუალედი - დეშბორდის მთელი სტატისტიკა განახლდება ამ ფილტრით.',
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
                        'გაფილტრეთ დეშბორდი კონკრეტული თანამშრომლის მიხედვით.',
                    side: 'bottom'
                }
            },
            {
                element: '.tour-counters',
                popover: {
                    title: 'მონაცემები',
                    description:
                        'შემაჯამებელი მონაცემები მოკლედ: ზარები, ნასაუბრები, შეხვედრები და გაყიდვები.',
                    side: 'bottom'
                }
            },
            {
                element: '.tour-actions',
                popover: {
                    title: 'ღილაკები',
                    description:
                        'რეფრეში - მონაცემების განახლება. ცხრილი - ხელფასების ცხრილი.',
                    side: 'left'
                }
            },
            {
                element: '.tour-calls-plan',
                popover: {
                    title: '📞 ზარების გეგმა',
                    description:
                        'საათობრივი და დღიური გეგმის პროგრესი.',
                    side: 'bottom'
                }
            },
            {
                element: '.tour-calls-plan-time',
                popover: {
                    title: 'ისტორია',
                    description:
                        'აჩვენებს საათში განხორციელებული ზარების ისტორიას დღის განმავლობაში.',
                    side: 'bottom'
                }
            },
            {
                element: '.tour-calls-plan-refresh',
                popover: {
                    title: 'რესტარტი',
                    description:
                        'რესტარტი გამოიყენება მონაცემების გასაახლებლად.',
                    side: 'bottom'
                }
            },
            {
                element: '.tour-hourly-plan',
                popover: {
                    title: 'საათობრივი გეგმა',
                    description:
                        'საათში განსახორციელებელი ზარების გეგმა მიმდინარე რაოდენობა და შესრულების პროცენტი.',
                    side: 'bottom'
                }
            },
            {
                element: '.tour-daily-plan',
                popover: {
                    title: 'დღიური გეგმა',
                    description:
                        'დღის გეგმა, მიზანი და შესრულებული რაოდენობა, პროცენტი.',
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
                element: '.tour-meetings-today-progress',
                popover: {
                    title: 'შეხვედრა თითო ოპერატორთან',
                    description:
                        'ჩანიშნული შეხვედრები კონკრეტულ ოპერატორთან: სულ, შესრულებული და დარჩენილი შეხვედრები.',
                    side: 'bottom'
                }
            },
            {
                element: '.tour-card-calls',
                popover: {
                    title: 'ზარები',
                    description:
                        'ნასაუბრები და სულ ზარები + თვის გეგმის პროგრესი.',
                    side: 'top'
                }
            },
            {
                element: '.tour-card-waiting',
                popover: {
                    title: 'მომლოდინე',
                    description:
                        'დღის მომლოდინე შეხვედრების რაოდენობა, თანამშრომლის დღის ბონუსი და მოსალოდნელი თვის ბონუსი.',
                    side: 'top'
                }
            },
            {
                element: '.tour-card-meeting',
                popover: {
                    title: 'შეხვედრები',
                    description:
                        'შესრულებული შეხვედრების რაოდენობა და ბონუსები.',
                    side: 'top'
                }
            },
            {
                element: '.tour-card-sales',
                popover: {
                    title: 'გაყიდვები',
                    description:
                        'დადასტურებული გაყიდვები, გაყიდვებიდან გამომდინარე ბონუსი.',
                    side: 'top'
                }
            },
            {
                element: '.tour-card-salary',
                popover: {
                    title: 'ხელფასი',
                    description:
                        'ზეგანაკვეთური და მოსალოდნელი ბონუსი. თვალის ღილაკით შეგიძლიათ დამალვა/ჩვენება.',
                    side: 'left'
                }
            },
            {
                element: '.tour-card-late',
                popover: {
                    title: 'შვებულება',
                    description:
                        'შვებულების მონიტორინგი, აჩვენებს შვებულების გამოყენებულ დღეებს, დასვენებებს, ბიულეტენს და სხვა .',
                    side: 'top'
                }
            },
            {
                element: '.tour-empty-stats-1',
                popover: {
                    title: 'დეტალური ბლოკები',
                    description:
                        'წარმოდგენილია გრაფიკული სტატისტიკა დიაგრამის სახით',
                    side: 'top'
                }
            },
            {
                element: '.tour-empty-stats-2',
                popover: {
                    title: 'დეტალური ბლოკები',
                    description:
                        'წარმოდგენილია გრაფიკული სტატისტიკა დიაგრამის სახით',
                    side: 'top'
                }
            },
            {
                element: '.tour-waiting-tomorrow',
                popover: {
                    title: 'მომლოდინეები - ხვალ',
                    description:
                        'ხვალინდელი დღის პროგნოზი/გეგმა: თანამშრომლები და მათთან ჩანიშნული შეხვედრები მომდევნო დღეს პროექტების მიხედვით.',
                    side: 'top'
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
            <header className=" flex flex-col gap-3">
                <div className={'flex items-center gap-3'}>
                    <ScrollTrailText className={'title_font text-lg'}>🔹 გვერდის დანიშნულება</ScrollTrailText>
                    <Button
                        onClick={startTour}
                        className="title_font bg-blue-700 text-sm"
                        size={'sm'}
                    >
                        გაეცანი გვერდს
                    </Button>
                </div>

                <ScrollTrailText className="pl-5">
                    დეშბორდის გვერდი წარმოადგენს სისტემის მთავარ მონიტორინგის პანელს, სადაც მომხმარებელი
                    ხედავს დღის სტატისტიკას, ზარების რაოდენობას, შეხვედრებს, ქოლცენტრის და გაყიდვების აქტივობას,
                    ასევე
                    პირად და გუნდურ შედეგებს. გვერდი განკუთვნილია ოპერატორებისთვის, მენეჯერებისთვის და
                    ადმინისტრატორებისთვის - სამუშაო
                    პროცესის ყოველდღიური კონტროლისთვის.
                </ScrollTrailText>
            </header>

            <Separator className="my-5"/>

            {/* filters */}
            <section className="grid grid-col-4 sm:grid-cols-[repeat(3,_minmax(0,_256px))] gap-3 items-center justify-between py-4 px-5 bg-gray-50 rounded-lg"
            >
                <RangePicker
                    className="tour-range col-span-2 sm:col-span-1"
                    placeholder={['საწყისი', 'დასასრული']}
                    onMouseLeave={() => setCursor(null)}
                    onMouseEnter={() => {
                        if (tourStatus) return
                        setCursor(
                            <Tooltip title={'თარიღის ფილტრი'}
                                     description={'აირჩიეთ დროის შუალედი - დეშბორდის მთელი სტატისტიკა განახლდება ამ ფილტრით.'}
                            />
                        )
                    }}
                />

                <Chip
                    title={`${today}-ის სტატისტიკა`}
                    dot={false}
                    className={'col-span-2 sm:col-span-1 w-full tour-today-badge py-2 border-[1.5px] border-gray-300 px-4 rounded-sm text-xs title_font text-indigo-800 bg-indigo-100'}
                    onMouseLeave={() => setCursor(null)}
                    onMouseEnter={() => {
                        if (tourStatus) return
                        setCursor(
                            <Tooltip
                                title={'დღის სტატისტიკა'}
                                description={'აქ ხედავთ რომელი თარიღის (დღის) მონაცემებს უყურებთ ამჟამად.'}
                            />
                        )
                    }}
                />

                <Select
                    className="tour-employee w-full col-span-4 sm:col-span-1"
                    showSearch
                    placeholder="აირჩიეთ თანამშრომელი"
                    optionFilterProp="label"
                    options={[
                        {value: 'jack', label: 'Jack'},
                        {value: 'lucy', label: 'Lucy'},
                        {value: 'tom', label: 'Tom'}
                    ]}
                    onMouseLeave={() => setCursor(null)}
                    onMouseEnter={() => {
                        if (tourStatus) return
                        setCursor(
                            <Tooltip
                                title={'თანამშრომლის არჩევა'}
                                description={'გაფილტრეთ დეშბორდი კონკრეტული თანამშრომლის მიხედვით.'}
                            />
                        )
                    }}
                />
            </section>

            <Separator className="my-1 bg-transparent"/>

            {/* fast information */}
            <section className="flex gap-3 justify-between items-center sm:justify-between bg-gray-50 rounded-lg py-4 px-5">
                <div
                    // className="flex flex-wrap justify-center gap-3 items-center tour-counters"
                    className="grid grid-cols-2 sm:grid-cols-4 gap-3 items-center tour-counters"
                    onMouseLeave={() => setCursor(null)}
                    onMouseEnter={() => {
                        if (tourStatus) return
                        setCursor(
                            <Tooltip
                                title={'მონაცემები'}
                                description={'შემაჯამებელი მონაცემები მოკლედ (ამ დღის): ზარები, ნასაუბრები, შეხვედრები და გაყიდვები.'}
                            />
                        )
                    }}
                >
                    {[
                        {bg: '#f1f3f5', label: 'ზარები სულ', value: '0'},
                        {bg: '#e6f9f0', label: 'ნასაუბრები', value: '0'},
                        {bg: '#fff5e6', label: 'შეხვედრები', value: '0'},
                        {bg: '#fdeaea', label: 'გაყიდვები', value: '0'}
                    ].map((item, i) => {
                        return (
                            <Chip
                                bg={item.bg}
                                key={i}
                                dot={false}
                                title={`${item.label} ${item.value}`}
                                className={'border'}
                            />
                        )
                    })}
                </div>

                <div
                    className="flex flex-col sm:flex-row gap-3 items-center tour-actions"
                    onMouseLeave={() => setCursor(null)}
                    onMouseEnter={() => {
                        if (tourStatus) return
                        setCursor(
                            <Tooltip
                                title={'ღილაკები'}
                                description={'რეფრეში - მონაცემების განახლება. ცხრილი - ხელფასების ცხრილი.'}
                            />
                        )
                    }}
                >
                    <Chip
                        title={<IoMdRefresh color="white" size={20}/>}
                        dot={false}
                        className="py-1! px-3 bg-blue-600 rounded-full"
                    />

                    <Chip
                        title={<MdOutlineTableChart color="white" size={20}/>}
                        dot={false}
                        className="py-1! px-3 bg-yellow-600 rounded-full"
                    />
                </div>
            </section>

            <Separator className="my-1 bg-transparent"/>

            <section className="lg:flex bg-gray-50">
                {/* calls and planned meetings */}
                <div className="lg:max-w-[420px] w-full shrink flex flex-col gap-3 rounded-lg p-2 sm:px-5 sm:py-4"
                >
                    {/* calls plan */}
                    <div
                        className="shadow bg-white p-3 rounded-lg border flex flex-col gap-3 tour-calls-plan"
                        onMouseLeave={() => setCursor(null)}
                        onMouseEnter={() => {
                            if (tourStatus) return
                            setCursor(
                                <Tooltip
                                    title={'📞 ზარების გეგმა'}
                                    description={'საათობრივი და დღიური გეგმის პროგრესი.'}
                                />
                            )
                        }}
                    >
                        <div className="flex items-center gap-2 justify-between">
                            <h1 className="title_font text-xs">📞 ზარების გეგმა</h1>
                            <p className="flex items-center gap-2">
                                <span
                                    onMouseLeave={() => setCursor(null)}
                                    onMouseEnter={() => {
                                        if (tourStatus) return
                                        setCursor(
                                            <Tooltip title={'ისტორია'}
                                                     description={'აჩვენებს საათში განხორციელებული ზარების ისტორიას დღის განმავლობაში.'}
                                            />
                                        )
                                    }}
                                    className="tour-calls-plan-time history p-1 border border-gray-200 rounded-full">
                                    <MdAccessTime size={20} color="blue"/>
                                </span>
                                <span
                                    onMouseLeave={() => setCursor(null)}
                                    onMouseEnter={() => {
                                        if (tourStatus) return
                                        setCursor(
                                            <Tooltip title={'განახლება'}
                                                     description={'განახლების ღილაკი გამოიყენება უახლესი მონაცემების მისაღებად.'}
                                            />
                                        )
                                    }}
                                    className="tour-calls-plan-refresh refresh p-1 border border-gray-200 rounded-full">
                                    <MdRefresh size={20} color="blue"/>
                                </span>
                            </p>
                        </div>

                        <div className="flex items-center gap-2 ">
                            <div
                                className={'w-full'}
                                onMouseLeave={() => setCursor(null)}
                                onMouseEnter={() => {
                                    if (tourStatus) return
                                    setCursor(
                                        <Tooltip
                                            title={'საათობრივი გეგმა'}
                                            description={'საათში განსახორციელებელი ზარების გეგმა მიმდინარე რაოდენობა და შესრულების პროცენტი.'}
                                        />
                                    )
                                }}
                            >

                                <Card
                                    title={
                                        <div className="flex flex-col gap-2 tour-hourly-plan">
                                            <ProgressBar
                                                value={196}
                                                max={253}
                                                variant={'footer2'}
                                                size={'sm'}
                                                leftLabel={'დღიური გეგმა'}
                                                showNumbers
                                                fillColor={'#3b7ddd'}
                                            />
                                        </div>
                                    }
                                    className="border"
                                />
                            </div>

                            <div
                                className={'w-full'}
                                onMouseLeave={() => setCursor(null)}
                                onMouseEnter={() => {
                                    if (tourStatus) return
                                    setCursor(
                                        <Tooltip
                                            title={'დღიური გეგმა'}
                                            description={'დღის გეგმა, მიზანი და შესრულებული რაოდენობა, პროცენტი.'}
                                        />
                                    )
                                }}
                            >
                                <Card
                                    title={
                                        <div className="flex flex-col gap-2 tour-daily-plan">
                                            <ProgressBar
                                                value={1527}
                                                max={2024}
                                                variant={'footer2'}
                                                size={'sm'}
                                                leftLabel={'თვიური გეგმა'}
                                                showNumbers
                                            />
                                        </div>
                                    }
                                    className="border"
                                />
                            </div>
                        </div>
                    </div>

                    {/* today's planned meetings */}
                    <div className="shadow bg-white p-3 rounded-lg border flex flex-col gap-3 tour-meetings-today">
                        <div
                            className="flex items-center gap-2 justify-between"
                            onMouseLeave={() => setCursor(null)}
                            onMouseEnter={() => {
                                if (tourStatus) return
                                setCursor(
                                    <Tooltip
                                        title={'დღევანდელი შეხვედრები'}
                                        description={'გუნდური გეგმის შესრულება: სულ, შესრულებული და დარჩენილი შეხვედრები.'}
                                    />
                                )
                            }}
                        >
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

                        <div
                            className="w-full meetings-list flex flex-col gap-3 tour-meetings-today-progress "
                            onMouseLeave={() => setCursor(null)}
                            onMouseEnter={() => {
                                if (tourStatus) return
                                setCursor(
                                    <Tooltip
                                        title={'შეხვედრა თითო ოპერატორთან'}
                                        description={'ჩანიშნული შეხვედრები კონკრეტულ ოპერატორთან: სულ, შესრულებული და დარჩენილი შეხვედრები.'}
                                    />
                                )
                            }}
                        >
                            <div className="flex flex-col gap-1">
                                <ProgressBar
                                    variant="double"
                                    size="sm"
                                    max={6}
                                    value={1}
                                    secondaryValue={5}
                                    leftLabel="ოპერატორი N1"
                                    rightLabel="სულ 6"
                                    fillFrom="#addbb8" fillTo="#4fba5c"
                                    secondaryFrom="#b1f13d" secondaryTo="#32e41e"
                                />
                                <div className={'flex items-center gap-2 justify-between text-xs'}>
                                    <span>შემდგარი შეხვედრა 1</span>
                                    <span>შესასრულებელი დარჩა 4</span>
                                </div>
                            </div>

                            <div className="flex flex-col gap-1">
                                <ProgressBar
                                    variant="double"
                                    size="sm"
                                    max={4}
                                    value={1}
                                    secondaryValue={2}
                                    leftLabel="ოპერატორი N2"
                                    rightLabel="სულ 4"
                                    fillFrom="#addbb8" fillTo="#4fba5c"
                                    secondaryFrom="#b1f13d" secondaryTo="#32e41e"
                                />
                                <div className={'flex items-center gap-2 justify-between text-xs'}>
                                    <span>შემდგარი შეხვედრა 1</span>
                                    <span>შესასრულებელი დარჩა 1</span>
                                </div>
                            </div>

                            <div className="flex flex-col gap-1">
                                <ProgressBar
                                    variant="double"
                                    size="sm"
                                    max={10}
                                    value={3}
                                    secondaryValue={10}
                                    leftLabel="ოპერატორი N3"
                                    rightLabel="სულ 10"
                                    fillFrom="#addbb8" fillTo="#4fba5c"
                                    secondaryFrom="#b1f13d" secondaryTo="#32e41e"
                                />
                                <div className={'flex items-center gap-2 justify-between text-xs'}>
                                    <span>შემდგარი შეხვედრა 3</span>
                                    <span>შესასრულებელი დარჩა 7</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* agent stats */}
                <div
                    className="flex-1 min-w-0 grid grid-cols-1 sm:grid-cols-4 2xl:grid-cols-3 gap-4 rounded-lg p-2 sm:px-5 sm:py-4 w-full">
                    {/* calls */}
                    <Card
                        className="sm:col-span-2 2xl:col-span-1 tour-card-calls"
                        title="ზარები"
                        icon={<MdPhone size={20} color="white"/>}
                        footer={<Action icon={<FaTimes/>} text="დღის გეგმა 100"/>}
                        onMouseLeave={() => setCursor(null)}
                        onMouseEnter={() => {
                            if (tourStatus) return
                            setCursor(
                                <Tooltip
                                    title={'ზარები'}
                                    description={'ნასაუბრები და სულ ზარები + თვის გეგმის პროგრესი.'}
                                />
                            )
                        }}
                    >
                        <div className="flex items-center gap-2 justify-between">
                            <p className="text-xs flex flex-col">
                                <span className="text-gray-400">ნასაუბრები</span>
                                <span>256</span>
                            </p>
                            <p className="text-xs text-right flex flex-col">
                                <span className="text-gray-400">სულ</span>
                                <span>1523</span>
                            </p>
                        </div>
                        <ProgressBar
                            value={1335}
                            max={2024}
                            variant={'detailed'}
                            size={'sm'}
                            leftLabel={'დღიური გეგმა'}
                        />
                    </Card>

                    {/* waiting meetings */}
                    <Card
                        title="მომლოდინე"
                        icon={<CgTimelapse size={20} color="white"/>}
                        footer={
                            <div className={'flex items-center gap-2 w-full'}>
                                <Action icon={<FaTimes/>} text="გეგმა 15"/>
                                <div className={'py-1 px-1.5 bg-blue-500 rounded w-fit'}>
                                    <MdRemoveRedEye color={'white'} size={20}/>
                                </div>
                            </div>
                        }
                        className="sm:col-span-2 2xl:col-span-1 tour-card-waiting"
                        onMouseLeave={() => setCursor(null)}
                        onMouseEnter={() => {
                            if (tourStatus) return
                            setCursor(
                                <Tooltip
                                    title={'მომლოდინე'}
                                    description={'დღის მომლოდინე შეხვედრების რაოდენობა, თანამშრომლის დღის ბონუსი და მოსალოდნელი თვის ბონუსი.'}
                                />
                            )
                        }}
                    >
                        <p>27</p>
                        <div className="flex flex-col text-xs">
                            <p>დღის ბონუსი: <span className="text-red-400">50₾</span></p>
                            <p>მოს. თვის ბონუსი: <span className="text-red-400">500₾</span></p>
                        </div>
                        <ProgressBar
                            value={1335}
                            max={2024}
                            variant={'detailed'}
                            size={'sm'}
                            leftLabel={'დღიური გეგმა'}
                        />
                    </Card>

                    {/* Meetings */}
                    <Card
                        title="შეხვედრა"
                        icon={<MdGroup size={20} color="white"/>}
                        footer={
                            <div className={'flex items-center gap-2 w-full'}>
                                <Action icon={<FaTimes/>} text="გეგმა 5"/>
                                <div className={'py-1 px-1.5 bg-blue-500 rounded w-fit'}>
                                    <MdRemoveRedEye color={'white'} size={20}/>
                                </div>
                            </div>
                        }
                        className="sm:col-span-4 2xl:col-span-1 tour-card-meeting"
                        onMouseLeave={() => setCursor(null)}
                        onMouseEnter={() => {
                            if (tourStatus) return
                            setCursor(
                                <Tooltip
                                    title={'შეხვედრები'}
                                    description={'შესრულებული შეხვედრების რაოდენობა და ბონუსები.'}
                                />
                            )
                        }}
                    >
                        <p>10</p>
                        <div className="flex flex-col text-xs">
                            <p>დღის ბონუსი: <span className="text-red-400">50₾</span></p>
                            <p>მოს. თვის ბონუსი: <span className="text-red-400">500 ₾</span></p>
                        </div>
                        <ProgressBar
                            value={1335}
                            max={2024}
                            variant={'detailed'}
                            size={'sm'}
                            leftLabel={'დღიური გეგმა'}
                        />
                    </Card>

                    {/* sells */}
                    <Card
                        title="გაყიდვები"
                        icon={<BiDollarCircle size={20} color="white"/>}
                        footer={
                            <div className={'py-1 px-1.5 bg-blue-500 rounded w-fit'}>
                                <MdRemoveRedEye color={'white'} size={20}/>
                            </div>
                        }
                        className="sm:col-span-2 2xl:col-span-1 tour-card-sales"
                        onMouseLeave={() => setCursor(null)}
                        onMouseEnter={() => {
                            if (tourStatus) return
                            setCursor(
                                <Tooltip
                                    title={'გაყიდვები'}
                                    description={'დადასტურებული გაყიდვები, გაყიდვებიდან გამომდინარე ბონუსი.'}
                                />
                            )
                        }}
                    >
                        <p>2</p>
                        <div className="flex flex-col text-xs">
                            <p className="text-gray-400">მოს. თვის ბონუსი: <span className="text-red-500">500 ₾</span>
                            </p>
                        </div>
                    </Card>

                    {/* salary */}
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
                        icon={<FaLariSign size={18} color="white"/>}
                        footer={<h1 className="title_font">სულ: {show ? '3550₾' : '---'}</h1>}
                        className="sm:col-span-2 2xl:col-span-1 tour-card-salary"
                        onMouseLeave={() => setCursor(null)}
                        onMouseEnter={() => {
                            if (tourStatus) return
                            setCursor(
                                <Tooltip
                                    title={'ხელფასი'}
                                    description={'ზეგანაკვეთური და მოსალოდნელი ბონუსი. თვალის ღილაკით შეგიძლიათ დამალვა/ჩვენება.'}
                                />
                            )
                        }}
                    >
                        <div className="flex flex-col text-xs text-gray-400">
                            <p>ზეგანაკვეთური:</p>
                            <p>{show ? <span className="text-green-500">100₾</span> : '---'}</p>
                            <p>მოს. ბონუსი:</p>
                            <p>{show ? <span className="text-green-500">500₾</span> : '---'}</p>
                        </div>
                    </Card>

                    {/* vacations card */}
                    <Card
                        title="შვებულება"
                        icon={<MdTimeline size={20} color="white"/>}
                        className="sm:col-span-4 2xl:col-span-1 tour-card-late"
                        onMouseLeave={() => setCursor(null)}
                        onMouseEnter={() => {
                            if (tourStatus) return
                            setCursor(
                                <Tooltip
                                    title={'შვებულება'}
                                    description={'შვებულების მონიტორინგი, აჩვენებს შვებულების გამოყენებულ დღეებს, დასვენებებს, ბიულეტენს და სხვა.'}
                                />
                            )
                        }}
                    >
                        <div className="flex flex-col text-xs text-gray-500">
                            <p className={'font-bold'}>2025 წელს გამოყენებული</p>

                            <Separator className={'my-1'}/>

                            <p>სამუშაო დღეები წელიწადში: <span className={'font-bold'}>261</span></p>
                            <p>შვებულება: <span className={'font-bold'}>7 დღე</span></p>
                            <p>დასვენება (day-off): <span className={'font-bold'}>2 დღე</span></p>
                            <p>ბიულეტენი: <span className={'font-bold'}>0 დღე</span></p>
                            <p>უშვ. ანაზღაურება: <span className={'font-bold'}>0 დღე</span></p>
                            <p>აღდგენა: <span className={'font-bold'}>0 დღე</span></p>
                            <p>სულ გამოყენებული: <span className={'font-bold'}>9 დღე</span></p>
                        </div>
                    </Card>

                    {/* charts statistics */}
                    <div className="sm:col-span-4 2xl:col-span-3 flex flex-col sm:flex-row gap-4">
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

                    {/* waiting meetings  */}
                    <Card
                        title={
                            <div className={'flex items-center gap-4 justify-between'}>
                                <div className="flex items-center gap-4">
                                    <MdAccessTime size={24} color="blue"/>
                                    <div>
                                        <h1>მომლოდინეები — ხვალ</h1>
                                        <p className="text_font text-[0.6rem] text-gray-400">
                                            <span className="title_font">თარიღი: </span>
                                            {tomorrow}
                                        </p>
                                    </div>
                                </div>

                                <div className={'bg-gray-100 p-1 rounded-full border'}>
                                    <MdRefresh color={'blue'} size={20}/>
                                </div>
                            </div>
                        }
                        className="sm:col-span-4 2xl:col-span-3 tour-waiting-tomorrow"
                        onMouseLeave={() => setCursor(null)}
                        onMouseEnter={() => {
                            if (tourStatus) return
                            setCursor(
                                <Tooltip
                                    title={'მომლოდინეები - ხვალ'}
                                    description={'ხვალინდელი დღის პროგნოზი/გეგმა: თანამშრომლები და მათთან ჩანიშნული შეხვედრები მომდევნო დღეს პროექტების მიხედვით.'}
                                />
                            )
                        }}
                    >
                        <div className={'grid 2xl:grid-cols-2 grid-cols-1 gap-4'}>
                            {meetings.map((item, i) => {
                                return (
                                    <MeetingsCard
                                        key={i}
                                        agent={item.agent}
                                        total={item.total}
                                        meetings={item.meeting}
                                    />
                                )
                            })}
                        </div>
                    </Card>
                </div>
            </section>
        </>
    )
}

function Action({icon, text}: { icon: React.ReactNode, text: string }) {
    return (
        <div
            className="w-full cursor-default py-[2px] text-[12px] border text-red-500 flex items-center gap-1 justify-center border-red-500 rounded-2xl hover:text-white hover:bg-red-500 transition duration-300 ease-in"
        >
            {icon}
            <span>{text}</span>
        </div>
    )
}
