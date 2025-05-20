const fs = require('node:fs');
const path = require('node:path');
const Resume = require('../models/Resume');

//@desc    Create a new resume
//@route   POST /api/resume
//@access  Private
const createResume = async (req, res) => {
    try {
        const { title } = req.body;

        //Default template for resume
        const defaultTemplate = {
            profileInfo: {
                profileImg: null,
                previewUrl: "",
                fullName: "",
                designation: "",
                summary: "",
            },
            contactInfo: {
                email: "",
                phone: "",
                location: "",
                linkedin: "",
                github: "",
                website: "",
            },
            workExperience: [
                {
                    company: "",
                    role: "",
                    startDate: "",
                    endDate: "",
                    description: "",
                }
            ],
            education: [
                {
                    degree: "",
                    institution: "",
                    startDate: "",
                    endDate: "",
                }
            ],
            skills: [
                {
                    skill: "",
                    progress: 0,
                }
            ],
            projects: [
                {
                    title: "",
                    description: "",
                    github: "",
                    liveDemo: "",
                }
            ],
            certifications: [
                {
                    title: "",
                    issuer: "",
                    year: "",
                }
            ],
            languages: [
                {
                    name: "",
                    progress: 0,
                }
            ],
            interests: [""],
        };

        // Create a new resume instance
        const newResume = await Resume.create({
            userId : req.user._id,
            title, 
            ...defaultTemplate,
        });

        res.status(201).json(newResume);

    } catch (error) {
        res.status(500).json({ message: 'Error creating resume', error: error.message });
    }
};

//@desc    Get all resumes for the logged-in user
//@route   GET /api/resume
//@access  Private
const getUserResumes = async (req, res) => {
    try {
        const resumes = await Resume.find({ userId: req.user._id }).sort({ updatedAt: -1});
        res.status(200).json(resumes);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching resumes', error: error.message });
    }
};

//@desc    Get a specific resume by ID
//@route   GET /api/resume/:id
//@access  Private
const getResumeById = async (req, res) => {
    try {
        const resume = await Resume.findById({_id: req.params.id, userId: req.user._id});
        if (!resume) {
            return res.status(404).json({ message: 'Resume not found' });
        }
        res.status(200).json(resume);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching resume', error: error.message });
    }
};

//@desc    Update a specific resume by ID
//@route   PUT /api/resume/:id
//@access  Private
const updateResume = async (req, res) => {
    try {
        const resume = await Resume.findOne({
            _id: req.params.id,
            userId: req.user._id,
        });

        
        if (!resume) {
            return res.status(404).json({ message: 'Resume not found' });
        }

        //Merge updates from req.body into existing resume
        Object.assign(resume, req.body);

        //Save the updated resume
        const savedResume = await resume.save();

        res.status(200).json(savedResume);

    } catch (error) {
        res.status(500).json({ message: 'Error updating resume', error: error.message });
    }
};

//@desc    Delete a specific resume by ID
//@route   DELETE /api/resume/:id
//@access  Private
const deleteResume = async (req, res) => {
    try {
        const resume = await Resume.findOne({
            _id: req.params.id,
            userId: req.user._id
        });
        if (!resume) {
            return res.status(404).json({ message: 'Resume not found' });
        }

        // Delete thumbnailLink and profilePreviewUrl images from uploads folder
        const uploadsFolder = path.join(__dirname, '..' ,'uploads');
        const baseUrl = `${req.protocol}://${req.get('host')}`;

        if(resume.thumbnailLink) {
            const oldThumbnail = path.join(uploadsFolder, path.basename(resume.thumbnailLink));
            if(fs.existsSync(oldThumbnail)) fs.unlinkSync(oldThumbnail);
        }
        if(resume.profileInfo?.profilePreviewUrl){
            const oldProfile = path.join(uploadsFolder, path.basename(resume.profileInfo.profilePreviewUrl));
            if(fs.existsSync(oldProfile)) fs.unlinkSync(oldProfile);
        }

        const deleted = await Resume.findOneAndDelete({
            _id: req.params.id,
            userId: req.user._id
        })
        if(!deleted) {
            return res.status(404).json({ message: 'Resume not found' });
        }
        res.json({ message: 'Resume deleted successfully' });
 

        res.status(200).json({ message: 'Resume deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting resume', error: error.message });
    }
};

module.exports = {
    createResume,
    getUserResumes,
    getResumeById,
    updateResume,
    deleteResume,
};