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
  skills: string[];
}

export default function JobPortal() {
  // Auth States
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [isLoginMode, setIsLoginMode] = useState(true);

  // Form States
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<'seeker' | 'employer'>('seeker');

  // Filters
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('All');
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);

  const jobs: Job[] = [
    { 
      id: 1, 
      title: "Frontend Developer", 
      company: "Tech Nepal Pvt Ltd", 
      location: "Kathmandu", 
      salary: "40,000 - 60,000 NPR", 
      type: "Full-time", 
      posted: "2 days ago", 
      logo: "💼", 
      description: "React + Tailwind developer needed.", 
      skills: ["React", "Tailwind", "JavaScript"] 
    },
    { 
      id: 2, 
      title: "Digital Marketing Executive", 
      company: "Himalaya Marketing", 
      location: "Pokhara", 
      salary: "25,000 - 40,000 NPR", 
      type: "Full-time", 
      posted: "1 day ago", 
      logo: "📢", 
      description: "Social media and campaign expert needed.", 
      skills: ["Marketing", "SEO", "Social Media"] 
    },
    { 
      id: 3, 
      title: "Node.js Backend Developer", 
      company: "Cloud Solutions Nepal", 
      location: "Lalitpur", 
      salary: "50,000 - 80,000 NPR", 
      type: "Full-time", 
      posted: "5 hours ago", 
      logo: "💻", 
      description: "Build scalable REST APIs.", 
      skills: ["Node.js", "MongoDB", "Express"] 
    },
    { 
      id: 4, 
      title: "Accountant", 
      company: "Shrestha Trading", 
      location: "Bharatpur", 
      salary: "30,000 - 45,000 NPR", 
      type: "Full-time", 
      posted: "3 days ago", 
      logo: "📊", 
      description: "Handle accounts and taxation.", 
      skills: ["Accounting", "Tally"] 
    },
  ];

  const allSkills = ["React", "Node.js", "Tailwind", "Marketing", "SEO", "MongoDB", "Accounting", "Figma", "JavaScript"];

  // Apply Filters
  const filteredJobs = jobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         job.company.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLocation = selectedLocation === 'All' || job.location === selectedLocation;
    const matchesType = selectedTypes.length === 0 || selectedTypes.includes(job.type);
    const matchesSkill = selectedSkills.length === 0 || selectedSkills.some(s => job.skills.includes(s));

    return matchesSearch && matchesLocation && matchesType && matchesSkill;
  });

  const toggleType = (type: string) => {
    setSelectedTypes(prev => prev.includes(type) ? prev.filter(t => t !== type) : [...prev, type]);
  };

  const toggleSkill = (skill: string) => {
    setSelectedSkills(prev => prev.includes(skill) ? prev.filter(s => s !== skill) : [...prev, skill]);
  };

  // Handle Apply Button
  const handleApply = (job: Job) => {
    if (!isLoggedIn) {
      alert("You need to login or register to apply for this job.");
      setShowAuthModal(true);
    } else {
      alert(`✅ Application submitted for "${job.title}" at ${job.company}!\n\nWe will contact you soon.`);
    }
  };

  // Handle Login / Register
  const handleAuth = () => {
    if (!email || !password) {
      alert("Please fill email and password");
      return;
    }

    const user = {
      name: name || "User",
      email,
      role: role
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

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar - Filters */}
      <div className="w-72 bg-white border-r p-6 overflow-y-auto">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 bg-blue-600 rounded-2xl flex items-center justify-center text-white font-bold text-2xl">J</div>
          <h1 className="text-2xl font-bold">FindMeAJob</h1>
        </div>

        <input
          type="text"
          placeholder="Search jobs..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-3 border rounded-2xl mb-6"
        />

        <h3 className="font-semibold mb-3">Location</h3>
        <select 
          value={selectedLocation} 
          onChange={(e) => setSelectedLocation(e.target.value)}
          className="w-full p-3 border rounded-2xl mb-8"
        >
          <option value="All">All Locations</option>
          <option value="Kathmandu">Kathmandu</option>
          <option value="Pokhara">Pokhara</option>
          <option value="Lalitpur">Lalitpur</option>
          <option value="Bharatpur">Bharatpur</option>
        </select>

        <h3 className="font-semibold mb-3">Job Type</h3>
        <div className="space-y-3 mb-8">
          {['Full-time', 'Part-time', 'Internship', 'Remote'].map(type => (
            <label key={type} className="flex items-center gap-3 cursor-pointer">
              <input 
                type="checkbox" 
                checked={selectedTypes.includes(type)}
                onChange={() => toggleType(type)}
                className="accent-blue-600"
              />
              <span>{type}</span>
            </label>
          ))}
        </div>

        <h3 className="font-semibold mb-3">Skills</h3>
        <div className="flex flex-wrap gap-2">
          {allSkills.map(skill => (
            <button
              key={skill}
              onClick={() => toggleSkill(skill)}
              className={`px-4 py-1.5 text-sm rounded-full border transition-all ${
                selectedSkills.includes(skill) ? 'bg-blue-600 text-white' : 'hover:bg-gray-100'
              }`}
            >
              {skill}
            </button>
          ))}
        </div>
      </div>

      {/* Job List */}
      <div className="flex-1 p-8 overflow-y-auto">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-semibold">{filteredJobs.length} Jobs Found</h2>
        </div>

        <div className="space-y-4">
          {filteredJobs.map(job => (
            <div
              key={job.id}
              onClick={() => setSelectedJob(job)}
              className={`bg-white p-6 rounded-3xl border cursor-pointer hover:border-blue-400 transition-all ${selectedJob?.id === job.id ? 'border-blue-500 shadow' : 'border-gray-200'}`}
            >
              <div className="flex gap-5">
                <div className="text-4xl">{job.logo}</div>
                <div className="flex-1">
                  <h3 className="font-semibold text-xl">{job.title}</h3>
                  <p className="text-gray-600">{job.company}</p>
                  <div className="flex gap-5 mt-4 text-sm text-gray-500">
                    <span>📍 {job.location}</span>
                    <span>💰 {job.salary}</span>
                    <span>🕒 {job.posted}</span>
                  </div>
                </div>
                <span className="px-4 py-1.5 bg-green-100 text-green-700 text-xs font-medium rounded-full self-start">
                  {job.type}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Job Details */}
      <div className="w-96 bg-white border-l p-8 overflow-y-auto">
        {selectedJob ? (
          <div>
            <div className="flex items-center gap-4 mb-8">
              <div className="text-5xl">{selectedJob.logo}</div>
              <div>
                <h2 className="text-2xl font-bold">{selectedJob.title}</h2>
                <p className="text-gray-600">{selectedJob.company}</p>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <p className="text-sm text-gray-500">Salary</p>
                <p className="text-3xl font-semibold text-green-600">{selectedJob.salary}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Location</p>
                <p className="font-medium">{selectedJob.location}</p>
              </div>

              <button 
                onClick={() => handleApply(selectedJob)}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-2xl font-semibold text-lg transition"
              >
                Apply Now
              </button>
            </div>
          </div>
        ) : (
          <div className="h-full flex items-center justify-center text-gray-400">
            Select a job to see details
          </div>
        )}
      </div>

      {/* Login / Register Modal */}
      {showAuthModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="bg-white rounded-3xl p-8 w-full max-w-md">
            <h2 className="text-2xl font-bold text-center mb-6">
              {isLoginMode ? 'Login to Apply' : 'Create Account'}
            </h2>

            <div className="space-y-4">
              {!isLoginMode && (
                <input 
                  type="text" 
                  placeholder="Full Name" 
                  value={name} 
                  onChange={(e) => setName(e.target.value)} 
                  className="w-full px-4 py-3 border rounded-2xl" 
                />
              )}

              <input 
                type="email" 
                placeholder="Email Address" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                className="w-full px-4 py-3 border rounded-2xl" 
              />

              <input 
                type="password" 
                placeholder="Password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                className="w-full px-4 py-3 border rounded-2xl" 
              />

              {!isLoginMode && (
                <div>
                  <p className="text-sm text-gray-600 mb-2">Register as:</p>
                  <div className="flex gap-3">
                    <button 
                      onClick={() => setRole('seeker')} 
                      className={`flex-1 py-3 rounded-2xl font-medium ${role === 'seeker' ? 'bg-blue-600 text-white' : 'border'}`}
                    >
                      Job Seeker
                    </button>
                    <button 
                      onClick={() => setRole('employer')} 
                      className={`flex-1 py-3 rounded-2xl font-medium ${role === 'employer' ? 'bg-blue-600 text-white' : 'border'}`}
                    >
                      Employer
                    </button>
                  </div>
                </div>
              )}

              <button 
                onClick={handleAuth}
                className="w-full bg-blue-600 text-white py-4 rounded-2xl font-semibold mt-6"
              >
                {isLoginMode ? 'Login' : 'Create Account'}
              </button>

              <p className="text-center text-sm">
                {isLoginMode ? "Don't have an account? " : "Already have an account? "}
                <span 
                  onClick={() => setIsLoginMode(!isLoginMode)} 
                  className="text-blue-600 cursor-pointer font-medium"
                >
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