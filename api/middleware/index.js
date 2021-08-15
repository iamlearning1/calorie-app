const User = require('../schema/User');
const { verifyToken } = require('../utils/auth');

const roles = {
  admin: {
    users: true,
    meals: true,
    details: true,
  },
  user: {
    selfMeals: true,
    addmeal: true,
    users: false,
    details: true,
  },
};

const authenticate = (resource) => {
  return async (req, res, next) => {
    try {
      const token = req.headers.authorization.replace('Bearer ', '');

      if (!token) throw new Error('No token found');

      const decoded = verifyToken(token);

      const user = await User.findOne({ email: decoded.email }).lean();

      if (!roles[user.role][resource])
        return res.status(403).send({ message: 'Resource not found' });

      delete user.password;

      req.user = user;

      next();
    } catch (error) {
      console.error(error);
      return res.status(401).send({ message: 'Please login again' });
    }
  };
};

module.exports = authenticate;
