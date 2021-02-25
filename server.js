const express = require('express');

const app = express();

app.use(express.static('./dist/oin-spa'));


app.get('/*', function(req, res) {
  res.sendFile('index.html', {root: 'dist/oin-spa/'}
);
});

app.listen(process.env.PORT || 8080);


