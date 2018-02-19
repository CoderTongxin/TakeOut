const express = require('express');
const config = require('./config/index');

const port = process.env.PORT || config.build.port;

const app = express();

const router = express.Router();

router.get('/', function (req, res, next) {
  req.url = '/index.html';
  next();
});

app.use(router);

const appData = require('./data.json');
const vendor = appData.vendor;
const goods = appData.goods;
const ratings = appData.ratings;

const apiRoutes = express.Router();

apiRoutes.get('/seller', function (req, res) {
  res.json({
    errno: 0,
    data: vendor
  });
});

apiRoutes.get('/goods', function (req, res) {
  res.json({
    errno: 0,
    data: goods
  });
});

apiRoutes.get('/ratings', function (req, res) {
  res.json({
    errno: 0,
    data: ratings
  });
});

app.use('/api', apiRoutes);

app.use(express.static('./dist'));

module.exports = app.listen(port, function (err) {
  if (err) {
    console.log(err);
    return
  }
  console.log('Listening at http://localhost:' + port + '\n')
});
