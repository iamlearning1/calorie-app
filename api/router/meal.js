const { Router } = require('express');

const authenticate = require('../middleware');
const {
  addMeal,
  meals,
  deleteMeal,
  mealDetails,
  updateMeal,
} = require('../controller/meal');

const router = new Router();

router.get('/all', authenticate('selfMeals'), meals);

router.get('/:id', authenticate('mealDetails'), mealDetails);

router.post('/add', authenticate('addmeal'), addMeal);

router.put('/:id', authenticate('update'), updateMeal);

router.delete('/:id', authenticate('delete'), deleteMeal);

module.exports = router;
