// Build our server. Connecting to mongo!

// All of our required packages
// axios - our API caller, cheerio - our scraper
const express = require('express');
const mongoose = require('mongoose');
const axios = require('axios');
const cheerio = require('cheerio');
const morgan = require('morgan');
const exphbs = require('express-handlebars');

// Required folders or files
const db = require('./models');
const databaseRoutes = require('./routing/databaseRoutes');
const scrapeRoute = require('./routing/scrapeRoute');

// Spinup express, and give a port to listen to, and give a mongo URI
const app = express();
const PORT = 3000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/TransfusionScrape';

// Middleware setup
app.use(morgan({ format: 'dev' }));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));
app.use(databaseRoutes);
app.use(scrapeRoute);

// Templating engine setup
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

// Connect to MongoDB
mongoose.connect(MONGODB_URI, { useNewUrlParser: true});

// Server listening
app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`App running on port ${PORT}!`);
});