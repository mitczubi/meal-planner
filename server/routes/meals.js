const express = require('express');
const {
  getAllMeals,
  getMeal,
  getRandomMeal,
  createMeal,
  updateMeal,
  deleteMeal
} = require('../controllers/meals');

const router = express.Router()

router.route('/')
  .get(getAllMeals)
  .post(createMeal);

router.route('/:id')
  .get(getMeal)
  .put(updateMeal)
  .delete(deleteMeal);

router.route('/meal/getRandomMeal')
  .get(getRandomMeal);

module.exports = router;