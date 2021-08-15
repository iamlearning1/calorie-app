const User = require('../schema/User');
const {
  comparePassword,
  hashPassword,
  generateToken,
} = require('../utils/auth');

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) throw new Error(`User with email ${email} not found`);

    const passwordValid = await comparePassword(password, user.password);

    if (!passwordValid)
      throw new Error(`User with email ${email} password not valid`);

    return res.send({
      email: user.email,
      id: user._id,
      role: user.role,
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
      `User with email ${email} created successfully, User ID: ${user._id}`
    );

    return res.send({ message: 'User created successfully ' });
  } catch (error) {
    console.error(error);
    return res
      .status(400)
      .send({ message: 'Something went wrong while creating the user' });
  }
};

module.exports = { login, signup };