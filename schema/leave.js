const { DataTypes, Model, Sequelize, sequelize } = require("../config/database")


class Leave extends Model {};

Leave.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    student_id: {
        type: DataTypes.INTEGER,
    },
    typeOfLeave: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
            isIn: {
                args: [
                    ["sickleave", "relative marriage leave", "for family holidays", "personal family matters", "going to outstation"]
                ]
            }
        }
    },

    from: {
        type: DataTypes.DATEONLY,
        defaultValue: DataTypes.NOW
    },
    till_date: {
        type: DataTypes.DATEONLY,
    },
    description: {
        type: DataTypes.STRING(500),
    },
    otp: {
        type: DataTypes.STRING
    },
    isAuthenticate: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    isAproved: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    },
    status: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    }

}, {
    modelName: "Leave",
    tableName: "leaveManagement",
    sequelize,
    updatedAt: false,

})
module.exports = { Leave }