const express = require('express');
const articlesRouter = express.Router();
const {authenticate} = require('../middleware/authenticate');
const {Article} = require('../models/article.model');


articlesRouter.post('/', authenticate, (req, res) => {
  console.log(req.body);

  const article = new Article({
    title: req.body.title,
    content: req.body.content,
    topic: req.body.topic,
    postDate: new Date().getTime(),
    author: 'Hector Garcia',
    excerpt: req.body.content.substring(0, 140),
    tags: req.body.tags
  });

  article
    .save()
    .then((article) => {
      res.send({article})
    })
    .catch((err) => res.status(400).send(err));
});

articlesRouter.get('/topics', (req, res) => {
  Article
    .distinct('topic')
    .then((topics) => {
      res.send(topics);
    })
    .catch((err) => {
      res.status(400).send(err);
    })
});

articlesRouter.get('/by/topic', (req, res) => {
  const topic = req.query['topic'];
  console.log(topic);
  Article
    .find({topic})
    .then((articles) => {
      if (!articles) {
        res.status(404).send('No articles found on servers.')
      } else {
        console.log('articles found', articles);
        res.send(articles);
      }
    })
    .catch((err) => {
      res.status(400).send(err);
    })

});



module.exports = {articlesRouter};
