"use client";

import type { DashboardRole } from "@/lib/mockData";

const roleOptions: { role: DashboardRole; label: string; description: string }[] = [
  { role: "EXECUTIVE", label: "Executive", description: "Client / Partner view" },
  { role: "PROJECT_MANAGER", label: "Project Manager", description: "Delivery portfolio view" },
  { role: "RESIDENT_ENGINEER", label: "Resident Engineer", description: "Site action view" },
];

export function RoleSwitcher({ activeRole, onChange }: { activeRole: DashboardRole; onChange: (role: DashboardRole) => void }) {
  return <div className="rounded-xl border border-slate-200 bg-white p-2 shadow-sm"><p className="px-2 pb-2 text-xs font-bold uppercase tracking-[0.14em] text-slate-500">Dashboard view</p><div className="grid gap-1 sm:grid-cols-3">{roleOptions.map((option) => <button key={option.role} type="button" onClick={() => onChange(option.role)} className={`rounded-lg px-3 py-2.5 text-left transition-colors ${activeRole === option.role ? "bg-slate-900 text-white" : "text-slate-600 hover:bg-slate-100"}`}><span className="block text-sm font-semibold">{option.label}</span><span className={`mt-0.5 block text-xs ${activeRole === option.role ? "text-slate-300" : "text-slate-500"}`}>{option.description}</span></button>)}</div></div>;
}
