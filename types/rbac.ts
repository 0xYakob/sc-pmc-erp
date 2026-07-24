export enum UserRole {
  ADMIN = "ADMIN",
  PROJECT_MANAGER = "PROJECT_MANAGER",
  RESIDENT_ENGINEER = "RESIDENT_ENGINEER",
  STRUCTURAL_LEAD = "STRUCTURAL_LEAD",
  CLIENT_REP = "CLIENT_REP",
}

export interface RbacUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

export interface SidebarMenuItem {
  label: string;
  href: string;
  description: string;
  allowedRoles: UserRole[];
}

export const sidebarMenuItems: SidebarMenuItem[] = [
  { label: "Dashboard", href: "/", description: "Portfolio and operational overview", allowedRoles: Object.values(UserRole) },
  { label: "Stakeholders & Clients", href: "/stakeholders", description: "Client, contractor, and stakeholder registry", allowedRoles: Object.values(UserRole) },
  { label: "Tenders & Proposals", href: "/tenders", description: "Tender pipeline and proposal management", allowedRoles: [UserRole.ADMIN, UserRole.PROJECT_MANAGER, UserRole.STRUCTURAL_LEAD] },
  { label: "Projects", href: "/projects", description: "Project delivery and administration", allowedRoles: [UserRole.ADMIN, UserRole.PROJECT_MANAGER, UserRole.RESIDENT_ENGINEER, UserRole.STRUCTURAL_LEAD, UserRole.CLIENT_REP] },
  { label: "Contracts", href: "/contracts", description: "Contracts, milestones, and variations", allowedRoles: [UserRole.ADMIN, UserRole.PROJECT_MANAGER, UserRole.CLIENT_REP] },
  { label: "Transmittals & RFIs", href: "/transmittals", description: "Document control and correspondence", allowedRoles: [UserRole.ADMIN, UserRole.PROJECT_MANAGER, UserRole.RESIDENT_ENGINEER, UserRole.STRUCTURAL_LEAD, UserRole.CLIENT_REP] },
  { label: "Staff Timesheets", href: "/timesheets", description: "Time capture and approvals", allowedRoles: [UserRole.ADMIN, UserRole.PROJECT_MANAGER, UserRole.RESIDENT_ENGINEER, UserRole.STRUCTURAL_LEAD] },
  { label: "Finance & Billing", href: "/finance", description: "Fees, invoices, and financial controls", allowedRoles: [UserRole.ADMIN, UserRole.PROJECT_MANAGER] },
  { label: "Settings & RBAC", href: "/settings", description: "Users, roles, and configuration", allowedRoles: [UserRole.ADMIN] },
];

export function canAccessMenuItem(role: UserRole, item: SidebarMenuItem): boolean {
  return item.allowedRoles.includes(role);
}

export function getVisibleSidebarMenuItems(role: UserRole): SidebarMenuItem[] {
  return sidebarMenuItems.filter((item) => canAccessMenuItem(role, item));
}
