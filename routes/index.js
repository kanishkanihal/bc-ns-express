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

/* Auth */
router.get('/auth', (req, res, next) => {
    try {
        const data = bigCommerce.authorize(req.query);
        res.cookie('auth',data.access_token)
        res.render('integrations/auth', { title: 'Load!', data: data });
    } catch (err) {
        next(err);
    }
});

/* Load */
router.get('/load', (req, res, next) => {
  try {
    const data = bigCommerce.verify(req.query['signed_payload']);
      data.auth= req.cookies.auth;
    res.render('integrations/load', { title: 'Load!', data: data });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
