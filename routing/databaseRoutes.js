// Route for accessing the database
const db = require('../models');


// CREATE functionality
// Add all scraped articles to DB
const articleDBUpload = (req, res) => {
  db.Article.update({ episodeNumber: req.episodeNumber }, req, {upsert: true})
    .then(() => {
      res.send('Scraped data uploaded to DB');
    })
    .catch((err) => {
      res.send(err);
    });
};

// Add a comment to the DB, and attach its id to the Article with which it is associated
const commentDBUpload = (req, res) => {
  db.Comment.create(req.body)
    .then((dbComment) => {
      return db.Article.findOneAndUpdate({ _id: req.params.id }, { comment: dbComment._id }, { new: true });
    })
    .then(() => {
      res.send('Comment added to Database.');
    })
    .catch((err) => {
      res.send(err);
    });
};

// READ functionality
// Retrieve all articles from the database
const articleDBDownload = (res) => {
  db.Article.find({})
    .then((dbArticle) => {
      dbArticle.sort((a, b) => {
        const firstCompare = a.episodeNumber;
        const secondCompare = b.episodeNumber;
        return firstCompare - secondCompare;
      });
      res.render('index', {articles: dbArticle});
    })
    .catch((err) => {
      res.json(err);
    });
};

// Retrieve a comment for a particular article
const articleCommentDownload = (req, res) => {
  db.Article.findOne( {_id: req.params.id} )
    .populate('comment')
    .then((dbArticleWithComment) => {
      res.json(dbArticleWithComment);
    })
    .catch((err) => {
      res.json(err);
    });
};

module.exports = { articleDBUpload, articleDBDownload, articleCommentDownload, commentDBUpload };