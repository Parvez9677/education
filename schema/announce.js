const { sequelize, Sequelize, Model, DataTypes } = require("../config/database")


class Announce extends Model {};

Announce.init({
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },

    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    issuedDate: {
        type: DataTypes.DATEONLY,
        defaultValue: DataTypes.NOW
    },
    validTill: {
        type: DataTypes.DATEONLY,
    },
    isAuthenticate: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    },
    status: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    emailOption: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    classId: {
        type: DataTypes.INTEGER
    }


}, {
    modelName: "Announce",
    tableName: "announcment",
    sequelize
})


module.exports = { Announce }