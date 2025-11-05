export type IconKey =
    | "home" | "desktop" | "bars" | "addressBook" | "shoppingBag" | "handshake"
    | "users" | "phone" | "mobile" | "comments" | "bookmark" | "creditCard"
    | "hourglass" | "map" | "university" | "building" | "file" | "archive"
    | "language" | "book" | "cubes";

export type MenuSubItem = {
    id: string;         // unique and stable (use slug)
    label: string;
    href: string;
};

export type MenuSection = {
    id: string;         // unique per section (e.g. 'leads', 'dashboard')
    label: string;
    link: string;       // click for the parent button
    icon: IconKey;
    items?: MenuSubItem[];
};
