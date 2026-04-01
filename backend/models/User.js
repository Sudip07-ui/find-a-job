const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { 
    type: String, 
    enum: ['seeker', 'employer'], 
    required: true 
  },
  phone: String,
  isVerified: { type: Boolean, default: false },
  
  // Seeker specific fields
  education: String,
  experience: String,
  skills: [String],
  resumeUrl: String,
  profilePhoto: String,

  // Employer specific fields
  companyName: String,
  companyLogo: String,
  companyDescription: String
}, { timestamps: true });

userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

userSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('User', userSchema);