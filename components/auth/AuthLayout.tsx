import { ReactNode } from 'react';
import BrandingSection from './BrandingSection';

interface AuthLayoutProps {
  children: ReactNode;
  title: string;
  subtitle: string;
}

export default function AuthLayout({ children, title, subtitle }: AuthLayoutProps) {
  return (
    <div className="flex min-h-screen">
      {/* Left side - Form */}
      <div className="flex items-center justify-center flex-1 px-4 py-8 bg-gray-50 lg:px-8">
        <div className="w-full max-w-md space-y-8">
          {/* Mobile Logo */}
          <div className="mb-8 text-center lg:hidden">
            <div className="inline-flex items-center justify-center w-16 h-16 mb-4 bg-green-500 rounded-full">
              <span className="text-xl font-bold text-white">2.S</span>
            </div>
            <h1 className="text-2xl font-bold text-gray-900">24/7 SMAGR1IADE</h1>
          </div>

          <div className="space-y-6">
            <div className="text-center lg:text-left">
              <h2 className="mb-2 text-3xl font-bold text-gray-900">{title}</h2>
              <p className="text-gray-600">{subtitle}</p>
            </div>
            {children}
          </div>
        </div>
      </div>

      {/* Right side - Branding */}
      <BrandingSection />
    </div>
  );
}