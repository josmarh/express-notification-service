const registerUserService = require('../services/registerUserService');
const passwordResetService = require('../services/passwordResetService');
const User = require('../../models/User');

exports.register = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        const user = await User.findOne({ where: { email } });
        if (user) throw new Error('E-mail already in use');

        const newUser = await registerUserService.registerUser({ name, email, password });
        res.status(201).json({ message: 'User registered successfully', user: newUser });
    } catch (error) {
        return res.status(500).json({ error: 'Failed to register user', details: error.message });
    }
}

exports.passwordReset = async (req, res) => {
    const { email, resetLink } = req.body;
    
    try {
        const user = await User.findOne({ where: { email } });
        if (!user) throw new Error('User not found');

        await passwordResetService.sendPasswordResetLink({email, resetLink});
        res.status(200).json({ message: 'Password reset link sent to email' });
    } catch (error) {
        return res.status(500).json({ error: 'Failed to send password reset link', details: error.message });
    }
}