import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Building2, MapPin, Users, Star, Shield, CheckCircle, Clock, XCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import cdcsData from '@/mock/cdcs.json';
import servicesData from '@/mock/services.json';

export default function CdcList() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCdcs = cdcsData.filter(cdc => 
    cdc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    cdc.address.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
    cdc.address.state.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getVerificationIcon = (status) => {
    switch(status) {
      case 'Verified':
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'Pending':
        return <Clock className="w-5 h-5 text-yellow-600" />;
      case 'Suspended':
        return <XCircle className="w-5 h-5 text-red-600" />;
      default:
        return null;
    }
  };

  const getVerificationColor = (status) => {
    switch(status) {
      case 'Verified':
        return 'bg-green-100 text-green-800 border-green-300';
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'Suspended':
        return 'bg-red-100 text-red-800 border-red-300';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-[#F28C38] via-[#73C2A5] to-[#21B3D3] bg-clip-text text-transparent">
            CDC Centers
          </h1>
          <p className="text-muted-foreground">Manage and monitor all Child Development Centers</p>
        </div>

        {/* Search */}
        <div className="mb-6">
          <Input
            type="text"
            placeholder="Search by name, city, or state..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="max-w-md"
          />
        </div>

        {/* CDC Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCdcs.map((cdc) => (
            <Card 
              key={cdc.id}
              className="hover:shadow-xl transition-all duration-300 cursor-pointer border-2 hover:border-primary/50 group"
              onClick={() => navigate(`/dashboard/super-admin/cdc/${cdc.id}`)}
            >
              {/* CDC Photo */}
              <div className="relative h-48 overflow-hidden rounded-t-lg">
                <img 
                  src={cdc.photos[0]} 
                  alt={cdc.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute top-3 right-3 flex items-center gap-2 bg-white/95 backdrop-blur px-3 py-1.5 rounded-full">
                  {getVerificationIcon(cdc.verificationStatus)}
                  <span className="text-sm font-medium">{cdc.verificationStatus}</span>
                </div>
              </div>

              <CardHeader className="pb-3">
                <div className="flex items-start justify-between gap-2">
                  <CardTitle className="text-xl line-clamp-2 group-hover:text-primary transition-colors">
                    {cdc.name}
                  </CardTitle>
                  <Badge className={`${getVerificationColor(cdc.verificationStatus)} border flex-shrink-0`}>
                    <Shield className="w-3 h-3 mr-1" />
                    {cdc.verificationStatus}
                  </Badge>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                {/* Location */}
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <MapPin className="w-4 h-4 text-[#21B3D3] flex-shrink-0" />
                  <span className="line-clamp-1">{cdc.address.city}, {cdc.address.state}</span>
                </div>

                {/* Description */}
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {cdc.description}
                </p>

                {/* Services */}
                <div className="flex flex-wrap gap-1.5">
                  {cdc.services.slice(0, 3).map((service, idx) => {
                    const serviceData = servicesData.find(s => s.name === service);
                    return (
                      <Badge 
                        key={idx} 
                        variant="outline" 
                        className="text-xs"
                        style={{ borderColor: serviceData?.color || '#F28C38' }}
                      >
                        {service}
                      </Badge>
                    );
                  })}
                  {cdc.services.length > 3 && (
                    <Badge variant="outline" className="text-xs">
                      +{cdc.services.length - 3}
                    </Badge>
                  )}
                </div>

                {/* Stats */}
                <div className="flex items-center justify-between pt-3 border-t">
                  <div className="flex items-center gap-1.5">
                    <Users className="w-4 h-4 text-[#73C2A5]" />
                    <span className="text-sm font-medium">{cdc.therapistCount} Therapists</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-[#FFD39A] text-[#FFD39A]" />
                    <span className="text-sm font-medium">{cdc.rating}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredCdcs.length === 0 && (
          <div className="text-center py-12">
            <Building2 className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
            <p className="text-lg text-muted-foreground">No CDCs found matching your search.</p>
          </div>
        )}
      </div>
    </div>
  );
}
