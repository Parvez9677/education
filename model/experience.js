const { DataTypes, Model, Sequelize, sequelize } = require("../config/database")
const { User } = require("./user")
const { valid } = require("../helper/experience")
const { experience } = require("../schema/experience")


//experience.sync({ force: true })

async function add(param) {
    let joivalid = valid(param)
    if (joivalid.errMsg) {
        return { error: { status: 400, message: joivalid.errMsg } }
    }

    let verify = await User.findOne({ where: { id: param.user_id } }).catch((err) => {
        return { error: err }
    })
    if (!verify || verify.error) {
        return { error: { status: 400, message: verify.error.message || "cant registor" } }
    }

    let arr = []

    for (let i in param.experience) {
        arr.push({
            user_id: param.user_id,
            title: param.experience[i].title,
            EmploymentType: param.experience[i].EmploymentType,
            CompanyName: param.experience[i].CompanyName,
            Location: param.experience[i].location,
            StartDate: param.experience[i].StartDate,
            EndDate: param.experience[i].EndDate,
            Industry: param.experience[i].Industry,
            Description: param.experience[i].Description

        })
    }

    let expData = await experience.bulkCreate(arr).catch((err) => { return { error: err } })

    if (expData.error || !expData) {
        return { error: { status: 400, message: expData.error.message } }
    }

    return { data: expData }

}

async function get() {

    let expData = await experience.findAll().catch((err) => { return { error: err } })
    if (expData.error || leaveData === null || expData) {
        return { error: { status: 400, message: expData.error.message || "cant load data" } }
    }

    return { data: expData }

}

async function update(param1, param2) {
    letexpData = await experience.update(param1, { where: { id: param2 } }).catch((err) => { return { error: err } })
    if (expData.error || expData === null || expData) {
        return { error: { status: 400, message: expData.error.message || "cant update data" } }
    }

    return { data: leaveData }
}

async function remove(param) {
    let expData = await experience.destroy({ where: { id: param } }).catch((err) => { return { error: err } })
    if (expData.error || expData === null || expData) {
        return { error: { status: 400, message: expData.error.message || "cant delete" } }
    }

    return { data: expData }

}


module.exports = {
    exp: {
        add,
        get,
        update,
        remove
    },
    experience
}