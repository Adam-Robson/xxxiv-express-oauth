const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();

app.use(express.json());
app.use(cookieParser());

app.use('/api/v1/users', require('./controllers/users'));
app.use('/api/v1/github', require('./controllers/github'));
app.use('/api/v1/post', require('./controllers/post'));

app.use(require('./middleware/not-found'));
app.use(require('./middleware/error'));

module.exports = app;
