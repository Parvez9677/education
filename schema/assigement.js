const { sequelize, Sequelize, Model, DataTypes } = require("../config/database")

class assigemnet extends Model {};

assigemnet.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    classId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },

    question: {
        type: DataTypes.STRING,
        allowNull: false
    },
    subjectId: {
        type: DataTypes.INTEGER
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false
    },
    startDate: {
        type: DataTypes.DATEONLY,
        defaultValue: new Date()
    },
    endDate: {
        type: DataTypes.DATEONLY,
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
        type: DataTypes.INTEGER,
    },
    updatedby: {
        type: DataTypes.INTEGER
    }
}, {
    modelName: "assigement",
    tableName: "assigement",
    sequelize
})

//assigemnet.sync({ force: true })

module.exports = { assigemnet }