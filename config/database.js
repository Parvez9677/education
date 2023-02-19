const { Sequelize, Model, DataTypes } = require("sequelize")
const sequelize = new Sequelize("mysql://root@localhost/eduProject")

sequelize.authenticate().then(() => console.log("database"))
    .catch((err) => console.log(err))

module.exports = {
    Model,
    DataTypes,
    Sequelize,
    sequelize
}