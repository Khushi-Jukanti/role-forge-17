import { useEffect, useState } from 'react';
import { userAPI, User } from '@/lib/api';
import DashboardLayout from '@/components/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Users } from 'lucide-react';

export default function Hierarchy() {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchHierarchy = async () => {
      try {
        const response = await userAPI.getHierarchy();
        setUsers(response.data.hierarchy);
      } catch (error) {
        console.error('Failed to fetch hierarchy:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchHierarchy();
  }, []);

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case 'Super Admin':
        return 'bg-primary';
      case 'Sub Admin':
        return 'bg-secondary';
      case 'CDC Admin':
        return 'bg-accent';
      case 'Psychiatrist':
        return 'bg-purple-500';
      case 'Doctor':
        return 'bg-blue-500';
      case 'Parent':
        return 'bg-green-500';
      case 'Help Desk':
        return 'bg-orange-500';
      case 'Marketing':
        return 'bg-pink-500';
      default:
        return 'bg-muted';
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <Users className="w-6 h-6 text-primary" />
              <div>
                <CardTitle>User Hierarchy</CardTitle>
                <CardDescription>View all users you've created or are assigned to</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="text-center py-8">Loading...</div>
            ) : users.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                No users found in your hierarchy
              </div>
            ) : (
              <div className="space-y-3">
                {users.map((user) => (
                  <div
                    key={user.id}
                    className="flex items-center justify-between p-4 rounded-lg border bg-card hover:bg-accent/5 transition-colors"
                  >
                    <div className="space-y-1">
                      <p className="font-medium">{user.name}</p>
                      <p className="text-sm text-muted-foreground">{user.email}</p>
                    </div>
                    <Badge className={getRoleBadgeColor(user.role)}>
                      {user.role}
                    </Badge>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
