export type DashboardRole = "EXECUTIVE" | "PROJECT_MANAGER" | "RESIDENT_ENGINEER";

export interface ConsultancyProject {
  id: string;
  name: string;
  discipline: string;
  location: string;
  phase: "Design" | "Tender" | "Construction Supervision" | "Closeout";
  contractValueUsd: number;
  contractValueEtb: number;
  physicalProgress: number;
  financialProgress: number;
  manager: string;
  residentEngineer: string;
}

export interface TransmittalStatus { status: "Approved" | "Approved as Noted" | "Rejected / Resubmit"; count: number; }
export interface SiteAlert { id: string; severity: "Urgent" | "High" | "Moderate"; title: string; project: string; owner: string; due: string; audience: DashboardRole[]; }

export const consultancyProjects: ConsultancyProject[] = [
  { id: "PRJ-2401", name: "Addis Ababa Civic Centre", discipline: "Building Structures", location: "Addis Ababa", phase: "Construction Supervision", contractValueUsd: 2_150_000, contractValueEtb: 298_850_000, physicalProgress: 68, financialProgress: 61, manager: "Mekdes A.", residentEngineer: "Samuel T." },
  { id: "PRJ-2402", name: "Modjo Logistics Hub", discipline: "Industrial Infrastructure", location: "Modjo", phase: "Construction Supervision", contractValueUsd: 1_780_000, contractValueEtb: 247_420_000, physicalProgress: 43, financialProgress: 38, manager: "Mekdes A.", residentEngineer: "Samuel T." },
  { id: "PRJ-2403", name: "Hawassa Ring Road Package 2", discipline: "Road Infrastructure", location: "Hawassa", phase: "Design", contractValueUsd: 1_420_000, contractValueEtb: 197_380_000, physicalProgress: 31, financialProgress: 28, manager: "Dawit K.", residentEngineer: "Liya M." },
  { id: "PRJ-2404", name: "Bishoftu Water Network", discipline: "Water Infrastructure", location: "Bishoftu", phase: "Tender", contractValueUsd: 960_000, contractValueEtb: 133_440_000, physicalProgress: 17, financialProgress: 14, manager: "Dawit K.", residentEngineer: "Liya M." },
  { id: "PRJ-2405", name: "Jimma Teaching Hospital", discipline: "Healthcare Facilities", location: "Jimma", phase: "Closeout", contractValueUsd: 1_250_000, contractValueEtb: 173_750_000, physicalProgress: 92, financialProgress: 88, manager: "Mekdes A.", residentEngineer: "Samuel T." },
];

export const transmittalStatusDistribution: TransmittalStatus[] = [
  { status: "Approved", count: 86 },
  { status: "Approved as Noted", count: 34 },
  { status: "Rejected / Resubmit", count: 12 },
];

export const siteAlerts: SiteAlert[] = [
  { id: "ALT-101", severity: "Urgent", title: "Foundation pour concrete cube results below specified strength", project: "Addis Ababa Civic Centre", owner: "Resident Engineer", due: "Today", audience: ["EXECUTIVE", "PROJECT_MANAGER", "RESIDENT_ENGINEER"] },
  { id: "ALT-102", severity: "High", title: "Unresolved structural steel connection RFI", project: "Modjo Logistics Hub", owner: "Structural Lead", due: "Tomorrow", audience: ["EXECUTIVE", "PROJECT_MANAGER", "RESIDENT_ENGINEER"] },
  { id: "ALT-103", severity: "High", title: "Variation request requires commercial instruction", project: "Hawassa Ring Road Package 2", owner: "Project Manager", due: "26 Jul", audience: ["EXECUTIVE", "PROJECT_MANAGER"] },
  { id: "ALT-104", severity: "Moderate", title: "Updated traffic management plan awaiting review", project: "Bishoftu Water Network", owner: "Resident Engineer", due: "29 Jul", audience: ["PROJECT_MANAGER", "RESIDENT_ENGINEER"] },
];

const roleProjects: Record<DashboardRole, string[]> = {
  EXECUTIVE: consultancyProjects.map((project) => project.id),
  PROJECT_MANAGER: ["PRJ-2401", "PRJ-2402", "PRJ-2405"],
  RESIDENT_ENGINEER: ["PRJ-2401", "PRJ-2402"],
};

export interface DashboardData {
  projects: ConsultancyProject[];
  feeUsd: number;
  feeEtb: number;
  pendingConsultantActions: number;
  activeInstructionsAndVariations: number;
  allocatedManMonths: number;
  utilizedManMonths: number;
  transmittalDistribution: TransmittalStatus[];
  alerts: SiteAlert[];
}

export function getDashboardData(role: DashboardRole): DashboardData {
  const projectIds = roleProjects[role];
  const projects = consultancyProjects.filter((project) => projectIds.includes(project.id));
  const scale = projects.length / consultancyProjects.length;
  return {
    projects,
    feeUsd: projects.reduce((total, project) => total + project.contractValueUsd, 0),
    feeEtb: projects.reduce((total, project) => total + project.contractValueEtb, 0),
    pendingConsultantActions: Math.round(27 * scale),
    activeInstructionsAndVariations: Math.max(1, Math.round(11 * scale)),
    allocatedManMonths: Math.round(184 * scale),
    utilizedManMonths: Math.round(151 * scale),
    transmittalDistribution: transmittalStatusDistribution.map((item) => ({ ...item, count: Math.max(1, Math.round(item.count * scale)) })),
    alerts: siteAlerts.filter((alert) => alert.audience.includes(role)),
  };
}

export function formatCurrency(value: number, currency: "USD" | "ETB"): string {
  return new Intl.NumberFormat("en-US", { style: "currency", currency, maximumFractionDigits: 0 }).format(value);
}
