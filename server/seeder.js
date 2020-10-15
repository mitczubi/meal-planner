const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Load env vars
dotenv.config({
  path: './config/config.env'
});

// Load Models
const Meal = require('./models/Meal');

// Connect to DB
mongoose.connect(
  process.env.MONGO_URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
  }
);

// Read JSON files
const meals = JSON.parse(fs.readFileSync(`${__dirname}/_data/meals.json`, 'utf-8'));

// Import into DB
const importData = async () => {
  try {
    await Meal.create(meals);

    console.log('Data imported...');
    process.exit();
  } catch (err) {
    console.error(error);
  }
}

// Delete data from DB
const deleteData = async () => {
  try {
    await Meal.deleteMany();

    console.log('Data deleted...');
    process.exit();
  } catch (err) {
    console.error(error);
  }
}

if (process.argv[2] === "-i") {
  importData();
} else if (process.argv[2] === "-d") {
  deleteData();
}