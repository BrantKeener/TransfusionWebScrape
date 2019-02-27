// A model for user-added comments
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const CommentSchema = new Schema ({
  title: String,
  body: String,
  author: String
});

const Comment = mongoose.model('Comment', CommentSchema);

module.exports = Comment;