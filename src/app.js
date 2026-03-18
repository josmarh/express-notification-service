const express = require('express');

const app = express();

app.use(express.json());

app.use('/api/notifications', require('./routes/notification'));

app.get('/', (req, res) => {
  res.send('Notification Service is running');
});

module.exports = app;