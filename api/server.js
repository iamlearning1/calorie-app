require('./db');

const express = require('express');

const userRouter = require('./router/user');

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

app.use('/api/user', userRouter);

app.listen(PORT, () => console.info('Server running at port', PORT));
