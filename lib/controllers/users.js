const { Router } = require('express');
const authorize = require('../middleware/authorize');
const authenticate = require('../middleware/authenticate');
const UserService = require('../services/UserService');
const User = require('../models/User');
const ONE_DAY_IN_MS = 1000 * 60 * 60 * 24;

module.exports = Router()
  .post('/', async (req, res, next) => {
    try {
      const user = await UserService.create(req.body);
      res.json(user);
    } catch (error) {
      next(error);
    }
  })
  .post('/sessions', async (req, res, next) => {
    try {
      const { email, password } = req.body;
      const sessionToken = await UserService.signIn({ email, password });
      res.cookie(process.env.COOKIE_NAME, sessionToken, {
        httpOnly: true,
        secure: process.env.SECURE_COOKIES === 'true',
        sameSite: process.env.SECURE_COOKIES === 'true' ? 'none' : 'strict',
        maxAge: ONE_DAY_IN_MS,
      })
        .json({ message: 'Signed in successfully!' });
    } catch (error) {
      next(error);
    }
  })
  .get('/me', authenticate, (req, res) => {
    res.json(req.user);
  })
  .get('/protected', authenticate, async (req, res) => {
    res.json({ message: 'hello world' });
  })
  .get('/', [authenticate, authorize], async (req, res, next) => {
    try {
      const users = await User.getAll();
      res.json(users);
    } catch (e) {
      next(e);
    }
  })
  .delete('/sessions', (req, res) => {
    res.clearCookie(process.env.COOKIE_NAME, {
      httpOnly: true,
      secure: process.env.SECURE_COOKIES === 'true',
      sameSite: process.env.SECURE_COOKIES === 'true' ? 'none' : 'strict',
      maxAge: ONE_DAY_IN_MS,
    })
      .status(204)
      .send();
  });
