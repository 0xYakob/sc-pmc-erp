"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, type ReactNode } from "react";
import { getVisibleSidebarMenuItems, type SidebarMenuItem, UserRole } from "@/types/rbac";

type IconName = "dashboard" | "stakeholders" | "tenders" | "projects" | "contracts" | "transmittals" | "timesheets" | "finance" | "settings" | "menu" | "close" | "chevron";

function Icon({ name, className }: { name: IconName; className?: string }) {
  const drawings: Record<IconName, ReactNode> = {
    dashboard: <><rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" /><rect x="3" y="14" width="7" height="7" rx="1" /><rect x="14" y="14" width="7" height="7" rx="1" /></>,
    stakeholders: <><circle cx="9" cy="8" r="3" /><path d="M3.5 20c.5-3.3 2.5-5 5.5-5s5 1.7 5.5 5M16 7h5M18.5 4.5v5" /></>,
    tenders: <><path d="M6 3h9l3 3v15H6a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Z" /><path d="M14 3v4h4M8 12h8M8 16h8M8 20h5" /></>,
    projects: <><path d="M3 7h7l2 2h9v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7Z" /><path d="M3 10h18" /></>,
    contracts: <><path d="M6 3h9l3 3v15H6a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Z" /><path d="M14 3v4h4M8 12h8M8 16h6" /></>,
    transmittals: <><path d="M4 4h16v12H4z" /><path d="m4 6 8 6 8-6M8 20h8" /></>,
    timesheets: <><circle cx="12" cy="12" r="8" /><path d="M12 7v5l3 2" /></>,
    finance: <><path d="M4 7h16v11H4z" /><path d="M4 10h16M8 15h3M8 4h8" /></>,
    settings: <><circle cx="12" cy="12" r="3" /><path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.9 4.9l2.1 2.1M17 17l2.1 2.1M19.1 4.9 17 7M7 17l-2.1 2.1" /></>,
    menu: <path d="M4 7h16M4 12h16M4 17h16" />,
    close: <path d="m6 6 12 12M18 6 6 18" />,
    chevron: <path d="m9 18 6-6-6-6" />,
  };
  return <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>{drawings[name]}</svg>;
}

function menuIcon(item: SidebarMenuItem): IconName {
  return ({ "/": "dashboard", "/stakeholders": "stakeholders", "/tenders": "tenders", "/projects": "projects", "/contracts": "contracts", "/transmittals": "transmittals", "/timesheets": "timesheets", "/finance": "finance", "/settings": "settings" } as Record<string, IconName>)[item.href] ?? "dashboard";
}

export function Sidebar({ activeRole }: { activeRole: UserRole }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const pathname = usePathname();
  const items = getVisibleSidebarMenuItems(activeRole);
  const isActive = (href: string) => href === "/" ? pathname === "/" : pathname.startsWith(href);

  return <>
    <header className="fixed inset-x-0 top-0 z-40 flex h-16 items-center justify-between border-b border-slate-200 bg-white px-4 lg:hidden"><span className="text-sm font-bold tracking-[0.16em]">SC PMC</span><button type="button" onClick={() => setMobileOpen((value) => !value)} className="rounded-lg p-2 hover:bg-slate-100" aria-label="Toggle navigation" aria-expanded={mobileOpen}><Icon name={mobileOpen ? "close" : "menu"} className="size-5" /></button></header>
    {mobileOpen && <button type="button" aria-label="Close navigation" className="fixed inset-0 z-40 bg-slate-950/30 lg:hidden" onClick={() => setMobileOpen(false)} />}
    <aside className={`fixed inset-y-0 left-0 z-50 flex border-r border-slate-800 bg-slate-950 text-slate-300 transition-all duration-200 lg:sticky lg:top-0 lg:h-screen ${mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"} ${collapsed ? "w-20" : "w-72"}`}>
      <div className="flex w-full flex-col overflow-y-auto p-4">
        <div className="mb-8 flex items-center justify-between gap-3 px-2"><div className="flex min-w-0 items-center gap-3"><div className="grid size-9 shrink-0 place-items-center rounded-lg bg-cyan-500 font-black text-slate-950">SC</div>{!collapsed && <div><p className="text-sm font-bold tracking-wide text-white">SC PMC ERP</p><p className="text-xs text-slate-500">Consultancy operations</p></div>}</div><button type="button" onClick={() => setCollapsed((value) => !value)} className="hidden rounded-md p-1.5 text-slate-400 hover:bg-slate-800 hover:text-white lg:block" aria-label="Collapse sidebar"><Icon name="chevron" className={`size-4 transition-transform ${collapsed ? "rotate-180" : ""}`} /></button></div>
        <nav aria-label="Primary navigation" className="space-y-1">{items.map((item) => <Link key={item.href} href={item.href} title={collapsed ? item.label : undefined} onClick={() => setMobileOpen(false)} className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${isActive(item.href) ? "bg-cyan-500 text-slate-950" : "hover:bg-slate-800 hover:text-white"} ${collapsed ? "lg:justify-center" : ""}`}><Icon name={menuIcon(item)} className="size-5 shrink-0" />{!collapsed && <span className="truncate">{item.label}</span>}</Link>)}</nav>
        {!collapsed && <div className="mt-auto rounded-lg border border-slate-800 bg-slate-900 p-3"><p className="text-xs font-semibold uppercase tracking-wider text-slate-500">Active role</p><p className="mt-1 text-sm font-medium text-white">{activeRole.replaceAll("_", " ")}</p></div>}
      </div>
    </aside>
  </>;
}
