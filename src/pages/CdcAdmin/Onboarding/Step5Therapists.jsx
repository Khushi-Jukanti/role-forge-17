import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus, User, Trash2, Award } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import servicesData from '@/mock/services.json';

export default function Step5Therapists({ data, onUpdate, onNext, onBack }) {
  const [therapists, setTherapists] = useState(data.therapists || []);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTherapist, setNewTherapist] = useState({
    fullName: '',
    specialization: '',
    email: '',
    phone: '',
    experienceYears: '',
    bio: '',
    servicesProvided: [],
    qualifications: [],
    certifications: []
  });

  const addTherapist = () => {
    if (newTherapist.fullName && newTherapist.specialization) {
      setTherapists([...therapists, { ...newTherapist, id: Date.now() }]);
      setNewTherapist({
        fullName: '',
        specialization: '',
        email: '',
        phone: '',
        experienceYears: '',
        bio: '',
        servicesProvided: [],
        qualifications: [],
        certifications: []
      });
      setIsModalOpen(false);
    }
  };

  const removeTherapist = (id) => {
    setTherapists(therapists.filter(t => t.id !== id));
  };

  const addQualification = () => {
    setNewTherapist({
      ...newTherapist,
      qualifications: [...newTherapist.qualifications, { degree: '', institute: '', year: '' }]
    });
  };

  const addCertification = () => {
    setNewTherapist({
      ...newTherapist,
      certifications: [...newTherapist.certifications, `certification_${Date.now()}.pdf`]
    });
  };

  const toggleService = (serviceId) => {
    setNewTherapist({
      ...newTherapist,
      servicesProvided: newTherapist.servicesProvided.includes(serviceId)
        ? newTherapist.servicesProvided.filter(id => id !== serviceId)
        : [...newTherapist.servicesProvided, serviceId]
    });
  };

  const handleNext = () => {
    onUpdate({ therapists });
    onNext();
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Therapists Management</CardTitle>
            <p className="text-sm text-muted-foreground">Add therapists to your CDC</p>
          </div>
          <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Add Therapist
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Add New Therapist</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Full Name *</Label>
                    <Input
                      value={newTherapist.fullName}
                      onChange={(e) => setNewTherapist({ ...newTherapist, fullName: e.target.value })}
                      placeholder="Enter full name"
                    />
                  </div>
                  <div>
                    <Label>Specialization *</Label>
                    <Select
                      value={newTherapist.specialization}
                      onValueChange={(value) => setNewTherapist({ ...newTherapist, specialization: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select specialization" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Speech Therapy">Speech Therapy</SelectItem>
                        <SelectItem value="Occupational Therapy">Occupational Therapy</SelectItem>
                        <SelectItem value="Physical Therapy">Physical Therapy</SelectItem>
                        <SelectItem value="Behavioral Therapy">Behavioral Therapy</SelectItem>
                        <SelectItem value="Special Education">Special Education</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Email</Label>
                    <Input
                      type="email"
                      value={newTherapist.email}
                      onChange={(e) => setNewTherapist({ ...newTherapist, email: e.target.value })}
                      placeholder="therapist@email.com"
                    />
                  </div>
                  <div>
                    <Label>Phone</Label>
                    <Input
                      value={newTherapist.phone}
                      onChange={(e) => setNewTherapist({ ...newTherapist, phone: e.target.value })}
                      placeholder="+91 9876543210"
                    />
                  </div>
                </div>

                <div>
                  <Label>Experience (Years)</Label>
                  <Input
                    type="number"
                    value={newTherapist.experienceYears}
                    onChange={(e) => setNewTherapist({ ...newTherapist, experienceYears: e.target.value })}
                    placeholder="5"
                  />
                </div>

                <div>
                  <Label>Bio</Label>
                  <Textarea
                    value={newTherapist.bio}
                    onChange={(e) => setNewTherapist({ ...newTherapist, bio: e.target.value })}
                    placeholder="Brief professional bio..."
                    rows={3}
                  />
                </div>

                <div>
                  <Label>Services Provided</Label>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {servicesData.map(service => (
                      <Badge
                        key={service.id}
                        variant={newTherapist.servicesProvided.includes(service.id) ? "default" : "outline"}
                        className="cursor-pointer"
                        onClick={() => toggleService(service.id)}
                      >
                        {service.name}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <Label>Qualifications</Label>
                    <Button variant="outline" size="sm" onClick={addQualification}>
                      <Plus className="w-4 h-4 mr-1" />
                      Add
                    </Button>
                  </div>
                  {newTherapist.qualifications.map((qual, index) => (
                    <div key={index} className="grid grid-cols-3 gap-2 mb-2">
                      <Input placeholder="Degree" value={qual.degree} readOnly />
                      <Input placeholder="Institute" value={qual.institute} readOnly />
                      <Input placeholder="Year" value={qual.year} readOnly />
                    </div>
                  ))}
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <Label>Certifications</Label>
                    <Button variant="outline" size="sm" onClick={addCertification}>
                      <Plus className="w-4 h-4 mr-1" />
                      Add
                    </Button>
                  </div>
                  {newTherapist.certifications.map((cert, index) => (
                    <div key={index} className="text-sm p-2 border rounded mb-1">{cert}</div>
                  ))}
                </div>

                <Button onClick={addTherapist} className="w-full">
                  Add Therapist
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {therapists.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            No therapists added yet. Click "Add Therapist" to get started.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {therapists.map(therapist => (
              <Card key={therapist.id}>
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex gap-3">
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                        <User className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-semibold">{therapist.fullName}</h4>
                        <p className="text-sm text-muted-foreground">{therapist.specialization}</p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {therapist.experienceYears} years experience
                        </p>
                        <div className="flex gap-2 mt-2">
                          <Badge variant="secondary" className="text-xs">
                            <Award className="w-3 h-3 mr-1" />
                            {therapist.qualifications.length} Qualifications
                          </Badge>
                          <Badge variant="secondary" className="text-xs">
                            {therapist.certifications.length} Certifications
                          </Badge>
                        </div>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeTherapist(therapist.id)}
                    >
                      <Trash2 className="w-4 h-4 text-destructive" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        <div className="flex items-center justify-between pt-4">
          <Button variant="outline" onClick={onBack}>
            Previous
          </Button>
          <Button onClick={handleNext}>
            Next
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
