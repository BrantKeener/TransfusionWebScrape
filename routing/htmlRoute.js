// Router for loading up the page

// Require database
const db = require('./databaseRoutes');

module.exports = (app) => {
  app.get('/', (req, res) => {
    db.articleDBDownload(res);
  });
};