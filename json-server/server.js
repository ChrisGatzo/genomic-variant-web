'use strict';
const express = require('express');
const serverless = require('serverless-http');
const rewriteRules = require('./routes.json')
const app = express();
const data = require('./data/data.js')

const bodyParser = require('body-parser');
var jsonServer = require('json-server');

app.use(jsonServer.rewriter(rewriteRules))
app.use('/api', jsonServer.router(data()));

const router = express.Router();
router.get('/', (req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write('<h1>Hello from Express.js!</h1>');
    res.end();
});

app.use(bodyParser.json());
app.use('/.netlify/functions/server', router);  // path must route to lambda

module.exports = app;
module.exports.handler = serverless(app);