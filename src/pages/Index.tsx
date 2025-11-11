import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Heart, Users, GraduationCap, MessageCircle, Shield, Baby } from 'lucide-react';
import logo from '@/assets/logo.jpg';
import puzzlePattern from '@/assets/puzzle.jpg';

export default function Index() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      {/* Hero Section */}
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img src={logo} alt="ManoSetu" className="w-10 h-10 object-contain" />
            <span className="text-2xl font-bold bg-gradient-to-r from-primary via-accent to-accent-blue bg-clip-text text-transparent">
              ManoSetu
            </span>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" asChild>
              <Link to="/login">Login</Link>
            </Button>
            <Button asChild>
              <Link to="/register">Get Started</Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Content */}
      <section 
        className="container mx-auto px-4 py-20 text-center relative"
        style={{
          backgroundImage: `url(${puzzlePattern})`,
          backgroundSize: '250px',
          backgroundPosition: 'center',
          backgroundRepeat: 'repeat',
          backgroundBlendMode: 'overlay'
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-secondary/10 to-accent/5 -z-10" />
        <div className="max-w-3xl mx-auto space-y-6 relative z-10">
          <div className="flex justify-center mb-6">
            <img src={logo} alt="ManoSetu Logo" className="w-24 h-24 object-contain drop-shadow-lg" />
          </div>
          <h1 className="text-5xl font-bold leading-tight bg-gradient-to-r from-primary via-accent to-accent-blue bg-clip-text text-transparent">
            Bridging Hearts, Building Minds
          </h1>
          <p className="text-xl text-muted-foreground">
            Connect with expert therapists, track your child's progress, and access quality developmental assessments — all in one place.
          </p>
          <div className="flex gap-4 justify-center pt-4">
            <Button size="lg" asChild className="shadow-colored">
              <Link to="/register">Start Free Assessment</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link to="/parent-login">Login with OTP</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">How We Help</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <Card className="border-primary/20">
            <CardHeader>
              <Heart className="w-12 h-12 text-primary mb-4" />
              <CardTitle>For Parents</CardTitle>
              <CardDescription>
                Track milestones, complete assessments, and book expert consultations for your child's development
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-secondary/20">
            <CardHeader>
              <Users className="w-12 h-12 text-secondary mb-4" />
              <CardTitle>CDC Centres</CardTitle>
              <CardDescription>
                Manage therapists, track sessions, and provide comprehensive care through our platform
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-accent/20">
            <CardHeader>
              <GraduationCap className="w-12 h-12 text-accent mb-4" />
              <CardTitle>Training Hub</CardTitle>
              <CardDescription>
                Access courses, certifications, and continuous learning for therapists and caregivers
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="bg-muted/30 py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl font-bold">Why Choose Us?</h2>
              <div className="space-y-4">
                <div className="flex gap-4">
                  <Shield className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold mb-1">Verified Experts</h3>
                    <p className="text-muted-foreground">All therapists and doctors are verified professionals</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <MessageCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold mb-1">Community Support</h3>
                    <p className="text-muted-foreground">Connect with other parents and share experiences</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <Heart className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold mb-1">Comprehensive Care</h3>
                    <p className="text-muted-foreground">From assessment to therapy — we've got you covered</p>
                  </div>
                </div>
              </div>
              <Button size="lg" asChild>
                <Link to="/register">Join Today</Link>
              </Button>
            </div>
            <div className="relative">
              <div className="aspect-square bg-gradient-to-br from-primary/20 to-secondary/20 rounded-3xl flex items-center justify-center">
                <Baby className="w-48 h-48 text-primary/40" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <div className="max-w-2xl mx-auto space-y-6">
          <h2 className="text-4xl font-bold">Ready to Get Started?</h2>
          <p className="text-xl text-muted-foreground">
            Join thousands of parents who trust us for their child's developmental journey
          </p>
          <Button size="lg" asChild>
            <Link to="/register">Create Free Account</Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-card/50 backdrop-blur-sm mt-20">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <img src={logo} alt="ManoSetu" className="w-6 h-6 object-contain" />
              <span className="font-semibold">ManoSetu</span>
            </div>
            <p className="text-sm text-muted-foreground">
              © 2025 ManoSetu. Bridging Hearts, Building Minds.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
