const { Router } = require('express');

const authenticate = require('../middleware');
const { addMeal, meals } = require('../controller/meal');

const router = new Router();

router.get('/all', authenticate('selfMeals'), meals);

router.post('/add', authenticate('addmeal'), addMeal);

module.exports = router;
