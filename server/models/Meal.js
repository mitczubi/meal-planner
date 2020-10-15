const mongoose = require('mongoose');

const MealSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a meal name'],
    unique: true,
    trim: true,
    maxlength: [50, 'Name cannot be more than 50 characters']
  },
  description: {
    type: String,
    required: [false],
    maxlength: [500, 'Description cannot be more than 500 characters']
  },
  diet: {
    type: String,
    required: [false],
    enum: ['vegan', 'vegetarian']
  },
  nutrition: {
    calories: {
      type: Number
    },
    protein: {
      type: Number
    },
    carbs: {
      type: Number
    }
  }
});

module.exports = mongoose.model('Meal', MealSchema);