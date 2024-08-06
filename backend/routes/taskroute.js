const express = require('express');
const { createTask, getTasks, getTaskById, updateTask, deleteTask } = require('../controllers/taskcontroller');
const { authenticateToken } = require('../middlewares/authMiddleware');
const router = express.Router();

router.post('/tasks', authenticateToken, createTask);
router.get('/tasks', authenticateToken, getTasks);
router.get('/tasks/:id', authenticateToken, getTaskById);
router.patch('/tasks/:id', authenticateToken, updateTask);
router.delete('/tasks/:id', authenticateToken, deleteTask);

module.exports = router;
