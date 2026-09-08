import { redirect } from "next/navigation";
import AdminSidebarProvider, { SidebarTrigger } from "@/components/admin/AdminSidebar";
import SignOutButton from "@/components/admin/SignOutButton";
import { getCurrentUser } from "@/hooks/get-current-user";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/auth/login");
  }

  return (
    <div className="min-h-screen bg-[#030305] text-zinc-100 flex">
      <AdminSidebarProvider>
        {/* Main Workspace */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* Header */}
          <header className="h-16 border-b border-zinc-800/80 bg-[#07070a]/60 backdrop-blur-md px-4 sm:px-6 lg:px-8 flex items-center justify-between sticky top-0 z-20 gap-4">
            
            {/* Left Header Section: Trigger + Breadcrumbs */}
            <div className="flex items-center gap-2">
              <SidebarTrigger />

              <div className="flex items-center gap-1.5 text-xs text-zinc-400 font-mono">
                <span className="hidden xs:inline">studio</span>
                <span className="text-zinc-600 hidden xs:inline">/</span>
                <span className="text-zinc-200 font-medium">dashboard</span>
              </div>
            </div>

            {/* Right Header Section: User info + Sign Out */}
            <div className="flex items-center gap-3 sm:gap-4">
              <div className="text-right hidden sm:block max-w-45 md:max-w-xs">
                <span className="block text-xs font-medium text-zinc-200 truncate">
                  {user.email}
                </span>
                <span className="block text-[10px] text-emerald-400 font-mono">
                  Super Admin
                </span>
              </div>

              <SignOutButton />
            </div>
          </header>

          {/* Body Content */}
          <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
            <div className="max-w-6xl mx-auto w-full">
              {children}
            </div>
          </main>
        </div>
      </AdminSidebarProvider>
    </div>
  );
}