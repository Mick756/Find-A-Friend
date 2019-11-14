const express = require('express');

const Sequelize = require('./backend/database/sequelize.js');

const application = express();
const SERVER_PORT = process.env.PORT || 3001;

// Middleware
application.use(express.urlencoded({ extended: false }));
application.use(express.json());
application.use(express.static("./client/build/"));

// Connect to MongoDB
Sequelize.Database.sequelize.sync().then(function () {
    console.log("Connected to MySQL database.")
});

// Routes
require('./backend/authentication/loginAuth.js')(application);

application.get('*', function (req, res) {
     res.json(__dirname + '/client/build/index.html');
});

application.listen(SERVER_PORT, () => {
    console.log("Application started on port " + SERVER_PORT);
});
