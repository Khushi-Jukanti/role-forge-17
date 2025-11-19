import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Check } from 'lucide-react';
import servicesData from '@/mock/services.json';

export default function Step3Services({ data, onUpdate, onNext, onBack }) {
  const [selectedServices, setSelectedServices] = useState(data.services || []);

  const toggleService = (serviceId) => {
    setSelectedServices(prev => 
      prev.includes(serviceId) 
        ? prev.filter(id => id !== serviceId)
        : [...prev, serviceId]
    );
  };

  const handleNext = () => {
    onUpdate({ services: selectedServices });
    onNext();
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Services Offered</CardTitle>
        <p className="text-sm text-muted-foreground">Select all services your CDC provides</p>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {servicesData.map(service => (
            <div
              key={service.id}
              onClick={() => toggleService(service.id)}
              className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                selectedServices.includes(service.id)
                  ? 'border-primary bg-primary/5'
                  : 'border-border hover:border-primary/50'
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h4 className="font-semibold text-foreground">{service.name}</h4>
                  <p className="text-sm text-muted-foreground mt-1">{service.description}</p>
                </div>
                {selectedServices.includes(service.id) && (
                  <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center ml-2">
                    <Check className="w-4 h-4 text-primary-foreground" />
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-between pt-4">
          <Button variant="outline" onClick={onBack}>
            Previous
          </Button>
          <Button onClick={handleNext} disabled={selectedServices.length === 0}>
            Next
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
