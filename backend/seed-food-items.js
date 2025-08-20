const mongoose = require('mongoose');
const dotenv = require('dotenv');
const FoodItem = require('./models/FoodItem');

// Load environment variables
dotenv.config({ path: './.env' });

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB for seeding data'))
  .catch((err) => console.error('Could not connect to MongoDB', err));

// Sample food items data
const foodItems = [
  // Salad Category
  {
    name: "Greek salad",
    image: "food_1.png",
    price: 149,
    description: "Fresh Greek salad with cucumber, tomato, bell pepper, olives, and feta cheese with olive oil dressing",
    category: "Salad",
    rating: 4.5,
    numReviews: 12
  },
  {
    name: "Veg salad",
    image: "food_2.png",
    price: 129,
    description: "Mixed vegetable salad with lettuce, carrots, bell peppers, and a light vinaigrette dressing",
    category: "Salad",
    rating: 4.2,
    numReviews: 8
  },
  {
    name: "Clover Salad",
    image: "food_3.png",
    price: 169,
    description: "Unique salad featuring microgreens, edible flowers, and a special house dressing",
    category: "Salad",
    rating: 4.7,
    numReviews: 15
  },
  {
    name: "Chicken Salad",
    image: "food_4.png",
    price: 249,
    description: "Grilled chicken breast on a bed of fresh greens with cherry tomatoes and balsamic glaze",
    category: "Salad",
    rating: 4.8,
    numReviews: 20
  },
  
  // Rolls Category
  {
    name: "Lasagna Rolls",
    image: "food_5.png",
    price: 159,
    description: "Rolled lasagna filled with ricotta cheese, spinach, and topped with marinara sauce",
    category: "Rolls",
    rating: 4.3,
    numReviews: 10
  },
  {
    name: "Peri Peri Rolls",
    image: "food_6.png",
    price: 105,
    description: "Spicy peri peri flavored rolls with a tangy sauce and fresh vegetables",
    category: "Rolls",
    rating: 4.1,
    numReviews: 7
  },
  {
    name: "Chicken Rolls",
    image: "food_7.png",
    price: 125,
    description: "Tender chicken wrapped in a soft roll with fresh vegetables and special sauce",
    category: "Rolls",
    rating: 4.4,
    numReviews: 14
  },
  {
    name: "Veg Rolls",
    image: "food_8.png",
    price: 95,
    description: "Vegetable-stuffed rolls with a blend of Indian spices and herbs",
    category: "Rolls",
    rating: 4.0,
    numReviews: 9
  },
  
  // Deserts Category
  {
    name: "Ripple Ice Cream",
    image: "food_9.png",
    price: 169,
    description: "Creamy vanilla ice cream with chocolate ripple swirls throughout",
    category: "Deserts",
    rating: 4.9,
    numReviews: 25
  },
  {
    name: "Fruit Ice Cream",
    image: "food_10.png",
    price: 149,
    description: "Refreshing fruit-flavored ice cream made with real seasonal fruits",
    category: "Deserts",
    rating: 4.6,
    numReviews: 18
  },
  {
    name: "Jar Ice Cream",
    image: "food_11.png",
    price: 189,
    description: "Artisanal ice cream served in a reusable glass jar with multiple flavor layers",
    category: "Deserts",
    rating: 4.7,
    numReviews: 22
  },
  {
    name: "Vanilla Ice Cream",
    image: "food_12.png",
    price: 125,
    description: "Classic vanilla bean ice cream made with premium ingredients",
    category: "Deserts",
    rating: 4.5,
    numReviews: 15
  },
  
  // Sandwich Category
  {
    name: "Chicken Sandwich",
    image: "food_13.png",
    price: 125,
    description: "Grilled chicken breast with lettuce, tomato, and mayo on toasted bread",
    category: "Sandwich",
    rating: 4.4,
    numReviews: 16
  },
  {
    name: "Vegan Sandwich",
    image: "food_14.png",
    price: 185,
    description: "Plant-based sandwich with avocado, hummus, and fresh vegetables",
    category: "Sandwich",
    rating: 4.3,
    numReviews: 12
  },
  {
    name: "Grilled Sandwich",
    image: "food_15.png",
    price: 165,
    description: "Classic grilled cheese sandwich with a blend of premium cheeses",
    category: "Sandwich",
    rating: 4.5,
    numReviews: 19
  },
  
  // Cake Category
  {
    name: "Cup Cake",
    image: "food_16.png",
    price: 109,
    description: "Delicious individual cupcakes with buttercream frosting",
    category: "Cake",
    rating: 4.6,
    numReviews: 21
  },
  {
    name: "Vegan Cake",
    image: "food_17.png",
    price: 129,
    description: "Plant-based cake made without animal products but full of flavor",
    category: "Cake",
    rating: 4.2,
    numReviews: 14
  },
  {
    name: "Butterscotch Cake",
    image: "food_18.png",
    price: 209,
    description: "Rich butterscotch cake with caramel drizzle and toffee pieces",
    category: "Cake",
    rating: 4.8,
    numReviews: 27
  },
  
  // Pure Veg Category
  {
    name: "Garlic Mushroom",
    image: "food_19.png",
    price: 149,
    description: "Sautéed mushrooms with garlic, herbs, and a touch of white wine",
    category: "Pure Veg",
    rating: 4.4,
    numReviews: 18
  },
  {
    name: "Fried Cauliflower",
    image: "food_20.png",
    price: 189,
    description: "Crispy cauliflower florets with a spicy coating and dipping sauce",
    category: "Pure Veg",
    rating: 4.3,
    numReviews: 15
  },
  {
    name: "Mix Veg Pulao",
    image: "food_21.png",
    price: 249,
    description: "Fragrant rice cooked with mixed vegetables and aromatic spices",
    category: "Pure Veg",
    rating: 4.5,
    numReviews: 20
  },
  
  // Pasta Category
  {
    name: "Cheese Pasta",
    image: "food_22.png",
    price: 179,
    description: "Creamy pasta with a blend of four cheeses and fresh herbs",
    category: "Pasta",
    rating: 4.7,
    numReviews: 23
  },
  {
    name: "Tomato Pasta",
    image: "food_23.png",
    price: 159,
    description: "Classic pasta with homemade tomato sauce and fresh basil",
    category: "Pasta",
    rating: 4.5,
    numReviews: 19
  },
  {
    name: "Creamy Pasta",
    image: "food_24.png",
    price: 169,
    description: "Rich and creamy pasta with garlic, parmesan, and a touch of nutmeg",
    category: "Pasta",
    rating: 4.6,
    numReviews: 21
  },
  
  // Noodles Category
  {
    name: "Butter Noodles",
    image: "food_29.png",
    price: 149,
    description: "Simple yet delicious noodles tossed in butter and herbs",
    category: "Noodles",
    rating: 4.3,
    numReviews: 16
  },
  {
    name: "Veg Noodles",
    image: "food_30.png",
    price: 129,
    description: "Stir-fried noodles with mixed vegetables in a savory sauce",
    category: "Noodles",
    rating: 4.2,
    numReviews: 14
  },
  {
    name: "Somen Noodles",
    image: "food_31.png",
    price: 209,
    description: "Thin Japanese noodles served cold with a dipping sauce",
    category: "Noodles",
    rating: 4.6,
    numReviews: 22
  },
  {
    name: "Cooked Noodles",
    image: "food_32.png",
    price: 159,
    description: "Classic noodles cooked to perfection with a flavorful broth",
    category: "Noodles",
    rating: 4.4,
    numReviews: 17
  }
];

// Function to seed data
const seedData = async () => {
  try {
    // Delete existing food items
    await FoodItem.deleteMany({});
    console.log('Deleted existing food items');
    
    // Insert new food items
    const createdFoodItems = await FoodItem.insertMany(foodItems);
    console.log(`${createdFoodItems.length} food items created!`);
    
    // Close connection
    mongoose.connection.close();
    console.log('MongoDB connection closed');
  } catch (error) {
    console.error('Error seeding data:', error);
    process.exit(1);
  }
};

// Run the seeding function
seedData();