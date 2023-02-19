const { DataTypes, Model, Sequelize, sequelize } = require("../config/database")
const XLXS = require("xlsx")
const reader = require('xlsx')
    //const file = reader.readFile("./student.xlsx")

const path = require("path")


class excel extends Model {};

excel.init({
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        Username: {
            type: DataTypes.STRING(166),
            allowNull: false,
        },
        Password: {
            type: DataTypes.STRING(166),
            allowNull: false,
        },
        Confirm_password: {
            type: DataTypes.STRING(166),
            allowNull: false,
        },
        mobile_number: {
            type: DataTypes.STRING
        },
        email_id: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false

        }
    }, {
        modelName: "excel",
        tableName: "excel",
        sequelize
    })
    //excel.sync({ force: true })

//async function add() {
// console.log( param)
// const file = reader.readFile(param)

// let data = []

// const sheets = file.SheetNames

// for (let i = 0; i < sheets.length; i++) {
//     const temp = reader.utils.sheet_to_json(
//         file.Sheets[file.SheetNames[i]])
//     temp.forEach((res) => {
//         data.push(res)
//     })
// }

// let arr = []
// for (let y of data) {
//     arr.push({
//         Username: y.Username,
//         Password: y.Password,
//         Confirm_password: y.Confirm_password,
//         mobile_number: y.mobile_number,
//         email_id: y.email_id
//     })
// }
// console.log(arr)
// let excelData = await excel.bulkCreate(arr).catch((err) => { return { error: err } })
// if (!excelData || (excelData && excelData.error)) {
//     return { error: { status: 400, message: error.message } }
// }
// return { data: excelData }
//}

module.exports = {
    // excel: {
    //     add,
    // },
    excel
}