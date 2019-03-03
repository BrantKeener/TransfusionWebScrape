// Build the routes for all other API calls

// npm packages
// const axios = require('axios');

// Database requirements
const db = require('./databaseRoutes');

module.exports = (app) => {
  // GET routes
  // Get articles from DB
  app.get('/articles', (req, res) => {
    db.articleDBDownload(res);
  });

  // GET route to populate a comment given a specific ID
  app.get('/comment/:id', (req, res) => {
    db.articleCommentDownload(req, res); 
  });

  // POST routes
  // Add a note to the DB
  app.post('/articles/:id', (req, res) => {
    db.commentDBUpload(req, res);
  });

};

