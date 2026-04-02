const express = require('express');
const router = express.Router();
const { 
  createJob, 
  getAllJobs, 
  getJobById, 
  getMyJobs 
} = require('../controllers/jobController');

const { protect, authorize } = require('../middleware/auth');

// Public routes
router.get('/', getAllJobs);
router.get('/:id', getJobById);

// Protected routes (require login)
router.get('/myjobs', protect, authorize('employer'), getMyJobs);
router.post('/', protect, authorize('employer'), createJob);

module.exports = router;