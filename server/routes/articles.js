const express = require('express');
const articlesRouter = express.Router();
const {authenticate} = require('../middleware/authenticate');
const {Article} = require('../models/article.model');
const _ = require('lodash');
const nl2br = require('nl2br');

articlesRouter.post('/', authenticate, (req, res) => {
  const article = new Article({
    title: req.body.title,
    content: nl2br(req.body.content),
    topic: req.body.topic.toLowerCase(),
    postDate: new Date().getTime(),
    author: 'Hector Garcia',
    excerpt: req.body.content.substring(0, 140),
    tags: req.body.tags
  });

  console.log(nl2br(req.body.content));

  article
    .save()
    .then((article) => {
      res.send({article})
    })
    .catch(
      (err) => {
        console.log(err);
        res.status(400).send(err);
      }
    );
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

articlesRouter.patch('/by/article', authenticate, (req, res) => {
  const article_id = req.query['_id'];
  const body = _.pick(req.body, ['topic', 'title', 'tags', 'content']);
  body.content = nl2br(body.content);
  const revisedDate = new Date().getTime();
  Article
    .findByIdAndUpdate(article_id, {$set: body, revisedDate}, {new: true})
    .then((article) => {
      if (article) {
        res.send({article});
      } else {
        res.status(404).send();
      }
    })
    .catch((e) => {
      res.status(400).send((e));
    });
});

articlesRouter.delete('/by/article', authenticate, (req, res) => {
  const article_id = req.query['_id'];
  Article
    .findByIdAndRemove(article_id)
    .then((article) => {
      if (article) {
        res.send({article});
      } else {
        res.status(404).send();
      }
    })
    .catch((e) => {
      res.status(400).send((e));
    })
});


module.exports = {articlesRouter};
