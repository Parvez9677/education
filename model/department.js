const { DataTypes, Model, Sequelize, sequelize } = require("../config/database")


class Department extends Model {};

Department.init({
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING(166),
        allowNull: false,
        unique: true
    },

}, {
    modelName: "Department",
    tableName: "Department",
    sequelize
})

//Department.sync({ force: true })

async function add(param) {

    let deptData = await Department.create(param).catch((err) => { return { error: err } })
    if (deptData.error || deptData === null || !deptData) {
        return { error: { status: 400, message: deptData.error.message || "registration unsuccesfull" } }
    }

    return { data: deptData }
}

module.exports = {
    obj: {
        add,
    },
    Department
}