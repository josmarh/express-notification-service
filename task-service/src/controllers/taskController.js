const Joi = require('joi')
const createTaskService = require('../services/createTaskService');

exports.createTask = async (req, res) => {
    const { title, assignedTo } = req.body;

    try {
        const response = await createTaskService.createTask({ title, assignedTo });
        res.status(201).json({ message: 'Task created successfully', task: response });
    } catch (error) {
        return res.status(500).json({ error: 'Failed to create task', details: error.message });
    }
}