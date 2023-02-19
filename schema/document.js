const { DataTypes, Model, Sequelize, sequelize } = require("../config/database")


class document extends Model {};

document.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    photo: {
        type: DataTypes.STRING,
        allowNull: false
    },
    leavingCertificate: {
        type: DataTypes.STRING
    },
    birthCertificate: {
        type: DataTypes.STRING,
        allowNull: false
    },
    aadharCard: {
        type: DataTypes.STRING,
        allowNull: false
    },
    markSheet: {
        type: DataTypes.STRING,
        allowNull: false
    }

}, {
    tableName: "documents",
    modelName: "document",
    sequelize
})

module.exports = { document }