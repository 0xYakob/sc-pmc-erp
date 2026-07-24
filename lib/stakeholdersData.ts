export type StakeholderCategory = "Client" | "Contractor" | "Sub-Consultant" | "Regulatory Body";

export interface StakeholderContact { name: string; designation: string; email: string; phone: string; }
export interface StakeholderProject { project: string; contractRef: string; role: string; status: "Active" | "Completed"; }
export interface CommunicationLog { date: string; subject: string; channel: "Transmittal" | "Meeting" | "Email" | "RFI"; }
export interface Stakeholder {
  id: string;
  legalName: string;
  shortName: string;
  category: StakeholderCategory;
  registrationId: string;
  taxId: string;
  address: string;
  activeContracts: number;
  performanceScore: number;
  contacts: StakeholderContact[];
  projects: StakeholderProject[];
  activeTransmittals: number;
  communicationLogs: CommunicationLog[];
}

export const stakeholders: Stakeholder[] = [
  { id: "STK-001", legalName: "Ministry of Foreign Affairs of Ethiopia", shortName: "MoFA", category: "Client", registrationId: "GOV-MOFA-001", taxId: "TIN-100245786", address: "Addis Ababa, Ethiopia", activeContracts: 2, performanceScore: 4.8, contacts: [{ name: "Hana Getachew", designation: "Director, Facilities Development", email: "hana.getachew@mofa.gov.et", phone: "+251 11 551 4102" }, { name: "Tesfaye Lemma", designation: "Senior Procurement Officer", email: "tesfaye.lemma@mofa.gov.et", phone: "+251 11 551 4150" }], projects: [{ project: "Addis Ababa Civic Centre", contractRef: "MOFA/PMC/014/2024", role: "Client", status: "Active" }, { project: "Diplomatic Quarter Annex", contractRef: "MOFA/PMC/008/2022", role: "Client", status: "Completed" }], activeTransmittals: 14, communicationLogs: [{ date: "23 Jul 2026", subject: "Monthly progress certification", channel: "Transmittal" }, { date: "18 Jul 2026", subject: "Variation review meeting", channel: "Meeting" }] },
  { id: "STK-002", legalName: "Oromia Regional Works Bureau", shortName: "ORWB", category: "Client", registrationId: "GOV-ORWB-014", taxId: "TIN-100938472", address: "Adama, Oromia", activeContracts: 2, performanceScore: 4.5, contacts: [{ name: "Birtukan Daba", designation: "Infrastructure Programs Head", email: "birtukan.daba@oromia.gov.et", phone: "+251 22 111 2204" }], projects: [{ project: "Modjo Logistics Hub", contractRef: "ORWB/PMC/023/2024", role: "Client", status: "Active" }, { project: "Bishoftu Water Network", contractRef: "ORWB/PMC/031/2025", role: "Client", status: "Active" }], activeTransmittals: 11, communicationLogs: [{ date: "22 Jul 2026", subject: "Tender clarification response", channel: "RFI" }, { date: "16 Jul 2026", subject: "Quarterly steering committee", channel: "Meeting" }] },
  { id: "STK-003", legalName: "Abyssinia Infrastructure PLC", shortName: "AIP", category: "Contractor", registrationId: "ET-CTR-23490", taxId: "TIN-101735920", address: "Bole, Addis Ababa", activeContracts: 3, performanceScore: 4.2, contacts: [{ name: "Amanuel Solomon", designation: "Project Director", email: "amanuel.solomon@aip.et", phone: "+251 91 124 8888" }, { name: "Selamawit Tadesse", designation: "Commercial Manager", email: "selamawit.tadesse@aip.et", phone: "+251 91 225 1444" }], projects: [{ project: "Addis Ababa Civic Centre", contractRef: "AIP/CC/2024-17", role: "Main Contractor", status: "Active" }, { project: "Jimma Teaching Hospital", contractRef: "AIP/JTH/2023-06", role: "Main Contractor", status: "Completed" }], activeTransmittals: 28, communicationLogs: [{ date: "24 Jul 2026", subject: "Concrete strength non-conformance", channel: "RFI" }, { date: "21 Jul 2026", subject: "Shop drawing package S-42", channel: "Transmittal" }] },
  { id: "STK-004", legalName: "Rift Valley Engineering Contractors", shortName: "RVEC", category: "Contractor", registrationId: "ET-CTR-17422", taxId: "TIN-101340092", address: "Hawassa, Sidama", activeContracts: 1, performanceScore: 3.9, contacts: [{ name: "Natnael Berhanu", designation: "Construction Manager", email: "natnael.berhanu@rvec.et", phone: "+251 91 440 2233" }], projects: [{ project: "Hawassa Ring Road Package 2", contractRef: "RVEC/HRR/2025-02", role: "Main Contractor", status: "Active" }], activeTransmittals: 17, communicationLogs: [{ date: "20 Jul 2026", subject: "Traffic management plan revision", channel: "Transmittal" }, { date: "15 Jul 2026", subject: "Weekly site coordination", channel: "Meeting" }] },
  { id: "STK-005", legalName: "Nile Design & Survey Consultants", shortName: "NDSC", category: "Sub-Consultant", registrationId: "ET-CON-08251", taxId: "TIN-100778463", address: "Kazanchis, Addis Ababa", activeContracts: 2, performanceScore: 4.6, contacts: [{ name: "Rahel Birhane", designation: "Geotechnical Lead", email: "rahel.birhane@ndsc.et", phone: "+251 91 664 9811" }], projects: [{ project: "Modjo Logistics Hub", contractRef: "SC/NDSC/MLH/007", role: "Geotechnical Sub-Consultant", status: "Active" }, { project: "Bishoftu Water Network", contractRef: "SC/NDSC/BWN/011", role: "Survey Sub-Consultant", status: "Active" }], activeTransmittals: 8, communicationLogs: [{ date: "19 Jul 2026", subject: "Borehole investigation report", channel: "Transmittal" }, { date: "11 Jul 2026", subject: "Geotechnical scope alignment", channel: "Email" }] },
  { id: "STK-006", legalName: "Ethiopian Construction Works Regulatory Authority", shortName: "ECWRA", category: "Regulatory Body", registrationId: "GOV-ECWRA-001", taxId: "TIN-100013490", address: "Addis Ababa, Ethiopia", activeContracts: 0, performanceScore: 4.4, contacts: [{ name: "Yohannes Ayalew", designation: "Compliance Review Officer", email: "yohannes.ayalew@ecwra.gov.et", phone: "+251 11 872 3456" }], projects: [{ project: "Addis Ababa Civic Centre", contractRef: "Permit ECWRA-CC-941", role: "Regulatory Authority", status: "Active" }], activeTransmittals: 3, communicationLogs: [{ date: "17 Jul 2026", subject: "Structural compliance submission", channel: "Transmittal" }, { date: "09 Jul 2026", subject: "Permit inspection appointment", channel: "Email" }] },
];

export type StakeholderFilter = "All" | "Clients" | "Contractors" | "Sub-Consultants" | "Regulatory Bodies";
const categoriesForFilter: Record<StakeholderFilter, StakeholderCategory | undefined> = { All: undefined, Clients: "Client", Contractors: "Contractor", "Sub-Consultants": "Sub-Consultant", "Regulatory Bodies": "Regulatory Body" };

export function filterStakeholders(query: string, filter: StakeholderFilter): Stakeholder[] {
  const normalizedQuery = query.trim().toLowerCase();
  const category = categoriesForFilter[filter];
  return stakeholders.filter((stakeholder) => {
    const searchContent = [stakeholder.legalName, stakeholder.shortName, stakeholder.registrationId, stakeholder.taxId, ...stakeholder.contacts.flatMap((contact) => [contact.name, contact.email])].join(" ").toLowerCase();
    return (!category || stakeholder.category === category) && (!normalizedQuery || searchContent.includes(normalizedQuery));
  });
}

export function getStakeholderMetrics() {
  const clients = stakeholders.filter((stakeholder) => stakeholder.category === "Client");
  const contractors = stakeholders.filter((stakeholder) => stakeholder.category === "Contractor");
  return { total: stakeholders.length, activeClients: clients.filter((client) => client.activeContracts > 0).length, primeContractors: contractors.length, averagePerformance: stakeholders.reduce((total, stakeholder) => total + stakeholder.performanceScore, 0) / stakeholders.length };
}
