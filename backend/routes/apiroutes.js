const Mongo = require('../database/mongo.js');
const API = require('../database/api.js');

let verifier = require('google-id-token-verifier');

module.exports = function (app) {

    app.get('/auth/google_token', function (req, res) {

    });
};