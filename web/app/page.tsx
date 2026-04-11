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
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('All');
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [showPostJob, setShowPostJob] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [chatMessage, setChatMessage] = useState('');

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
      description: "Looking for experienced React developer with modern UI skills.",
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
      description: "Handle social media campaigns and content creation.",
      skills: ["Marketing", "Social Media", "SEO"]
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
      description: "Build scalable REST APIs using Node.js and MongoDB.",
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
      description: "Manage accounts, taxation and financial reporting.",
      skills: ["Accounting", "Tally", "Taxation"]
    },
    { 
      id: 5, 
      title: "UI/UX Designer", 
      company: "Creative Minds", 
      location: "Kathmandu", 
      salary: "35,000 - 55,000 NPR", 
      type: "Full-time", 
      posted: "Yesterday", 
      logo: "🎨", 
      description: "Design beautiful user interfaces for mobile and web apps.",
      skills: ["Figma", "UI/UX", "Adobe XD"]
    },
  ];

  const allSkills = ["React", "Node.js", "Tailwind", "Marketing", "Social Media", "MongoDB", "Accounting", "Figma", "JavaScript", "SEO"];

  // Filter jobs
  const filteredJobs = jobs.filter(job => {
    const matchesSearch = 
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
      job.company.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesLocation = selectedLocation === 'All' || job.location === selectedLocation;
    const matchesType = selectedTypes.length === 0 || selectedTypes.includes(job.type);
    const matchesSkill = selectedSkills.length === 0 || 
      selectedSkills.some(skill => job.skills.includes(skill));

    return matchesSearch && matchesLocation && matchesType && matchesSkill;
  });

  const toggleJobType = (type: string) => {
    if (selectedTypes.includes(type)) {
      setSelectedTypes(selectedTypes.filter(t => t !== type));
    } else {
      setSelectedTypes([...selectedTypes, type]);
    }
  };

  const toggleSkill = (skill: string) => {
    if (selectedSkills.includes(skill)) {
      setSelectedSkills(selectedSkills.filter(s => s !== skill));
    } else {
      setSelectedSkills([...selectedSkills, skill]);
    }
  };

  const handleApply = (job: Job) => {
    alert(`✅ Application submitted for "${job.title}" at ${job.company}!\n\nWe will contact you soon.`);
  };

  const sendChatMessage = () => {
    if (chatMessage.trim()) {
      alert(`Chatbot: Thank you for your message! Our team will reply soon. 😊\n\nYou said: "${chatMessage}"`);
      setChatMessage('');
    }
  };

  return (
    <div className="flex h-screen bg-gray-100 relative">
      {/* Sidebar Filters */}
      <div className="w-72 bg-white border-r p-6 overflow-y-auto">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 bg-blue-600 rounded-2xl flex items-center justify-center text-white font-bold text-2xl">J</div>
          <h1 className="text-2xl font-bold">FindMeAJob</h1>
        </div>

        <input
          type="text"
          placeholder="Search jobs or companies..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-3 border rounded-2xl focus:outline-none focus:border-blue-500 mb-6"
        />

        {/* Location */}
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

        {/* Job Type */}
        <h3 className="font-semibold mb-3">Job Type</h3>
        <div className="space-y-3 mb-8">
          {['Full-time', 'Part-time', 'Internship', 'Remote'].map(type => (
            <label key={type} className="flex items-center gap-3 cursor-pointer">
              <input 
                type="checkbox" 
                checked={selectedTypes.includes(type)}
                onChange={() => toggleJobType(type)}
                className="w-5 h-5 accent-blue-600"
              />
              <span>{type}</span>
            </label>
          ))}
        </div>

        {/* Skill Filter - New */}
        <h3 className="font-semibold mb-3">Skills</h3>
        <div className="flex flex-wrap gap-2">
          {allSkills.map(skill => (
            <button
              key={skill}
              onClick={() => toggleSkill(skill)}
              className={`px-4 py-1.5 text-sm rounded-full border transition-all ${
                selectedSkills.includes(skill) 
                  ? 'bg-blue-600 text-white border-blue-600' 
                  : 'bg-white border-gray-300 hover:bg-gray-100'
              }`}
            >
              {skill}
            </button>
          ))}
        </div>
      </div>

      {/* Job Listings */}
      <div className="flex-1 p-8 overflow-y-auto">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-semibold">
            {filteredJobs.length} Jobs Found
          </h2>
          <button 
            onClick={() => setShowPostJob(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-2xl font-medium flex items-center gap-2"
          >
            + Post a Job
          </button>
        </div>

        <div className="space-y-4">
          {filteredJobs.length > 0 ? (
            filteredJobs.map(job => (
              <div
                key={job.id}
                onClick={() => setSelectedJob(job)}
                className={`bg-white p-6 rounded-3xl border cursor-pointer hover:border-blue-400 transition-all ${selectedJob?.id === job.id ? 'border-blue-500 shadow' : 'border-gray-200'}`}
              >
                <div className="flex gap-5">
                  <div className="text-4xl flex-shrink-0">{job.logo}</div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-xl">{job.title}</h3>
                    <p className="text-gray-600">{job.company}</p>
                    <div className="flex gap-5 mt-4 text-sm text-gray-500">
                      <span>📍 {job.location}</span>
                      <span>💰 {job.salary}</span>
                      <span>🕒 {job.posted}</span>
                    </div>
                    <div className="flex flex-wrap gap-2 mt-3">
                      {job.skills.slice(0, 3).map(skill => (
                        <span key={skill} className="text-xs bg-gray-100 px-3 py-1 rounded-full">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <span className="inline-block px-4 py-1.5 bg-green-100 text-green-700 text-xs font-medium rounded-full">
                      {job.type}
                    </span>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500 py-20">No jobs found. Try changing filters.</p>
          )}
        </div>
      </div>

      {/* Job Details Panel */}
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

            <div className="space-y-8">
              <div>
                <p className="text-xs uppercase tracking-widest text-gray-500 mb-1">Salary</p>
                <p className="text-3xl font-semibold text-green-600">{selectedJob.salary}</p>
              </div>

              <div>
                <p className="text-xs uppercase tracking-widest text-gray-500 mb-1">Location</p>
                <p className="text-xl font-medium">{selectedJob.location}</p>
              </div>

              <div>
                <p className="text-xs uppercase tracking-widest text-gray-500 mb-2">Skills Required</p>
                <div className="flex flex-wrap gap-2">
                  {selectedJob.skills.map(skill => (
                    <span key={skill} className="bg-blue-100 text-blue-700 px-4 py-1 rounded-full text-sm">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <p className="text-xs uppercase tracking-widest text-gray-500 mb-2">Description</p>
                <p className="text-gray-700 leading-relaxed">{selectedJob.description}</p>
              </div>

              <button
                onClick={() => handleApply(selectedJob)}
                className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl font-semibold text-lg transition"
              >
                Apply Now
              </button>
            </div>
          </div>
        ) : (
          <div className="h-full flex items-center justify-center text-gray-400 text-center">
            <p>Select a job from the list to see details</p>
          </div>
        )}
      </div>

      {/* Floating Chat Bot Button */}
      <button
        onClick={() => setShowChat(!showChat)}
        className="fixed bottom-6 right-6 w-14 h-14 bg-blue-600 hover:bg-blue-700 text-white rounded-full flex items-center justify-center shadow-lg text-2xl z-50"
      >
        💬
      </button>

      {/* Chat Bot Modal */}
      {showChat && (
        <div className="fixed bottom-24 right-6 w-80 bg-white rounded-3xl shadow-2xl border z-50 overflow-hidden">
          <div className="bg-blue-600 text-white p-4 flex justify-between items-center">
            <h3>Job Assistant Chatbot</h3>
            <button onClick={() => setShowChat(false)} className="text-xl">×</button>
          </div>
          <div className="h-80 p-4 overflow-y-auto bg-gray-50">
            <p className="text-gray-500 text-sm">Hello! How can I help you today? Ask me about jobs, salary, or application process.</p>
          </div>
          <div className="p-4 border-t flex gap-2">
            <input
              type="text"
              value={chatMessage}
              onChange={(e) => setChatMessage(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 border rounded-2xl px-4 py-3 focus:outline-none"
              onKeyPress={(e) => e.key === 'Enter' && sendChatMessage()}
            />
            <button 
              onClick={sendChatMessage}
              className="bg-blue-600 text-white px-6 rounded-2xl"
            >
              Send
            </button>
          </div>
        </div>
      )}

      {/* Post Job Modal */}
      {showPostJob && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="bg-white rounded-3xl p-8 w-full max-w-lg">
            <h2 className="text-2xl font-bold mb-4">Post a New Job</h2>
            <p className="text-gray-600 mb-8">This feature will be fully connected to your backend soon.</p>
            <button 
              onClick={() => setShowPostJob(false)}
              className="w-full py-3 bg-gray-800 text-white rounded-2xl font-medium"
            >
              Close
              ijnnpnipn
            </button>
          </div>
        </div>
      )}
    </div>
  );
}