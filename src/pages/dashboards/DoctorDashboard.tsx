import { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { userAPI, DashboardResponse } from '@/lib/api';
import DashboardLayout from '@/components/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Stethoscope, Users, ClipboardList, Calendar, Activity } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import puzzlePattern from '@/assets/puzzle.jpg';

export default function DoctorDashboard() {
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
    { label: 'Total Patients', value: '24', icon: Users, color: 'from-primary to-accent' },
    { label: 'Assessments', value: '12', icon: ClipboardList, color: 'from-accent to-accent-blue' },
    { label: 'Appointments', value: '8', icon: Calendar, color: 'from-secondary to-primary' },
    { label: 'Active Cases', value: '6', icon: Activity, color: 'from-accent-blue to-accent' },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header with Gradient and Puzzle */}
        <div 
          className="relative overflow-hidden rounded-xl border border-primary/20 bg-gradient-to-br from-primary/10 via-accent/10 to-accent-blue/10"
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
                  <Stethoscope className="w-7 h-7 text-white" />
                </div>
                <div>
                  <CardTitle className="text-2xl">Welcome, Dr. {user?.name}!</CardTitle>
                  <CardDescription className="text-base">
                    {dashboardData?.message || 'Manage patient care and assessments'}
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
          </Card>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
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

        {/* Clinical Activities */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="border-primary/10">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ClipboardList className="w-5 h-5" />
                Recent Assessments
              </CardTitle>
              <CardDescription>Latest patient evaluations</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="p-3 border rounded-lg hover:bg-accent/5 transition-colors">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-sm">Patient Assessment #{i}</p>
                        <p className="text-xs text-muted-foreground">Child Development Check</p>
                      </div>
                      <Badge variant={i === 1 ? 'destructive' : 'default'}>
                        {i === 1 ? 'Urgent' : 'Normal'}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="border-primary/10">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                Today's Appointments
              </CardTitle>
              <CardDescription>Scheduled consultations</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="p-3 border rounded-lg hover:bg-accent/5 transition-colors">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-sm">{10 + i}:00 AM</p>
                        <p className="text-xs text-muted-foreground">Consultation - Child #{i}</p>
                      </div>
                      <Badge variant="outline">Confirmed</Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Clinical Portal Features */}
        <Card className="border-primary/10">
          <CardHeader>
            <CardTitle>Clinical Portal Features</CardTitle>
            <CardDescription>Professional tools for patient care</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-gradient-to-br from-primary/5 to-accent/5 rounded-lg">
                <h4 className="font-semibold mb-2">Patient Records</h4>
                <p className="text-sm text-muted-foreground">Access comprehensive patient histories and medical records</p>
              </div>
              <div className="p-4 bg-gradient-to-br from-accent/5 to-accent-blue/5 rounded-lg">
                <h4 className="font-semibold mb-2">Assessment Tools</h4>
                <p className="text-sm text-muted-foreground">Conduct standardized developmental assessments</p>
              </div>
              <div className="p-4 bg-gradient-to-br from-accent-blue/5 to-secondary/5 rounded-lg">
                <h4 className="font-semibold mb-2">Treatment Plans</h4>
                <p className="text-sm text-muted-foreground">Create and manage personalized treatment protocols</p>
              </div>
              <div className="p-4 bg-gradient-to-br from-secondary/5 to-primary/5 rounded-lg">
                <h4 className="font-semibold mb-2">Clinical Notes</h4>
                <p className="text-sm text-muted-foreground">Document observations and recommendations securely</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}