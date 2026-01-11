import React, { useState } from 'react';
import { Eye, EyeOff, Lock, User } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import loginBg from 'figma:asset/3382d56ca50aebdc70dd441846d9ef336f7d19ad.png';

export default function Login() {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const success = await login(email, password);
    if (!success) {
      setError('Invalid email or password');
    }
    setLoading(false);
  };

  const handleQuickLogin = (role: 'cashier' | 'admin' | 'owner') => {
    const credentials: Record<string, { email: string; password: string }> = {
      cashier: { email: 'cashier@unipos.com', password: 'cashier123' },
      admin: { email: 'admin@unipos.com', password: 'admin123' },
      owner: { email: 'owner@unipos.com', password: 'owner123' },
    };
    setEmail(credentials[role].email);
    setPassword(credentials[role].password);
  };

  return (
    <div 
      className="min-h-screen flex items-center justify-center p-4 relative"
      style={{
        background: 'linear-gradient(135deg, #5b8db8 0%, #7ba5c9 100%)',
      }}
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-1/2 -right-1/4 w-[800px] h-[800px] rounded-full bg-white/10 blur-3xl"></div>
        <div className="absolute -bottom-1/2 -left-1/4 w-[800px] h-[800px] rounded-full bg-white/10 blur-3xl"></div>
      </div>

      <div className="w-full max-w-6xl grid md:grid-cols-2 gap-8 items-center relative z-10">
        {/* Login Form */}
        <div className="glass-card rounded-3xl p-8 md:p-12 shadow-2xl">
          {/* Logo */}
          <div className="flex items-center gap-3 mb-8">
            <div className="w-14 h-14 rounded-xl bg-[#5b8db8] flex items-center justify-center">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" className="text-white">
                <rect x="4" y="4" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="2"/>
                <rect x="13" y="4" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="2"/>
                <rect x="4" y="13" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="2"/>
                <path d="M13 15h7M13 18h7" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </div>
            <div>
              <h1 className="text-3xl text-[#5b8db8] m-0">UNIPOS</h1>
              <p className="text-sm text-gray-600 m-0">Point-of-sale system</p>
            </div>
          </div>

          <h2 className="text-2xl mb-6 text-gray-800">LOGIN</h2>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Username Field */}
            <div className="space-y-2">
              <Label htmlFor="email" className="text-gray-700">Username</Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                <Input
                  id="email"
                  type="email"
                  placeholder="username"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-11 glass-input rounded-xl border-white/50 h-12"
                  required
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <Label htmlFor="password" className="text-gray-700">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-11 pr-11 glass-input rounded-xl border-white/50 h-12"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Show Password Checkbox */}
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="showPass"
                checked={showPassword}
                onChange={(e) => setShowPassword(e.target.checked)}
                className="w-4 h-4 rounded border-gray-300"
              />
              <label htmlFor="showPass" className="text-sm text-gray-600">Show Password</label>
            </div>

            {error && (
              <div className="text-destructive text-sm bg-red-50 p-3 rounded-lg">
                {error}
              </div>
            )}

            {/* Login Button */}
            <Button
              type="submit"
              disabled={loading}
              className="w-full h-12 rounded-xl bg-[#5b8db8] hover:bg-[#4a7194] text-white"
            >
              {loading ? 'Logging in...' : 'LOGIN'}
            </Button>

            {/* Admin Quick Access */}
            <Button
              type="button"
              onClick={() => handleQuickLogin('admin')}
              variant="outline"
              className="w-full h-12 rounded-xl border-[#5b8db8]/30 hover:bg-[#5b8db8]/10"
            >
              ADMIN
            </Button>

            {/* Sign Up Link */}
            <p className="text-center text-sm text-gray-600">
              Don't have an account?{' '}
              <button type="button" className="text-[#5b8db8] hover:underline">
                Sign up now!
              </button>
            </p>

            {/* Copyright */}
            <p className="text-center text-xs text-gray-500 mt-6">© 2025</p>
          </form>
        </div>

        {/* Right Side - Branding */}
        <div className="hidden md:flex items-center justify-center">
          <div className="relative">
          </div>
        </div>
      </div>
    </div>
  );
}
