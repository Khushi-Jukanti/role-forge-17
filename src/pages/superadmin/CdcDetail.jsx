import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, Building2, MapPin, Phone, Mail, User, FileText, 
  CheckCircle, Clock, XCircle, Shield, Star, Calendar, Award
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';
import cdcsData from '@/mock/cdcs.json';
import therapistsData from '@/mock/therapists.json';
import schedulesData from '@/mock/schedules.json';
import servicesData from '@/mock/services.json';

export default function CdcDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [selectedTherapist, setSelectedTherapist] = useState(null);

  const cdc = cdcsData.find(c => c.id === id);
  const cdcTherapists = therapistsData.filter(t => t.cdcId === id);

  if (!cdc) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg text-muted-foreground">CDC not found</p>
      </div>
    );
  }

  const getVerificationIcon = (status) => {
    switch(status) {
      case 'Verified': return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'Pending': return <Clock className="w-5 h-5 text-yellow-600" />;
      case 'Suspended': return <XCircle className="w-5 h-5 text-red-600" />;
      default: return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Back Button */}
        <Button 
          variant="ghost" 
          onClick={() => navigate('/dashboard/super-admin/cdcs')}
          className="gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to CDC List
        </Button>

        {/* Header with Status */}
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div>
            <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-[#F28C38] via-[#73C2A5] to-[#21B3D3] bg-clip-text text-transparent">
              {cdc.name}
            </h1>
            <div className="flex items-center gap-2 text-muted-foreground">
              <MapPin className="w-4 h-4" />
              <span>{cdc.address.city}, {cdc.address.state}</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            {getVerificationIcon(cdc.verificationStatus)}
            <span className="text-lg font-semibold">{cdc.verificationStatus}</span>
          </div>
        </div>

        {/* Photo Gallery */}
        <Card>
          <CardHeader>
            <CardTitle>Center Photos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {cdc.photos.map((photo, idx) => (
                <div key={idx} className="aspect-video rounded-lg overflow-hidden">
                  <img src={photo} alt={`CDC ${idx + 1}`} className="w-full h-full object-cover hover:scale-110 transition-transform duration-300" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left Column - Main Info */}
          <div className="lg:col-span-2 space-y-6">
            {/* Basic Info */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building2 className="w-5 h-5 text-[#F28C38]" />
                  Basic Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Description</label>
                  <p className="mt-1">{cdc.description}</p>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Owner Name</label>
                    <p className="mt-1 flex items-center gap-2">
                      <User className="w-4 h-4 text-[#73C2A5]" />
                      {cdc.ownerName}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Years of Experience</label>
                    <p className="mt-1">{cdc.yearsOfExperience} years</p>
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Email</label>
                    <p className="mt-1 flex items-center gap-2">
                      <Mail className="w-4 h-4 text-[#21B3D3]" />
                      {cdc.email}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Phone</label>
                    <p className="mt-1 flex items-center gap-2">
                      <Phone className="w-4 h-4 text-[#FFD39A]" />
                      {cdc.phone}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Address */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-[#21B3D3]" />
                  Address
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <p>{cdc.address.line1}</p>
                {cdc.address.line2 && <p>{cdc.address.line2}</p>}
                <p>{cdc.address.city}, {cdc.address.state} - {cdc.address.pincode}</p>
                <div className="mt-4 h-48 bg-muted rounded-lg flex items-center justify-center">
                  <MapPin className="w-8 h-8 text-muted-foreground" />
                  <span className="ml-2 text-muted-foreground">Map Placeholder</span>
                </div>
              </CardContent>
            </Card>

            {/* Therapists */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="w-5 h-5 text-[#73C2A5]" />
                  Therapists ({cdcTherapists.length})
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  {cdcTherapists.map(therapist => (
                    <Card 
                      key={therapist.id} 
                      className="cursor-pointer hover:shadow-lg transition-shadow"
                      onClick={() => setSelectedTherapist(therapist)}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-start gap-3">
                          <img 
                            src={therapist.profilePhoto} 
                            alt={therapist.fullName}
                            className="w-16 h-16 rounded-full object-cover"
                          />
                          <div className="flex-1 min-w-0">
                            <h4 className="font-semibold truncate">{therapist.fullName}</h4>
                            <p className="text-sm text-muted-foreground">{therapist.specialization}</p>
                            <div className="flex items-center gap-2 mt-2">
                              <Badge variant="outline" className="text-xs">
                                {therapist.experienceYears} yrs
                              </Badge>
                              <div className="flex items-center gap-1">
                                <Star className="w-3 h-3 fill-[#FFD39A] text-[#FFD39A]" />
                                <span className="text-xs">{therapist.rating}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Reviews */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Star className="w-5 h-5 text-[#FFD39A]" />
                  Parent Reviews
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {cdc.reviews.map(review => (
                  <div key={review.id} className="border-b last:border-0 pb-4 last:pb-0">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <p className="font-semibold">{review.parentName}</p>
                        <div className="flex items-center gap-1 mt-1">
                          {[...Array(5)].map((_, i) => (
                            <Star 
                              key={i} 
                              className={`w-4 h-4 ${i < review.rating ? 'fill-[#FFD39A] text-[#FFD39A]' : 'text-gray-300'}`}
                            />
                          ))}
                        </div>
                      </div>
                      <span className="text-sm text-muted-foreground">{review.date}</span>
                    </div>
                    <p className="text-sm text-muted-foreground">{review.comment}</p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Services, License, Actions */}
          <div className="space-y-6">
            {/* Services */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Services Offered</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {cdc.services.map((service, idx) => {
                    const serviceData = servicesData.find(s => s.name === service);
                    return (
                      <Badge 
                        key={idx}
                        variant="outline"
                        style={{ borderColor: serviceData?.color || '#F28C38' }}
                      >
                        {service}
                      </Badge>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            {/* License */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <FileText className="w-5 h-5 text-[#F28C38]" />
                  License & Documents
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">License Number</label>
                  <p className="mt-1 font-mono text-sm">{cdc.license.number}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Documents</label>
                  <div className="mt-2 space-y-2">
                    {cdc.license.documents.map((doc, idx) => (
                      <div key={idx} className="flex items-center gap-2 p-2 bg-muted rounded">
                        <FileText className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm">{doc}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Admin Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Shield className="w-5 h-5 text-[#73C2A5]" />
                  Admin Actions
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button className="w-full bg-green-600 hover:bg-green-700">
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Verify CDC
                </Button>
                <Button variant="outline" className="w-full border-red-600 text-red-600 hover:bg-red-50">
                  <XCircle className="w-4 h-4 mr-2" />
                  Reject CDC
                </Button>
                <Button variant="outline" className="w-full">
                  <Clock className="w-4 h-4 mr-2" />
                  Suspend CDC
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Therapist Modal */}
      <Dialog open={!!selectedTherapist} onOpenChange={() => setSelectedTherapist(null)}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          {selectedTherapist && (
            <>
              <DialogHeader>
                <DialogTitle className="text-2xl">Therapist Details</DialogTitle>
              </DialogHeader>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <img 
                    src={selectedTherapist.profilePhoto} 
                    alt={selectedTherapist.fullName}
                    className="w-24 h-24 rounded-full object-cover"
                  />
                  <div className="flex-1">
                    <h3 className="text-xl font-bold">{selectedTherapist.fullName}</h3>
                    <p className="text-muted-foreground">{selectedTherapist.specialization}</p>
                    <div className="flex items-center gap-4 mt-2">
                      <Badge variant="outline">{selectedTherapist.experienceYears} years exp</Badge>
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 fill-[#FFD39A] text-[#FFD39A]" />
                        <span className="font-semibold">{selectedTherapist.rating}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <Separator />

                <div>
                  <h4 className="font-semibold mb-2">Contact</h4>
                  <div className="space-y-1 text-sm">
                    <p className="flex items-center gap-2">
                      <Mail className="w-4 h-4" />
                      {selectedTherapist.email}
                    </p>
                    <p className="flex items-center gap-2">
                      <Phone className="w-4 h-4" />
                      {selectedTherapist.phone}
                    </p>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">Bio</h4>
                  <p className="text-sm text-muted-foreground">{selectedTherapist.bio}</p>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">Services Provided</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedTherapist.servicesProvided.map((service, idx) => (
                      <Badge key={idx} variant="outline">{service}</Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-2 flex items-center gap-2">
                    <Award className="w-4 h-4" />
                    Qualifications
                  </h4>
                  <div className="space-y-2">
                    {selectedTherapist.qualifications.map((qual, idx) => (
                      <div key={idx} className="p-3 bg-muted rounded-lg">
                        <p className="font-medium">{qual.degreeName}</p>
                        <p className="text-sm text-muted-foreground">{qual.institute}</p>
                        <p className="text-xs text-muted-foreground">Year: {qual.yearOfCompletion}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">Certifications</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedTherapist.certifications.map((cert, idx) => (
                      <Badge key={idx} className="bg-[#73C2A5] hover:bg-[#73C2A5]/90">{cert}</Badge>
                    ))}
                  </div>
                </div>

                {/* Schedule */}
                {schedulesData.find(s => s.therapistId === selectedTherapist.id) && (
                  <div>
                    <h4 className="font-semibold mb-3 flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      Weekly Schedule
                    </h4>
                    <div className="space-y-2">
                      {Object.entries(schedulesData.find(s => s.therapistId === selectedTherapist.id)).map(([day, slots]) => {
                        if (day === 'id' || day === 'therapistId' || day === 'therapistName' || day === 'cdcId') return null;
                        if (!slots || slots.length === 0) return null;
                        
                        return (
                          <div key={day} className="p-2 bg-muted rounded">
                            <p className="font-medium text-sm capitalize mb-1">{day}</p>
                            <div className="flex flex-wrap gap-1">
                              {slots.map(slot => (
                                <Badge 
                                  key={slot.id} 
                                  variant="outline" 
                                  className={`text-xs ${slot.status === 'Booked' ? 'bg-red-100 border-red-300' : 'bg-green-100 border-green-300'}`}
                                >
                                  {slot.startTime}-{slot.endTime}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
