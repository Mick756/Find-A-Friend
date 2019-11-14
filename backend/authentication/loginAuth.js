const API = require('../api.js');
const axios = require('axios');

const Sequelize = require('../database/sequelize.js');
const User = Sequelize.Database.User;

async function verifyToken(token) {
    let data = await axios.post("https://www.googleapis.com/oauth2/v3/tokeninfo", {id_token: token});
    return data;
}

module.exports = function (app) {

    app.post('/auth/add/user', async function (req, res) {
        let token = req.body.token;
        let user = await API.addUser(token);
        res.json(user);
    });

    app.get('/auth/has_taken_quiz/:email', async function (req, res) {
        let email = req.params.email;

        API.userExistsByEmail(email).then(result => {

            if (result.dataValues) {
                res.json({taken: result.dataValues.taken_survey, quiz: result.dataValues.survey});
            } else {
                res.json(false);
            }

        });
    });

    app.post('/auth/complete_survey/:email', async function (req, res) {
        let email = req.params.email;
        let survey = req.body;

        console.log("email", email);

        API.userExistsByEmail(email).then(result => {

            if (result.dataValues) {
                API.updateUserSurvey(email, survey);
                res.json(true);
                return;
            }
            res.json(false);
        });
    });

    app.get('/auth/all_users', async function (req, res) {
        let users = await User.findAll();
        res.json(users);
    })
};