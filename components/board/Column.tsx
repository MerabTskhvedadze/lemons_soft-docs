"use client";
import {Draggable, Droppable} from "@hello-pangea/dnd";
import ItemCard from "./ItemCard";
import type {Column as ColumnT} from "@/types/board";

type Props = {
    column: ColumnT;
    index: number;
};

export default function Column({column, index}: Props) {
    return (
        <Draggable draggableId={column.id} index={index}>
            {(provided, snapshot) => (
                <div
                    className={'bg-gray-100 border rounded-lg p-3 max-w-80 w-full min-h-30'}
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    style={{
                        ...provided.draggableProps.style,
                        boxShadow: snapshot.isDragging ? "0 6px 14px rgba(0,0,0,.12)" : undefined,
                    }}
                >
                    <div className={'flex items-center justify-between gap-2 mb-3'}>
                        <div className={'title_font inline-flex items-center gap-2'}>
                            <span>{column.title}</span>
                        </div>
                        {/* use header as the column drag handle */}
                        <span className={'cursor-grab select-none font-semibold opacity-70'} {...provided.dragHandleProps} title="Drag column">
                          ⠿
                        </span>
                    </div>

                    <Droppable droppableId={column.id} type="ITEM">
                        {(dropProvided, dropSnapshot) => (
                            <div
                                ref={dropProvided.innerRef}
                                {...dropProvided.droppableProps}
                                className={'flex flex-col gap-2 min-h-10'}
                                style={{
                                    background: dropSnapshot.isDraggingOver ? "#eef5ff" : undefined,
                                }}
                            >
                                {column.items.map((item, i) => (
                                    <ItemCard
                                        key={item.id}
                                        itemId={item.id}
                                        index={i}
                                        title={item.title}
                                        note={item.note}
                                    />
                                ))}
                                {dropProvided.placeholder}
                            </div>
                        )}
                    </Droppable>
                </div>
            )}
        </Draggable>
    );
}
