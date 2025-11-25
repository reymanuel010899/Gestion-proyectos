const Project = require('../../models/Project');
const ProjectCollaborator = require('../../models/ProjectCollaborator');
const User = require('../../models/User');
const mongoose = require('mongoose');


const createProject = async (req, res) => {
  try {
    const { name, description, status } = req.body;
    const ownerId = req.userId;

    if (!name || name.trim().length < 3) {
      return res.status(400).json({
        error: "El nombre del proyecto debe tener al menos 3 caracteres."
      });
    }

    const validStatuses = ["Active", "Delivered", "Pending"];

    const finalStatus = validStatuses.includes(status)
      ? status
      : "Active";

    const newProject = await Project.create({
      owner_id: ownerId,
      name: name.trim(),
      description: description ? description.trim() : null,
      status: finalStatus
    });

    await ProjectCollaborator.create({
      project_id: newProject._id,
      user_id: ownerId
    });

    return res.status(201).json({
      message: "Proyecto creado exitosamente",
      project: newProject
    });

  } catch (error) {
    console.error("Error in createProject:", error);
    return res.status(500).json({ error: "Error interno del servidor." });
  }
};


const getProjects = async (req, res) => {
    try {
        const userId = req.userId;
        const { page = 1, limit = 10, search = '', status } = req.query;

        const skip = (parseInt(page) - 1) * parseInt(limit);
        const collaboratorDocs = await ProjectCollaborator.find({ user_id: userId });
        const collaboratorProjectIds = collaboratorDocs.map(doc => doc.project_id);


        let query = {
            $or: [
                { owner_id: userId },
                { _id: { $in: collaboratorProjectIds } }
            ]
        };

        if (search.trim() !== '') {
            const regex = new RegExp(search.trim(), 'i');
            query.$and = [{ $or: [{ name: regex }, { description: regex }] }];
        }


        if (status) {
            query.status = status;
        }


        const totalCount = await Project.countDocuments(query);


        const projects = await Project.find(query)
            .populate('owner_id', 'name email')
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(parseInt(limit));

        return res.status(200).json({
            projects,
            page: parseInt(page),
            limit: parseInt(limit),
            totalCount  
        });

    } catch (error) {
        console.error('Error in getProjects:', error);
        return res.status(500).json({ error: 'Error interno del servidor al obtener proyectos.' });
    }
};


const getProjectById = async (req, res) => {
    try {
        const { projectId } = req.params;
        const userId = req.userId;

        if (!mongoose.isValidObjectId(projectId)) {
            return res.status(400).json({ error: 'ID de proyecto inválido.' });
        }

        const isCollaborator = await ProjectCollaborator.findOne({
            project_id: projectId,
            user_id: userId
        });

        if (!isCollaborator) {
            return res.status(403).json({ error: 'Acceso denegado.' });
        }

        const project = await Project.findById(projectId)
            .populate('owner_id', 'name email');

        if (!project) {
            return res.status(404).json({ error: 'Proyecto no encontrado.' });
        }

        return res.status(200).json({ project });

    } catch (error) {
        console.error('Error in getProjectById:', error);
        return res.status(500).json({ error: 'Error interno del servidor.' });
    }
};


const updateProject = async (req, res) => {
    try {
        const { projectId } = req.params;
        const userId = req.userId;
        const { name, description, status, priority } = req.body;

        if (!mongoose.isValidObjectId(projectId)) {
            return res.status(400).json({ error: 'ID de proyecto inválido.' });
        }

        if (!name || name.trim().length < 3) {
            return res.status(400).json({
                error: 'El nombre del proyecto debe tener al menos 3 caracteres.'
            });
        }

        const project = await Project.findById(projectId);
        if (!project) return res.status(404).json({ error: 'Proyecto no encontrado.' });

        if (project.owner_id.toString() !== userId) {
            return res.status(403).json({
                error: 'Permiso denegado. Solo el creador puede actualizar el proyecto.'
            });
        }

        project.name = name.trim();
        project.description = description ? description.trim() : null;
        if (status) project.status = status; 
        if (priority) project.priority = priority;
        await project.save();

        return res.status(200).json({
            message: 'Proyecto actualizado exitosamente.',
            project
        });

    } catch (error) {
        console.error('Error in updateProject:', error);
        return res.status(500).json({ error: 'Error interno del servidor.' });
    }
};


const deleteProject = async (req, res) => {
    try {
        const { projectId } = req.params;
        const userId = req.userId;

        if (!mongoose.isValidObjectId(projectId)) {
            return res.status(400).json({ error: 'ID de proyecto inválido.' });
        }

        const project = await Project.findById(projectId);
        if (!project) return res.status(404).json({ error: 'Proyecto no encontrado.' });

        if (project.owner_id.toString() !== userId) {
            return res.status(403).json({
                error: 'Permiso denegado. Solo el creador puede eliminar el proyecto.'
            });
        }

        await Project.findByIdAndDelete(projectId);
        await ProjectCollaborator.deleteMany({ project_id: projectId });

        return res.status(204).json();

    } catch (error) {
        console.error('Error in deleteProject:', error);
        return res.status(500).json({ error: 'Error interno del servidor.' });
    }
};

module.exports = {
    createProject,
    getProjects,
    getProjectById,
    updateProject,
    deleteProject
};
