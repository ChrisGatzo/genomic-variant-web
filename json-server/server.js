'use strict';
const path = require('path');
const serverless = require('serverless-http');
const bodyParser = require('body-parser');
var jsonServer = require('json-server');
const data = require('./data/data.js')
const rewriteRules = require('./routes.json');

const app = jsonServer.create()
const router = jsonServer.router(data())
const middlewares = jsonServer.defaults()

app.use(bodyParser.json())
app.use(middlewares)
app.use('/.netlify/functions/server', jsonServer.rewriter(rewriteRules))
app.use('/.netlify/functions/server', router);  // path must route to lambda
app.use(jsonServer.rewriter(rewriteRules))
app.use(router);

module.exports = app;
module.exports.handler = serverless(app);