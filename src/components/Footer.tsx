import { Link } from 'react-router-dom';
import logo from '@/assets/logo.jpg';
import puzzlePattern from '@/assets/puzzle.jpg';
import { Heart, Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="relative mt-20 overflow-hidden">
      {/* Gradient background with puzzle pattern overlay */}
      <div 
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `url(${puzzlePattern})`,
          backgroundSize: '150px',
          backgroundPosition: 'center',
          backgroundRepeat: 'repeat',
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-br from-primary via-secondary to-accent" />
      
      {/* Content */}
      <div className="relative container mx-auto px-4 py-12 text-primary-foreground">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div 
                className="w-12 h-12 rounded-lg overflow-hidden bg-white/90 p-1.5"
                style={{
                  backgroundImage: `url(${puzzlePattern})`,
                  backgroundSize: '80px',
                  backgroundPosition: 'center',
                }}
              >
                <img src={logo} alt="ManoSetu" className="w-full h-full object-contain" />
              </div>
              <span className="text-2xl font-bold text-white">ManoSetu</span>
            </div>
            <p className="text-sm text-white/90">
              Bridging Hearts, Building Minds — Supporting child development with care and expertise.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-white mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm text-white/90">
              <li><Link to="/" className="hover:text-white transition-colors">Home</Link></li>
              <li><Link to="/register" className="hover:text-white transition-colors">Get Started</Link></li>
              <li><Link to="/training" className="hover:text-white transition-colors">Training Hub</Link></li>
              <li><Link to="/community" className="hover:text-white transition-colors">Community</Link></li>
            </ul>
          </div>

          {/* For Parents */}
          <div>
            <h3 className="font-semibold text-white mb-4">For Parents</h3>
            <ul className="space-y-2 text-sm text-white/90">
              <li><Link to="/parent-login" className="hover:text-white transition-colors">Parent Login</Link></li>
              <li><Link to="/register" className="hover:text-white transition-colors">Create Account</Link></li>
              <li><a href="#assessments" className="hover:text-white transition-colors">Assessments</a></li>
              <li><a href="#booking" className="hover:text-white transition-colors">Book Consultation</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-white mb-4">Contact Us</h3>
            <ul className="space-y-3 text-sm text-white/90">
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                <a href="mailto:support@manosetu.com" className="hover:text-white transition-colors">
                  support@manosetu.com
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                <a href="tel:+919876543210" className="hover:text-white transition-colors">
                  +91 98765 43210
                </a>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span>Mumbai, India</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/20">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-white/90">
            <p>© 2025 ManoSetu. All rights reserved.</p>
            <div className="flex items-center gap-2">
              <span>Made with</span>
              <Heart className="w-4 h-4 text-red-300 fill-red-300" />
              <span>for every child</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
