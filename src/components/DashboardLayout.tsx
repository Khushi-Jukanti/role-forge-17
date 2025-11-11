import { ReactNode } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { 
  Activity, 
  Users, 
  UserPlus, 
  LayoutDashboard, 
  LogOut, 
  Menu,
  Shield,
  Stethoscope,
  HeartPulse,
  Phone,
  TrendingUp,
  GraduationCap,
  MessageCircle
} from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import logo from '@/assets/logo.jpg';

interface DashboardLayoutProps {
  children: ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const { user, logout } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const location = useLocation();

  const getNavItems = () => {
    const role = user?.role;
    const baseItems = [
      { icon: LayoutDashboard, label: 'Dashboard', path: `/dashboard/${role?.toLowerCase().replace(/\s+/g, '-')}` },
      { icon: GraduationCap, label: 'Training Hub', path: '/training' },
      { icon: MessageCircle, label: 'Community', path: '/community' },
    ];

    const createUserItems = [];

    if (role === 'Super Admin') {
      createUserItems.push(
        { icon: UserPlus, label: 'Create Sub Admin', path: '/create/subadmin' },
        { icon: UserPlus, label: 'Create CDC Admin', path: '/create/cdcadmin' },
        { icon: UserPlus, label: 'Create Psychiatrist', path: '/create/psychiatrist' },
        { icon: UserPlus, label: 'Create Help Desk', path: '/create/helpdesk' },
        { icon: UserPlus, label: 'Create Marketing', path: '/create/marketing' },
      );
    } else if (role === 'Sub Admin') {
      createUserItems.push(
        { icon: UserPlus, label: 'Create CDC Admin', path: '/create/cdcadmin' },
        { icon: UserPlus, label: 'Create Psychiatrist', path: '/create/psychiatrist' },
      );
    } else if (role === 'CDC Admin') {
      createUserItems.push(
        { icon: UserPlus, label: 'Create Doctor', path: '/create/doctor' },
        { icon: UserPlus, label: 'Create Psychiatrist', path: '/create/psychiatrist' },
      );
    }

    if (createUserItems.length > 0) {
      return [
        ...baseItems,
        { icon: Users, label: 'View Hierarchy', path: '/hierarchy' },
        ...createUserItems,
      ];
    }

    return baseItems;
  };

  const getRoleIcon = () => {
    const role = user?.role;
    switch (role) {
      case 'Super Admin':
      case 'Sub Admin':
        return Shield;
      case 'CDC Admin':
        return Users;
      case 'Psychiatrist':
        return HeartPulse;
      case 'Doctor':
        return Stethoscope;
      case 'Help Desk':
        return Phone;
      case 'Marketing':
        return TrendingUp;
      default:
        return Activity;
    }
  };

  const navItems = getNavItems();
  const RoleIcon = getRoleIcon();

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <aside
        className={cn(
          'bg-sidebar border-r border-sidebar-border transition-all duration-300',
          sidebarOpen ? 'w-64' : 'w-20'
        )}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="h-16 flex items-center px-6 border-b border-sidebar-border">
            <div className="flex items-center gap-3">
              <img src={logo} alt="ManoSetu" className="w-8 h-8 object-contain rounded-lg" />
              {sidebarOpen && <span className="font-bold text-sidebar-foreground">ManoSetu</span>}
            </div>
          </div>

          {/* User Info */}
          <div className="px-4 py-6 border-b border-sidebar-border">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-sidebar-accent rounded-lg flex items-center justify-center">
                <RoleIcon className="w-5 h-5 text-sidebar-primary" />
              </div>
              {sidebarOpen && (
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-sidebar-foreground truncate">{user?.name}</p>
                  <p className="text-xs text-sidebar-foreground/60 truncate">{user?.role}</p>
                </div>
              )}
            </div>
          </div>

          {/* Navigation */}
          <ScrollArea className="flex-1 px-3 py-4">
            <nav className="space-y-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={cn(
                      'flex items-center gap-3 px-3 py-2 rounded-lg transition-colors',
                      isActive
                        ? 'bg-sidebar-primary text-sidebar-primary-foreground'
                        : 'text-sidebar-foreground hover:bg-sidebar-accent'
                    )}
                  >
                    <Icon className="w-5 h-5 flex-shrink-0" />
                    {sidebarOpen && <span className="text-sm font-medium">{item.label}</span>}
                  </Link>
                );
              })}
            </nav>
          </ScrollArea>

          {/* Footer */}
          <div className="p-4 border-t border-sidebar-border">
            <Button
              variant="ghost"
              onClick={logout}
              className="w-full justify-start text-sidebar-foreground hover:bg-sidebar-accent"
            >
              <LogOut className="w-5 h-5 flex-shrink-0" />
              {sidebarOpen && <span className="ml-3">Logout</span>}
            </Button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="h-16 border-b bg-card flex items-center px-6">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            <Menu className="w-5 h-5" />
          </Button>
          <div className="ml-4">
            <h1 className="text-lg font-semibold">{user?.role} Dashboard</h1>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-auto p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
