import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';
import {
  Building2, MapPin, Mail, Phone, FileText, Award, Users, Calendar,
  Star, CheckCircle, XCircle, Ban, ArrowLeft, Clock, Image as ImageIcon
} from 'lucide-react';
import cdcsData from '@/mock/cdcs.json';
import servicesData from '@/mock/services.json';
import schedulesData from '@/mock/schedules.json';
import DashboardLayout from '@/components/DashboardLayout';
import { toast } from 'sonner';

export default function CdcDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [selectedTherapist, setSelectedTherapist] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const cdc = cdcsData.find(c => c.id === parseInt(id));

  if (!cdc) {
    return (
      <DashboardLayout>
        <div className="text-center py-12">
          <Building2 className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">CDC Not Found</h3>
          <Button onClick={() => navigate('/superadmin/cdc-centers')}>
            Back to CDC List
          </Button>
        </div>
      </DashboardLayout>
    );
  }

  const getServiceName = (serviceId) => {
    const service = servicesData.find(s => s.id === serviceId);
    return service?.name || serviceId;
  };

  const therapistSchedules = schedulesData.filter(s => 
    cdc.therapists.some(t => t.id === s.therapistId)
  );

  const handleVerify = () => {
    toast.success('CDC verified successfully!');
  };

  const handleReject = () => {
    toast.error('CDC rejected');
  };

  const handleSuspend = () => {
    toast.warning('CDC suspended');
  };

  const openTherapistModal = (therapist) => {
    setSelectedTherapist(therapist);
    setIsModalOpen(true);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="outline" size="icon" onClick={() => navigate('/superadmin/cdc-centers')}>
              <ArrowLeft className="w-4 h-4" />
            </Button>
            <div>
              <h1 className="text-3xl font-bold">{cdc.name}</h1>
              <p className="text-muted-foreground">Complete CDC Information</p>
            </div>
          </div>
          <Badge variant={cdc.verificationStatus === 'Verified' ? 'default' : 'secondary'}>
            {cdc.verificationStatus}
          </Badge>
        </div>

        {/* Basic Info */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Building2 className="w-5 h-5 text-primary" />
              <CardTitle>Basic Information</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-muted-foreground">CDC Name</p>
              <p className="font-medium">{cdc.name}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Owner Name</p>
              <p className="font-medium">{cdc.ownerName}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Email</p>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-muted-foreground" />
                <p className="font-medium">{cdc.email}</p>
              </div>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Phone</p>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-muted-foreground" />
                <p className="font-medium">{cdc.phone}</p>
              </div>
            </div>
            <div className="col-span-2">
              <p className="text-sm text-muted-foreground">Description</p>
              <p className="font-medium">{cdc.description}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Years of Experience</p>
              <p className="font-medium">{cdc.yearsOfExperience} years</p>
            </div>
          </CardContent>
        </Card>

        {/* Address */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <MapPin className="w-5 h-5 text-primary" />
              <CardTitle>Address</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="font-medium">
              {cdc.address.line1}, {cdc.address.line2}<br />
              {cdc.address.city}, {cdc.address.state} - {cdc.address.pincode}
            </p>
            <div className="mt-4 h-48 bg-muted rounded-lg flex items-center justify-center">
              <MapPin className="w-8 h-8 text-muted-foreground" />
              <span className="ml-2 text-muted-foreground">Map Placeholder</span>
            </div>
          </CardContent>
        </Card>

        {/* License & Certificates */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <FileText className="w-5 h-5 text-primary" />
              <CardTitle>License & Certificates</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-sm text-muted-foreground">License Number</p>
              <p className="font-medium">{cdc.license.number}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-2">Documents</p>
              <div className="space-y-2">
                {cdc.license.documents.map((doc, index) => (
                  <div key={index} className="flex items-center gap-2 p-2 border rounded">
                    <FileText className="w-4 h-4 text-primary" />
                    <span className="text-sm">{doc}</span>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Services Offered */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Award className="w-5 h-5 text-primary" />
              <CardTitle>Services Offered</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {cdc.services.map(serviceId => (
                <Badge key={serviceId} variant="secondary" className="text-sm px-3 py-1">
                  {getServiceName(serviceId)}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Photos */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <ImageIcon className="w-5 h-5 text-primary" />
              <CardTitle>CDC Photos</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {cdc.photos.map((photo, index) => (
                <div key={index} className="aspect-square rounded-lg bg-muted flex items-center justify-center border">
                  <ImageIcon className="w-8 h-8 text-muted-foreground" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Therapists */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5 text-primary" />
              <CardTitle>Therapist List ({cdc.therapists.length})</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {cdc.therapists.map(therapist => (
                <Card key={therapist.id} className="cursor-pointer hover:shadow-md transition-shadow"
                  onClick={() => openTherapistModal(therapist)}>
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                        <Users className="w-6 h-6 text-primary" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold">{therapist.fullName}</h4>
                        <p className="text-sm text-muted-foreground">{therapist.specialization}</p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {therapist.experienceYears} years experience
                        </p>
                        <div className="flex items-center gap-1 mt-2">
                          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          <span className="text-sm font-medium">{therapist.rating}</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Schedules */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-primary" />
              <CardTitle>Schedules Overview</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {cdc.therapists.map(therapist => {
                const therapistSlots = therapistSchedules.filter(s => s.therapistId === therapist.id);
                if (therapistSlots.length === 0) return null;

                return (
                  <div key={therapist.id} className="border rounded-lg p-4">
                    <h4 className="font-semibold mb-3">{therapist.fullName}</h4>
                    <div className="grid grid-cols-7 gap-2">
                      {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(day => (
                        <div key={day} className="text-center">
                          <p className="text-xs font-medium text-muted-foreground mb-2">{day}</p>
                          {therapistSlots
                            .filter(s => s.day === day)
                            .map((slot, idx) => (
                              <div key={idx} className="text-xs p-1 bg-primary/10 rounded mb-1">
                                {slot.startTime}-{slot.endTime}
                              </div>
                            ))}
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Reviews */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Star className="w-5 h-5 text-primary" />
              <CardTitle>Parent Reviews</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {cdc.reviews.map((review, index) => (
                <div key={index} className="border-b last:border-b-0 pb-4 last:pb-0">
                  <div className="flex items-center justify-between mb-2">
                    <p className="font-semibold">{review.parentName}</p>
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < review.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">{review.comment}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Admin Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Admin Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-4">
              <Button onClick={handleVerify} className="flex-1">
                <CheckCircle className="w-4 h-4 mr-2" />
                Verify CDC
              </Button>
              <Button variant="destructive" onClick={handleReject} className="flex-1">
                <XCircle className="w-4 h-4 mr-2" />
                Reject
              </Button>
              <Button variant="outline" onClick={handleSuspend} className="flex-1">
                <Ban className="w-4 h-4 mr-2" />
                Suspend
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Therapist Detail Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          {selectedTherapist && (
            <>
              <DialogHeader>
                <DialogTitle>{selectedTherapist.fullName}</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Specialization</p>
                    <p className="font-medium">{selectedTherapist.specialization}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Experience</p>
                    <p className="font-medium">{selectedTherapist.experienceYears} years</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Email</p>
                    <p className="font-medium">{selectedTherapist.email}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Phone</p>
                    <p className="font-medium">{selectedTherapist.phone}</p>
                  </div>
                </div>

                <Separator />

                <div>
                  <p className="text-sm text-muted-foreground mb-2">Bio</p>
                  <p className="text-sm">{selectedTherapist.bio}</p>
                </div>

                <div>
                  <p className="text-sm text-muted-foreground mb-2">Services Provided</p>
                  <div className="flex flex-wrap gap-2">
                    {selectedTherapist.servicesProvided.map(serviceId => (
                      <Badge key={serviceId} variant="secondary">
                        {getServiceName(serviceId)}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="text-sm text-muted-foreground mb-2">Qualifications</p>
                  <div className="space-y-2">
                    {selectedTherapist.qualifications.map((qual, index) => (
                      <div key={index} className="p-3 border rounded">
                        <p className="font-medium">{qual.degreeName}</p>
                        <p className="text-sm text-muted-foreground">
                          {qual.institute} • {qual.yearOfCompletion}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="text-sm text-muted-foreground mb-2">Certifications</p>
                  <div className="space-y-2">
                    {selectedTherapist.certifications.map((cert, index) => (
                      <div key={index} className="flex items-center gap-2 p-2 border rounded">
                        <Award className="w-4 h-4 text-primary" />
                        <span className="text-sm">{cert}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
}
