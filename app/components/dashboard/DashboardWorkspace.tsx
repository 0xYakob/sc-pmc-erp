"use client";

import { useState } from "react";
import { getDashboardData, type DashboardRole } from "@/lib/mockData";
import { KpiGrid } from "@/app/components/dashboard/KpiGrid";
import { RoleSwitcher } from "@/app/components/dashboard/RoleSwitcher";

function ProgressBar({ label, value, tone }: { label: string; value: number; tone: "cyan" | "indigo" }) {
  const colors = tone === "cyan" ? "bg-cyan-500" : "bg-indigo-500";
  return <div><div className="mb-1.5 flex items-center justify-between text-xs"><span className="font-medium text-slate-600">{label}</span><span className="font-semibold text-slate-800">{value}%</span></div><div className="h-2 overflow-hidden rounded-full bg-slate-100"><div className={`h-full rounded-full ${colors}`} style={{ width: `${value}%` }} /></div></div>;
}

function SeverityBadge({ severity }: { severity: "Urgent" | "High" | "Moderate" }) {
  const styles = { Urgent: "bg-rose-100 text-rose-700", High: "bg-amber-100 text-amber-800", Moderate: "bg-sky-100 text-sky-700" };
  return <span className={`rounded-full px-2 py-1 text-xs font-bold ${styles[severity]}`}>{severity}</span>;
}

export function DashboardWorkspace() {
  const [role, setRole] = useState<DashboardRole>("EXECUTIVE");
  const data = getDashboardData(role);
  const maxDocuments = Math.max(...data.transmittalDistribution.map((item) => item.count));

  return <div className="mx-auto max-w-7xl">
    <section className="flex flex-col gap-6 border-b border-slate-200 pb-8 xl:flex-row xl:items-end xl:justify-between"><div className="max-w-3xl"><p className="text-xs font-bold uppercase tracking-[0.18em] text-cyan-700">Executive & operational intelligence</p><h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">Consultancy delivery dashboard</h1><p className="mt-3 text-base leading-7 text-slate-600">A single operational view of consultancy delivery, document control, staffing, and site-quality priorities.</p></div><div className="w-full xl:max-w-xl"><RoleSwitcher activeRole={role} onChange={setRole} /></div></section>
    <div className="mt-8"><KpiGrid data={data} /></div>
    <section className="mt-6 grid gap-6 xl:grid-cols-5">
      <article className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm xl:col-span-3"><div className="flex items-start justify-between gap-4"><div><p className="text-xs font-bold uppercase tracking-[0.14em] text-slate-500">Project controls</p><h2 className="mt-1 text-lg font-bold text-slate-950">Physical vs. financial progress</h2></div><span className="rounded-md bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-600">{data.projects.length} active projects</span></div><div className="mt-6 space-y-6">{data.projects.map((project) => <div key={project.id}><div className="mb-3 flex flex-col justify-between gap-1 sm:flex-row"><div><p className="text-sm font-semibold text-slate-800">{project.name}</p><p className="text-xs text-slate-500">{project.id} · {project.discipline} · {project.phase}</p></div><span className="text-xs font-medium text-slate-500">{project.location}</span></div><div className="grid gap-3 sm:grid-cols-2"><ProgressBar label="Physical completion" value={project.physicalProgress} tone="cyan" /><ProgressBar label="Financial completion" value={project.financialProgress} tone="indigo" /></div></div>)}</div></article>
      <article className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm xl:col-span-2"><p className="text-xs font-bold uppercase tracking-[0.14em] text-slate-500">Document control</p><h2 className="mt-1 text-lg font-bold text-slate-950">Transmittal status distribution</h2><div className="mt-7 space-y-6">{data.transmittalDistribution.map((item) => <div key={item.status}><div className="flex items-center justify-between gap-3 text-sm"><span className="font-medium text-slate-700">{item.status}</span><span className="font-bold text-slate-950">{item.count}</span></div><div className="mt-2 h-3 overflow-hidden rounded-full bg-slate-100"><div className={`h-full rounded-full ${item.status === "Approved" ? "bg-emerald-500" : item.status === "Approved as Noted" ? "bg-amber-400" : "bg-rose-500"}`} style={{ width: `${(item.count / maxDocuments) * 100}%` }} /></div></div>)}</div><p className="mt-7 rounded-lg bg-slate-50 p-3 text-sm leading-6 text-slate-600">Rejected or resubmit-required documents remain visible to the consultant team until a compliant revision is received.</p></article>
    </section>
    <section className="mt-6 rounded-xl border border-slate-200 bg-white p-6 shadow-sm"><div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-end"><div><p className="text-xs font-bold uppercase tracking-[0.14em] text-slate-500">Field assurance</p><h2 className="mt-1 text-lg font-bold text-slate-950">Site issue & quality alerts</h2></div><p className="text-sm text-slate-500">Role-filtered action list for active consultancy assignments</p></div><div className="mt-5 overflow-x-auto"><table className="w-full min-w-[650px] text-left"><thead className="border-b border-slate-200 text-xs uppercase tracking-wider text-slate-500"><tr><th className="pb-3 font-semibold">Severity</th><th className="pb-3 font-semibold">Action item</th><th className="pb-3 font-semibold">Project</th><th className="pb-3 font-semibold">Owner</th><th className="pb-3 text-right font-semibold">Due</th></tr></thead><tbody className="divide-y divide-slate-100">{data.alerts.map((alert) => <tr key={alert.id}><td className="py-4"><SeverityBadge severity={alert.severity} /></td><td className="py-4 text-sm font-semibold text-slate-800">{alert.title}</td><td className="py-4 text-sm text-slate-600">{alert.project}</td><td className="py-4 text-sm text-slate-600">{alert.owner}</td><td className="py-4 text-right text-sm font-medium text-slate-700">{alert.due}</td></tr>)}</tbody></table></div></section>
  </div>;
}
