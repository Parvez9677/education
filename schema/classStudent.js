const { extend } = require("joi")
const { Model, Sequelize, sequelize, DataTypes } = require("../config/database")

class classStudent extends Model {};

classStudent.init({
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        classId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },

        studentId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        createdby: {
            type: DataTypes.INTEGER
        },
        updatedby: {
            type: DataTypes.INTEGER
        }


    }, {
        modelName: "classStudent",
        tableName: "classStudent",
        sequelize
    })
    //classStudent.sync({ force: true })
module.exports = { classStudent }