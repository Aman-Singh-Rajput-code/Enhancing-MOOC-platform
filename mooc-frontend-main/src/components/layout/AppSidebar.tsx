import {
  LayoutDashboard,
  FileText,
  Briefcase,
  BookOpen,
  BarChart3,
  Users,
  MessageSquare,
  GraduationCap,
  Shield,
  LogOut,
  Brain, // ✅ ADD THIS
} from "lucide-react";
import { NavLink } from "@/components/NavLink";
import { useNavigate } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
  useSidebar,
} from "@/components/ui/sidebar";

// ✅ MODE SYSTEM
const getMode = () => localStorage.getItem("mode") || "learner";

// 🔹 Updated URLs (IMPORTANT)
const learnerItems = [
  { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
  { title: "Resume Recommender", url: "/resume", icon: FileText },
  { title: "JD Recommender", url: "/job-description", icon: Briefcase },
  { title: "Browse Courses", url: "/courses", icon: BookOpen },
];

const adminItems = [
  { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
  { title: "Analytics", url: "/admin/analytics", icon: BarChart3 },
  {
    title: "Content Analytics",
    url: "/admin/content-analytics",
    icon: BarChart3, // ✅ reuse or choose another
  },
  {
    title: "Learner Intelligence",
    url: "/admin/learner-intelligence",
    icon: Brain, // ✅ important
  }
];

export function AppSidebar() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const navigate = useNavigate();

  const mode = getMode();
  const items = mode === "admin" ? adminItems : learnerItems;

  const userName = localStorage.getItem("username") || "User";

  return (
    <Sidebar collapsible="icon">
      <SidebarContent>
        {/* Brand */}
        <div className="flex items-center gap-2 px-4 py-5">
          <GraduationCap className="h-7 w-7 text-sidebar-primary shrink-0" />
          {!collapsed && (
            <span className="text-lg font-bold tracking-tight text-sidebar-foreground">
              MOOC Portal
            </span>
          )}
        </div>

        {/* Mode Badge */}
        {!collapsed && (
          <div className="px-4 pb-3">
            <div className="flex items-center gap-2 rounded-md bg-sidebar-accent px-3 py-1.5 text-xs font-medium text-sidebar-accent-foreground">
              {mode === "admin" ? (
                <Shield className="h-3.5 w-3.5" />
              ) : (
                <GraduationCap className="h-3.5 w-3.5" />
              )}
              {mode === "admin" ? "Admin Portal" : "Learner Portal"}
            </div>
          </div>
        )}

        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.url}
                      end={item.url === "/dashboard"}
                      className="hover:bg-sidebar-accent/50"
                      activeClassName="bg-sidebar-accent text-sidebar-primary font-medium"
                    >
                      <item.icon className="mr-2 h-4 w-4" />
                      {!collapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        {!collapsed && (
          <div className="px-4 pb-2 text-xs text-sidebar-foreground/60">
            Signed in as{" "}
            <span className="font-medium text-sidebar-foreground/80">
              {userName}
            </span>
          </div>
        )}

        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              onClick={() => {
                // ✅ CLEAN LOGOUT
                localStorage.removeItem("accessToken");
                localStorage.removeItem("refreshToken");
                localStorage.removeItem("username");
                localStorage.removeItem("email");
                localStorage.removeItem("mode");

                navigate("/login");
              }}
            >
              <LogOut className="mr-2 h-4 w-4" />
              {!collapsed && <span>Sign Out</span>}
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}