module.exports = function(sequelize, DataTypes) {

    let User = sequelize.define("User", {

            name: {
                type: DataTypes.STRING,
                allowNull: false
            },

            email: {
                type: DataTypes.STRING,
                allowNull: false
            },

            friends: {
                type: DataTypes.STRING,
                allowNull: true
            },

            friend_requests: {
                type: DataTypes.STRING,
                allowNull: true
            },

            survey: {
                type: DataTypes.STRING(1000),
                allowNull: true
            },

            taken_survey: {
                type: DataTypes.BOOLEAN,
                allowNull: true
            },

        },
        {
            timestamps: false,
        });
    return User;
};
