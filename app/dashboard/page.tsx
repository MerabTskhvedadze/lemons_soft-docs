'use client'

import React, {useEffect, useRef, useCallback} from 'react'
import {FadeInSection} from "@/animations/FadeInSection";
import {ScrollTrailText} from "@/animations/ScrollTrailText";
import {Separator} from "@/components/ui/separator";
import {FaCalendarAlt} from "react-icons/fa";
import {MdGroup, MdAccessTime, MdRefresh} from "react-icons/md";
import {AiOutlineDollar} from "react-icons/ai";
import {driver, Driver} from "driver.js";
import Image from "next/image";

export default function Dashboard() {
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

            <FadeInSection>
                <section className="flex flex-col gap-2">
                    <h1 className="title_font text-lg">
                        <ScrollTrailText>🔹 მთავარი სექციები</ScrollTrailText>
                    </h1>

                    <ul className="pl-12 list-decimal">
                        {/* top navigation */}
                        <li className="mb-3">
                            <h1>
                                <ScrollTrailText className="title_font">ზედა ნავიგაცია</ScrollTrailText>
                                <span className="block text-sm mb-3">
                                    ზედა ზოლში ნაჩვენებია დღევანდელი თარიღი, მიმდინარე სტატისტიკის პარამეტრები და რამდენიმე ფუნქციური ღილაკი:
                                </span>
                            </h1>

                            <ul className="text-sm">
                                <li>
                                    <ScrollTrailText>
                                        <p className="flex items-center gap-2">
                                            <FaCalendarAlt color="#153d77"/>
                                            <span className="title_font">თარიღის ფილტრი</span>
                                            - ფილტრავს არჩეული დღის მონაცემების მიხედვით.
                                        </p>
                                    </ScrollTrailText>
                                </li>
                                <li>
                                    <ScrollTrailText>
                                        <p className="flex items-center gap-2">
                                            <AiOutlineDollar color="#28a745" size={18}/>
                                            <span className="title_font">დღიური გაყიდვები</span>
                                            - აჩვენებს გაყიდვების რაოდენობას
                                        </p>
                                    </ScrollTrailText>
                                </li>
                                <li>
                                    <ScrollTrailText>
                                        <p className="flex items-center gap-2">
                                            <MdGroup color="#3e4676" size={18}/>
                                            <span className="title_font">დღიური შეხვედრები</span>
                                            - აჩვენებს შემდგარი შეხვედრების რაოდენობას.
                                        </p>
                                    </ScrollTrailText>
                                </li>
                            </ul>
                        </li>

                        {/* stats blocks */}
                        <li className="mb-3">
                            <h1>
                                <ScrollTrailText className="title_font">დღის სტატისტიკის ბლოკები</ScrollTrailText>
                                <span className="block text-sm mb-3">
                                    დეშბორდზე განთავსებულია სხვადასხვა ტიპის ბლოკები, რომლებიც აჩვენებს მიმდინარე დღის მდგომარეობას:
                                </span>
                            </h1>

                            <ul className="text-sm">
                                <div className="flex flex-col gap-4">
                                    {/* calls plan */}
                                    <li className="flex flex-col gap-2">
                                        <ScrollTrailText>
                                            <p className="flex items-center gap-2">
                                                <span
                                                    className="title_font text-nowrap underline cursor-pointer text-blue-500"
                                                    onClick={startCallPlanTour}
                                                >
                                                  ზარების გეგმა
                                                </span>
                                                - აჩვენებს მიღებული და განხორციელებული ზარების რაოდენობას.
                                            </p>
                                        </ScrollTrailText>

                                        <div className="max-w-[436px] p-3 rounded-lg border flex flex-col gap-3">
                                            <div className="flex items-center gap-2 justify-between">
                                                <h1 className="title_font">📞 ზარების გეგმა</h1>
                                                <p className="flex items-center gap-2">
                                                      <span className="history p-1 border border-gray-300 rounded-full">
                                                        <MdAccessTime size={20} color="blue"/>
                                                      </span>
                                                    <span className="refresh p-1 border border-gray-300 rounded-full">
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
                                    </li>

                                    {/* planned meetings */}
                                    <li className="flex flex-col gap-2">
                                        <ScrollTrailText>
                                            <p className="flex items-center gap-2">
                                                <span
                                                    className="title_font underline cursor-pointer text-blue-500"
                                                    onClick={startMeetingsPlanTour}
                                                >
                                                  დღეს ჩანიშნული შეხვედრები
                                                </span>
                                                - აჩვენებს დღეს ჩანიშნულ შეხვედრებს სხვადასხვა ოპერატორთან.
                                            </p>
                                        </ScrollTrailText>

                                        <div className="max-w-[436px] p-3 rounded-lg border flex flex-col gap-3">
                                            <div className="flex items-center gap-2 justify-between">
                                                <h1 className="title_font flex items-center gap-2">
                                                    <MdGroup size={20} color="blue"/>
                                                    <span>დღეს ჩანიშნული შეხვედრები</span>
                                                </h1>
                                                <p className="flex items-center gap-2">
                                                  <span
                                                      className="refresh-meetings p-1 border border-gray-300 rounded-full">
                                                    <MdRefresh size={20} color="blue"/>
                                                  </span>
                                                </p>
                                            </div>

                                            <div className="w-full meetings-list">
                                                <Image width={520} height={50} src="/images/dashboard/meetings.png"
                                                       alt="meetings"/>
                                            </div>
                                        </div>
                                    </li>
                                </div>
                            </ul>
                        </li>
                    </ul>
                </section>
            </FadeInSection>
        </>
    );
}