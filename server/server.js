require('./config/config');

const express = require('express');
const app = express();
const path = require('path');
// const compression = require('compression');
const cors = require('cors');
const {mongoose} = require('./db/mongoose'); //connects to db

const {usersRouter} = require('./routes/users');
const {articlesRouter} = require('./routes/articles');
const {uploadProjectRouter} = require('./routes/upload-project');
const {picturesRouter} = require('./routes/pictures');

app.use(cors({origin: ['http://hectorgarcia.ca', 'http://www.hectorgarcia.ca', 'http://hectorgarcia.herokuapp.com', 'http://localhost:8100']}));
// app.use(compression());

app.use(express.static(__dirname + '/../dist'));
app.use('/services/users', usersRouter);
app.use('/services/articles', articlesRouter);
app.use('/services/uploadproject', uploadProjectRouter);
app.use('/services/pictures', picturesRouter);

app.listen(process.env.PORT || 8100);

//PathLocationStrategy for Angular routing (ensure angular handles routing)
app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname + '/../dist/index.html'));
});
