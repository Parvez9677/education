const { assigemnet } = require("../schema/assigement")
const { classSub } = require("../schema/classSubject")
const { Class } = require("../schema/class")
const validate = require("../helper/joi")
const Joi = require("joi")

async function add(param) {

    let schema = Joi.object({
        classId: Joi.number().required(),
        question: Joi.string().required(),
        subjectId: Joi.number(),
        description: Joi.string(),
        startDate: Joi.date(),
        endDate: Joi.date(),
        isActive: Joi.boolean(),
        isDeleted: Joi.boolean(),
        createdby: Joi.number(),
        updatedby: Joi.number()

    })

    let value = validate(param, schema)
    if (value.errMsg) {
        return { error: { status: 400, message: value.errMsg } }
    }

    let findClass = await Class.findOne({ where: { id: param.classId } })
    if (!findClass || findClass === null) {
        return { error: { status: 400, message: "cant find class" } }
    }
    let findSub = await classSub.findOne({ where: { id: param.subjectId } })
    if (!findSub || findSub === null) {
        return { error: { status: 400, message: "cant find  subject" } }
    }
    let assigementData = await assigemnet.create(param).catch((err) => { return { error: err } })
    console.log(assigementData)
    if (!assigementData || (assigementData && assigementData.error.message)) {
        return { error: { status: 400, message: assigementData.error.message || "cant create" } }
    }

    return { data: assigementData }
}


async function get() {

    let assigementData = await assigemnet.findAll().catch((err) => { return { error: err } })
    if (assigementData.error || assigementData === null || !assigementData) {
        return { error: { status: 400, message: assigementData.error.message || "cant load data" } }
    }

    return { data: assigementData }

}

async function update(param1, param2) {
    let assigementData = await assigemnet.update(param1, { id: param2 }).catch((err) => { return { error: err } })
    console.log(assigementData);
    if (!assigementData || assigementData === null || assigementData.error) {
        return { error: { status: 400, message: assigementData.error.message || "cant update data" } }
    }

    return { data: assigementData }
}

async function remove(param) {

    let assigementData = await assigemnet.destroy({ id: param }).catch((err) => { return { error: err } })
    if (!assigementData || assigementData === null) {
        return { error: { status: 400, message: assigementData.error || "cant delete" } }
    }

    return { data: assigementData }

}
module.exports = {
    add,
    get,
    update,
    remove
}