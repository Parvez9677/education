const { Squelize, sequelize, Model, DataTypes } = require("../config/database")

class education extends Model {};

education.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    quelification: {
        type: DataTypes.STRING,
        allowNull: false

    },
    instituteName: {
        type: DataTypes.STRING,

    },
    organization: {
        type: DataTypes.STRING
    },
    averageMarks: {
        type: DataTypes.INTEGER
    },
    totalMarks: {
        type: DataTypes.INTEGER
    },
    otherDetails: {
        type: DataTypes.JSON
    }

}, {
    modelName: "education",
    tableName: "education",
    sequelize
})

module.exports = { education }