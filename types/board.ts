export type Item = {
    id: string;
    title: string;
    note?: string;
}

export type Column = {
    id: string;
    title: string;
    items: Item[];
    locked?: boolean;
}

export type BoardState = {
    columns: Column[];
}