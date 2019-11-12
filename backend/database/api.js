const mongoose = require('mongoose');
const axios = require('axios');

const mongo = require('./mongo.js');

const UserData = mongo.User;

async function userExistsByUsername(username) {

    await UserData.findOne({username: username}).then(user => {

        return !!user;
    }).catch(error => {

        return false;
    });
}

async function userExistsByEmail(email) {

    await UserData.findOne( {email: email} ).then(user => {

        return !!user;
    }).catch(error => {

        return false;
    });
}

async function addUser(token) {

    let tokenInfo = await axios.post('/auth/google_token', {token: token});

    if (tokenInfo) {

        let name = tokenInfo.name;
        let email = tokenInfo.email;
        let admin = tokenInfo.admin;

        let exists = await userExistsByEmail(email);

        if (!exists) {

            const new_user = new mongo.User({
                name: name,
                email: email,
                friends: [],
                friend_requests: [],
                taken_survey: false,
                admin: admin
            });

            await mongo.save(new_user);
        }
        let user = await findUser(email);

        return user;
    } else {
        return false;
    }
}

async function findUser(email)  {

    let exists = await userExistsByEmail(email);

    if (exists) {

        return await mongo.User.findOne({ email: email })
            .then(user => {

                return user;

            }).catch(err => {});
    } else {
        return false;
    }
}

async function deleteUser(email) {

    await mongo.User.findOne({ email: email }).then(results => {
        results.forEach(result => {
            result.remove();
        });
    }).catch(error => {})
}

module.exports = {

    addUser: function (token) {
        return addUser(token);
    },

    findUser: function (email) {
        return findUser(email);
    },

    userExistsByUsername: function (username) {
        return userExistsByUsername(username);
    },

    userExistsByEmail: function (email) {
        return userExistsByEmail(email);
    },

    verifyPasswordByUsername: function (username, password) {
        return verifyPasswordByUsername(username, password);
    },

    verifyPasswordByEmail: function (email, password) {
        return verifyPasswordByEmail(email, password);
    },

};