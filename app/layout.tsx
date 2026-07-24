import type { Metadata } from "next";
import { Sidebar } from "@/app/components/Sidebar";
import { UserRole } from "@/types/rbac";
import "./globals.css";

export const metadata: Metadata = {
  title: { default: "SC-PMC ERP", template: "%s | SC-PMC ERP" },
  description: "Sileshi Consult project management consultancy ERP.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  // Temporary identity context; replace with NextAuth or Clerk session data during auth integration.
  const activeRole = UserRole.PROJECT_MANAGER;
  return <html lang="en" className="h-full"><body className="min-h-full bg-slate-50 font-sans text-slate-950"><div className="min-h-screen lg:flex"><Sidebar activeRole={activeRole} /><main className="min-w-0 flex-1 px-4 pb-8 pt-20 sm:px-6 lg:px-10 lg:pt-10">{children}</main></div></body></html>;
}
