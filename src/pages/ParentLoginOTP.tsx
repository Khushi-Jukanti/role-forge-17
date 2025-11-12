import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authAPI } from '@/lib/api';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Heart, Phone } from 'lucide-react';
import { toast } from 'sonner';

export default function ParentLoginOTP() {
  const [phone, setPhone] = useState('');
  const [otp, setOTP] = useState('');
  const [step, setStep] = useState<'phone' | 'otp'>('phone');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleRequestOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await authAPI.requestOTP({ phone });
      toast.success('OTP sent to your phone! (Use 123456 for testing)');
      setStep('otp');
    } catch (error: any) {
      const message = error.response?.data?.message || 'Failed to send OTP';
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await authAPI.loginOTP({ phone, otp });
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      toast.success('Login successful!');
      navigate('/dashboard/parent');
    } catch (error: any) {
      const message = error.response?.data?.message || 'Invalid OTP';
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-muted/30 to-accent/10 p-4">
      <Card className="w-full max-w-md shadow-large">
        <CardHeader className="space-y-3 text-center">
          <div className="mx-auto w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center">
            <Heart className="w-6 h-6 text-primary-foreground" />
          </div>
          <CardTitle className="text-2xl font-bold">Parent Login</CardTitle>
          <CardDescription>Sign in with your phone number</CardDescription>
        </CardHeader>

        {step === 'phone' ? (
          <form onSubmit={handleRequestOTP}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="+1 234 567 8900"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="pl-10"
                    required
                    disabled={isLoading}
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? 'Sending OTP...' : 'Send OTP'}
              </Button>
            </CardFooter>
          </form>
        ) : (
          <form onSubmit={handleVerifyOTP}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="otp">Enter OTP</Label>
                <Input
                  id="otp"
                  type="text"
                  placeholder="123456"
                  value={otp}
                  onChange={(e) => setOTP(e.target.value)}
                  maxLength={6}
                  required
                  disabled={isLoading}
                />
                <p className="text-xs text-muted-foreground">
                  OTP sent to {phone}
                  <Button
                    type="button"
                    variant="link"
                    className="h-auto p-0 ml-2 text-xs"
                    onClick={() => setStep('phone')}
                  >
                    Change number
                  </Button>
                </p>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col space-y-4">
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? 'Verifying...' : 'Verify & Login'}
              </Button>
              <Button
                type="button"
                variant="ghost"
                className="w-full"
                onClick={handleRequestOTP}
                disabled={isLoading}
              >
                Resend OTP
              </Button>
            </CardFooter>
          </form>
        )}
      </Card>
    </div>
  );
}