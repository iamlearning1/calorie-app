const moment = require('moment');
const { Types } = require('mongoose');

const Meal = require('../schema/Meal');
const User = require('../schema/User');

const mealEntries = {
  breakfast: 3,
  lunch: 5,
  dinner: 2,
};

const addMeal = async (req, res) => {
  const {
    type, name, calories, date, user,
  } = req.body;

  try {
    const dateQuery = {
      $gte: new Date(moment(moment(date).startOf('day')).unix() * 1000),
      $lt: new Date(moment(moment(date).endOf('day')).unix() * 1000),
    };

    if (user) req.user = await User.findById(Types.ObjectId(user));

    const meals = await Meal.find({
      user: req.user._id,
      date: dateQuery,
    });

    const todaysCalorieLimit = meals.reduce(
      (total, meal) => total + meal.calories,
      0,
    );

    if (Number(todaysCalorieLimit) > Number(req.user.calorieLimit)) throw new Error('Reached the calorie limit');

    if (
      Number(todaysCalorieLimit) + Number(calories)
      > Number(req.user.calorieLimit)
    ) throw new Error('Exceeded the calorie limit');

    const todaysMealTypes = meals.filter((meal) => meal.type === type).length;

    if (todaysMealTypes >= mealEntries[type]) throw new Error('You can not add more meals for this category');

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
    const userMeals = await Meal.find({
      user: req.user._id,
    }).lean();

    if (!userMeals.length) throw new Error('No meals found');

    return res.send(userMeals);
  } catch (error) {
    console.error(error);
    return res.status(400).send({ message: error.message });
  }
};

const deleteMeal = async (req, res) => {
  try {
    await Meal.findByIdAndDelete(req.params.id);
    return res.send({ message: 'Deleted' });
  } catch (error) {
    console.error(error);
    return res.status(400).send({ message: error.message });
  }
};

const mealDetails = async (req, res) => {
  try {
    const meal = await Meal.findById(req.params.id);

    if (!meal) throw new Error('Meal not found');

    return res.send(meal);
  } catch (error) {
    console.error(error);
    return res.status(400).send({ message: error.message });
  }
};

const updateMeal = async (req, res) => {
  try {
    const {
      type, name, calories, date,
    } = req.body;

    const meal = await Meal.findById(req.params.id);

    if (!meal) throw new Error('Meal not found');

    const updatedMeal = await Meal.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          type,
          name,
          calories,
          date,
        },
      },
      { new: true },
    );

    return res.send(updatedMeal);
  } catch (error) {
    console.error(error);
    return res.status(400).send({ message: error.message });
  }
};

module.exports = {
  addMeal,
  meals,
  deleteMeal,
  mealDetails,
  updateMeal,
};
