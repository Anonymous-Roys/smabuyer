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

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await forgotPassword(email);
      toast.success('Password reset email sent! Please check your inbox.');
      router.push('/login');
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(error.message || 'Failed to send reset email. Please try again.');
      } else {
        toast.error('Failed to send reset email. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout 
      title="Forgot Password" 
      subtitle="Enter your email to reset your password"
    >
      <form className="space-y-6" onSubmit={handleSubmit}>
        <Input
          label="Email"
          type="email"
          icon={<Mail className="w-5 h-5 text-gray-400" />}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Your email address"
          required
        />

        <Button 
          type="submit"
          disabled={isLoading}
          className="w-full"
        >
          {isLoading ? 'SENDING...' : 'SEND RESET LINK'}
        </Button>

        <div className="text-center">
          <p className="text-sm text-gray-600">
            Remember your password?{' '}
            <a href="/login" className="font-medium text-green-600 hover:text-green-500">
              Sign in
            </a>
          </p>
        </div>
      </form>
    </AuthLayout>
  );
}