'use client';
import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AuthLayout from '@/components/auth/AuthLayout';
import { verifyEmail } from '@/lib/utils/api';
import { setToken } from '@/lib/utils/auth';
import { Button } from '@/components/ui/button';

export default function VerifyEmailPage() {
  const { token } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [isSuccess, setIsSuccess] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const verify = async () => {
      try {
        const response = await verifyEmail(token as string);
        if (response.data && response.data.token) {
          const authToken = response.data.token;
          setToken(authToken);
          setIsSuccess(true);
          toast.success('Email verified successfully!');
        } else {
          throw new Error('Invalid response from server.');
        }
      } catch (error: unknown) {
        const errorMessage =
          error instanceof Error
            ? error.message
            : 'Email verification failed. Please try again.';
        toast.error(errorMessage);
      } finally {
        setIsLoading(false);
      }
    };

    verify();
  }, [token]);

  return (
    <AuthLayout 
      title="Email Verification" 
      subtitle={isLoading ? 'Verifying your email...' : isSuccess ? 'Success!' : 'Verification failed'}
    >
      <div className="text-center space-y-6">
        {isLoading ? (
          <div className="py-8">
            <div className="w-12 h-12 mx-auto border-4 border-green-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : isSuccess ? (
          <>
            <div className="w-16 h-16 mx-auto bg-green-100 rounded-full flex items-center justify-center">
              <svg className="w-10 h-10 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
            </div>
            <Button onClick={() => router.push('/dashboard')} className="w-full">
              Go to Dashboard
            </Button>
          </>
        ) : (
          <>
            <div className="w-16 h-16 mx-auto bg-red-100 rounded-full flex items-center justify-center">
              <svg className="w-10 h-10 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </div>
            <Button onClick={() => router.push('/signup')} className="w-full">
              Try Again
            </Button>
          </>
        )}
      </div>
    </AuthLayout>
  );
}