// web/app/page.tsx
'use client';

import React, { useState } from 'react';

interface Job {
  id: number;
  title: string;
  company: string;
  location: string;
  salary: string;
  type: string;
  posted: string;
  logo: string;
  description: string;
}

export default function JobPortal() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [isLoginMode, setIsLoginMode] = useState(true);

  // Form States
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [gender, setGender] = useState<'male' | 'female' | 'other'>('male');
  const [role, setRole] = useState<'seeker' | 'employer'>('seeker');

  // Filters
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('All');
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);

  const jobs: Job[] = [
    { id: 1, title: "Frontend Developer", company: "Tech Nepal Pvt Ltd", location: "Kathmandu", salary: "40,000 - 65,000 NPR", type: "Full-time", posted: "2 hours ago", logo: "💼", description: "React, Tailwind CSS development." },
    { id: 2, title: "Digital Marketing Executive", company: "Himalaya Marketing", location: "Pokhara", salary: "28,000 - 45,000 NPR", type: "Full-time", posted: "1 day ago", logo: "📢", description: "Social media and SEO." },
    { id: 3, title: "Node.js Backend Developer", company: "Cloud Solutions Nepal", location: "Lalitpur", salary: "55,000 - 85,000 NPR", type: "Full-time", posted: "5 hours ago", logo: "💻", description: "Build scalable APIs." },
  ];

  const filteredJobs = jobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) || job.company.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLocation = selectedLocation === 'All' || job.location === selectedLocation;
    const matchesType = selectedTypes.length === 0 || selectedTypes.includes(job.type);
    return matchesSearch && matchesLocation && matchesType;
  });

  const toggleType = (type: string) => {
    setSelectedTypes(prev => prev.includes(type) ? prev.filter(t => t !== type) : [...prev, type]);
  };

  const handleApply = (job: Job) => {
    if (!isLoggedIn) {
      alert("You need to login to apply.");
      setShowAuthModal(true);
    } else {
      alert(`✅ Application submitted for "${job.title}"`);
    }
  };

  const handleAuth = () => {
    if (!email || !password) {
      alert("Email and Password are required");
      return;
    }

    const user = {
      name: fullName || email.split('@')[0],
      email,
      role,
      phone,
      gender
    };

    setCurrentUser(user);
    setIsLoggedIn(true);
    setShowAuthModal(false);
    alert(`✅ ${isLoginMode ? 'Login' : 'Registration'} successful as ${role}!`);
  };

  const logout = () => {
    setIsLoggedIn(false);
    setCurrentUser(null);
  };

  // If logged in, show role-based dashboard
  if (isLoggedIn) {
    return (
      <div className="min-h-screen bg-gray-50 p-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-10">
            <div>
              <h1 className="text-4xl font-bold">Welcome back, {currentUser.name}!</h1>
              <p className="text-green-600 font-medium">You are logged in as <strong>{currentUser.role}</strong></p>
            </div>
            <button onClick={logout} className="bg-red-600 text-white px-6 py-3 rounded-2xl">Logout</button>
          </div>

          {currentUser.role === 'seeker' ? (
            // Seeker Dashboard
            <div>
              <h2 className="text-2xl font-semibold mb-6">Recommended Jobs for You</h2>
              <div className="grid gap-6">
                {jobs.map(job => (
                  <div key={job.id} className="bg-white p-6 rounded-3xl border">
                    <h3 className="text-xl font-semibold">{job.title}</h3>
                    <p className="text-gray-600">{job.company} • {job.location}</p>
                    <p className="text-green-600 font-medium mt-2">{job.salary}</p>
                    <button onClick={() => handleApply(job)} className="mt-4 bg-green-600 text-white px-6 py-2 rounded-xl">
                      Apply Now
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            // Employer Dashboard
            <div>
              <h2 className="text-2xl font-semibold mb-6">Employer Dashboard</h2>
              <p className="text-lg">Welcome! You can post jobs and manage applications here.</p>
              <div className="mt-8 bg-white p-8 rounded-3xl border">
                <p className="text-xl font-medium">Post a New Job</p>
                <button className="mt-4 bg-blue-600 text-white px-8 py-3 rounded-2xl">
                  + Create New Job Posting
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  // Public Home Page (Before Login)
  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-600 rounded-2xl flex items-center justify-center text-white font-bold text-2xl">J</div>
            <h1 className="text-2xl font-bold">FindMeAJob</h1>
          </div>
          <button onClick={() => setShowAuthModal(true)} className="bg-green-600 text-white px-6 py-2.5 rounded-2xl font-medium">
            Login / Register
          </button>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-6 py-20 text-center">
        <h1 className="text-6xl font-bold mb-6">Find your dream job in Nepal</h1>
        <p className="text-2xl text-gray-600 mb-12">Browse thousands of opportunities</p>
        <button onClick={() => setShowAuthModal(true)} className="bg-green-600 text-white text-xl px-12 py-4 rounded-3xl">
          Get Started
        </button>
      </div>

      {/* Auth Modal */}
      {showAuthModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="bg-white rounded-3xl p-8 w-full max-w-md">
            <h2 className="text-2xl font-bold text-center mb-6">
              {isLoginMode ? 'Login' : 'Create Account'}
            </h2>

            <div className="space-y-4">
              {!isLoginMode && (
                <input type="text" placeholder="Full Name" value={fullName} onChange={(e) => setFullName(e.target.value)} className="w-full px-4 py-3 border rounded-2xl" />
              )}

              <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full px-4 py-3 border rounded-2xl" />

              <input type="tel" placeholder="Phone Number" value={phone} onChange={(e) => setPhone(e.target.value)} className="w-full px-4 py-3 border rounded-2xl" />

              <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full px-4 py-3 border rounded-2xl" />

              {!isLoginMode && (
                <div>
                  <p className="text-sm mb-2">Gender</p>
                  <div className="flex gap-3">
                    <button onClick={() => setGender('male')} className={`flex-1 py-3 rounded-2xl ${gender === 'male' ? 'bg-green-600 text-white' : 'border'}`}>Male</button>
                    <button onClick={() => setGender('female')} className={`flex-1 py-3 rounded-2xl ${gender === 'female' ? 'bg-green-600 text-white' : 'border'}`}>Female</button>
                    <button onClick={() => setGender('other')} className={`flex-1 py-3 rounded-2xl ${gender === 'other' ? 'bg-green-600 text-white' : 'border'}`}>Other</button>
                  </div>
                </div>
              )}

              {!isLoginMode && (
                <div>
                  <p className="text-sm mb-2">I am a</p>
                  <div className="flex gap-3">
                    <button onClick={() => setRole('seeker')} className={`flex-1 py-3 rounded-2xl ${role === 'seeker' ? 'bg-green-600 text-white' : 'border'}`}>Job Seeker</button>
                    <button onClick={() => setRole('employer')} className={`flex-1 py-3 rounded-2xl ${role === 'employer' ? 'bg-green-600 text-white' : 'border'}`}>Employer</button>
                  </div>
                </div>
              )}

              <button onClick={handleAuth} className="w-full bg-green-600 text-white py-4 rounded-2xl font-semibold mt-6">
                {isLoginMode ? 'Login' : 'Create Account'}
              </button>
            </div>

            <button onClick={() => setShowAuthModal(false)} className="mt-6 text-gray-500 w-full">Close</button>
          </div>
        </div>
      )}
    </div>
  );
}