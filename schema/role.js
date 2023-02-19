const { DataTypes, Model, Sequelize, sequelize } = require("../config/database")



class role extends Model {};
role.init({
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING,
            validate: {
                isIn: {
                    args: [
                        ["admin", "moderator", "user", "superAdmin", "teacher"]
                    ],
                    msg: "role doesn't exist "
                }
            }
        }
    }, {
        modelName: "role",
        tableName: "role",
        sequelize
    })
    //role.sync({ force: true })

module.exports = { role }