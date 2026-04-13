// web/app/page.tsx
'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export default function Home() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('All');

  const jobs = [
    { id: 1, title: "Frontend Developer", company: "Tech Nepal", location: "Kathmandu", salary: "45,000 - 70,000 NPR", type: "Full-time", posted: "2h ago" },
    { id: 2, title: "Digital Marketing", company: "Himalaya Ads", location: "Pokhara", salary: "30,000 - 50,000 NPR", type: "Full-time", posted: "1d ago" },
    { id: 3, title: "Node.js Developer", company: "Cloud Nepal", location: "Lalitpur", salary: "60,000 - 90,000 NPR", type: "Full-time", posted: "5h ago" },
  ];

  const filteredJobs = jobs.filter(j => 
    j.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    j.company.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white border-b sticky top-0">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-600 rounded-2xl flex items-center justify-center text-white font-bold text-2xl">J</div>
            <h1 className="text-2xl font-bold">FindMeAJob</h1>
          </div>
          <div className="flex gap-6">
            <Link href="/login" className="font-medium">Login</Link>
            <Link href="/register" className="font-medium">Register</Link>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-6 py-12">
        <h1 className="text-5xl font-bold text-center mb-4">Find your dream job</h1>
        <p className="text-center text-xl text-gray-600 mb-12">Browse latest openings in Nepal</p>

        <div className="flex gap-4 mb-8">
          <input
            type="text"
            placeholder="Search job title or company"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 px-6 py-4 border rounded-2xl"
          />
          <select value={selectedLocation} onChange={(e) => setSelectedLocation(e.target.value)} className="px-6 py-4 border rounded-2xl">
            <option value="All">All Locations</option>
            <option value="Kathmandu">Kathmandu</option>
            <option value="Pokhara">Pokhara</option>
            <option value="Lalitpur">Lalitpur</option>
          </select>
        </div>

        <div className="space-y-6">
          {filteredJobs.map(job => (
            <div key={job.id} className="bg-white border rounded-3xl p-6 hover:shadow-md cursor-pointer">
              <div className="flex justify-between">
                <div>
                  <h3 className="text-xl font-semibold">{job.title}</h3>
                  <p className="text-gray-600">{job.company}</p>
                </div>
                <div className="text-right">
                  <p className="font-medium text-green-600">{job.salary}</p>
                  <p className="text-sm text-gray-500">{job.posted}</p>
                </div>
              </div>
              <p className="mt-4 text-gray-500">📍 {job.location} • {job.type}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}