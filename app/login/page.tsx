import AcmeLogo from '@/app/ui/acme-logo';
import LoginForm from '@/app/ui/login-form';
import { Suspense } from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Login - PayUp',
};

export default function LoginPage() {
  return (
    <main className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="relative mx-auto w-full max-w-md flex flex-col space-y-4 p-6 bg-white shadow-lg rounded-lg">
        {/* Logo Header */}
        <div className="flex h-20 md:h-28 w-full items-center justify-center rounded-lg bg-gradient-to-r from-blue-600 to-blue-500 p-4">
          <div className="w-32 md:w-36 text-white">
            <AcmeLogo />
          </div>
        </div>

        {/* Login Form */}
        <Suspense>
          <LoginForm />
        </Suspense>
      </div>
    </main>
  );
}
