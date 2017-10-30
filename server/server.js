require('./config/config');

const express = require('express');
const app = express();
const path = require('path');
const compression = require('compression');

app.use(compression());
app.use(express.static(__dirname + '/../dist'));
app.listen(process.env.PORT || 8100);

//PathLocationStrategy for Angular routing (ensure angular handles routing)
app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname + '/../dist/index.html'));
});
