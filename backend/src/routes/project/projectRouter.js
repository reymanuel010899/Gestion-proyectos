const express = require('express');
const { getProjectById, updateProject, getProjects, createProject, deleteProject } = require('../../controllers/project/projectController');
const authMiddleware = require('../../middleware/auth');

const router = express.Router();

router.post('/create-project', authMiddleware, createProject);
router.get('/get-project', authMiddleware, getProjects); 
router.get('/get-project-by-id', authMiddleware, getProjectById);
router.put('/update-project/:projectId', authMiddleware, updateProject);
router.delete('/delete-project/:projectId', authMiddleware, deleteProject);

module.exports = router;
