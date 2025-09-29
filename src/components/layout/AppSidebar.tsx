import { NavLink, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  Search,
  MessageSquare,
  TrendingUp,
  Leaf,
  Stethoscope,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
} from "@/components/ui/sidebar";

const navigationItems = [
  {
    title: "Dashboard",
    url: "/",
    icon: LayoutDashboard,
  },
  {
    title: "Patients",
    url: "/patients",
    icon: Users,
  },
  {
    title: "Food Database",
    url: "/food-database",
    icon: Search,
  },
  {
    title: "AI Consultant",
    url: "/ai-consultant",
    icon: MessageSquare,
  },
  {
    title: "Population Insights",
    url: "/population-insights",
    icon: TrendingUp,
  },
];

export function AppSidebar() {
  const location = useLocation();
  const currentPath = location.pathname;

  const isActive = (path: string) => {
    if (path === "/") {
      return currentPath === "/";
    }
    return currentPath.startsWith(path);
  };

  const getNavClass = (path: string) => {
    return isActive(path)
      ? "bg-primary text-primary-foreground font-medium shadow-primary"
      : "text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-smooth";
  };

  return (
    <Sidebar className="w-64 border-r border-border bg-card">
      <SidebarHeader className="p-6 border-b border-border">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-10 h-10 bg-healing rounded-lg shadow-primary">
            <Leaf className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="brand-text text-heading-md">AyurDiet</h2>
            <p className="card-subtitle">AI Management</p>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent className="p-4">
        <SidebarGroup>
          <SidebarGroupLabel className="nav-section mb-3">
            Main Navigation
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-2">
              {navigationItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.url}
                      end={item.url === "/"}
                      className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-smooth ${getNavClass(
                        item.url
                      )}`}
                    >
                      <item.icon className="w-5 h-5" />
                      <span className="nav-item">{item.title}</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <div className="mt-8 p-4 bg-subtle-gradient rounded-lg border border-border">
          <div className="flex items-center gap-2 mb-2">
            <Stethoscope className="w-5 h-5 text-primary" />
            <span className="form-label">Healthcare Mode</span>
          </div>
          <p className="form-description">
            Professional Ayurvedic diet management with AI-powered insights and
            traditional wisdom.
          </p>
        </div>
      </SidebarContent>
    </Sidebar>
  );
}
