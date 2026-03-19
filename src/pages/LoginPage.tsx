import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Card } from '../components/ui/Card';
import { FileText, Fingerprint, Heart } from 'lucide-react';

export function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!email || !password) {
            toast.error('Please fill in all fields');
            return;
        }

        // Mock authentication logic
        toast.success('Successfully logged in!');
        navigate('/');
    };

    return (
        <div className="auth-page min-h-screen">
            <Card className="max-w-md p-8">
                <div className="auth-logo">
                    <div className="logo-icon">
                        <FileText size={24} />
                    </div>
                    <h1 className="auth-title">PDF Remover</h1>
                </div>

                <div className="auth-box">
                    <h2 className="auth-heading">Welcome Back</h2>
                    <p className="auth-subtext">Please enter your details to sign in.</p>

                    <form className="auth-form" onSubmit={handleSubmit}>
                        <Input
                            label="Email Address"
                            type="email"
                            id="email"
                            placeholder="name@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />

                        <Input
                            label="Password"
                            type="password"
                            id="password"
                            placeholder="********"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            labelAside={
                                <Link to="#" className="forgot-link">
                                    Forgot Password?
                                </Link>
                            }
                        />

                        <Button type="submit" size="xl" className="w-full">
                            Sign In
                        </Button>
                    </form>

                    <p className="auth-switch">
                        Don't have an account? <Link to="/signup">Sign Up</Link>
                    </p>
                </div>

                <div className="touch-id-section">
                    <Button
                        variant="secondary"
                        className="w-full py-3 flex items-center justify-center gap-2"
                        onClick={() => toast('Touch ID is not available in demo')}
                    >
                        <Fingerprint size={20} />
                        <span>Sign in with Touch ID</span>
                    </Button>
                </div>

                <div className="auth-footer-text flex items-center justify-center gap-1">
                    <span>MADE WITH</span>
                    <Heart size={12} className="text-red-500 fill-current" />
                    <span>USING REACT + VITE</span>
                </div>
            </Card>
        </div>
    );
}
