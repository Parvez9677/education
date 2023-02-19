const { sequelize, Sequelize, Model, DataTypes } = require("../config/database")


class Class extends Model {};

Class.init({
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        className: {
            type: DataTypes.STRING
        },
        teacherId: {
            type: DataTypes.INTEGER
        },
        subjectId: {
            type: DataTypes.INTEGER
        },
        courseId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        maxStudent: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    }, {
        modelName: "Class",
        tableName: "class",
        sequelize
    })
    //Class.sync({ force: true })
module.exports = { Class }