"use client";

import React from "react";
import {
    DndContext,
    useSensor,
    useSensors,
    PointerSensor,
    DragEndEvent,
    DragOverlay,
    closestCenter,
    useDraggable,
    useDroppable,
} from "@dnd-kit/core";

import {CSS} from "@dnd-kit/utilities";
import {
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Chip,
    Typography,
} from "@mui/material";
import {ScrollTrailText} from "@/animations/ScrollTrailText";
import {Button} from "@/components/ui/button";
import {Separator} from "@/components/ui/separator";

// ---- Types ----
export type Row = {
    id: string;
    numbers: string | number; // the key field used to decide merge eligibility
    name?: string;
    email?: string;
    comment?: string;
};

// ---- Demo seed ----
const INITIAL: Row[] = [
    {id: "a1", numbers: 598123456, name: "Alice", email: "alice@ex.com", comment: "alpha"},
    {id: "b1", numbers: 977654321, name: "Bob", email: "bob@ex.com", comment: "bravo"},
    {id: "a2", numbers: 598123456, name: "A. Lice", email: "a.lice@ex.com", comment: "dup"},
    {id: "c1", numbers: 599456789, name: "Carol", email: "carol@ex.com"},
    {id: "b2", numbers: 977654321, name: "Bobby", comment: "dup-2"},
];

// ---- Merge helper ----
// Priority rule: values from the DESTINATION row (the one you DROP ONTO) win.
// If a dest cell is empty/undefined, we fill from the source row.
function mergeRows(dest: Row, src: Row): Row {
    const merged: Row = {...dest};
    (Object.keys(src) as (keyof Row)[]).forEach((k) => {
        if (k === "id" || k === "numbers") return;
        const destVal = dest[k];
        const srcVal = src[k];
        if (
            (destVal === undefined || destVal === "") &&
            srcVal !== undefined &&
            srcVal !== ""
        ) {
            // fill only when dest lacks a value
            merged[k] = srcVal;
        }
    });
    return merged;
}

// ---- Row component: both draggable + droppable ----
function DraggableDroppableRow(
    {
        row,
        isMergeTarget,
        draggingId,
    }: {
        row: Row;
        isMergeTarget: boolean;
        draggingId: string | null;
    }) {
    const {
        attributes,
        listeners,
        setNodeRef: setDragRef,
        transform,
        isDragging,
    } = useDraggable({id: row.id});

    const {setNodeRef: setDropRef, isOver} = useDroppable({id: row.id});

    // attach both refs to the same DOM node
    const setRefs = (node: HTMLElement | null) => {
        setDragRef(node);
        setDropRef(node);
    };

    const style: React.CSSProperties = {
        transform: CSS.Translate.toString(transform), // only applies to the "source" row while dragging
        cursor: "grab",
    };

    // extra visual cue when a valid target is being hovered
    const outlineActive = isMergeTarget && isOver && draggingId !== row.id;

    return (
        <TableRow
            ref={setRefs}
            style={style}
            hover
            sx={{
                opacity: isDragging ? 0.85 : 1,
                outline: (theme) =>
                    outlineActive
                        ? `2px solid ${theme.palette.success.main}`
                        : isMergeTarget
                            ? `2px dashed ${theme.palette.success.main}`
                            : undefined,
                outlineOffset: isMergeTarget ? 2 : undefined,
            }}
            {...attributes}
            {...listeners}
        >
            <TableCell width={84}>
                <Chip
                    label={row.numbers}
                    size="small"
                    color={isMergeTarget ? "success" : "default"}
                />
            </TableCell>
            <TableCell>{row.name ?? <em style={{color: "#6b7280"}}>—</em>}</TableCell>
            <TableCell>{row.email ?? <em style={{color: "#6b7280"}}>—</em>}</TableCell>
            <TableCell>{row.comment ?? <em style={{color: "#6b7280"}}>—</em>}</TableCell>
        </TableRow>
    );
}

// ---- Main component ----
export default function Duplicates() {
    const [rows, setRows] = React.useState<Row[]>(INITIAL);
    const [activeId, setActiveId] = React.useState<string | null>(null);

    const sensors = useSensors(
        useSensor(PointerSensor, {activationConstraint: {distance: 6}})
    );

    const byId = React.useMemo(
        () => Object.fromEntries(rows.map((r) => [r.id, r] as const)),
        [rows]
    );
    const activeRow = activeId ? byId[activeId] : undefined;

    const idxOf = (id: string) => rows.findIndex((r) => r.id === id);

    const handleDragEnd = (e: DragEndEvent) => {
        const {active, over} = e;
        setActiveId(null);
        if (!over || active.id === over.id) return;

        const fromIdx = idxOf(String(active.id));
        const toIdx = idxOf(String(over.id));
        if (fromIdx < 0 || toIdx < 0) return;

        const from = rows[fromIdx];
        const to = rows[toIdx];

        // ✅ MERGE-ONLY: allowed only when numbers are equal
        if (String(from.numbers) === String(to.numbers)) {
            const merged = mergeRows(to, from); // destination wins
            const next = rows.slice();
            next[toIdx] = {...merged};
            next.splice(fromIdx, 1); // remove the dragged row
            setRows(next);
        }
    };

    return (
        <>
            <header className=" flex flex-col gap-3">
                <div className={'flex items-center gap-3'}>
                    <ScrollTrailText className={'title_font text-lg'}>🔹 გვერდის დანიშნულება</ScrollTrailText>
                    <Button
                        className="title_font bg-blue-700 text-xs hover:bg-blue-800"
                        size={'xs'}
                    >
                        გაეცანი გვერდს
                    </Button>
                </div>

                <ScrollTrailText className="pl-5">
                    გვერდზე წარმოდგენილია დუბლირებული ნომრები, რომლებიც შეგვიძლია გავაერთიანოთ,
                    <span className={'block italic text-[10.5px] mt-1'}>*სანახავად მოკიდეთ მაუსი ცხრილში არსებულ ნომერს და ცადეთ გაერთიანება*</span>
                </ScrollTrailText>
            </header>

            <Separator className={'py-3 bg-transparent'}/>

            <TableContainer component={Paper} variant="outlined">
                <DndContext
                    sensors={sensors}
                    collisionDetection={closestCenter}
                    onDragStart={(e) => setActiveId(String(e.active.id))}
                    onDragEnd={handleDragEnd}
                    onDragCancel={() => setActiveId(null)}
                >
                    <Table size="small" aria-label="mergeable rows table">
                        <TableHead>
                            <TableRow>
                                <TableCell className={'title_font text-xs!'}>ნომერი</TableCell>
                                <TableCell className={'title_font text-xs!'}>სახელი</TableCell>
                                <TableCell className={'title_font text-xs!'}>ემაილი</TableCell>
                                <TableCell className={'title_font text-xs!'}>კომენტარი</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.map((r) => (
                                <DraggableDroppableRow
                                    key={r.id}
                                    row={r}
                                    draggingId={activeId}
                                    isMergeTarget={Boolean(
                                        activeRow &&
                                        r.id !== activeRow.id &&
                                        String(r.numbers) === String(activeRow.numbers)
                                    )}
                                />
                            ))}
                        </TableBody>
                    </Table>

                    <DragOverlay>
                        {activeRow ? (
                            <Paper sx={{px: 1.5, py: 0.5, pointerEvents: "none"}}>
                                <Typography variant="body2">
                                    Dragging: {activeRow.name ?? activeRow.id}
                                </Typography>
                            </Paper>
                        ) : null}
                    </DragOverlay>
                </DndContext>
            </TableContainer>
        </>
    );
}
