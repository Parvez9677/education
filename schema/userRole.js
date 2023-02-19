const { DataTypes, Model, Sequelize, sequelize } = require("../config/database")



class userRole extends Model {};

userRole.init({
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        role_id: {
            type: DataTypes.INTEGER
        },
        user_id: {
            type: DataTypes.INTEGER
        }
    }, {
        modelName: "userRole",
        tableName: "userRole",
        sequelize
    })
    //userRole.sync({ force: true })
module.exports = { userRole }