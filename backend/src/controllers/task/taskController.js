const Task = require('../../models/Task');
const Project = require('../../models/Project');
const ProjectCollaborator = require('../../models/ProjectCollaborator');
const mongoose = require('mongoose');

async function userHasAccessToProject(userId, projectId) {
  if (!mongoose.isValidObjectId(projectId)) return false;
  if (!mongoose.isValidObjectId(userId)) return false;

  const project = await Project.findById(projectId).select('owner_id');
  if (!project) return false;


  if (project.owner_id.toString() === userId.toString()) {
    return true;
  }


  const collab = await ProjectCollaborator.findOne({
    project_id: projectId,
    user_id: new mongoose.Types.ObjectId(userId)
  });

  return !!collab;
}


const createTask = async (req, res) => {
  try {
    const userId = req.userId;
    const { title, description, priority, assignee, due_date, project_id, point } = req.body;


    if (!title || title.trim().length < 2) {
      return res.status(400).json({ error: 'Título inválido' });
    }


    const hasAccess = await userHasAccessToProject(userId, project_id);
    if (!hasAccess) {
      return res.status(403).json({ error: 'No tienes acceso a este proyecto' });
    }


    if (assignee) {
      const isCollab = await ProjectCollaborator.findOne({
        project_id: project_id,
        user_id: assignee
      });

      const project = await Project.findById(project_id);

      if (!isCollab && assignee !== project.owner_id.toString()) {
        return res.status(400).json({
          error: 'El usuario asignado no es colaborador del proyecto'
        });
      }
    }

    const task = await Task.create({
      project_id: project_id,
      title: title.trim(),
      description: description ? description.trim() : null,
      priority: priority || 'Medium',
      assignee: assignee || null,
      due_date: due_date ? new Date(due_date) : null,
      created_by: userId,
      point: Number(point) || 0
    });

    return res.status(201).json({ task });

  } catch (err) {
    console.error('createTask error', err);
    return res.status(500).json({ error: 'Error interno creando tarea' });
  }
};


const getTasks = async (req, res) => {
  try {
    const userId = req.userId;
    const { projectId } = req.params;
    const { page = 1, limit = 20, status, priority, assignee, search, sortBy = 'createdAt', order = 'desc' } = req.query;

    const skip = (parseInt(page) - 1) * parseInt(limit);
    const query = {};

    if (projectId) {
      query.project_id = projectId;
    } else {
      const collabs = await ProjectCollaborator.find({ user_id: userId }).select('project_id');
      const ids = collabs.map(c => c.project_id);

      query.project_id = { $in: ids };

    }

    if (status) query.status = status;
    if (priority) query.priority = priority;
    if (assignee) query.assignee = assignee;

    if (search) query.$or = [
      { title: new RegExp(search, 'i') },
      { description: new RegExp(search, 'i') }
    ];


    const totalCount = await Task.countDocuments(query);

    const tasks = await Task.find(query)
      .populate('assignee', 'name email')
      .populate('created_by', 'name email')
      .sort({ [sortBy]: order === 'asc' ? 1 : -1 })
      .skip(skip)
      .limit(parseInt(limit));


    return res.status(200).json({
      tasks,
      page: parseInt(page),
      limit: parseInt(limit),
      totalCount
    });

  } catch (err) {
    console.error('getTasks error', err);
    return res.status(500).json({ error: 'Error interno obteniendo tareas' });
  }
};

const getTaskById = async (req, res) => {
  try {
    const userId = req.userId;
    const { taskId } = req.params;

    if (!mongoose.isValidObjectId(taskId)) return res.status(400).json({ error: 'ID inválido' });

    const task = await Task.findById(taskId)
      .populate('assignee', 'name email')
      .populate('created_by', 'name email');

    if (!task) return res.status(404).json({ error: 'Tarea no encontrada' });

    const hasAccess = await userHasAccessToProject(userId, task.project_id);
    if (!hasAccess) return res.status(403).json({ error: 'No tienes acceso a esta tarea' });

    return res.status(200).json({ task });
  } catch (err) {
    console.error('getTaskById error', err);
    return res.status(500).json({ error: 'Error interno' });
  }
};


const updateTask = async (req, res) => {
  try {
    const userId = req.userId;
    const { taskId } = req.params;
    const updates = req.body;

    if (!mongoose.isValidObjectId(taskId)) {
      return res.status(400).json({ error: 'ID inválido' });
    }

    const task = await Task.findById(taskId);
    if (!task) return res.status(404).json({ error: 'Tarea no encontrada' });

    const hasAccess = await userHasAccessToProject(userId, task.project_id);
    if (!hasAccess) return res.status(403).json({ error: 'No tienes acceso' });


    if (updates.assignee) {
      const project = await Project.findById(task.project_id);

      const isCollab = await ProjectCollaborator.findOne({
        project_id: task.project_id,
        user_id: updates.assignee,
      });

      if (!isCollab && updates.assignee !== project.owner_id.toString()) {
        return res.status(400).json({ error: "Usuario asignado no es colaborador" });
      }
    }


    const prevStatus = task.status;
    Object.assign(task, updates);
    await task.save();


    if (prevStatus !== "completada" && task.status === "completada") {
      await Project.findByIdAndUpdate(task.project_id, {
        $inc: { progress: task.point || 0 }
      });
    }

    return res.status(200).json({ task });

  } catch (err) {
    console.error("updateTask error", err);
    return res.status(500).json({ error: "Error interno" });
  }
};


const deleteTask = async (req, res) => {
  try {
    const userId = req.userId;
    const { taskId } = req.params;

    if (!mongoose.isValidObjectId(taskId)) return res.status(400).json({ error: 'ID inválido' });

    const task = await Task.findById(taskId);
    if (!task) return res.status(404).json({ error: 'Tarea no encontrada' });


    const project = await Project.findById(task.project_id);
    const isOwner = project && project.owner_id.toString() === userId;
    const isCreator = task.created_by.toString() === userId;

    if (!isOwner && !isCreator) return res.status(403).json({ error: 'No tienes permiso para eliminar esta tarea' });

    await Task.findByIdAndDelete(taskId);
    return res.status(204).send();

  } catch (err) {
    console.error('deleteTask error', err);
    return res.status(500).json({ error: 'Error interno' });
  }
};

module.exports = {
  createTask,
  getTasks,
  getTaskById,
  updateTask,
  deleteTask
};
