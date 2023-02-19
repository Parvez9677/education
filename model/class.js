const validate = require("../helper/joi")
const joi = require("joi")
const { User } = require("../schema/user")
const { Op } = require("sequelize")
const { Class } = require("../schema/class")
const { Course } = require("../schema/course")
const { number } = require("joi")


async function add(param) {

    let schema = joi.object({
        courseId: joi.number().required(),
        className: joi.string().required(),
        teacherId: joi.number(),
        subjectId: joi.number(),
        maxStudent: joi.number().required()


    })
    let value = validate(param, schema)
    if (value.errMsg) {
        return { error: { status: 400, message: value.errMsg } }
    }
    //     let check = await User.findAll({
    //         where: {
    //             id: {
    //                 [Op.in]: [param.studentId]
    //             }
    //         }
    //     }).catch((err) => { return { error: err } })
    //  if (!check | (check.error)) {
    //         return { error: { status: 400, message: check.error.message } }
    //     }
    // let arr = []
    // for (let i of param.studentsId) {
    //     arr.push({
    //         studentId: i,
    //         courseId: param.courseId,


    //})
    // }

    let courseData = await Course.findOne({ where: { id: param.courseId } }).catch((err) => { return { error: err } })
    if (!courseData || (courseData && courseData.error)) {
        return ({ error: { status: 400, message: courseData.error.message || "cant create" } })
    }


    let classData = await Class.create(param).catch((err) => { return { error: err } })
    if (!classData || (classData && classData.error)) {
        return ({ error: { status: 400, message: classData.error.message || "cant create" } })
    }
    return ({ data: classData })
}
async function get() {

    let classData = await Class.findAll().catch((err) => { return { error: err } })
    if (classData.error || classData === null || !classData) {
        return { error: { status: 400, message: classData.error.message || "cant load data" } }
    }

    return { data: classData }

}

async function update(param1, param2) {
    let classData = await Class.update(param1, { where: { id: param2 } }).catch((err) => { return { error: err } })
    if (classData.error || classData === null || !classData) {
        return { error: { status: 400, message: classData.error.message || "cant update data" } }
    }

    return { data: "updated" }
}

async function remove(param) {


    let classData = await Class.destroy({ where: { id: param } }).catch((err) => { return { error: err } })

    console.log(classData)
    if (!classData | (classData && classData.error)) {
        return { error: { status: 500, message: (classData.error) || "cant delete" } }
    }

    return { data: "classData" }

}
module.exports = {
    classData: {
        add,
        get,
        update,
        remove,
    }
}