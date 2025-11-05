"use client";

import React from "react";
import {useSidebarMenu} from '@/context/SidebarMenuContext'
import {iconFromKey} from '@/components/iconMap'
import {Button} from '@/components/ui/button'

import {Reorder} from 'framer-motion'

import {MdEdit, MdDelete} from "react-icons/md";

export default function SidebarBoard() {
    const {sections, saveOrder} = useSidebarMenu()

    const handleSubReorder =
        (sectionId: string) =>
            (nextItems: any[]) => {
                const nextSections = sections.map((s) =>
                    s.id === sectionId ? {...s, items: nextItems} : s
                );
                saveOrder(nextSections);
            };

    return (
        <Reorder.Group
            onReorder={saveOrder} values={sections}
            className={'shadow max-w-[364px] min-w-[344px] bg-gray-50 px-2 rounded-sm'}
        >
            {sections.map((section) => (
                <Reorder.Item
                    value={section} key={section.id}
                    className={'group p-2 border rounded-md my-2 cursor-grab active:cursor-grabbing bg-white hover:border-yellow-900'}
                >
                    <div className={'flex items-center gap-2 group-hover:text-yellow-900'}>
                        <div className={'inline-flex flex-col text-md'}>
                            <div className={'flex items-center gap-2'}>
                                {section.label}:
                                <span>{iconFromKey(section.icon)}</span>
                            </div>
                            <span className={'text-[11px]'}>Link: {section.link}</span>
                        </div>
                        <Button size={'icon-sm'} variant={'ghost'} className={'ml-auto'}>
                            <MdEdit color={'#737373'}/>
                        </Button>
                    </div>

                    {/* section subitems */}
                    {section.items &&
                        <Reorder.Group
                            values={section.items}
                            onReorder={handleSubReorder(section.id)}
                            className={'mt-2 flex flex-col gap-2 pl-3'}
                        >
                            {section.items.map((item) => (
                                <Reorder.Item
                                    key={item.id}
                                    value={item}
                                    className={'group/inner flex items-center border p-2 rounded-md bg-white hover:border-yellow-700'}
                                >
                                    <div className={'group-hover/inner:text-yellow-700/90 flex flex-col'}>
                                        <span className={'text-sm'}>{item.label}</span>
                                        <span className={'text-[11px]'}>Link: {item.href}</span>
                                    </div>
                                    <div className={'ml-auto inline-flex items-center'}>
                                        <Button size={'icon-sm'} variant={'ghost'}>
                                            <MdEdit color={'#737373'}/>
                                        </Button>
                                        <Button size={'icon-sm'} variant={'ghost'}>
                                            <MdDelete color={'#737373'}/>
                                        </Button>
                                    </div>
                                </Reorder.Item>
                            ))}
                        </Reorder.Group>
                    }
                </Reorder.Item>
            ))}
        </Reorder.Group>
    )
}
