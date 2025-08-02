import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { isAuthenticated } from '@/lib/utils/auth';

export function useRequireAuth(redirectUrl = '/login') {
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated()) {
      router.push(redirectUrl);
    }
  }, [router, redirectUrl]);
}

export function useRequireGuest(redirectUrl = '/') {
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated()) {
      router.push(redirectUrl);
    }
  }, [router, redirectUrl]);
}