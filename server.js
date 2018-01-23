const express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    config = require('./config/config.json'),
    db = require('./lib/db.js'),
    pkg = require('./package.json');

// Exception Handling (gonna catch them all)
process.on('uncaughtException', (err) => {
    console.log('[ERROR] Caught Exception: ' + err);
});

// read http body
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// define routes
const routes = require('./router/');
routes(app); // register routes

// start server
app.listen(config.port || 8080);

console.log('[SERVER] qubeWeather API server started (v' + pkg.version + ')');
