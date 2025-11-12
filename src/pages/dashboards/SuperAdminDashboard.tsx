import { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { userAPI, DashboardResponse } from '@/lib/api';
import DashboardLayout from '@/components/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Shield, Users, UserPlus, Activity, TrendingUp, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import puzzlePattern from '@/assets/puzzle.jpg';

export default function SuperAdminDashboard() {
  const { user } = useAuth();
  const [dashboardData, setDashboardData] = useState<DashboardResponse | null>(null);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const response = await userAPI.getDashboard();
        setDashboardData(response.data);
      } catch (error) {
        console.error('Failed to fetch dashboard:', error);
      }
    };
    fetchDashboard();
  }, []);

  const stats = [
    { label: 'Total Users', value: '156', icon: Users, color: 'from-primary to-accent' },
    { label: 'Active CDC Centres', value: '12', icon: Activity, color: 'from-accent to-accent-blue' },
    { label: 'New Registrations', value: '24', icon: UserPlus, color: 'from-accent-blue to-secondary' },
    { label: 'System Health', value: '98%', icon: TrendingUp, color: 'from-secondary to-primary' },
  ];

  const userRoles = [
    { role: 'Sub Admin', count: 8, description: 'Regional administrators' },
    { role: 'CDC Admin', count: 12, description: 'Centre managers' },
    { role: 'Doctors', count: 45, description: 'Medical professionals' },
    { role: 'Psychiatrists', count: 18, description: 'Mental health experts' },
    { role: 'Help Desk', count: 15, description: 'Support staff' },
    { role: 'Marketing', count: 10, description: 'Outreach team' },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header with Gradient and Puzzle */}
        <div 
          className="relative overflow-hidden rounded-xl border border-primary/20 bg-gradient-to-br from-primary/10 via-secondary/10 to-accent-blue/10"
          style={{
            backgroundImage: `url(${puzzlePattern})`,
            backgroundSize: '180px',
            backgroundPosition: 'right bottom',
            backgroundRepeat: 'no-repeat',
            backgroundBlendMode: 'overlay'
          }}
        >
          <Card className="border-0 bg-transparent">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="w-14 h-14 bg-gradient-to-br from-primary via-accent to-accent-blue rounded-xl flex items-center justify-center shadow-lg">
                  <Shield className="w-7 h-7 text-white" />
                </div>
                <div>
                  <CardTitle className="text-2xl">Welcome, {user?.name}!</CardTitle>
                  <CardDescription className="text-base">
                    {dashboardData?.message || 'Super Admin Control Panel'}
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
          </Card>
        </div>

        {/* Stats Grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <Card key={index} className="hover:shadow-medium transition-all border-primary/10">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">{stat.label}</p>
                    <p className="text-3xl font-bold mt-2">{stat.value}</p>
                  </div>
                  <div className={`w-12 h-12 bg-gradient-to-br ${stat.color} rounded-xl flex items-center justify-center shadow-lg`}>
                    <stat.icon className="w-6 h-6 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* User Management */}
        <Card className="border-primary/10">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  User Management Overview
                </CardTitle>
                <CardDescription>Manage all system roles and permissions</CardDescription>
              </div>
              <Button className="bg-gradient-to-r from-primary to-accent">
                <UserPlus className="w-4 h-4 mr-2" />
                Create User
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {userRoles.map((item, index) => (
                <div 
                  key={index}
                  className="p-4 border rounded-lg hover:border-primary/50 transition-all cursor-pointer group"
                >
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold group-hover:text-primary transition-colors">{item.role}</h4>
                    <span className="text-2xl font-bold text-primary">{item.count}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions & System Features */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="border-primary/10">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="w-5 h-5" />
                Quick Actions
              </CardTitle>
              <CardDescription>Common administrative tasks</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Button variant="outline" className="w-full justify-start">
                  Create Sub Admin Account
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  Setup New CDC Centre
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  Assign Psychiatrist to Facility
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  Manage Help Desk Team
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  View Complete User Hierarchy
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="border-primary/10">
            <CardHeader>
              <CardTitle>System Features</CardTitle>
              <CardDescription>Platform capabilities</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="p-3 bg-gradient-to-r from-primary/5 to-accent/5 rounded-lg">
                  <h4 className="font-semibold text-sm mb-1">Full System Access</h4>
                  <p className="text-xs text-muted-foreground">Manage all roles and permissions across the platform</p>
                </div>
                <div className="p-3 bg-gradient-to-r from-accent/5 to-accent-blue/5 rounded-lg">
                  <h4 className="font-semibold text-sm mb-1">User Hierarchy</h4>
                  <p className="text-xs text-muted-foreground">Create and maintain organizational structure</p>
                </div>
                <div className="p-3 bg-gradient-to-r from-accent-blue/5 to-secondary/5 rounded-lg">
                  <h4 className="font-semibold text-sm mb-1">Analytics & Reports</h4>
                  <p className="text-xs text-muted-foreground">Comprehensive insights into platform usage</p>
                </div>
                <div className="p-3 bg-gradient-to-r from-secondary/5 to-primary/5 rounded-lg">
                  <h4 className="font-semibold text-sm mb-1">Security Management</h4>
                  <p className="text-xs text-muted-foreground">Monitor and control system security settings</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}