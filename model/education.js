const { User } = require("../schema/user")
const { education } = require("../schema/education")
const joi = require("joi")
const validate = require("../helper/joi")

async function add(param) {
    let schema = joi.object({
        userId: joi.number().required(),
        quelification: joi.string().required(),
        instituteName: joi.string,
        organization: joi.string,
        averageMarks: joi.number,
        totalMarks: joi.number,
        otherDetails: joi.object()
    })
    let value = validate(param, schema)
    if (value.errMsg) {
        return { error: { status: 400, message: value.errMsg } }
    }

    let find = await User.findOne({ where: { id: param.userId } }).catch((err) => { return { error: err } })

    if (find == null || find.error) {
        return { error: { status: 400, message: find.error.message || "unregistored user" } }
    }
    array = []

    for (let i in param.education) {
        array.push({
            user_id: param.userId,
            quelification: param.education[i].quelification,
            instituteName: param.education[i].instituteName,
            organization: param.education[i].organization,
            averageMarks: param.education[i].averageMarks,
            totalMarks: param.education[i].totalMarks,
            otherDetails: param.education[i].otherDetails
        })
    }


    let eduData = await education.bulkCreate(array).catch((err) => { return { error: err } })
    if (eduData.error) {
        return { error: { status: 400, message: eduData.error.message || "cant add data" } }
    }
    return { data: eduData }
}

async function get() {
    let eduData = await education.findAll().catch((err) => { return { error: err } })
    if (eduData.error) {
        return { error: { status: 400, message: eduData.error.message || "cant add data" } }
    }
    return { data: eduData }
}



async function update(param1, param2) {
    let educationData = await education.update(param1, { where: { id: param2 } }).catch((err) => { return { error: err } })
    if (educationData.error || educationData === null || educationData) {
        return { error: { status: 400, message: educationData.error.message || "cant update data" } }
    }

    return { data: educationData }
}

async function remove(param) {
    let educationData = await education.destroy({ where: { id: param } }).catch((err) => { return { error: err } })
    if (educationData.error || educationData === null || educationData) {
        return { error: { status: 400, message: educationData.error.message || "cant delete" } }
    }

    return { data: educationData }

}



module.exports = {
    add,
    get,
    remove,
    update
}