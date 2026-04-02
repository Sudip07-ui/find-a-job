const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
  title: { 
    type: String, 
    required: true 
  },
  companyName: { 
    type: String, 
    required: true 
  },
  description: { 
    type: String, 
    required: true 
  },
  location: { 
    type: String, 
    required: true 
  },
  salary: {
    min: Number,
    max: Number,
    currency: { type: String, default: 'NPR' }
  },
  jobType: { 
    type: String, 
    enum: ['full-time', 'part-time', 'internship', 'remote'], 
    required: true 
  },
  experienceLevel: { 
    type: String, 
    enum: ['entry', 'mid', 'senior'] 
  },
  requirements: [String],
  skills: [String],
  deadline: Date,
  postedBy: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  isActive: { 
    type: Boolean, 
    default: true 
  }
}, { 
  timestamps: true 
});

module.exports = mongoose.model('Job', jobSchema);