const mongoose = require('mongoose');
const dotenv = require('dotenv');
const FoodItem = require('./models/FoodItem');

// Load environment variables
dotenv.config({ path: './.env' });

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB for verification'))
  .catch((err) => console.error('Could not connect to MongoDB', err));

// Function to verify food items
const verifyFoodItems = async () => {
  try {
    // Get all food items
    const foodItems = await FoodItem.find();
    console.log(`Found ${foodItems.length} food items in the database`);
    
    // Count items by category
    const categoryCounts = {};
    foodItems.forEach(item => {
      if (categoryCounts[item.category]) {
        categoryCounts[item.category]++;
      } else {
        categoryCounts[item.category] = 1;
      }
    });
    
    console.log('\nItems by category:');
    Object.keys(categoryCounts).forEach(category => {
      console.log(`${category}: ${categoryCounts[category]} items`);
    });
    
    // Display a sample item from each category
    console.log('\nSample items from each category:');
    const categories = Object.keys(categoryCounts);
    for (const category of categories) {
      const sampleItem = await FoodItem.findOne({ category }).select('name price description');
      console.log(`\n${category} sample: ${sampleItem.name}`);
      console.log(`Price: ₹${sampleItem.price}`);
      console.log(`Description: ${sampleItem.description}`);
    }
    
    // Close connection
    mongoose.connection.close();
    console.log('\nMongoDB connection closed');
  } catch (error) {
    console.error('Error verifying food items:', error);
    process.exit(1);
  }
};

// Run the verification function
verifyFoodItems();