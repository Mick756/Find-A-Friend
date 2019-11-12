const express = require('express');
const passport = require('passport');

const Mongo = require('./backend/database/mongo.js');

const application = express();
const SERVER_PORT = 3001 || process.env.PORT;

// Middleware
application.use(express.urlencoded({ extended: false }));
application.use(express.json());
application.use(express.static("./client/build"));
application.use(passport.initialize(null));
application.use(passport.session(null));

// Connect to MongoDB
Mongo.connect();

// Routes
require('./backend/authentication/loginAuth.js')(application);

application.get('*', function (req, res) {
    res.sendFile(__dirname + "/client/build/index.html");
});

application.listen(SERVER_PORT, () => {
    console.log("Application started on port " + SERVER_PORT);
});
