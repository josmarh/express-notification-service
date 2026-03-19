const express = require('express');
const router = express.Router();
const validate = require('../middlewares/validate').validate;
const Joi = require('joi');

const taskController = require('../controllers/taskController');

router.post('/', validate(Joi.object({
    title: Joi.string().required(),
    assignedTo: Joi.string().email().required()
})), taskController.createTask);

module.exports = router;