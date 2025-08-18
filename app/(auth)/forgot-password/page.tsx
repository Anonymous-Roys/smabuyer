'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Mail } from 'lucide-react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AuthLayout from '@/components/auth/AuthLayout';
import Input from '@/components/ui/Input';
import { forgotPassword } from '@/lib/utils/api';
import { Button } from '@/components/ui/button';
import { isValidEmail } from '@/lib/validation/auth-schemas';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const validateForm = () => {
    if (!email.trim()) {
      setError('Email is required');
      return false;
    }
    
    if (!isValidEmail(email)) {
      setError('Please enter a valid email address');
      return false;
    }
    
    setError('');
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsLoading(true);

    try {
      const result = await forgotPassword(email);
      
      if (!result.success) {
        throw new Error(result.error?.message || 'Failed to send reset email');
      }
      
      toast.success('Password reset link sent! Check your email for instructions.');
      router.push('/login');
    } catch (error: unknown) {
      console.error('Forgot password error:', error);
      
      let errorMessage = 'Failed to send reset email. Please try again.';
      
      if (error instanceof Error) {
        errorMessage = error.message;
        
        // Handle specific error cases
        if (errorMessage.toLowerCase().includes('user not found')) {
          errorMessage = 'No account found with this email address';
        } else if (errorMessage.toLowerCase().includes('email')) {
          errorMessage = 'Please enter a valid email address';
        }
      }
      
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEmailChange = (value: string) => {
    setEmail(value);
    if (error) setError('');
  };

  return (
    <AuthLayout 
      title="Forgot Password" 
      subtitle="Enter your email to receive a reset link"
    >
      <form className="space-y-6" onSubmit={handleSubmit} noValidate>
        <div className="space-y-4">
          <Input
            label="Email"
            type="email"
            icon={<Mail className="w-5 h-5 text-gray-400" />}
            value={email}
            onChange={(e) => handleEmailChange(e.target.value)}
            placeholder="Your email address"
            required
            error={error}
            autoFocus
          />
        </div>

        <Button 
          type="submit"
          disabled={isLoading}
          className="w-full"
          aria-busy={isLoading}
        >
          {isLoading ? 'Sending...' : 'Send Reset Link'}
        </Button>

        <div className="text-center">
          <p className="text-sm text-gray-600">
            Remember your password?{' '}
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