const { Router } = require('express');

const authenticate = require('../middleware');
const { login, signup, details } = require('../controller/user');

const router = new Router();

router.get('/details', authenticate('details'), details);

router.post('/login', login);

router.post('/signup', signup);

module.exports = router;
