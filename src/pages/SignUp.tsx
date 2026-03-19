import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Card } from '../components/ui/Card';
import { FileText, Info, RefreshCw, Shield, Zap, Lock } from 'lucide-react';

export function SignUpPage() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    mobile: '',
    password: '',
    verification: ''
  });
  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    const key = id === 'signupEmail' ? 'email' : (id === 'signupPassword' ? 'password' : id);
    setFormData(prev => ({ ...prev, [key]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const { fullName, email, password, verification } = formData;
    if (!fullName || !email || !password || !verification) {
      toast.error('Please fill in all required fields');
      return;
    }

    if (verification.toLowerCase() !== 'a7b2k') {
      toast.error('Invalid verification code');
      return;
    }

    // Mock registration logic
    toast.success('Account created successfully!');
    navigate('/login');
  };

  return (
    <div className="auth-page min-h-screen">
      <Card className="max-w-md p-8">
        <div className="top-bar">
          <div className="brand">
            <div className="logo-icon small">
                <FileText size={16} />
            </div>
            <span className="brand-text">PDF Remover</span>
          </div>
          <Button
            variant="secondary"
            className="size-8 p-0 rounded-full flex items-center justify-center"
            onClick={() => toast.success('PDF Remover Professional v1.0')}
          >
            <Info size={16} />
          </Button>
        </div>

        <div className="auth-box">
          <h2 className="auth-heading center">Create Account</h2>
          <p className="auth-subtext center">Join us to manage your PDFs effortlessly</p>

          <form className="auth-form" onSubmit={handleSubmit}>
            <Input
              label="Full Name"
              type="text"
              id="fullName"
              placeholder="John Doe"
              value={formData.fullName}
              onChange={handleInputChange}
              required
            />

            <Input
              label="Email Address"
              type="email"
              id="signupEmail"
              placeholder="name@example.com"
              value={formData.email}
              onChange={handleInputChange}
              required
            />

            <Input
              label="Mobile Number"
              type="tel"
              id="mobile"
              placeholder="+1 (555) 000-0000"
              value={formData.mobile}
              onChange={handleInputChange}
            />

            <Input
              label="Password"
              type="password"
              id="signupPassword"
              placeholder="********"
              value={formData.password}
              onChange={handleInputChange}
              required
            />

            <div className="form-group">
              <label htmlFor="verification">VERIFICATION</label>
              <div className="captcha-box">
                <span className="captcha-text">A 7 b 2 K</span>
                <button
                  type="button"
                  className="refresh-captcha p-1 hover:bg-white/10 rounded-lg transition-colors"
                  onClick={() => toast('Captcha refreshed')}
                >
                  <RefreshCw size={14} />
                </button>
              </div>
              <input
                type="text"
                id="verification"
                placeholder="Type characters seen above"
                value={formData.verification}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-brand-light/50 border border-brand-light rounded-xl text-brand-dark placeholder:text-brand-dark/30 focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary transition-all duration-200"
              />
            </div>

            <div className="checkbox-row">
              <input type="checkbox" id="terms" required className="size-4 rounded border-brand-light text-brand-primary focus:ring-brand-primary" />
              <label htmlFor="terms" className="text-xs text-brand-dark/60">
                I agree to the <Link to="#">Terms & Conditions</Link> and <Link to="#">Privacy Policy</Link>
              </label>
            </div>

            <Button type="submit" size="xl" className="w-full">
              Create Account
            </Button>
          </form>

          <p className="auth-switch">
            Already have an account? <Link to="/login">Log In</Link>
          </p>
        </div>

        <div className="feature-row">
          <div className="feature-item">
            <div className="feature-icon mb-1">
                <Shield size={20} className="text-brand-primary" />
            </div>
            <span>SAFE</span>
          </div>
          <div className="feature-item">
            <div className="feature-icon mb-1">
                <Zap size={20} className="text-brand-primary" />
            </div>
            <span>FAST</span>
          </div>
          <div className="feature-item">
            <div className="feature-icon mb-1">
                <Lock size={20} className="text-brand-primary" />
            </div>
            <span>PRIVATE</span>
          </div>
        </div>

        <p className="auth-footer-text">Professional PDF Management Tools</p>
      </Card>
    </div>
  );
}