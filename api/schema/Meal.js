const { Schema, model } = require('mongoose');

const Meal = new Schema(
  {
    type: { type: String, required: true },
    name: { type: String, required: true },
    calories: { type: Number, required: true },
    date: { type: Date, required: true },
    user: { type: Schema.Types.ObjectId, ref: 'User' },
  },
  { timestamps: true },
);

module.exports = model('Meal', Meal);
