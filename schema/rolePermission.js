const { sequelize, Sequelize, Model, DataTypes } = require("../config/database")
class Permit extends Model {};
Permit.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    role_id: {
        type: DataTypes.INTEGER
    },
    permission: {
        type: DataTypes.INTEGER
    }
}, {
    modelName: "Permit",
    tableName: "rolePermission",
    sequelize
})

//Permit.sync({ force: true })

module.exports = { Permit }