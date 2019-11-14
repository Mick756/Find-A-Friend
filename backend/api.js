const mysql = require('sequelize');
const axios = require('axios');

const Sequelize = require('./database/sequelize.js');
const User = Sequelize.Database.User;

async function verifyToken(token) {
    let data = await axios.post("https://www.googleapis.com/oauth2/v3/tokeninfo", {id_token: token});
    return data;
}

function userExistsByEmail(email) {
    return User.findOne( {where: {email: email}} );
}

async function addUser(token) {

    let data = await verifyToken(token);
    if (data) {

        let name = data.data.name;
        let email = data.data.email;
        User.findOrCreate({
            where: {email: email},
            defaults: {
                name: name,
                email: email,
                friends: "",
                friend_requests: "",
                survey: "",
                taken_survey: false,
            }
        }).then(user => {
            return user;
        }).catch(error => {
            console.log(error);
        });
    }
}

async function findUser(email)  {

    userExistsByEmail(email).then(result => {
        return result.dataValues;
    });
}

async function updateUserSurvey(email, update) {

    return User.update({taken_survey: true, survey: JSON.stringify(update)}, {where: { email: email }});

}

async function deleteUser(email) {

    await User.findOne({ email: email }).then(result => {
        result.remove();
    }).catch(error => {})
}

module.exports = {

    addUser: function (token) {
        return addUser(token);
    },

    findUser: (email) => {
        return findUser(email);
    },

    updateUserSurvey: (email, survey) => {
        return updateUserSurvey(email, survey);
    },

    userExistsByEmail: (email) => {
        return userExistsByEmail(email);
    },

};