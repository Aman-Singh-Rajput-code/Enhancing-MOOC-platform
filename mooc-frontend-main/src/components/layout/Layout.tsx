import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "./AppSidebar";
import { Outlet } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeftRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

// ✅ NEW MODE SYSTEM
const getMode = () => localStorage.getItem("mode") || "learner";

export function Layout() {
  const navigate = useNavigate();
  const mode = getMode();

  const toggleMode = () => {
    const next = mode === "admin" ? "learner" : "admin";
    localStorage.setItem("mode", next);

    // redirect to dashboard after switch
    navigate("/dashboard");

    // force UI update
    window.location.reload();
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        <div className="flex-1 flex flex-col min-w-0">
          <header className="h-14 flex items-center justify-between border-b border-white/10 bg-white/5 backdrop-blur-md px-4 shrink-0">
            <div className="flex items-center gap-2">
              <SidebarTrigger />
            </div>

            {/* ✅ SWITCH BUTTON */}
            <Button
              variant="outline"
              size="sm"
              onClick={toggleMode}
              className="gap-2 text-xs"
            >
              <ArrowLeftRight className="h-3.5 w-3.5" />
              Switch to {mode === "admin" ? "Learner" : "Admin"}
            </Button>
          </header>

         <main className="flex-1 overflow-auto p-4 md:p-6">
            <Outlet />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}