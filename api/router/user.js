const { Router } = require('express');

const authenticate = require('../middleware');
const {
  login,
  signup,
  details,
  allUsersWithMeals,
  mealReport,
  share,
} = require('../controller/user');

const router = new Router();

router.get('/details', authenticate('details'), details);

router.get('/all/report', authenticate('report'), mealReport);

router.get('/all', authenticate('users'), allUsersWithMeals);

router.post('/share', authenticate('share'), share);

router.post('/login', login);

router.post('/signup', signup);

module.exports = router;
