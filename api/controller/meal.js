const moment = require('moment');

const Meal = require('../schema/Meal');

const { CALORIE_LIMIT = 2100 } = process.env;

const mealEntries = {
  breakfast: 3,
  lunch: 5,
  dinner: 2,
};

const addMeal = async (req, res) => {
  const { type, name, calories, date } = req.body;

  try {
    const dateQuery = {
      $gte: new Date(moment(moment(date).startOf('day')).unix() * 1000),
      $lt: new Date(moment(moment(date).endOf('day')).unix() * 1000),
    };

    const meals = await Meal.find({
      user: req.user._id,
      date: dateQuery,
    });

    const todaysCalorieLimit = meals.reduce(
      (total, meal) => total + meal.calories,
      0
    );

    if (todaysCalorieLimit > CALORIE_LIMIT)
      throw new Error('You have reached the calorie limit');

    if (todaysCalorieLimit + calories > CALORIE_LIMIT)
      throw new Error('You are exceeding the calorie limit');

    const todaysMealTypes = meals.filter((meal) => meal.type === type).length;

    if (todaysMealTypes >= mealEntries[type])
      throw new Error('You can not add more meals for this category');

    await Meal.create({
      type,
      name,
      calories,
      date,
      user: req.user._id,
    });

    return res.send({ message: 'Meal created successfully' });
  } catch (error) {
    console.error(error);
    return res.status(400).send({ message: error.message });
  }
};

const meals = async (req, res) => {
  try {
    const meals = await Meal.find({
      user: req.user._id,
    });

    if (!meals.length) throw new Error('No meals found');

    return res.send(meals);
  } catch (error) {
    console.error(error);
    return res.status(400).send({ message: error.message });
  }
};

module.exports = { addMeal, meals };
