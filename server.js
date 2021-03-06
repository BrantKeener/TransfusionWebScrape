// Build our server. Connecting to mongo!

// All of our required packages
// axios - our API caller, cheerio - our scraper
const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const exphbs = require('express-handlebars');

// Spinup express, and give a port to listen to, and give a mongo URI
const app = express();
const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/TransfusionScrape';

// Middleware setup
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

// Routes
require('./routing/apiRoutes')(app);
require('./routing/scrapeRoute')(app);
require('./routing/htmlRoute')(app);

// Templating engine setup
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');
app.set('views', './public/views');

// Connect to MongoDB
mongoose.connect(MONGODB_URI, { useNewUrlParser: true});

// Server listening
app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`App running on port ${PORT}!`);
});