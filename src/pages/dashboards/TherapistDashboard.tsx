import DashboardLayout from '@/components/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, Users, TrendingUp } from 'lucide-react';

export default function TherapistDashboard() {
  const sessions = [
    { id: 1, child: 'Aarav Kumar', time: '10:00 AM', status: 'upcoming' },
    { id: 2, child: 'Priya Sharma', time: '2:00 PM', status: 'upcoming' },
    { id: 3, child: 'Rohan Patel', time: '4:30 PM', status: 'completed' },
  ];

  const stats = [
    { title: 'Today\'s Sessions', value: '5', icon: Calendar, color: 'text-primary' },
    { title: 'This Week', value: '23', icon: Clock, color: 'text-secondary' },
    { title: 'Total Patients', value: '47', icon: Users, color: 'text-accent' },
    { title: 'Success Rate', value: '94%', icon: TrendingUp, color: 'text-green-600' },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-secondary/5">
          <CardHeader>
            <CardTitle className="text-2xl">Therapist Dashboard</CardTitle>
            <CardDescription>Manage your sessions and track patient progress</CardDescription>
          </CardHeader>
        </Card>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat) => (
            <Card key={stat.title}>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">{stat.title}</p>
                    <p className="text-3xl font-bold mt-1">{stat.value}</p>
                  </div>
                  <stat.icon className={`w-10 h-10 ${stat.color}`} />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Sessions */}
        <Card>
          <CardHeader>
            <CardTitle>Today's Schedule</CardTitle>
            <CardDescription>Your upcoming and completed sessions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {sessions.map((session) => (
                <div
                  key={session.id}
                  className="flex items-center justify-between p-4 border rounded-lg hover:bg-accent/5 transition-colors"
                >
                  <div>
                    <h4 className="font-semibold">{session.child}</h4>
                    <p className="text-sm text-muted-foreground">{session.time}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge variant={session.status === 'completed' ? 'secondary' : 'default'}>
                      {session.status}
                    </Badge>
                    {session.status === 'upcoming' && (
                      <Button size="sm">Start Session</Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
