import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, IndianRupee, CheckCircle } from 'lucide-react';
import { parentAPI, AssessmentResult } from '@/lib/api';
import { toast } from 'sonner';

interface BookingModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  result: AssessmentResult;
  childId: string;
  childName: string;
}

declare global {
  interface Window {
    Razorpay: any;
  }
}

export default function BookingModal({ open, onOpenChange, result, childId, childName }: BookingModalProps) {
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleBookConsultation = async () => {
    setIsProcessing(true);
    try {
      // Create Razorpay order
      const orderResponse = await parentAPI.createOrder({
        childId,
        resultId: result._id,
      });

      const { orderId, amount, key } = orderResponse.data;

      // Initialize Razorpay
      const options = {
        key: key || 'rzp_test_dummy', // Razorpay key from backend
        amount: amount * 100, // Amount in paise
        currency: 'INR',
        name: 'CDC Platform',
        description: `Consultation for ${childName}`,
        order_id: orderId,
        handler: async function (response: any) {
          try {
            // Verify payment
            await parentAPI.verifyPayment({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            });
            
            setIsSuccess(true);
            toast.success('Booking confirmed! You will be contacted shortly.');
          } catch (error) {
            toast.error('Payment verification failed');
          }
        },
        prefill: {
          name: JSON.parse(localStorage.getItem('user') || '{}').name || '',
          email: JSON.parse(localStorage.getItem('user') || '{}').email || '',
        },
        theme: {
          color: '#0891b2',
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to create booking');
    } finally {
      setIsProcessing(false);
    }
  };

  if (isSuccess) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-md">
          <div className="text-center py-8 space-y-4">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle className="w-10 h-10 text-green-600" />
            </div>
            <DialogHeader>
              <DialogTitle>Booking Confirmed!</DialogTitle>
              <DialogDescription>
                Your consultation has been booked successfully. Our team will contact you within 24 hours to schedule the appointment.
              </DialogDescription>
            </DialogHeader>
            <Button onClick={() => {
              setIsSuccess(false);
              onOpenChange(false);
            }}>
              Close
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl">Book Expert Consultation</DialogTitle>
          <DialogDescription>
            Based on the assessment results, we recommend consulting with a verified child development specialist.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Doctor Card */}
          <Card className="border-primary/20">
            <CardContent className="pt-6">
              <div className="flex gap-4">
                <div className="w-20 h-20 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center text-white text-2xl font-bold">
                  Dr
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold text-lg">Verified Specialist</h3>
                    <Badge className="bg-green-500">Verified</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">
                    Child Development & Behavioral Therapy Expert
                  </p>
                  <p className="text-sm">
                    15+ years experience • 500+ successful consultations
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Consultation Details */}
          <div className="grid grid-cols-2 gap-4">
            <Card>
              <CardContent className="pt-6 space-y-2">
                <Calendar className="w-8 h-8 text-primary mb-2" />
                <h4 className="font-semibold">Flexible Scheduling</h4>
                <p className="text-sm text-muted-foreground">
                  Available slots Mon-Sat
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6 space-y-2">
                <Clock className="w-8 h-8 text-primary mb-2" />
                <h4 className="font-semibold">45 Min Session</h4>
                <p className="text-sm text-muted-foreground">
                  Comprehensive evaluation
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Price Summary */}
          <Card className="border-accent/20 bg-accent/5">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-semibold mb-1">Consultation Fee</h4>
                  <p className="text-sm text-muted-foreground">One-time payment</p>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-1 text-2xl font-bold text-accent">
                    <IndianRupee className="w-6 h-6" />
                    499
                  </div>
                  <p className="text-xs text-muted-foreground">Inclusive of all taxes</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            <Button variant="outline" onClick={() => onOpenChange(false)} className="flex-1">
              Maybe Later
            </Button>
            <Button 
              onClick={handleBookConsultation} 
              disabled={isProcessing}
              className="flex-1"
            >
              {isProcessing ? 'Processing...' : 'Book Now - ₹499'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
