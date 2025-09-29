import { NavLink, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  Search,
  MessageSquare,
  TrendingUp,
  Leaf,
  Stethoscope,
  Flower2,
  Sun,
  Moon,
  Waves,
  BookOpen,
  Heart,
  Zap,
  Calendar,
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

const ayurvedaItems = [
  {
    title: "Dosha Assessment",
    url: "/dosha-assessment",
    icon: Flower2,
  },
  {
    title: "Meal Planning",
    url: "/meal-planning",
    icon: Calendar,
  },
  {
    title: "Herbs & Remedies",
    url: "/herbs-remedies",
    icon: Leaf,
  },
  {
    title: "Ayurvedic Library",
    url: "/library",
    icon: BookOpen,
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
          <div className="flex items-center justify-center w-10 h-10 rounded-lg shadow-primary overflow-hidden">
            <img
              src="/logo.jpg"
              alt="AyurDiet Logo"
              className="w-full h-full object-cover"
            />
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

        <SidebarGroup className="mt-6">
          <SidebarGroupLabel className="nav-section mb-3">
            Ayurvedic Tools
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-2">
              {ayurvedaItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.url}
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

        <div className="mt-6 p-4 bg-subtle-gradient rounded-lg border border-border">
          <div className="flex items-center gap-2 mb-3">
            <Heart className="w-5 h-5 text-primary" />
            <span className="form-label">Three Doshas</span>
          </div>
          <div className="space-y-2 mb-4">
            <div className="flex items-center gap-2 text-sm">
              <Sun className="w-4 h-4 text-orange-500" />
              <span className="text-muted-foreground">
                Pitta - Fire & Water
              </span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Waves className="w-4 h-4 text-blue-500" />
              <span className="text-muted-foreground">
                Kapha - Earth & Water
              </span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Zap className="w-4 h-4 text-purple-500" />
              <span className="text-muted-foreground">Vata - Air & Space</span>
            </div>
          </div>
          <p className="form-description text-xs">
            Balance your constitution through personalized nutrition and
            lifestyle guidance.
          </p>
        </div>

        <div className="mt-4 p-4 bg-subtle-gradient rounded-lg border border-border">
          <div className="flex items-center gap-2 mb-2">
            <Stethoscope className="w-5 h-5 text-primary" />
            <span className="form-label">Healthcare Mode</span>
          </div>
          <p className="form-description">
            Professional Ayurvedic diet management with AI-powered insights and
            traditional wisdom.
          </p>
        </div>

        <div className="mt-4 p-3 bg-amber-50 dark:bg-amber-950/20 rounded-lg border border-amber-200 dark:border-amber-800">
          <div className="flex items-center gap-2 mb-2">
            <Leaf className="w-4 h-4 text-amber-600" />
            <span className="text-sm font-medium text-amber-800 dark:text-amber-200">
              Daily Wisdom
            </span>
          </div>
          <p className="text-xs text-amber-700 dark:text-amber-300">
            "When diet is wrong, medicine is of no use. When diet is correct,
            medicine is of no need." - Ancient Ayurvedic Proverb
          </p>
        </div>
      </SidebarContent>
    </Sidebar>
  );
}
