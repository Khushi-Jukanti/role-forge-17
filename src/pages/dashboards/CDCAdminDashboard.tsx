import { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { userAPI, DashboardResponse } from '@/lib/api';
import DashboardLayout from '@/components/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, Building2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import puzzlePattern from '@/assets/puzzle.jpg';

export default function CDCAdminDashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
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
        <Card 
          className="relative overflow-hidden border-primary/20 bg-gradient-to-br from-primary/5 to-secondary/5"
          style={{
            backgroundImage: `url(${puzzlePattern})`,
            backgroundSize: '180px',
            backgroundPosition: 'right bottom',
            backgroundRepeat: 'no-repeat',
            backgroundBlendMode: 'overlay'
          }}
        >
          <CardHeader>
            <div className="flex items-center justify-between">
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
              <Button 
                onClick={() => navigate('/cdc-admin/onboarding')}
                className="bg-gradient-to-r from-primary to-accent"
              >
                <Building2 className="w-4 h-4 mr-2" />
                Complete CDC Registration
              </Button>
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
              <p>• Complete CDC onboarding and registration</p>
              <p>• Create Doctor accounts</p>
              <p>• Assign Psychiatrists to your facility</p>
              <p>• Manage therapists and their schedules</p>
              <p>• Upload CDC photos and documents</p>
              <p>• Oversee patient care</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
