'use client'

import { Register } from '@/lib/actions';
import React from 'react';

const RegisterPage: React.FC = () => {
  // const [firstName, setFirstName] = useState<string>('');
  // const [lastName, setLastName] = useState<string>('');
  // const [email, setEmail] = useState<string>('');
  // const [password, setPassword] = useState<string>('');
  // const [confirmPassword, setConfirmPassword] = useState<string>('');

  const handleSubmit = async (formData: FormData) => {
    // e.preventDefault();
    const {password, confirmPassword} = {
      password: formData.get("password"),
      confirmPassword: formData.get("confirmPassword")
    }

    if (password !== confirmPassword) {
      alert('Passwords do not match!');
      return;
    }

    Register(undefined, formData);
  };

  return (
    <div className="flex justify-center items-center min-h-max py-20 bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold mb-4">Create Account</h1>
        <form action={handleSubmit} className="space-y-4">
          {/* <input
            type="text"
            placeholder="First Name"
            name='firstName'
            id='firstName'
            // value={firstName}
            // onChange={(e) => setFirstName(e.target.value)}
            required
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          /> */}
          <input
            type="text"
            placeholder="Username"
            name='username'
            id='username'
            // value={lastName}
            // onChange={(e) => setLastName(e.target.value)}
            required
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="email"
            placeholder="Email"
            name='email'
            id='email'
            // value={email}
            // onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="password"
            placeholder="Password"
            name='password'
            id='password'
            // value={password}
            // onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="password"
            placeholder="Confirm Password"
            name='confirmPassword'
            id='confirmPassword'
            // value={confirmPassword}
            // onChange={(e) => setConfirmPassword(e.target.value)}
            required
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="w-full bg-azure-900 text-white py-2 px-4 rounded-lg hover:bg-azure-700 transition duration-300"
          >
            Create Account
          </button>
        </form>
        <p className="mt-4 text-sm">
          Already have an account? <a href="/login" className="text-blue-500 underline">Login</a>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
