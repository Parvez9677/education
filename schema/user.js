const { DataTypes, Model, Sequelize, sequelize } = require("../config/database")


class User extends Model {};

User.init({
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        Username: {
            type: DataTypes.STRING(166),
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING(166),
            allowNull: false,
        },
        confirmPassword: {
            type: DataTypes.STRING(166),
            allowNull: false,
        },
        mobileNumber: {
            type: DataTypes.STRING
        },
        emailId: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false

        },
        otp: {
            type: DataTypes.STRING,
            defaultValue: null

        }
    }, {
        modelName: "User",
        tableName: "student",
        sequelize
    })
    //User.sync({ force: true })
module.exports = { User }