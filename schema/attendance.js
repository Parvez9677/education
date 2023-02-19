const { Sequelize, sequelize, Model, DataTypes } = require("../config/database")

class attendance extends Model {};

attendance.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    staffId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    isApproved: {
        type: DataTypes.BOOLEAN,
        defaultValue: 1
    },
    isPresent: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
        defaultValue: new Date()
    },
    time: {
        type: DataTypes.TIME,
        defaultValue: Sequelize.fn("now")

    },


}, {
    modelName: "attendance",
    tableName: "attendance",
    sequelize

})

module.exports = { attendance }