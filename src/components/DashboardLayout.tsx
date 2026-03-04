import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Menu, 
  X, 
  Home, 
  Phone, 
  Star, 
  Stethoscope, 
  ShoppingCart,
  User,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
  FolderOpen,
  Target
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate, useLocation } from "react-router-dom";

interface DashboardLayoutProps {
  children: React.ReactNode;
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const DashboardLayout = ({ children, activeTab, onTabChange }: DashboardLayoutProps) => {
  const [isOpen, setIsOpen] = useState(false); // Default to closed on mobile
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { id: "overview", label: "Overview", icon: Home },
    { id: "projects", label: "Projects", icon: FolderOpen, route: "/projects" },
    { id: "contact", label: "Contact", icon: Phone },
    { id: "reviews", label: "Reviews", icon: Star },
    { id: "doctors", label: "Doctors", icon: Stethoscope },
    { id: "medicine", label: "Medicine Store", icon: ShoppingCart },
  ];

  // Handle window resize
  useState(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (!mobile && !isOpen) {
        setIsOpen(true); // Open on desktop by default
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Initial check

    return () => window.removeEventListener('resize', handleResize);
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex relative">
      {/* Mobile Overlay */}
      {isMobile && isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={cn(
        "bg-white/90 backdrop-blur-lg shadow-xl border-r border-blue-100/50 transition-all duration-300 flex flex-col z-50",
        "fixed md:relative h-full md:h-auto",
        isOpen ? (isMobile ? "w-64" : "w-64") : (isMobile ? "-translate-x-full w-0" : "w-16"),
        isMobile && "top-0 left-0"
      )}>
        {/* Header */}
        <div className="p-3 md:p-4 border-b border-blue-100">
          <div className="flex items-center justify-between">
            {(isOpen || !isMobile) && (
              <div className="flex items-center space-x-2 md:space-x-3">
                <div className="p-2 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg">
                  <Stethoscope className="h-5 w-5 md:h-6 md:w-6 text-white" />
                </div>
                {(isOpen && isMobile) || (!isMobile && isOpen) ? (
                  <div>
                    <h2 className="font-bold text-gray-900 text-sm md:text-base">HealthScanner</h2>
                    <p className="text-xs text-gray-500">
                      {user?.role === 'patient' && 'Patient Portal'}
                      {user?.role === 'doctor' && 'Doctor Dashboard'}
                      {user?.role === 'medical_store' && 'Pharmacy Portal'}
                    </p>
                  </div>
                ) : null}
              </div>
            )}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(!isOpen)}
              className="p-2"
            >
              {isOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </Button>
          </div>
        </div>

        {/* User Info */}
        {user && ((isOpen && isMobile) || (!isMobile && isOpen)) && (
          <div className="p-3 md:p-4 border-b border-blue-100 bg-blue-50/50">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
                <User className="h-5 w-5 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">{user.name}</p>
                <p className="text-xs text-gray-500 capitalize">{user.role.replace('_', ' ')}</p>
              </div>
            </div>
          </div>
        )}

        {/* Navigation */}
        <nav className="flex-1 p-3 md:p-4 space-y-1 md:space-y-2 overflow-y-auto">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <Button
                key={item.id}
                variant={
                  (item.route && location.pathname.startsWith(item.route)) || activeTab === item.id
                    ? "default" 
                    : "ghost"
                }
                className={cn(
                  "w-full justify-start transition-all duration-200 text-sm",
                  !isOpen && !isMobile && "px-2",
                  ((item.route && location.pathname.startsWith(item.route)) || activeTab === item.id) && 
                  "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg"
                )}
                onClick={() => {
                  if (item.route) {
                    navigate(item.route);
                  } else {
                    onTabChange(item.id);
                  }
                  if (isMobile) setIsOpen(false);
                }}
              >
                <Icon className={cn("h-4 w-4 flex-shrink-0", (isOpen || isMobile) && "mr-3")} />
                {((isOpen && isMobile) || (!isMobile && isOpen)) && <span>{item.label}</span>}
              </Button>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="p-3 md:p-4 border-t border-blue-100 space-y-1 md:space-y-2">
          <Button
            variant="ghost"
            className={cn("w-full justify-start text-sm", !isOpen && !isMobile && "px-2")}
          >
            <User className={cn("h-4 w-4 flex-shrink-0", (isOpen || isMobile) && "mr-3")} />
            {((isOpen && isMobile) || (!isMobile && isOpen)) && <span>Profile</span>}
          </Button>
          <Button
            variant="ghost"
            className={cn("w-full justify-start text-sm", !isOpen && !isMobile && "px-2")}
          >
            <Settings className={cn("h-4 w-4 flex-shrink-0", (isOpen || isMobile) && "mr-3")} />
            {((isOpen && isMobile) || (!isMobile && isOpen)) && <span>Settings</span>}
          </Button>
          <Button
            variant="ghost"
            onClick={logout}
            className={cn("w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50 text-sm", !isOpen && !isMobile && "px-2")}
          >
            <LogOut className={cn("h-4 w-4 flex-shrink-0", (isOpen || isMobile) && "mr-3")} />
            {((isOpen && isMobile) || (!isMobile && isOpen)) && <span>Logout</span>}
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className={cn(
        "flex-1 transition-all duration-300",
        isMobile ? "p-4" : "p-6",
        isMobile && "pt-4"
      )}>
        {/* Mobile Header */}
        {isMobile && (
          <div className="flex items-center justify-between mb-4 md:hidden">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsOpen(true)}
              className="p-2"
            >
              <Menu className="h-4 w-4" />
            </Button>
            <h1 className="text-lg font-bold text-gray-900">Dashboard</h1>
            <div className="w-10" /> {/* Spacer */}
          </div>
        )}
        
        <div className="h-full overflow-auto">
          {children}
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
