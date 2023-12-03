const { Client } = require('pg');
const { postgress } = require('./config');

const client = new Client(postgress);

module.exports = client;
