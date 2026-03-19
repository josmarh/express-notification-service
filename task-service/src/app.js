const express = require('express');
const morgan = require('morgan');

const app = express();

app.use(morgan('dev'));
app.use(express.json());

app.use('/api/tasks', require('./routes/task'));

app.get('/', (req, res) => {
    res.send('Task Service is running');
});

module.exports = app;