const Mongo = require('../database/mongo.js');
const API = require('../database/api.js');
const axios = require('axios');

let verifier = require('google-id-token-verifier');
let clientId = '1066775516443-ir1ln4htkr7up216i8ktko452s3p0vb8.apps.googleusercontent.com';

module.exports = function (app) {

    app.post('/auth/google_token', async function (req, res) {
        let token = req.body.token;
        verifier.verify(token, clientId, function (err, tokenInfo) {
            if (err) {
                res.json(false);
                return;
            }
            if (tokenInfo) {

                let admin = tokenInfo.email === "mick756@gmail.com";

                res.json({
                    response: tokenInfo,
                    admin: admin
                });
            } else {
                res.json(false);
            }
        });
    });

    app.get("/auth/add/user/:token", async function (req, res) {

        let token = req.params.token;
        await axios.post('/auth/google_token', {token: token}).then(async function (tokenInfo) {

            if (tokenInfo) {

                let exists = await API.userExistsByEmail(tokenInfo.email);
                if (!exists) {

                    let added = await API.addUser(token);
                    console.log(added);
                    await res.json(added);

                } else {
                    let user = await API.findUser(tokenInfo.email);
                    await res.json(user);
                }

            } else {
                await res.json("Incorrect token info.");
            }

        }).catch(function (error) {res.json(error);});

    });
};