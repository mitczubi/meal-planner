const Meal = require('../models/Meal');

// @desc   Get all meals
// @route  GET /api/v1/meals
// @access Public
exports.getAllMeals = async (req, res, next) => {
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
};

// @desc   Get single meal
// @route  GET /api/v1/meals/:id
// @access Public
exports.getMeal = async (req, res, next) => {
  try {
    const meal = await Meal.findById(req.params.id);

    res.status(200).json({
      success: true,
      data: meal
    })
  } catch (err) {
    res.status(400).json({
      success: false
    });
  }
};

// @desc   Get single random meal
// @route  GET /api/v1/meals/random
// @access Public
exports.getRandomMeal = async (req, res, next) => {
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
};

// @desc   Create new meals
// @route  POST /api/v1/meals
// @access Public
exports.createMeal = async (req, res, next) => {
  const meal = await Meal.create(req.body);

  res.status(201).json({
    success: true,
    data: meal
  });
};

// @desc   Update meal
// @route  PUT /api/v1/meals/:id
// @access Public
exports.updateMeal = async (req, res, next) => {
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
};

// @desc   Delete meal
// @route  DELETE /api/v1/meals/:id
// @access Public
exports.deleteMeal = async (req, res, next) => {
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
};