// web/app/register/page.tsx
'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export default function RegisterPage() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [gender, setGender] = useState<'male' | 'female' | 'other'>('male');
  const [role, setRole] = useState<'seeker' | 'employer'>('seeker');
  const [companyName, setCompanyName] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    if (!fullName || !email || !phone || !password) {
      alert("Please fill all required fields");
      return;
    }

    setLoading(true);

    // Simulate API call
    setTimeout(() => {
      alert(`✅ Registration successful as ${role}!\n\nName: ${fullName}\nPhone: ${phone}`);
      window.location.href = '/';
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="bg-white p-10 rounded-3xl shadow-xl w-full max-w-md">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold">Create Account</h1>
          <p className="text-gray-600 mt-2">Join FindMeAJob today</p>
        </div>

        <div className="space-y-5">
          <div>
            <label className="block text-sm font-medium mb-2">Full Name</label>
            <input
              type="text"
              placeholder="Your full name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:outline-none focus:border-green-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Email Address</label>
            <input
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:outline-none focus:border-green-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Phone Number</label>
            <input
              type="tel"
              placeholder="+977 98XXXXXXXX"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:outline-none focus:border-green-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Gender</label>
            <div className="flex gap-3">
              <button
                onClick={() => setGender('male')}
                className={`flex-1 py-3 rounded-2xl font-medium ${gender === 'male' ? 'bg-green-600 text-white' : 'border border-gray-300'}`}
              >
                Male
              </button>
              <button
                onClick={() => setGender('female')}
                className={`flex-1 py-3 rounded-2xl font-medium ${gender === 'female' ? 'bg-green-600 text-white' : 'border border-gray-300'}`}
              >
                Female
              </button>
              <button
                onClick={() => setGender('other')}
                className={`flex-1 py-3 rounded-2xl font-medium ${gender === 'other' ? 'bg-green-600 text-white' : 'border border-gray-300'}`}
              >
                Other
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Register as</label>
            <div className="flex gap-3">
              <button
                onClick={() => setRole('seeker')}
                className={`flex-1 py-3 rounded-2xl font-medium ${role === 'seeker' ? 'bg-green-600 text-white' : 'border border-gray-300'}`}
              >
                Job Seeker
              </button>
              <button
                onClick={() => setRole('employer')}
                className={`flex-1 py-3 rounded-2xl font-medium ${role === 'employer' ? 'bg-green-600 text-white' : 'border border-gray-300'}`}
              >
                Employer
              </button>
            </div>
          </div>

          {role === 'employer' && (
            <div>
              <label className="block text-sm font-medium mb-2">Company Name</label>
              <input
                type="text"
                placeholder="Your Company Name"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:outline-none focus:border-green-500"
              />
            </div>
          )}

          <div>
            <label className="block text-sm font-medium mb-2">Password</label>
            <input
              type="password"
              placeholder="Create a strong password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:outline-none focus:border-green-500"
            />
          </div>

          <button
            onClick={handleRegister}
            disabled={loading}
            className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white py-4 rounded-2xl font-semibold text-lg mt-6"
          >
            {loading ? 'Creating Account...' : 'Create Account'}
          </button>
        </div>

        <p className="text-center mt-8 text-sm text-gray-600">
          Already have an account?{' '}
          <Link href="/login" className="text-green-600 font-medium hover:underline">
            Login here
          </Link>
          aafafaf;
        </p>
      </div>
    </div>
  );
}