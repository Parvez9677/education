const { Sequelize, sequelize, DataTypes, Model } = require("../config/database")

class Course extends Model {}

Course.init({
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false

        },
        courseName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        duration: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        description: {
            type: DataTypes.STRING
        }
    }, {
        modelName: "Course",
        tableName: "Course",
        sequelize
    })
    //Course.sync({ force: true })
module.exports = { Course }