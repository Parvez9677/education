const { DataTypes, Model, Sequelize, sequelize } = require("../config/database")

class experience extends Model {};

experience.init({
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    user_id: {
        type: DataTypes.INTEGER
    },

    title: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    EmploymentType: {
        type: DataTypes.STRING
    },
    CompanyName: {
        type: DataTypes.STRING
    },
    Location: {
        type: DataTypes.STRING
    },
    StartDate: {
        type: DataTypes.DATEONLY
    },
    EndDate: {
        type: DataTypes.DATEONLY
    },
    Industry: {
        type: DataTypes.STRING
    },
    Description: {
        type: DataTypes.STRING
    }
}, {
    modelName: "experience",
    tableName: "experience",
    sequelize
})

module.exports = { experience }