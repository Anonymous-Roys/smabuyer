'use client';
import { useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { Lock, Eye, EyeOff } from 'lucide-react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AuthLayout from '@/components/auth/AuthLayout';
import Input from '@/components/ui/Input';
import { resetPassword } from '@/lib/utils/api';
import { Button } from '@/components/ui/button';

export default function ResetPasswordPage() {
  const { token } = useParams();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    setIsLoading(true);

    try {
      const result = await resetPassword(token as string, password);
      if (result.error) {
        throw new Error(result.error.message);
      }
      toast.success('Password reset successfully! Please login with your new password.');
      router.push('/login');
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : 'Password reset failed. Please try again.';
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout 
      title="Reset Password" 
      subtitle="Enter your new password"
    >
      <form className="space-y-6" onSubmit={handleSubmit}>
        <div className="space-y-4">
          <Input
            label="New Password"
            type={showPassword ? 'text' : 'password'}
            icon={<Lock className="w-5 h-5 text-gray-400" />}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Your new password"
            required
            minLength={6}
            endAdornment={
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="text-gray-400 hover:text-gray-600"
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
            label="Confirm New Password"
            type={showPassword ? 'text' : 'password'}
            icon={<Lock className="w-5 h-5 text-gray-400" />}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm your new password"
            required
            minLength={6}
          />
        </div>

        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? 'RESETTING...' : 'RESET PASSWORD'}
        </Button>
      </form>
    </AuthLayout>
  );
}