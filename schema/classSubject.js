const { sequelize, Sequelize, Model, DataTypes } = require("../config/database")

class classSub extends Model {};

classSub.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    subjectName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    teacherId: {
        type: DataTypes.INTEGER
    },
    classId: {
        type: DataTypes.INTEGER
    },
    semesterName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    isActive: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    },
    isDeleted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    createdby: {
        type: DataTypes.INTEGER
    },
    updatedby: {
        type: DataTypes.INTEGER
    }
}, {
    modelName: "classSub",
    tableName: "classSubject",
    sequelize
})

//classSub.sync({ force: true })

module.exports = { classSub }