const mongoose = require('mongoose');
const validator = require('validator');

const ArticleSchema= new mongoose.Schema({
  title: {
    type: String,
    require: true,
    minlength: 1,
    maxlength: 75,
    trim: true
  },
  content: {
    type: String,
    require: true,
    minlength: 1,
    maxlength: 2000,
    trim: true
  },
  topic: {
    type: String,
    require: true,
    maxlength: 15
  },
  postDate: {
    type: Number,
    required: true,
  },
  author: {
    type: String,
    require: true,
    minlength: 1,
    maxlength: 50
  },
  excerpt: {
    type: String,
    require: true,
    minlength: 1,
    maxlength: 140
  },
  tags: {
    type: [
      {
        type: String
      }
    ]
  },
  revisedDate: {
    type: Number
  }
});

const Article = mongoose.model('Article', ArticleSchema, 'article');

module.exports = { Article };
