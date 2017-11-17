require('./config/config');

const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const path = require('path');
const compression = require('compression');
const cors = require('cors');
const {mongoose} = require('./db/mongoose'); //connects to db

const {usersRouter} = require('./routes/users')
const {articlesRouter} = require('./routes/articles');

app.use(cors({origin: ['http://hectorgarcia.ca', 'http://www.hectorgarcia.ca', 'http://hectorgarcia.herokuapp.com']}));
app.use(compression());
app.use(bodyParser.json());

app.use(express.static(__dirname + '/../dist'));
app.use('/services/users', usersRouter);
app.use('/services/articles', articlesRouter);

app.listen(process.env.PORT || 8100);

//PathLocationStrategy for Angular routing (ensure angular handles routing)
app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname + '/../dist/index.html'));
});
