const express = require('express');
const foodItemController = require('../controllers/foodItemController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// Public routes - accessible without authentication
router
  .route('/')
  .get(foodItemController.getAllFoodItems);

router
  .route('/:id')
  .get(foodItemController.getFoodItem);

// Protected routes - only accessible by authenticated users with admin privileges
router.use(authMiddleware.protect);

// Admin only routes
router
  .route('/')
  .post(foodItemController.createFoodItem);

router
  .route('/:id')
  .patch(foodItemController.updateFoodItem)
  .delete(foodItemController.deleteFoodItem);

module.exports = router;