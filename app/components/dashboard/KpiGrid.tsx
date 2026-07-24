import { formatCurrency, type DashboardData } from "@/lib/mockData";

export function KpiGrid({ data }: { data: DashboardData }) {
  const activePhases = data.projects.reduce<Record<string, number>>((result, project) => ({ ...result, [project.phase]: (result[project.phase] ?? 0) + 1 }), {});
  const phaseSummary = Object.entries(activePhases).map(([phase, count]) => `${count} ${phase}`).join(" · ");
  const utilization = data.allocatedManMonths === 0 ? 0 : Math.round((data.utilizedManMonths / data.allocatedManMonths) * 100);
  const cards = [
    { label: "Active consultancy projects", value: String(data.projects.length), detail: phaseSummary },
    { label: "Supervision & design fee value", value: formatCurrency(data.feeUsd, "USD"), detail: `${formatCurrency(data.feeEtb, "ETB")} contracted value` },
    { label: "RFIs & submittals requiring action", value: String(data.pendingConsultantActions), detail: "Open consultant review actions" },
    { label: "Site instructions & variations", value: String(data.activeInstructionsAndVariations), detail: "Active commercial and site actions" },
    { label: "Staff man-months", value: `${data.utilizedManMonths} / ${data.allocatedManMonths}`, detail: `${utilization}% utilized against allocation` },
  ];
  return <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">{cards.map((card) => <article key={card.label} className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm"><p className="min-h-10 text-sm font-medium leading-5 text-slate-500">{card.label}</p><p className="mt-4 text-2xl font-bold tracking-tight text-slate-950">{card.value}</p><p className="mt-2 text-xs leading-5 text-slate-500">{card.detail}</p></article>)}</section>;
}
