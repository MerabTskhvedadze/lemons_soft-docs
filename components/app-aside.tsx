"use client";
import Link from "next/link";
import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSub,
    SidebarMenuSubButton,
    SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import {useSidebarMenu} from "@/context/SidebarMenuContext";
import {iconFromKey} from "@/components/iconMap";
import {usePathname} from 'next/navigation'

export function AppSidebar() {
    const {sections} = useSidebarMenu();
    const pathname = usePathname();

    return (
        <Sidebar position="contained">
            <SidebarContent>
                <SidebarGroup>
                    {/*<SidebarHeader>*/}
                    {/*    <h1 className="title_font">ნავიგაცია</h1>*/}
                    {/*</SidebarHeader>*/}

                    <SidebarMenu>
                        {sections.map(({id, label, link, icon, items}) => (
                            <SidebarMenuItem key={id}>
                                <SidebarMenuButton asChild>
                                    <Link
                                        href={link}
                                        className={`group-hover/inner:bg-red-500 ${pathname === link ? " text-blue-700 underline " : ""}`}
                                    >
                                        {iconFromKey(icon)}
                                        <span>{label}</span>
                                    </Link>
                                </SidebarMenuButton>

                                {items?.length ? (
                                    <SidebarMenuSub>
                                        {items.map((it) => (
                                            <SidebarMenuSubItem key={it.id}>
                                                <SidebarMenuSubButton
                                                    asChild
                                                    className={pathname === it.href ? " text-blue-700 underline " : ""}
                                                >
                                                    <Link href={it.href}>{it.label}</Link>
                                                </SidebarMenuSubButton>
                                            </SidebarMenuSubItem>
                                        ))}
                                    </SidebarMenuSub>
                                ) : null}
                            </SidebarMenuItem>
                        ))}
                    </SidebarMenu>
                </SidebarGroup>
            </SidebarContent>
        </Sidebar>
    );
}
