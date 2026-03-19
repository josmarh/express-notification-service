const registerUserService = require('../services/registerUserService');
const passwordResetService = require('../services/passwordResetService');

exports.register = async (req, res) => {
    const { username, email, password } = req.body;

    try {
        await registerUserService.registerUser({ username, email, password });
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        return res.status(500).json({ error: 'Failed to register user', details: error.message });
    }
}

exports.passwordReset = async (req, res) => {
    const { email, resetLink } = req.body;
    
    try {
        await passwordResetService.sendPasswordResetLink({email, resetLink});
        res.status(200).json({ message: 'Password reset link sent to email' });
    } catch (error) {
        return res.status(500).json({ error: 'Failed to send password reset link', details: error.message });
    }
}