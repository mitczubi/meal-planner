const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const cors = require('cors');

const connectDB = require('./config/db');
const errorHandler = require('./middleware/error');

// Load env vars
dotenv.config({
  path: './config/config.env'
});

// Connect to database
connectDB();

// Route Files
const meals = require('./routes/meals');
const auth = require('./routes/auth');

const app = express();

// Body parser
app.use(express.json());

// Dev logging middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Use cors if not in production
if (process.env.NODE_ENV !== 'production') {
  app.use(cors());
}

// Mount routers
app.use('/api/v1/meals', meals);
app.use('/api/v1/auth', auth);

app.use(errorHandler);

const PORT = process.env.PORT || 8081;

const server = app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
)