// Route for accessing the database
const db = require('../models');


// CREATE functionality
// Add all scraped articles to DB
const articleDBUpload = (articles, res) => {
  let counter = 0;
  for(let i = 0; i < articles.length; i++) {
    db.Article.updateOne({ episodeNumber: articles[i].episodeNumber }, {$set: articles[i]}, {upsert: true})
      .then(() => {
        if(counter !== articles.length - 1) {
          counter++;
        } else {
          res.send('Scraped data uploaded to DB');
        }
      })
      .catch((err) => {
        res.send(err);
      });
  }
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