const Mongo = require('mongoose');

const Schema = Mongo.Schema;
const MONGO_PORT = 27017;

let SimpleCryptoInit = require("simple-crypto-js").default;
let simpleCrypto = new SimpleCryptoInit(SimpleCryptoInit.generateRandom(256));

const UserDB = Mongo.model('User', new Schema({
    name: String,
    email: String,
    friends: Array,
    friend_requests: Array,
    taken_survey: Boolean,
    admin: Boolean
}));

function connect() {

    // Connect to MongoDB
    if (process.env.MONGODB_URI) {

        Mongo.connect(process.env.MONGODB_URI).then(() => {
            console.log("Connected to environment MongoDB.")
        }).catch((error) => {
            console.log(error);
        });
    } else {

        Mongo.connect('mongodb://localhost:' + MONGO_PORT + '/webapp', {useNewUrlParser: true, useUnifiedTopology: true}).then(() => {
            console.log("Connected to the local MongoDB on port " + MONGO_PORT + ". mongodb://localhost:" + MONGO_PORT + "/webapp");
        }).catch((error) => {
            console.log("Failed to connect to the local MongoDB on port " + MONGO_PORT + ". mongodb://localhost:" + MONGO_PORT + "/webapp");
        });
    }
}




module.exports = {
    User: UserDB,
    connect: async function() {
        await connect();
    },
    encrypt: function encrypt(plain)  {
        return simpleCrypto.encrypt(plain);
    },
    decrypt: function decrypt(encrypted) {
        return simpleCrypto.decrypt(encrypted);
    },
    save: async (user) => {
        await user.save((err, user) => {
            if (err) return false;
            return user;
        });
    },
}