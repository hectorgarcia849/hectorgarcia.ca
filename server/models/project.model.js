const mongoose = require('mongoose');

const ProjectSchema= new mongoose.Schema({
  title: {
    type: String,
    require: true,
    minlength: 1,
    maxlength: 75,
    trim: true
  },
  topic: {
    type: String,
    require: true,
    minlength: 1,
    maxlength: 75,
    trim: true
  },
  url: {
    type: String,
    require: true,
    minlength: 1,
    maxlength: 300,
    trim: true
  },
  preview: {
    type: String,
    require: true,
    minlength: 1,
    maxlength: 300,
    trim: true
  }
});


const Project = mongoose.model('Project', ProjectSchema, 'project');

module.exports = { Project };
