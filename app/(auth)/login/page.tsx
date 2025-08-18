'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AuthLayout from '@/components/auth/AuthLayout';
import Input from '@/components/ui/Input';
import { login } from '@/lib/utils/api';
import { setToken } from '@/lib/utils/auth';
import { Button } from '@/components/ui/button';

export default function LoginPage() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user types
    if (errors[name as keyof typeof errors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const validateForm = () => {
    const newErrors: { email?: string; password?: string } = {};
    
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsLoading(true);

    const result = await login(formData);
    
    if (result.success) {
      const token = result.token;
      console.log(result.token)
      if (!token) {
        toast.error('Authentication token missing');
        return;
      }
      
      setToken(token, rememberMe);
      toast.success('Login successful! Redirecting...');
      router.push('/');
    } else {
      // Handle different error cases
      if (result.error.statusCode === 401) {
        toast.error('Invalid email or password');
      } else if (result.error.statusCode === 403) {
        toast.error('Please verify your email first');
      } else {
        toast.error(result.error.message || 'Login failed. Please try again.');
      }
      
      // Set field-specific errors if available in details
      if (result.error.details) {
        const apiErrors = result.error.details as Record<string, string>;
        setErrors(prev => ({
          ...prev,
          ...(apiErrors.email && { email: apiErrors.email }),
          ...(apiErrors.password && { password: apiErrors.password })
        }));
      }
    }
    
    setIsLoading(false);
  };

  return (
    <AuthLayout 
      title="Welcome Back" 
      subtitle="Enter your email and password to sign in"
    >
      <form className="space-y-6" onSubmit={handleSubmit} noValidate>
        <div className="space-y-4">
          <Input
            label="Email"
            name="email"
            type="email"
            icon={<Mail className="w-5 h-5 text-gray-400" />}
            value={formData.email}
            onChange={handleChange}
            placeholder="Your email address"
            error={errors.email}
            required
          />

          <Input
            label="Password"
            name="password"
            type={showPassword ? 'text' : 'password'}
            icon={<Lock className="w-5 h-5 text-gray-400" />}
            value={formData.password}
            onChange={handleChange}
            placeholder="Your password"
            error={errors.password}
            required
            minLength={6}
            endAdornment={
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="text-gray-400 hover:text-gray-600"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            }
          />
        </div>

        <div className="flex items-center">
          <input
            id="remember-me"
            name="remember-me"
            type="checkbox"
            checked={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)}
            className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
          />
          <label htmlFor="remember-me" className="block ml-2 text-sm text-gray-700">
            Remember me
          </label>
        </div>

        <Button 
          type="submit" 
          className="w-full" 
          disabled={isLoading}
          aria-busy={isLoading}
        >
          {isLoading ? 'Signing in...' : 'SIGN IN'}
        </Button>

        <div className="space-y-2 text-center">
          <p className="text-sm text-gray-600">
            Don&#39;t have an account?{' '}
            <a 
              href="/signup" 
              className="font-medium text-green-600 hover:text-green-500"
              aria-label="Sign up"
            >
              Sign up
            </a>
          </p>
          <p className="text-sm">
            <a 
              href="/forgot-password" 
              className="font-medium text-green-600 hover:text-green-500"
              aria-label="Forgot password"
            >
              Forgot your password?
            </a>
          </p>
        </div>
      </form>
    </AuthLayout>
  );
}