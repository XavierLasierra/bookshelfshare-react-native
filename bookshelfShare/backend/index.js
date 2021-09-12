const express = require('express');
require('dotenv').config();
const debug = require('debug')('booksSApi');
const chalk = require('chalk');
const morgan = require('morgan');
const cors = require('cors');
const authRouter = require('./src/routes/auth.router');
const booksRouter = require('./src/routes/books.router');
const userRouter = require('./src/routes/users.router');
const shelvesRouter = require('./src/routes/shelves.router');

require('./src/config/ddbb.config');

const server = express();
const port = process.env.PORT || 5000;

require('./src/config/passport.config')(server);

server.use(cors());
server.use(morgan('dev'));
server.use(express.json());

server.use('/api/auth', authRouter);
server.use('/api/books', booksRouter);
server.use('/api/users', userRouter);
server.use('/api/shelves', shelvesRouter);

server.listen(
  port,
  () => debug(`Server is running on ${chalk.magenta(`http://localhost:${port}`)}`)
);
