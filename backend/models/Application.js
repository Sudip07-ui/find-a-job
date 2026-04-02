const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema({
  job: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Job', 
    required: true 
  },
  applicant: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  coverLetter: String,
  status: { 
    type: String, 
    enum: ['pending', 'shortlisted', 'interview', 'rejected', 'hired'], 
    default: 'pending' 
  },
  interviewDate: Date,
  interviewMode: { 
    type: String, 
    enum: ['online', 'offline'] 
  },
  interviewLink: String
}, { 
  timestamps: true 
});

module.exports = mongoose.model('Application', applicationSchema);
