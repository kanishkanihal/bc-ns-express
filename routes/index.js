var express = require('express');
const BigCommerce = require('node-bigcommerce');
require('dotenv').config()

const bigCommerce = new BigCommerce({
  logLevel: 'info',
  clientId: process.env.BC_CLIENT_ID,
  secret: process.env.BC_SECRET,
  callback: process.env.BC_CALLBACK,
  responseType: 'json'
});

var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Netstarter Big commerce' });
});

router.get('/auth', (req, res, next) => {
  bigCommerce.authorize(req.query)
      .then(data => res.render('integrations/auth', { title: 'Authorized!', data: data })
          .catch(next)
  )
});

module.exports = router;
