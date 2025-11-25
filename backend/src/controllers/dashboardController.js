const Project = require('../models/Project');
const Task = require('../models/Task');
const ProjectCollaborator = require('../models/ProjectCollaborator');
const mongoose = require('mongoose');

const getDashboard = async (req, res) => {
  try {
    const userId = req.userId;


    const totalOwned = await Project.countDocuments({ owner_id: userId });
    const collabs = await ProjectCollaborator.find({ user_id: userId }).distinct('project_id');
    const collabCount = collabs.length;

    let projectIds = collabs.map(id => id.toString());

    const ownerProjects = await Project.find({ owner_id: userId }).select('_id');


    ownerProjects.forEach(p => {
      const pIdString = p._id.toString();
      if (!projectIds.includes(pIdString)) {
        projectIds.push(pIdString);
      }
    });

    const totalProjects = projectIds.length;
    if (totalProjects === 0) {
      return res.status(200).json({
        totalOwned: 0,
        collabCount: 0,
        totalProjects: 0,
        totalTasks: 0,
        tasksByStatus: [],
        tasksByPriority: [],
        projectsProgress: [],
      });
    }

    const projectObjectIds = projectIds.map(id => new mongoose.Types.ObjectId(id));
    const totalTasks = await Task.countDocuments({ project_id: { $in: projectObjectIds } });

    const tasksByStatus = await Task.aggregate([
      { $match: { project_id: { $in: projectObjectIds } } },
      { $group: { _id: '$status', count: { $sum: 1 } } }
    ]);

    const tasksByPriority = await Task.aggregate([
      { $match: { project_id: { $in: projectObjectIds } } },
      { $group: { _id: '$priority', count: { $sum: 1 } } }
    ]);

    const projectsData = await Project.find({ _id: { $in: projectObjectIds } }).select('name progress');

    const projectsProgress = projectsData.map(project => ({
      name: project.name,
      progress: project.progress || 0,
    }));


    return res.status(200).json({
      totalOwned,
      collabCount,
      totalProjects,
      totalTasks,
      tasksByStatus,
      tasksByPriority,
      projectsProgress,
    });
  } catch (err) {
    console.error('getDashboard error', err);
    return res.status(500).json({ error: 'Error interno en dashboard', details: err.message });
  }
};

module.exports = { getDashboard };