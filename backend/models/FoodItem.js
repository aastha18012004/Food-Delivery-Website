const mongoose = require('mongoose');

const foodItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A food item must have a name'],
    unique: true,
    trim: true
  },
  description: {
    type: String,
    required: [true, 'A food item must have a description'],
    trim: true
  },
  price: {
    type: Number,
    required: [true, 'A food item must have a price']
  },
  image: {
    type: String,
    required: [true, 'A food item must have an image']
  },
  category: {
    type: String,
    required: [true, 'A food item must have a category'],
    enum: ['Salad', 'Rolls', 'Deserts', 'Sandwich', 'Cake', 'Pure Veg', 'Pasta', 'Noodles']
  },
  rating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5
  },
  numReviews: {
    type: Number,
    default: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const FoodItem = mongoose.model('FoodItem', foodItemSchema);

module.exports = FoodItem;