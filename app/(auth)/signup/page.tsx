'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AuthLayout from '@/components/auth/AuthLayout';
import Input from '@/components/ui/Input';
import { Button } from '@/components/ui/button';
import { signup } from '@/lib/utils/api';

export default function SignupPage() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<{
    email?: string;
    password?: string;
    confirmPassword?: string;
  }>({});
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
    const newErrors: typeof errors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsLoading(true);

    try {
      const response = await signup({
        email: formData.email,
        password: formData.password,
        passwordConfirm: formData.confirmPassword
      });

      if (response.success) {
        toast.success(response.data?.message || 'Signup successful! Please check your email for verification.');
        router.push('/login');
      } else {
        // Handle API validation errors
        if (response.error?.details) {
          const apiErrors = response.error.details as Record<string, string>;
          setErrors(prev => ({
            ...prev,
            ...(apiErrors.email && { email: apiErrors.email }),
            ...(apiErrors.password && { password: apiErrors.password })
          }));
        }

        toast.error(
          response.error?.message || 
          (response.error?.statusCode === 409 
            ? 'This email is already registered. Please use a different email or login.'
            : 'Signup failed. Please try again.')
        );
      }
    } catch (error: unknown) {
      console.error('Signup error:', error);
      toast.error('An unexpected error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout 
      title="Create an Account" 
      subtitle="Enter your details to get started"
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

          <Input
            label="Confirm Password"
            name="confirmPassword"
            type={showPassword ? 'text' : 'password'}
            icon={<Lock className="w-5 h-5 text-gray-400" />}
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="Confirm your password"
            error={errors.confirmPassword}
            required
            minLength={6}
          />
        </div>

        <Button 
          type="submit" 
          className="w-full" 
          disabled={isLoading}
          aria-busy={isLoading}
        >
          {isLoading ? 'Creating account...' : 'SIGN UP'}
        </Button>

        <div className="text-center">
          <p className="text-sm text-gray-600">
            Already have an account?{' '}
            <a 
              href="/login" 
              className="font-medium text-green-600 hover:text-green-500"
              aria-label="Sign in"
            >
              Sign in
            </a>
          </p>
        </div>
      </form>
    </AuthLayout>
  );
}