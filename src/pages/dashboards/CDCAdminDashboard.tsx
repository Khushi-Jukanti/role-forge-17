import { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { userAPI, DashboardResponse } from '@/lib/api';
import DashboardLayout from '@/components/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Users } from 'lucide-react';

export default function CDCAdminDashboard() {
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

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-secondary/5">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center">
                <Users className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <CardTitle className="text-2xl">Welcome, {user?.name}!</CardTitle>
                <CardDescription className="text-base">
                  {dashboardData?.message || 'CDC Admin Dashboard'}
                </CardDescription>
              </div>
            </div>
          </CardHeader>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Facility Management</CardTitle>
            <CardDescription>Your CDC responsibilities</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 text-sm">
              <p>• Create Doctor accounts</p>
              <p>• Assign Psychiatrists to your facility</p>
              <p>• Manage caregivers</p>
              <p>• Oversee patient care</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
