const { sequelize, Sequelize, Model, DataTypes } = require("../config/database")
const validate = require("../helper/joi")
const joi = require("joi")
const { User } = require("../schema/user")
const { staff } = require("../schema/staff")

//staff.sync({ force: true })

async function add(param) {

    let schema = joi.object({
        userId: joi.number().required(),
        designation: joi.string().required(),
        joinDate: joi.date().required(),
        basicSalary: joi.number(),
        employeCode: joi.number(),
        details: joi.object()
    })
    let value = validate(param, schema)
    if (value.errMsg) {
        return { error: { status: 400, message: value.errMsg } }
    }

    let check = await User.findOne({ where: { id: param.userId } }).catch((err) => { return { error: err } })
    if (!check || (check && check.error)) {
        return ({ error: { status: 400, message: check.error.message || "invalid user" } })
    }

    let staffData = await staff.create(param).catch((err) => { return { error: err } })
    if (!staffData || (staffData && staffData.error)) {
        return ({ error: { status: 400, message: staffData.error.message } })
    }
    return ({ data: staffData })
}

async function get() {

    let staffdata = await staff.findAll().catch((err) => { return { error: err } })
    if (staffdata.error || staffdata === null || !staffdata) {
        return { error: { status: 400, message: staffdata.error.message || "cant load data" } }
    }

    return { data: staffdata }

}

async function update(param1, param2) {
    let staffdata = await staff.update(param1, { where: { id: param2 } }).catch((err) => { return { error: err } })
    if (staffdata.error || staffdata === null || !staffdata) {
        return { error: { status: 400, message: staffdata.error.message || "cant update data" } }
    }

    return { data: staffdata }
}

async function remove(param) {
    let staffdata = await staff.destroy({ where: { id: param } }).catch((err) => { return { error: err } })
    if (staffdata.error || staffdata === null || !staffdata) {
        return { error: { status: 400, message: staffdata.error.message || "cant delete" } }
    }

    return { data: staffdata }

}
module.exports = {
    Staff: {
        add,
        update,
        remove,
    },
    staff
}