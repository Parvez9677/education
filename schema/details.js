const { Sequelize, sequelize, Model, DataTypes } = require("../config/database")

class detail extends Model {};

detail.init({
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    user_id: {
        type: DataTypes.INTEGER
    },
    first_name: {
        type: DataTypes.STRING(166),
        allowNull: false,
    },
    middle_name: {
        type: DataTypes.STRING(166),
        allowNull: false,
    },
    last_name: {
        type: DataTypes.STRING(166),
        allowNull: false,
    },
    father_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    mother_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    gender: {
        type: DataTypes.BOOLEAN,

    },
    mobile_number: {
        type: DataTypes.STRING
    },
    email_id: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false

    },
    martial_status: {
        type: DataTypes.STRING
    },
    religion: {
        type: DataTypes.STRING
    },
    cast: {
        type: DataTypes.STRING,
        defaultValue: "general"
    },
    nationality: {
        type: DataTypes.STRING,
        defaultValue: "indian"
    }
}, {
    modelName: "detail",
    tableName: "details",
    sequelize
});

module.exports = { detail }