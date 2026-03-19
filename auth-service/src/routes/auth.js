const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const validate = require('../middlewares/validate').validate;
const Joi = require('joi');

const registerSchema = Joi.object({
    username: Joi.string().min(3).max(100).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required()
});

const passwordResetSchema = Joi.object({
    email: Joi.string().email().required(),
    resetLink: Joi.string().uri().required()
});

router.post('/register', validate(registerSchema), authController.register);

router.post('/password-reset', validate(passwordResetSchema), authController.passwordReset);
    
module.exports = router;