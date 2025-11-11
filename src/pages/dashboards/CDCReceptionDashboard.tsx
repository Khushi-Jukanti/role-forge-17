import { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import DashboardLayout from '@/components/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Users, 
  ClipboardList, 
  Calendar, 
  TrendingUp, 
  Search,
  Filter,
  Download,
  Phone,
  Mail,
  Baby,
  AlertCircle,
  CheckCircle
} from 'lucide-react';
import puzzlePattern from '@/assets/puzzle.jpg';

interface Parent {
  id: string;
  name: string;
  email: string;
  phone: string;
  children: number;
  lastVisit: string;
  status: 'active' | 'inactive';
}

interface ChildRecord {
  id: string;
  name: string;
  age: number;
  gender: string;
  parentName: string;
  parentPhone: string;
  assessments: number;
  lastAssessment: string;
  needsConsultation: boolean;
}

interface Booking {
  id: string;
  childName: string;
  parentName: string;
  date: string;
  time: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  amount: number;
}

export default function CDCReceptionDashboard() {
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [activeTab, setActiveTab] = useState('overview');

  // Mock data
  const [parents] = useState<Parent[]>([
    { id: '1', name: 'Rajesh Kumar', email: 'rajesh@example.com', phone: '+91 98765 43210', children: 2, lastVisit: '2025-11-08', status: 'active' },
    { id: '2', name: 'Priya Sharma', email: 'priya@example.com', phone: '+91 98765 43211', children: 1, lastVisit: '2025-11-05', status: 'active' },
    { id: '3', name: 'Amit Patel', email: 'amit@example.com', phone: '+91 98765 43212', children: 1, lastVisit: '2025-10-28', status: 'inactive' },
  ]);

  const [childRecords] = useState<ChildRecord[]>([
    { id: '1', name: 'Aarav Kumar', age: 36, gender: 'Boy', parentName: 'Rajesh Kumar', parentPhone: '+91 98765 43210', assessments: 3, lastAssessment: '2025-11-08', needsConsultation: true },
    { id: '2', name: 'Diya Kumar', age: 24, gender: 'Girl', parentName: 'Rajesh Kumar', parentPhone: '+91 98765 43210', assessments: 2, lastAssessment: '2025-11-01', needsConsultation: false },
    { id: '3', name: 'Arjun Sharma', age: 48, gender: 'Boy', parentName: 'Priya Sharma', parentPhone: '+91 98765 43211', assessments: 4, lastAssessment: '2025-11-05', needsConsultation: true },
  ]);

  const [bookings] = useState<Booking[]>([
    { id: '1', childName: 'Aarav Kumar', parentName: 'Rajesh Kumar', date: '2025-11-12', time: '10:00 AM', status: 'confirmed', amount: 499 },
    { id: '2', childName: 'Arjun Sharma', parentName: 'Priya Sharma', date: '2025-11-13', time: '2:00 PM', status: 'pending', amount: 499 },
    { id: '3', childName: 'Diya Kumar', parentName: 'Rajesh Kumar', date: '2025-11-10', time: '11:00 AM', status: 'completed', amount: 499 },
  ]);

  const stats = [
    { label: 'Total Parents', value: parents.length, icon: Users, color: 'bg-primary' },
    { label: 'Child Profiles', value: childRecords.length, icon: Baby, color: 'bg-accent' },
    { label: 'Assessments Today', value: 5, icon: ClipboardList, color: 'bg-accent-blue' },
    { label: 'Pending Bookings', value: bookings.filter(b => b.status === 'pending').length, icon: Calendar, color: 'bg-warning' },
  ];

  const filteredParents = parents.filter(parent => {
    const matchesSearch = parent.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      parent.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      parent.phone.includes(searchQuery);
    const matchesFilter = filterStatus === 'all' || parent.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const filteredChildren = childRecords.filter(child =>
    child.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    child.parentName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div 
          className="relative overflow-hidden rounded-xl border border-primary/20 bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10"
          style={{
            backgroundImage: `url(${puzzlePattern})`,
            backgroundSize: '200px',
            backgroundPosition: 'right bottom',
            backgroundRepeat: 'no-repeat',
            backgroundBlendMode: 'overlay'
          }}
        >
          <Card className="border-0 bg-transparent">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center shadow-colored">
                  <Users className="w-6 h-6 text-primary-foreground" />
                </div>
                <div>
                  <CardTitle className="text-2xl">CDC Reception Dashboard</CardTitle>
                  <CardDescription className="text-base">
                    Welcome, {user?.name}! Manage parent registrations and assessments
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
          </Card>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, index) => (
            <Card key={index} className="hover:shadow-medium transition-shadow border-primary/10">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">{stat.label}</p>
                    <p className="text-3xl font-bold mt-2">{stat.value}</p>
                  </div>
                  <div className={`w-12 h-12 ${stat.color} rounded-xl flex items-center justify-center`}>
                    <stat.icon className="w-6 h-6 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Content */}
        <Card className="border-primary/10">
          <CardHeader>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5" />
                  Reception Management
                </CardTitle>
                <CardDescription>
                  View and manage parent registrations, child profiles, and bookings
                </CardDescription>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Download className="w-4 h-4 mr-2" />
                  Export
                </Button>
                <Button size="sm">
                  <Users className="w-4 h-4 mr-2" />
                  Register Parent
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {/* Search and Filter Bar */}
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search by name, email, or phone..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-full md:w-[180px]">
                  <Filter className="w-4 h-4 mr-2" />
                  <SelectValue placeholder="Filter status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Tabs */}
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="overview">Parents</TabsTrigger>
                <TabsTrigger value="children">Children</TabsTrigger>
                <TabsTrigger value="bookings">Bookings</TabsTrigger>
              </TabsList>

              {/* Parents Tab */}
              <TabsContent value="overview" className="mt-6">
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Parent Name</TableHead>
                        <TableHead>Contact</TableHead>
                        <TableHead>Children</TableHead>
                        <TableHead>Last Visit</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredParents.map((parent) => (
                        <TableRow key={parent.id}>
                          <TableCell className="font-medium">{parent.name}</TableCell>
                          <TableCell>
                            <div className="flex flex-col gap-1 text-sm">
                              <div className="flex items-center gap-1 text-muted-foreground">
                                <Mail className="w-3 h-3" />
                                {parent.email}
                              </div>
                              <div className="flex items-center gap-1 text-muted-foreground">
                                <Phone className="w-3 h-3" />
                                {parent.phone}
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>{parent.children}</TableCell>
                          <TableCell>{new Date(parent.lastVisit).toLocaleDateString()}</TableCell>
                          <TableCell>
                            <Badge variant={parent.status === 'active' ? 'default' : 'secondary'}>
                              {parent.status}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-right">
                            <Button variant="ghost" size="sm">View Details</Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </TabsContent>

              {/* Children Tab */}
              <TabsContent value="children" className="mt-6">
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Child Name</TableHead>
                        <TableHead>Age</TableHead>
                        <TableHead>Parent</TableHead>
                        <TableHead>Assessments</TableHead>
                        <TableHead>Last Assessment</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredChildren.map((child) => (
                        <TableRow key={child.id}>
                          <TableCell className="font-medium">
                            <div className="flex items-center gap-2">
                              <Baby className="w-4 h-4 text-muted-foreground" />
                              {child.name}
                              <Badge variant="outline" className="text-xs">{child.gender}</Badge>
                            </div>
                          </TableCell>
                          <TableCell>{child.age} months</TableCell>
                          <TableCell>
                            <div className="flex flex-col gap-1 text-sm">
                              <span>{child.parentName}</span>
                              <span className="text-muted-foreground text-xs">{child.parentPhone}</span>
                            </div>
                          </TableCell>
                          <TableCell>{child.assessments} completed</TableCell>
                          <TableCell>{new Date(child.lastAssessment).toLocaleDateString()}</TableCell>
                          <TableCell>
                            {child.needsConsultation ? (
                              <Badge variant="destructive" className="gap-1">
                                <AlertCircle className="w-3 h-3" />
                                Needs Consultation
                              </Badge>
                            ) : (
                              <Badge variant="default" className="gap-1 bg-success">
                                <CheckCircle className="w-3 h-3" />
                                Normal
                              </Badge>
                            )}
                          </TableCell>
                          <TableCell className="text-right">
                            <Button variant="ghost" size="sm">View Profile</Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </TabsContent>

              {/* Bookings Tab */}
              <TabsContent value="bookings" className="mt-6">
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Child</TableHead>
                        <TableHead>Parent</TableHead>
                        <TableHead>Date & Time</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {bookings.map((booking) => (
                        <TableRow key={booking.id}>
                          <TableCell className="font-medium">{booking.childName}</TableCell>
                          <TableCell>{booking.parentName}</TableCell>
                          <TableCell>
                            <div className="flex flex-col gap-1 text-sm">
                              <span>{new Date(booking.date).toLocaleDateString()}</span>
                              <span className="text-muted-foreground">{booking.time}</span>
                            </div>
                          </TableCell>
                          <TableCell className="font-semibold">₹{booking.amount}</TableCell>
                          <TableCell>
                            <Badge 
                              variant={
                                booking.status === 'completed' ? 'default' : 
                                booking.status === 'confirmed' ? 'default' :
                                booking.status === 'pending' ? 'secondary' : 'destructive'
                              }
                              className={
                                booking.status === 'completed' ? 'bg-success' :
                                booking.status === 'confirmed' ? 'bg-accent' : ''
                              }
                            >
                              {booking.status}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-right">
                            {booking.status === 'pending' && (
                              <Button variant="ghost" size="sm">Confirm</Button>
                            )}
                            {booking.status === 'confirmed' && (
                              <Button variant="ghost" size="sm">Complete</Button>
                            )}
                            {booking.status === 'completed' && (
                              <Button variant="ghost" size="sm">View Details</Button>
                            )}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
