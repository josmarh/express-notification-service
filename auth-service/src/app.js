const express = require('express');
const morgan = require('morgan');

const app = express();

app.use(morgan('dev'));
app.use(express.json());

const authRoutes = require('./routes/auth');

app.use('/api/auth', authRoutes);

app.get('/', (req, res) => {
    res.send('Auth Service is running');
});

module.exports = app;