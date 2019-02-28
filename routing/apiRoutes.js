// Build the routes for all other API calls

// npm packages
// const axios = require('axios');

// Database requirements
const db = require('./databaseRoutes');

module.exports = (app) => {
  app.get('/articles', (req, res) => {
    db.articleDBDownload(res);
  });
};
