const { Schema, model } = require('mongoose');
const validator = require('validator');

const { CALORIE_LIMIT = 2100 } = process.env;

const User = new Schema(
  {
    name: { type: String, required: [true, 'Name is required'] },
    email: {
      type: String,
      unique: true,
      required: [true, 'Email is required'],
      validate: {
        validator: validator.isEmail,
        message: '{VALUE} is not a valid email',
      },
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
    },
    role: { type: String, enum: ['user', 'admin'], default: 'user' },
    calorieLimit: { type: Number, default: Number(CALORIE_LIMIT) },
  },
  { timestamps: true },
);

module.exports = model('User', User);
