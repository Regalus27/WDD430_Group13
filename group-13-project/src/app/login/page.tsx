'use client'

import React, { useState} from 'react';
import { useActionState } from 'react';
import { authenticate } from '../../lib/actions';
import { useSearchParams } from 'next/navigation';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/';
  const [errorMessage, formAction, isPending] = useActionState(
    authenticate,
    undefined,
  );
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold mb-4">Login</h1>
        <form action={formAction} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            name='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input type="hidden" name="redirectTo" value={callbackUrl} />
          <button
            type="submit"
            className="w-full bg-azure-900 text-white py-2 px-4 rounded-lg hover:bg-azure-700 transition duration-300"
            aria-disabled={isPending}
          >
            Login
          </button>
        </form>
        <p className="mt-4 text-sm">
          Don’t have an account? <a href="/register" className="text-blue-500 underline">Create one</a>
        </p>
        <div>
          {errorMessage && (
            <>
              <p className="text-sm text-red-500">{errorMessage}</p>
            </>
          )}
        </div>
      </div>
      
    </div>
  );
};

export default LoginPage;
