const express = require('express');
const { createResume, getUserResumes,getResumeById, updateResume, deleteResume } = require('../controllers/resumeController');
const { protect } = require('../middlewares/authMiddleware');
const {uploadResumeImages} = require('../controllers/uploadImage');

const router = express.Router();

// Resume Routes
router.post('/', protect, createResume); // Create a new resume
router.get('/', protect, getUserResumes); // Get all resumes for the logged-in user
router.get('/:id', protect, getResumeById); // Get a specific resume by ID
router.put('/:id', protect, updateResume); // Update a specific resume by ID

router.put('/:id', protect, uploadResumeImages); // Delete a specific resume by ID

router.delete('/:id', protect, deleteResume); // Delete a specific resume by ID

module.exports = router;