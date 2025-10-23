"use client";

import * as React from "react";
import {
    Table,
    TableHeader,
    TableRow,
    TableHead,
    TableBody,
    TableCell,
} from "@/components/ui/table";
import {cn} from "@/lib/utils"; // optional: replace with your own class merge util
import {FaChevronRight} from "react-icons/fa";

type Column<RowT> = {
    key: string;
    header: React.ReactNode;
    className?: string;
    // If provided, this controls how the cell is rendered (instead of row[key])
    render?: (row: RowT) => React.ReactNode;
};

type CollapsibleTableProps<RowT extends { id?: string | number }> = {
    columns: Column<RowT>[];
    rows: RowT[];
    /** Must return a unique key for each row (used for open/close state). */
    rowKey?: (row: RowT, idx: number) => string | number;
    /** Content shown when a row is expanded. Return null/undefined to make a row non-expandable. */
    renderExpanded: (row: RowT) => React.ReactNode;
    /** If true, the first column will include a chevron toggle. Otherwise a slim first toggle column is added. */
    toggleInsideFirstCol?: boolean;
    /** Optional: Controlled open keys */
    openKeys?: Array<string | number>;
    /** Optional: Controlled setter for open keys */
    onOpenKeysChange?: (keys: Array<string | number>) => void;
    /** Optional: initially opened rows (uncontrolled mode) */
    defaultOpenKeys?: Array<string | number>;
    rowClassName?: (row: RowT, isOpen: boolean) => string | undefined;
};

export function CollapsibleTable<RowT extends { id?: string | number }>(props: CollapsibleTableProps<RowT>) {
    const {
        columns,
        rows,
        rowKey = (_row, idx) => idx,
        renderExpanded,
        toggleInsideFirstCol = true,
        openKeys,
        onOpenKeysChange,
        defaultOpenKeys = [],
        rowClassName,
    } = props;

    const [internalOpen, setInternalOpen] = React.useState<Array<string | number>>(defaultOpenKeys);
    const isControlled = openKeys !== undefined && onOpenKeysChange !== undefined;
    const activeOpenKeys = isControlled ? openKeys! : internalOpen;

    const setOpen = (next: Array<string | number>) => {
        if (isControlled) onOpenKeysChange!(next);
        else setInternalOpen(next);
    };

    const toggle = (key: string | number) => {
        setOpen(
            activeOpenKeys.includes(key)
                ? activeOpenKeys.filter((k) => k !== key)
                : [...activeOpenKeys, key]
        );
    };

    const hasExpandable = (row: RowT) => !!renderExpanded(row);

    return (
        <Table>
            <TableHeader>
                <TableRow>
                    {!toggleInsideFirstCol && <TableHead aria-hidden className="w-8"/>}
                    {columns.map((c, i) => (
                        <TableHead key={i} className={cn("title_font", c.className)}>
                            {c.header}
                        </TableHead>
                    ))}
                </TableRow>
            </TableHeader>

            <TableBody>
                {rows.map((row, idx) => {
                    const key = rowKey(row, idx);
                    const expandable = hasExpandable(row);
                    const isOpen = activeOpenKeys.includes(key);

                    const Chevron = (
                        <button
                            type="button"
                            aria-label={isOpen ? "დახურვა" : "გახსნა"}
                            aria-expanded={isOpen}
                            onClick={() => expandable && toggle(key)}
                            className={cn(
                                "h-6 w-6 inline-flex items-center justify-center rounded transition-transform",
                                expandable ? "opacity-100" : "opacity-0 pointer-events-none",
                                isOpen ? "rotate-90" : "rotate-0",
                            )}
                        >
                            <FaChevronRight size={8}/>
                        </button>
                    );

                    return (
                        <React.Fragment key={String(key)}>
                            <TableRow
                                className={cn(
                                    expandable ? "cursor-pointer  border-0!" : "cursor-default",
                                    rowClassName?.(row, isOpen),
                                    isOpen ? "bg-muted/50" : "",
                                )}
                                onClick={(e) => {
                                    // avoid double toggling if the click came from a link or button inside the row
                                    const target = e.target as HTMLElement;
                                    if (["A", "BUTTON", "INPUT", "TEXTAREA", "LABEL"].includes(target.tagName)) return;
                                    if (expandable) toggle(key);
                                }}
                            >
                                {!toggleInsideFirstCol && <TableCell className="w-8">{Chevron}</TableCell>}

                                {columns.map((c, i) => (
                                    <TableCell key={i} className={c.className}>
                                        {toggleInsideFirstCol && i === 0 ? (
                                            <div className="flex items-center gap-2">
                                                <div>{c.render ? c.render(row) : (row as any)[c.key]}</div>
                                            </div>
                                        ) : c.render ? (
                                            c.render(row)
                                        ) : (
                                            <div className={'flex items-center gap-2 justify-between'}>
                                                {(row as never)[c.key]}
                                                {Chevron}
                                            </div>
                                        )}
                                    </TableCell>
                                ))}
                            </TableRow>

                            {/* Expanded content row */}
                            {expandable && (
                                <TableRow className={'bg-muted/50'}>
                                    <TableCell
                                        colSpan={columns.length + (toggleInsideFirstCol ? 0 : 1)}
                                        className="p-0"
                                    >
                                        <div
                                            className={cn(
                                                "overflow-hidden transition-[grid-template-rows] duration-300",
                                                "grid",
                                                isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                                            )}
                                        >
                                            <div className="min-h-0">
                                                <div className="px-4 py-3 text-sm leading-relaxed">
                                                    {renderExpanded(row)}
                                                </div>
                                            </div>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            )}
                        </React.Fragment>
                    );
                })}
            </TableBody>
        </Table>
    );
}