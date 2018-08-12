var express = require('express');
var app = express();

app.use("/static/index.js", express.static('build/index.min.js'));
app.use("/static/index.css", express.static(__dirname + '/index.css'));
app.get('/', (req, res) => res.sendFile(__dirname + '/index.html'))

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
