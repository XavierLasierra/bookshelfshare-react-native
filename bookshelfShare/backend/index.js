const express = require('express');
require('dotenv').config();
const debug = require('debug')('booksSApi');
const chalk = require('chalk');
const morgan = require('morgan');
const cors = require('cors');

require('./src/config/ddbb.config');

const server = express();
const port = process.env.PORT || 5000;

server.use(cors());
server.use(morgan('dev'));
server.use(express.json());

// TODO routers

server.listen(
  port,
  () => debug(`Server is running on ${chalk.magenta(`http://localhost:${port}`)}`)
);
