const moment = require('moment');
const generator = require('generate-password');

const User = require('../schema/User');
const {
  comparePassword,
  hashPassword,
  generateToken,
} = require('../utils/auth');

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email }).lean();

    if (!user) throw new Error(`User with email ${email} not found`);

    const passwordValid = await comparePassword(password, user.password);

    if (!passwordValid) throw new Error(`User with email ${email} password not valid`);

    delete user.password;

    return res.send({
      ...user,
      token: generateToken(user._id, user.email),
    });
  } catch (error) {
    return res
      .status(400)
      .send({ message: 'Please check your email or password' });
  }
};

const signup = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const hashedPassword = await hashPassword(password);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    console.info(
      `User with email ${email} created successfully, User ID: ${user._id}`,
    );

    return res.send({ message: 'User created successfully' });
  } catch (error) {
    console.error(error);
    return res
      .status(400)
      .send({ message: 'Something went wrong while creating the user' });
  }
};

const details = async (req, res) => {
  const { user } = req;

  try {
    return res.send({ ...user, token: generateToken(user._id, user.email) });
  } catch (error) {
    console.error(error);
    return res.status(400).send({ message: 'Something went wrong' });
  }
};

const allUsersWithMeals = async (req, res) => {
  try {
    const users = await User.aggregate([
      {
        $lookup: {
          from: 'meals',
          localField: '_id',
          foreignField: 'user',
          as: 'meals',
        },
      },
      {
        $project: {
          password: 0,
        },
      },
    ]);

    return res.send(users);
  } catch (error) {
    console.error(error);
    return res.status(400).send({ message: 'Something went wrong' });
  }
};

const mealReport = async (req, res) => {
  try {
    const currentWeek = {
      $gte: new Date(
        moment(moment().subtract(6, 'days').startOf('day')).unix() * 1000,
      ),
      $lt: new Date(moment(moment().endOf('day')).unix() * 1000),
    };

    const lastWeek = {
      $gte: new Date(
        moment(moment().subtract(13, 'days').startOf('day')).unix() * 1000,
      ),
      $lt: new Date(
        moment(moment().subtract(7, 'days').endOf('day')).unix() * 1000,
      ),
    };

    const filteredMeals = await User.aggregate([
      {
        $lookup: {
          from: 'meals',
          localField: '_id',
          foreignField: 'user',
          as: 'meals',
        },
      },
      {
        $addFields: {
          currentWeekMeals: {
            $filter: {
              input: '$meals',
              as: 'meal',
              cond: {
                $and: [
                  { $gte: ['$$meal.date', currentWeek.$gte] },
                  { $lt: ['$$meal.date', currentWeek.$lt] },
                ],
              },
            },
          },
        },
      },
      {
        $addFields: {
          lastWeekMeals: {
            $filter: {
              input: '$meals',
              as: 'meal',
              cond: {
                $and: [
                  { $gte: ['$$meal.date', lastWeek.$gte] },
                  { $lt: ['$$meal.date', lastWeek.$lt] },
                ],
              },
            },
          },
        },
      },
      {
        $project: {
          meals: 0,
          password: 0,
        },
      },
    ]);

    return res.send(filteredMeals);
  } catch (error) {
    console.error(error);
    return res.status(400).send({ message: error.message });
  }
};

const share = async (req, res) => {
  try {
    const { email, name } = req.body;

    const password = generator.generate({
      length: 8,
      numbers: true,
    });

    const hashedPassword = await hashPassword(password);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    const token = generateToken(user._id, user.email);

    return res.send({ password, token });
  } catch (error) {
    console.error(error);
    return res.status(400).send({ message: error.message });
  }
};

module.exports = {
  login,
  signup,
  details,
  allUsersWithMeals,
  mealReport,
  share,
};
