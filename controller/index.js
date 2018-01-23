'use strict';

// Load DB connection from singleton
const db = require('../lib/db.js'),
    http = require('http'),
    moment = require('moment-timezone'),
    pkg = require('../package.json'),
    config = require('../config/config.json');

exports.welcome = (req, res) => {
    res.send({"success": true, "message": "Welcome to qubeWeather API v" + pkg.version});
}

exports.data_new = (req, res) => {
    if(req.headers.authorization === config.station_key){
        db.query(
            'INSERT INTO ?? (value, time) VALUES (?, NOW());',
            [
                req.body.sensor,
                req.body.value
            ],
            (err, results, fields) => {
                if(err){
                    res.status(500).send({"success": false, "message": "SQL error"});
                    throw err;
                }
                res.send({"success": true, "message": "Data inserted"});
            }
        );
    } else {
        res.status(401).send({"success": false, "message": "Not authorized"});
        throw new Error("Not authorized station from " + req.ip);
    }
};

exports.data_get_newest = (req, res) => {
    db.query(
        'SELECT ROUND(value, 2) AS value, time FROM ?? ORDER BY time DESC LIMIT 1;',
        [
            req.params.sensor
        ],
        (err, results, fields) => {
            if(err){
                res.status(500).send({"success": false, "message": "SQL error"});
                throw err;
            }
            res.send({"success": true, "data": results[0]});
        }
    );
};

exports.data_get = (req, res) => {
    db.query(
        'SELECT ROUND(value, 2) AS value, time FROM ?? WHERE time < ? AND time > ? ORDER BY time ASC;',
        [
            req.params.sensor,
            moment(new Date(req.params.end)).tz("Europe/Berlin").format('YYYY-MM-DD HH:mm:ss'),
            moment(new Date(req.params.start)).tz("Europe/Berlin").format('YYYY-MM-DD HH:mm:ss')
        ],
        (err, results, fields) => {
            if(err){
                res.status(500).send({"success": false, "message": "SQL error"});
                throw err;
            }
            res.send({"success": true, "data": results});
        }
    );
};