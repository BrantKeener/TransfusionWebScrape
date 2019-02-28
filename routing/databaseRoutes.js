// Route for accessing the database
const db = require('../models');

const articleDBUpload = (result) => {
  db.Article.create(result)
    .then((dbArticle) => {
      return dbArticle;
    })
    .catch((err) => {
      return err;
    });
};

const articleDBDownload = (res) => {
  db.Article.find({})
    .then((dbArticle) => {
      res.json(dbArticle);
    })
    .catch((err) => {
      res.json(err);
    });
};

module.exports = { articleDBUpload, articleDBDownload };