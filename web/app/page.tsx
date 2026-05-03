'use client';

import React, { useState } from 'react';

export default function JobPortal() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [isLoginMode, setIsLoginMode] = useState(true);

  // Form fields
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [role, setRole] = useState<'seeker' | 'employer'>('seeker');

  const [selectedJob, setSelectedJob] = useState<any>(null);

  const jobs = [
    { id: 1, title: "Frontend Developer", company: "Tech Nepal", location: "Kathmandu", salary: "45,000 - 70,000 NPR" },
    { id: 2, title: "Digital Marketing Executive", company: "Himalaya Ads", location: "Pokhara", salary: "30,000 - 50,000 NPR" },
    { id: 3, title: "Backend Developer", company: "Cloud Nepal", location: "Lalitpur", salary: "60,000 - 90,000 NPR" },
  ];

  const handleAuth = () => {
    if (!email || !password) {
      alert("Email and Password are required!");
      return;
    }

    const user = {
      name: fullName || "User",
      email,
      role,
      phone
    };

    setCurrentUser(user);
    setIsLoggedIn(true);
    setShowAuthModal(false);
    alert(`✅ ${isLoginMode ? "Login" : "Registration"} Successful!`);
  };

  const logout = () => {
    setIsLoggedIn(false);
    setCurrentUser(null);
  };

  if (isLoggedIn) {
    return (
      <div className="min-h-screen bg-gray-100 p-8">
        <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow p-10">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-4xl font-bold">Welcome, {currentUser.name}!</h1>
              <p className="text-green-600 text-xl">You are logged in as <strong>{currentUser.role}</strong></p>
            </div>
            <button onClick={logout} className="bg-red-500 text-white px-6 py-3 rounded-2xl">Logout</button>
          </div>

          {currentUser.role === 'seeker' ? (
            <div>
              <h2 className="text-2xl font-semibold mb-6">Recommended Jobs</h2>
              {jobs.map(job => (
                <div key={job.id} className="bg-gray-50 p-6 rounded-2xl mb-4">
                  <h3 className="font-bold text-xl">{job.title}</h3>
                  <p>{job.company} • {job.location}</p>
                  <p className="text-green-600 font-medium">{job.salary}</p>
                  <button onClick={() => alert(`Applied to ${job.title}`)} className="mt-4 bg-green-600 text-white px-8 py-3 rounded-xl">
                    Apply Now
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div>
              <h2 className="text-2xl font-semibold mb-6">Employer Dashboard</h2>
              <p className="text-lg">You can now post jobs and manage applications here.</p>
            </div>
          )}
        </div>
      </div>
    );
  }

  // Public Home Page
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-6xl font-bold mb-6">FindMeAJob</h1>
        <p className="text-2xl mb-12">Find your dream job in Nepal</p>
        <button 
          onClick={() => setShowAuthModal(true)}
          className="bg-green-600 text-white text-xl px-12 py-5 rounded-3xl font-semibold hover:bg-green-700"
        >
          Login / Register
        </button>
      </div>

      {/* Auth Modal */}
      {showAuthModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="bg-white rounded-3xl p-8 w-full max-w-md">
            <h2 className="text-2xl font-bold text-center mb-6">
              {isLoginMode ? 'Login' : 'Register'}
            </h2>

            <div className="space-y-4">
              {!isLoginMode && (
                <input type="text" placeholder="Full Name" value={fullName} onChange={e => setFullName(e.target.value)} className="w-full px-4 py-3 border rounded-2xl" />
              )}
              <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} className="w-full px-4 py-3 border rounded-2xl" />
              <input type="tel" placeholder="Phone Number" value={phone} onChange={e => setPhone(e.target.value)} className="w-full px-4 py-3 border rounded-2xl" />
              <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} className="w-full px-4 py-3 border rounded-2xl" />

              {!isLoginMode && (
                <div>
                  <p className="text-sm mb-2">Register as</p>
                  <div className="flex gap-3">
                    <button onClick={() => setRole('seeker')} className={`flex-1 py-3 rounded-2xl ${role === 'seeker' ? 'bg-green-600 text-white' : 'border'}`}>Job Seeker</button>
                    <button onClick={() => setRole('employer')} className={`flex-1 py-3 rounded-2xl ${role === 'employer' ? 'bg-green-600 text-white' : 'border'}`}>Employer</button>
                  </div>
                </div>
              )}

              <button onClick={handleAuth} className="w-full bg-green-600 text-white py-4 rounded-2xl font-semibold mt-4">
                {isLoginMode ? 'Login' : 'Create Account'}
              </button>

              <p className="text-center text-sm">
                {isLoginMode ? "No account? " : "Have an account? "}
                <span onClick={() => setIsLoginMode(!isLoginMode)} className="text-green-600 cursor-pointer font-medium">
                  {isLoginMode ? 'Register' : 'Login'}
                </span>
              </p>
            </div>

            <button onClick={() => setShowAuthModal(false)} className="mt-6 text-gray-500 w-full">Close</button>
          </div>
        </div>
      )}
    </div>
  );
}