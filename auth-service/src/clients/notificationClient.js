const axios = require('axios')
const axiosRetry = require('axios-retry').default
const { v4: uuidv4 } = require('uuid');

const client = axios.create({
  baseURL: 'http://notification-service:3000/api',
  headers: {
    'x-request-id': uuidv4()
  }
})

axiosRetry(client, {
    retries: 3,
    retryDelay: axiosRetry.exponentialDelay
})

module.exports = client