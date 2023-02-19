const { DataTypes, Model, Sequelize, sequelize } = require("../config/database")


class staff extends Model {};

staff.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    designation: {
        type: DataTypes.STRING
    },
    joinDate: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    basicSalary: {
        type: DataTypes.INTEGER
    },
    employeCode: {
        type: DataTypes.INTEGER
    },
    details: {
        type: DataTypes.JSON
    }

}, {
    modelName: "staff",
    tableName: "staff",
    sequelize
})

module.exports = { staff }