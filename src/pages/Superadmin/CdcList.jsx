import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Building2, MapPin, Users, Search, CheckCircle, Clock, AlertCircle } from 'lucide-react';
import cdcsData from '@/mock/cdcs.json';
import servicesData from '@/mock/services.json';
import DashboardLayout from '@/components/DashboardLayout';

export default function CdcList() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  const getStatusColor = (status) => {
    switch (status) {
      case 'Verified':
        return 'default';
      case 'Pending':
        return 'secondary';
      case 'Suspended':
        return 'destructive';
      default:
        return 'outline';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Verified':
        return <CheckCircle className="w-4 h-4" />;
      case 'Pending':
        return <Clock className="w-4 h-4" />;
      case 'Suspended':
        return <AlertCircle className="w-4 h-4" />;
      default:
        return null;
    }
  };

  const getServiceIcon = (serviceId) => {
    const service = servicesData.find(s => s.id === serviceId);
    return service?.icon || '🔹';
  };

  const filteredCdcs = cdcsData.filter(cdc =>
    cdc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cdc.address.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cdc.address.state.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">CDC Centers</h1>
            <p className="text-muted-foreground">Manage and view all registered CDCs</p>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="text-lg px-4 py-2">
              Total: {cdcsData.length} CDCs
            </Badge>
          </div>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
          <Input
            placeholder="Search by CDC name, city, or state..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* CDC Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCdcs.map(cdc => (
            <Card
              key={cdc.id}
              className="cursor-pointer hover:shadow-lg transition-all hover:scale-105"
              onClick={() => navigate(`/superadmin/cdc-centers/${cdc.id}`)}
            >
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Building2 className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{cdc.name}</CardTitle>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground mt-1">
                        <MapPin className="w-3 h-3" />
                        {cdc.address.city}, {cdc.address.state}
                      </div>
                    </div>
                  </div>
                  <Badge variant={getStatusColor(cdc.verificationStatus)} className="flex items-center gap-1">
                    {getStatusIcon(cdc.verificationStatus)}
                    {cdc.verificationStatus}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground line-clamp-2">{cdc.description}</p>

                {/* Services */}
                <div className="flex flex-wrap gap-2">
                  {cdc.services.slice(0, 3).map(serviceId => (
                    <Badge key={serviceId} variant="outline" className="text-xs">
                      {getServiceIcon(serviceId)} {servicesData.find(s => s.id === serviceId)?.name}
                    </Badge>
                  ))}
                  {cdc.services.length > 3 && (
                    <Badge variant="outline" className="text-xs">
                      +{cdc.services.length - 3} more
                    </Badge>
                  )}
                </div>

                {/* Therapists Count */}
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Users className="w-4 h-4" />
                  <span>{cdc.therapists.length} Therapists</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredCdcs.length === 0 && (
          <div className="text-center py-12">
            <Building2 className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No CDCs Found</h3>
            <p className="text-muted-foreground">Try adjusting your search criteria</p>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
