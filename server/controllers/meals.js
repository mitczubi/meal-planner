const ErrorResponse = require('../utils/errorResponse');
const Meal = require('../models/Meal');
const asyncHandler = require('../middleware/async');

// @desc   Get all meals
// @route  GET /api/v1/meals
// @access Public
exports.getAllMeals = asyncHandler(async (req, res, next) => {
  try {
    const meals = await Meal.find();

    res.status(200).json({
      success: true,
      data: meals
    })
  } catch (err) {
    res.status(400).json({
      success: false
    });
  }
});

// @desc   Get single meal
// @route  GET /api/v1/meals/:id
// @access Public
exports.getMeal = asyncHandler(async (req, res, next) => {
  const meal = await Meal.findById(req.params.id);

  if (!meal) {
    return next(
      new ErrorResponse(`Meal not found with id or ${req.params.id}`, 404)
    )
  }

  res.status(200).json({
    success: true,
    data: meal
  });
});

// @desc   Get single random meal
// @route  GET /api/v1/meals/random
// @access Public
exports.getRandomMeal = asyncHandler(async (req, res, next) => {
  try {
    const count = await Meal.count();
    let random = Math.floor(Math.random() * count);

    const meal = await Meal.findOne().skip(random);

    res.status(200).json({
      success: true,
      data: meal
    })
  } catch (err) {
    console.log(err);
    res.status(400).json({
      success: false
    });
  }
});

// @desc   Create new meals
// @route  POST /api/v1/meals
// @access Public
exports.createMeal = asyncHandler(async (req, res, next) => {
  const meal = await Meal.create(req.body);

  res.status(201).json({
    success: true,
    data: meal
  });
});

// @desc   Update meal
// @route  PUT /api/v1/meals/:id
// @access Public
exports.updateMeal = asyncHandler(async (req, res, next) => {
  const meal = await Meal.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  if (!meal) {
    return res.status(400).json({
      success: false
    });
  }

  res.status(200).json({
    success: true,
    data: meal
  });
});

// @desc   Delete meal
// @route  DELETE /api/v1/meals/:id
// @access Public
exports.deleteMeal = asyncHandler(async (req, res, next) => {
  try {
    const meal = await Meal.findByIdAndDelete(req.params.id);

    if (!meal) {
      return res.status(400).json({
        success: false
      });
    }

    res.status(200).json({
      success: true,
      data: []
    });
  } catch (err) {
    res.status(400).json({
      success: false
    });
  }
});