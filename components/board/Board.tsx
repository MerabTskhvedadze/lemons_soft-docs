"use client";

import {useCallback, useMemo, useState} from "react";
import {DragDropContext, Droppable, DropResult} from "@hello-pangea/dnd";
import Column from "./Column";
import type {BoardState, Column as ColumnT} from "@/types/board";

type Props = {
    initial: BoardState;
};

function reorder<T>(list: T[], startIndex: number, endIndex: number) {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
}

export default function Board({initial}: Props) {
    const [state, setState] = useState<BoardState>(initial);

    const columnOrder = useMemo(() => state.columns.map((c) => c.id), [state.columns]);

    const onDragEnd = useCallback(
        (result: DropResult) => {
            const {destination, source, draggableId, type} = result;
            if (!destination) return;

            // no move
            if (
                destination.droppableId === source.droppableId &&
                destination.index === source.index
            ) {
                return;
            }

            // Reorder columns
            if (type === "COLUMN") {
                const newColumns = reorder(state.columns, source.index, destination.index);
                setState({columns: newColumns});
                return;
            }

            // Move/reorder items
            const startColIdx = state.columns.findIndex((c) => c.id === source.droppableId);
            const finishColIdx = state.columns.findIndex(
                (c) => c.id === destination.droppableId
            );
            if (startColIdx === -1 || finishColIdx === -1) return;

            const startCol = state.columns[startColIdx];
            const finishCol = state.columns[finishColIdx];

            // same column: reorder items
            if (startCol === finishCol) {
                const newItems = reorder(startCol.items, source.index, destination.index);
                const newCol: ColumnT = {...startCol, items: newItems};
                const newColumns = Array.from(state.columns);
                newColumns[startColIdx] = newCol;
                setState({columns: newColumns});
                return;
            }

            // different columns: move item
            const startItems = Array.from(startCol.items);
            const [moved] = startItems.splice(source.index, 1);
            const finishItems = Array.from(finishCol.items);
            finishItems.splice(destination.index, 0, moved);

            const newColumns = Array.from(state.columns);
            newColumns[startColIdx] = {...startCol, items: startItems};
            newColumns[finishColIdx] = {...finishCol, items: finishItems};

            setState({columns: newColumns});
        },
        [state.columns]
    );

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            {/* droppable for columns */}
            <Droppable
                droppableId="board-root"
                direction="horizontal"
                type="COLUMN"
            >
                {(provided) => (
                    <div
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        className={'flex gap-4 items-start p-4 flex-wrap'}
                    >
                        {state.columns.map((col, idx) => (
                            <Column key={col.id} column={col} index={idx}/>
                        ))}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        </DragDropContext>
    );
}
