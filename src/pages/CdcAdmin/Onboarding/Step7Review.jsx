import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Building2, MapPin, FileText, Users, Calendar } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import servicesData from '@/mock/services.json';

export default function Step7Review({ data, onBack }) {
  const navigate = useNavigate();

  const handleSubmit = () => {
    // Static submission - show success message
    toast.success('CDC information submitted successfully!');
    setTimeout(() => {
      navigate('/dashboard/cdc-admin');
    }, 1500);
  };

  const getServiceName = (serviceId) => {
    const service = servicesData.find(s => s.id === serviceId);
    return service?.name || serviceId;
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <CheckCircle className="w-6 h-6 text-primary" />
          <CardTitle>Review & Submit</CardTitle>
        </div>
        <p className="text-sm text-muted-foreground">Review all information before submitting</p>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Basic Information */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Building2 className="w-5 h-5 text-primary" />
            <h3 className="font-semibold">Basic Information</h3>
          </div>
          <div className="grid grid-cols-2 gap-4 pl-7">
            <div>
              <p className="text-sm text-muted-foreground">CDC Name</p>
              <p className="font-medium">{data.name || 'N/A'}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Owner Name</p>
              <p className="font-medium">{data.ownerName || 'N/A'}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Email</p>
              <p className="font-medium">{data.email || 'N/A'}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Phone</p>
              <p className="font-medium">{data.phone || 'N/A'}</p>
            </div>
            <div className="col-span-2">
              <p className="text-sm text-muted-foreground">Description</p>
              <p className="font-medium">{data.description || 'N/A'}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Years of Experience</p>
              <p className="font-medium">{data.yearsOfExperience || 'N/A'} years</p>
            </div>
          </div>
        </div>

        {/* Address */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <MapPin className="w-5 h-5 text-primary" />
            <h3 className="font-semibold">Address</h3>
          </div>
          <div className="pl-7">
            <p className="font-medium">
              {data.address?.line1}, {data.address?.line2}<br />
              {data.address?.city}, {data.address?.state} - {data.address?.pincode}
            </p>
          </div>
        </div>

        {/* Services */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-primary" />
            <h3 className="font-semibold">Services Offered</h3>
          </div>
          <div className="flex flex-wrap gap-2 pl-7">
            {data.services?.map(serviceId => (
              <Badge key={serviceId} variant="secondary">
                {getServiceName(serviceId)}
              </Badge>
            )) || <p className="text-muted-foreground">No services selected</p>}
          </div>
        </div>

        {/* License & Photos */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-primary" />
            <h3 className="font-semibold">Documents & Photos</h3>
          </div>
          <div className="grid grid-cols-2 gap-4 pl-7">
            <div>
              <p className="text-sm text-muted-foreground">License Number</p>
              <p className="font-medium">{data.license?.number || 'N/A'}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Documents</p>
              <p className="font-medium">{data.license?.documents?.length || 0} files</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Photos</p>
              <p className="font-medium">{data.photos?.length || 0} photos</p>
            </div>
          </div>
        </div>

        {/* Therapists */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Users className="w-5 h-5 text-primary" />
            <h3 className="font-semibold">Therapists</h3>
          </div>
          <div className="pl-7">
            {data.therapists?.length > 0 ? (
              <div className="space-y-2">
                {data.therapists.map(therapist => (
                  <div key={therapist.id} className="p-3 border rounded-lg">
                    <p className="font-medium">{therapist.fullName}</p>
                    <p className="text-sm text-muted-foreground">
                      {therapist.specialization} • {therapist.experienceYears} years experience
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground">No therapists added</p>
            )}
          </div>
        </div>

        {/* Schedules */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-primary" />
            <h3 className="font-semibold">Schedules</h3>
          </div>
          <div className="pl-7">
            <p className="font-medium">{data.schedules?.length || 0} time slots configured</p>
          </div>
        </div>

        <div className="flex items-center justify-between pt-6">
          <Button variant="outline" onClick={onBack}>
            Previous
          </Button>
          <Button onClick={handleSubmit} size="lg">
            <CheckCircle className="w-4 h-4 mr-2" />
            Submit CDC Information
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
