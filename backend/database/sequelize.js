let fs = require("fs");
let path = require("path");
let Sequelize = require("sequelize");
let basename = path.basename(module.filename);
let db = {};

let SimpleCryptoInit = require("simple-crypto-js").default;
let simpleCrypto = new SimpleCryptoInit(SimpleCryptoInit.generateRandom(256));

let sequelize = new Sequelize({
    host: "izm96dhhnwr2ieg0.cbetxkdyhwsb.us-east-1.rds.amazonaws.com",
    username: "fwnmb9piam4a3rwv",
    password: "eirjdq02cdapstbu",
    dialect: "mysql",
    database: "xduhq956uwz7655o",
    logging: false
});

fs.readdirSync(__dirname)
    .filter(function(file) {
        return (
            file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
        );
    })
    .forEach(function(file) {
        let model = sequelize.import(path.join(__dirname, file));
        db[model.name] = model;
    });

Object.keys(db).forEach(function(modelName) {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = {
    Database: db,
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