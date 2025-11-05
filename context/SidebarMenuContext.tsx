"use client";
import React, {createContext, useContext, useMemo, useState} from "react";
import type {MenuSection} from "@/types/menu";
import {sidebarInitial} from "@/data/sidebarInitials";

type Ctx = {
    sections: MenuSection[];
    setSections: React.Dispatch<React.SetStateAction<MenuSection[]>>;
    saveOrder: (next: MenuSection[]) => void;
};

const SidebarMenuContext = createContext<Ctx | null>(null);

export function SidebarMenuProvider({children}: { children: React.ReactNode }) {
    const [sections, setSections] = useState<MenuSection[]>(sidebarInitial);

    const saveOrder = (next: MenuSection[]) => {
        setSections(next);
    };

    const value = useMemo<Ctx>(() => (
        {sections, setSections, saveOrder, }),
        [sections]
    );

    return (
        <SidebarMenuContext.Provider value={value}>{children}</SidebarMenuContext.Provider>
    );
}

export function useSidebarMenu() {
    const ctx = useContext(SidebarMenuContext);
    if (!ctx) throw new Error("useSidebarMenu must be used within SidebarMenuProvider");
    return ctx;
}
