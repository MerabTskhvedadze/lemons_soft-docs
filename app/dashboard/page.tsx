'use client'

import React, {useEffect, useRef, useCallback} from 'react'
import {FadeInSection} from "@/animations/FadeInSection";
import {ScrollTrailText} from "@/animations/ScrollTrailText";
import {Separator} from "@/components/ui/separator";
import {driver, Driver} from "driver.js";
import Image from "next/image";

import {FaLariSign} from "react-icons/fa6";
import {FaCalendarAlt, FaTimes} from "react-icons/fa";
import {BiDollarCircle} from "react-icons/bi";
import {AiOutlineDollar} from "react-icons/ai";
import {MdPhone, MdOutlineTimelapse, MdRemoveRedEye, MdGroup, MdAccessTime, MdRefresh} from "react-icons/md";
import {CgTimelapse} from "react-icons/cg";

import {DatePicker, Select} from 'antd';

export default function Dashboard() {
    const {RangePicker} = DatePicker

    const [show, setShow] = React.useState(false);
    const mainSectionList = [
        {
            icon: <FaCalendarAlt color="#153d77"/>,
            title: 'თარიღის ფილტრი',
            description: '- ფილტრავს არჩეული დღის მონაცემების მიხედვით'
        },
        {
            icon: <AiOutlineDollar color="#28a745" size={18}/>,
            title: 'დღიური გაყიდვები',
            description: ' - აჩვენებს გაყიდვების რაოდენობას'
        },
        {
            icon: <MdGroup color="#3e4676" size={18}/>,
            title: 'დღიური შეხვედრები',
            description: '- აჩვენებს შემდგარი შეხვედრების რაოდენობას'
        },
    ]

    const tourRef = useRef<Driver | null>(null);

    useEffect(() => {
        tourRef.current = driver({
            showProgress: true,
            overlayClickBehavior: 'nextStep',
        });
        return () => {
            tourRef.current?.destroy();
        };
    }, []);

    const startCallPlanTour = useCallback(() => {
        tourRef.current?.setSteps([
            {
                element: '.history',
                popover: {title: 'ისტორია', description: 'განხორციელებული ზარების რაოდენობის ისტორია საათების მიხედვით'}
            },
            {element: '.refresh', popover: {title: 'რეფრეში', description: 'მონაცემების დარეფრეშება'}},
            {
                element: '.hourly-plan',
                popover: {
                    title: 'ზარების გეგმა საათში',
                    description: 'განსახორციელებელი ზარების გეგმა საათში და პროგრესის მაჩვენებელი პროცენტებში'
                }
            },
            {
                element: '.daily-plan',
                popover: {
                    title: 'ზარების გეგმა დღეში',
                    description: 'განსახორცვიელებელი ზარების გეგმა დღეში და პროგრესის მაჩვენებელი'
                }
            },
        ]);
        tourRef.current?.drive();
    }, []);

    const startMeetingsPlanTour = useCallback(() => {
        tourRef.current?.setSteps([
            {element: '.refresh-meetings', popover: {title: 'რეფრეში', description: 'მონაცემების დარეფრეშება'}},
            {
                element: '.meetings-list',
                popover: {
                    title: 'ჩანიშნული შეხვედრები',
                    description: 'ჩანიშნული შეხვედრები თითოეულ ოპერატორთან. უკვე შემდგარი და სულ ჩანიშნული'
                }
            },
        ]);
        tourRef.current?.drive();
    }, []);

    return (
        <>

            {/* overview */}
            <FadeInSection>
                <section className="flex flex-col gap-3">
                    <div>
                        <h1 className="title_font text-lg">
                            <ScrollTrailText>🔹 გვერდის დანიშნულება</ScrollTrailText>
                        </h1>
                        <ScrollTrailText className="pl-5">
                            დეშბორდის გვერდი წარმოადგენს სისტემის მთავარ მონიტორინგის პანელს, სადაც მომხმარებელი ხედავს
                            დღის სტატისტიკას, ზარების რაოდენობას, შეხვედრებს, ქოლცენტრის და გაყიდვების აქტივობას, ასევე
                            პირად და გუნდურ შედეგებს.
                            გვერდი განკუთვნილია ოპერატორებისთვის, მენეჯერებისთვის და ადმინისტრატორებისთვის - სამუშაო
                            პროცესის ყოველდღიური კონტროლისთვის.
                        </ScrollTrailText>
                    </div>
                </section>
            </FadeInSection>

            <Separator className="my-5"/>

            <div className="flex gap-3 items-center justify-between py-4 px-5 bg-gray-50 rounded-lg">
                <RangePicker placeholder={['საწყისი', 'დასასრული']}/>

                <div className={'title_font bg-[#e9ecef] text-[#153d77] py-2 px-4 text-xs rounded-sm'}>
                    {new Date().toLocaleDateString('ka-GE', {
                        day: '2-digit',
                        month: 'long',
                        year: 'numeric',
                    })}-ის სტატისტიკა
                </div>

                <Select
                    style={{maxWidth:300, width:'100%'}}
                    showSearch
                    placeholder="აირჩიეთ თანამშრომელი"
                    optionFilterProp="label"
                    options={[
                        {
                            value: 'jack',
                            label: 'Jack',
                        },
                        {
                            value: 'lucy',
                            label: 'Lucy',
                        },
                        {
                            value: 'tom',
                            label: 'Tom',
                        },
                    ]}
                />
            </div>

            <Separator className="my-4"/>

            <section className={'lg:flex gap-3 bg-gray-50'}>
                <div className={'lg:max-w-[412px] shrink flex flex-col gap-3 rounded-lg p-2 sm:px-5 sm:py-4'}>
                    {/* calls plan */}
                    <div className="shadow bg-white p-3 rounded-lg border flex flex-col gap-3">
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

                        <div className="flex items-center gap-2 justify-between">
                            <div className="w-[200px] border hourly-plan">
                                <Image width={200} height={50}
                                       src="/images/dashboard/hourly-plan.png" alt="hourly plan"/>
                            </div>
                            <div className="w-[200px] border daily-plan">
                                <Image width={200} height={50}
                                       src="/images/dashboard/daily-plan.png" alt="daily plan"/>
                            </div>
                        </div>
                    </div>

                    {/* today's planned meetings */}
                    <div className="shadow bg-white p-3 rounded-lg border flex flex-col gap-3">
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

                        <div className="w-full meetings-list">
                            <Image width={520} height={50} src="/images/dashboard/meetings.png"
                                   alt="meetings"/>
                        </div>
                    </div>
                </div>

                <div
                    className={'flex-1 min-w-0 grid grid-cols-1 sm:grid-cols-4 2xl:grid-cols-3 gap-4 rounded-lg p-2 sm:px-5 sm:py-4 w-full'}>
                    <Card
                        title={'ზარები'}
                        icon={<MdPhone size={20} color="white"/>}
                        footer={<Action icon={<FaTimes/>} text={'დღის გეგმა 100'}/>}
                        className="sm:col-span-2 2xl:col-span-1"
                    >
                        <div className="flex items-center gap-2 justify-between">
                            <p className={'text-xs flex flex-col'}>
                                <span className={'text-gray-400'}>ნასაუბრები</span>
                                <span>0</span>
                            </p>
                            <p className="text-xs text-right flex flex-col">
                                <span className={'text-gray-400'}>სულ</span>
                                <span>0</span>
                            </p>
                        </div>
                        <ProgressBar goal={'2,638'}/>
                    </Card>

                    <Card
                        title={'მომლოდინე'}
                        icon={<CgTimelapse size={20} color="white"/>}
                        footer={<Action icon={<FaTimes/>} text={'დღის გეგმა 15'}/>}
                        className="sm:col-span-2 2xl:col-span-1"
                    >
                        <p>0</p>
                        <div className="flex flex-col text-xs">
                            <p>დღის ბონუსი: <span className={'text-red-400'}>0 ₾</span></p>
                            <p>მოს. თვის ბონუსი: <span className={'text-red-400'}>0 ₾</span></p>
                        </div>
                        <ProgressBar goal={'40'}/>
                    </Card>

                    <Card
                        title={'შეხვედრა'}
                        icon={<MdGroup size={20} color="white"/>}
                        footer={<Action icon={<FaTimes/>} text={'დღის გეგმა 5'}/>}
                        className="sm:col-span-4 2xl:col-span-1"
                    >
                        <p>0</p>
                        <div className="flex flex-col text-xs">
                            <p>დღის ბონუსი: <span className={'text-red-400'}>0 ₾</span></p>
                            <p>მოს. თვის ბონუსი: <span className={'text-red-400'}>0 ₾</span></p>
                        </div>
                        <ProgressBar goal={'10'}/>
                    </Card>

                    <Card
                        title={'გაყიდვები'}
                        icon={<BiDollarCircle size={20} color="white"/>}
                        footer={<Action icon={<FaTimes/>} text={'დღის გეგმა 5'}/>}
                        className="sm:col-span-2 2xl:col-span-1"
                    >
                        <p>0</p>
                        <div className="flex flex-col text-xs">
                            <p className={'text-gray-400'}>მოს. თვის ბონუსი: <span className={'text-red-500'}>0 ₾</span>
                            </p>
                        </div>
                    </Card>

                    <Card
                        title={
                            <div className={'flex items-center gap-1'}>
                                <h1>ხელფასი</h1>
                                <div className={'p-1 bg-gray-300 rounded-full'}>
                                    <MdRemoveRedEye
                                        size={18}
                                        className={'cursor-pointer'}
                                        onClick={() => setShow(prev => !prev)}
                                    />
                                </div>
                            </div>
                        }
                        icon={<FaLariSign size={20} color="white"/>}
                        footer={<h1 className={'title_font'}>სულ: {show ? '0₾' : '---'}</h1>}
                        className="sm:col-span-2 2xl:col-span-1"
                    >
                        <div className="flex flex-col text-xs text-gray-400">
                            <p>ზეგანაკვეთური:</p>
                            <p>{show ? <span className={'text-green-500'}>0₾</span> : '---'}</p>
                            <p>მოს. ბონუსი:</p>
                            <p>{show ? <span className={'text-green-500'}>0₾</span> : '---'}</p>
                        </div>
                    </Card>

                    <Card
                        title={'დაგვიანება'}
                        icon={<MdRemoveRedEye size={20} color="white"/>}
                        className="sm:col-span-4 2xl:col-span-1"
                    >
                        <p className={'text-sm'}>დაგვიანება არ ფიქსირდება</p>
                    </Card>

                    <div className={' sm:col-span-4 xl:col-span-3 flex flex-col sm:flex-row gap-4'}>
                        <Card
                            title={
                                <div className={'flex items-center gap-4'}>
                                    <MdRemoveRedEye size={20} color="blue"/>
                                    <span>სტატისტიკის ჩანაწერი არ არის</span>
                                </div>
                            }
                            className="sm:col-span-4 2xl:col-span-1"
                        />

                        <Card
                            title={
                                <div className={'flex items-center gap-4'}>
                                    <MdRemoveRedEye size={20} color="blue"/>
                                    <span>სტატისტიკის ჩანაწერი არ არის</span>
                                </div>
                            }
                            className="sm:col-span-4 2xl:col-span-1"
                        />
                    </div>

                    <Card
                        title={
                            <div className={'flex items-center gap-4'}>
                                <BiDollarCircle size={20} color="blue"/>
                                <div>
                                    <h1>მომლოდინეები — ხვალ</h1>
                                    <p className={'text_font text-[0.6rem] text-gray-400'}>
                                        <span className={'title_font'}>თარიღი: </span>
                                        წწწწ-თთ-დდ
                                    </p>
                                </div>
                            </div>
                        }
                        icon={<BiDollarCircle size={20} color="white"/>}
                        footer={<Action icon={<FaTimes/>} text={'დღის გეგმა 5'}/>}
                        className="sm:col-span-4 2xl:col-span-3"
                    >
                        <p>0</p>
                        <div className="flex flex-col text-xs">
                            <p className={'text-gray-400'}>მოს. თვის ბონუსი: <span className={'text-red-500'}>0 ₾</span>
                            </p>
                        </div>
                    </Card>
                </div>
            </section>
        </>
    );
}

function Card({title, icon, footer, children, className}: {
    title: string | React.ReactNode,
    icon?: React.ReactNode,
    footer?: React.ReactNode,
    children?: React.ReactNode,
    className?: string
}) {
    return (
        <div className={`shadow w-full bg-white p-3 flex flex-col gap-3 ${className}`}>
            <header className="flex items-center gap-2 justify-between">
                <div className="title_font text-xs">{title}</div>

                {icon && <p className="flex items-center gap-2">
                    <span className="history p-1 bg-blue-700 rounded-full">
                        {icon}
                    </span>
                </p>}
            </header>

            {children}

            {footer && <footer className={'mt-auto'}>{footer}</footer>}
        </div>
    )
}

function ProgressBar({goal}: { goal: string }) {
    return (
        <div className={'flex flex-col gap-1'}>
            <p className={'flex items-center justify-between font-bold text-[10px]'}>
                <span className={''}>თვის გეგმა</span>
                <span className={'text-red-500'}>0%</span>
            </p>
            <div className="rounded-2xl h-1 bg-gray-300"/>
            <p className={'flex items-center justify-between text-[10px]'}>
                <span className={''}>0</span>
                <span>{goal}</span>
            </p>
        </div>
    )
}

function Action({icon, text}: { icon: React.ReactNode, text: string }) {
    return (
        <div
            className={'select-none cursor-pointer py-[2px] text-[12px] title_font border text-red-500 flex items-center gap-1 justify-center border-red-500 rounded-2xl hover:text-white hover:bg-red-500 transition delay-150 duration-300 ease-in'}>
            {icon}
            <span>{text}</span>
        </div>
    )
}