const express = require('express');
const authMiddleware = require('../../middleware/auth');
const {
  createTask,
  getTasks,
  getTaskById,
  updateTask,
  deleteTask
} = require('../../controllers/task/taskController');

const router = express.Router();


router.post('/create-task', authMiddleware, createTask);
router.get('/get-tasks', authMiddleware, getTasks);
router.get('/get-task-by-id', authMiddleware, getTaskById);
router.put('/update-task/:taskId', authMiddleware, updateTask);
router.delete('/delete-task/:taskId', authMiddleware, deleteTask);

module.exports = router;
