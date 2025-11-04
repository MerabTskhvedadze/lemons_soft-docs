"use client";
import { Draggable } from "@hello-pangea/dnd";

import {Button} from '@/components/ui/button'

type Props = {
    itemId: string;
    index: number;
    title: string;
    note?: string;
};

export default function ItemCard({ itemId, index, title, note }: Props) {
    return (
        <Draggable draggableId={itemId} index={index}>
            {(provided, snapshot) => (
                <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    className={'bg-white border rounded-md p-3'}
                    style={{
                        ...provided.draggableProps.style,
                        boxShadow: snapshot.isDragging ? "0 6px 14px rgba(0,0,0,.12)" : undefined,
                    }}
                >
                    <div className={'flex items-center justify-between gap-2 mb-1.5'}>
                        <span className={'title_font text-sm'}>{title}</span>

                        <div className={'flex gap-2 items-center'}>
                            <Button variant={'ghost'} size={'icon-sm'} title="Edit">
                                ✏️
                            </Button>
                            <Button variant={'ghost'} size={'icon-sm'} title="Edit">
                                ✏️
                            </Button>
                        </div>
                    </div>
                    {note ? <div className={'text-xs text-gray-500 bg-gray-200 border rounded-sm py-1 px-2'}>{note}</div> : null}
                </div>
            )}
        </Draggable>
    );
}
