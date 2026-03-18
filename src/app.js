const express = require('express');
const morgan = require('morgan');

const { createBullBoard } = require('@bull-board/api');
const { BullMQAdapter } = require('@bull-board/api/bullMQAdapter');
const { ExpressAdapter } = require('@bull-board/express');

const basicAuth = require('express-basic-auth');
const notificationQueue = require('./queues/notificationQueue')

const app = express();

app.use(morgan('dev'));
app.use(express.json());

// Define your credentials (ideally in your .env file)
const ADMIN_USER = process.env.ADMIN_USER || 'admin';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'password';

// 1. Setup Basic Auth Middleware
const auth = basicAuth({
  users: { ADMIN_USER : ADMIN_PASSWORD }, // Change these!
  challenge: true,
  realm: 'Imb4T3st4pp',
});

// Initialize your adapter
const serverAdapter = new ExpressAdapter();
serverAdapter.setBasePath('/admin/queues');

// Create the board
createBullBoard({
  queues: [new BullMQAdapter(notificationQueue)],
  serverAdapter: serverAdapter,
});

app.use('/api/notifications', require('./routes/notification'));
app.use('/admin/queues', serverAdapter.getRouter());

app.get('/', (req, res) => {
  res.send('Notification Service is running');
});

module.exports = app;