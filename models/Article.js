// A model for scrapped articles
const mongoose = require('mongoose');

// Build a reference to the Scehma constructor
const Schema = mongoose.Schema;

// Build the new object that will act really similar to a sequelize model
const ArticleSchema = new Schema ({
  title: {
    type: String,
    required: true
  },
  interviewee: {
    type: String,
  },
  dateReleased: {
    type: String
  },
  URL: {
    type: String,
    required: true
  },
  comment: {
    type: Schema.Types.ObjectId,
    ref: 'Comment'
  }
});

// Create the model utilizing mongoose's model method, and have it utilize the above schema
const Article = mongoose.model('Article', ArticleSchema);

module.exports = Article;