require('dotenv').config();

require('./db');

const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const userRouter = require('./router/user');
const mealRouter = require('./router/meal');

const { PORT = 5000 } = process.env;

const { json, urlencoded } = express;

const app = express();

app.use(json({ limit: '50mb' }));

app.use(
  urlencoded({
    limit: '50mb',
    extended: true,
  })
);

app.use(cors());

app.use(morgan('combined'));

app.use('/api/user', userRouter);
app.use('/api/meal', mealRouter);

app.listen(PORT, () => console.info('Server running at port', PORT));
