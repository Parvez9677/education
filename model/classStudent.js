const { classStudent } = require("../schema/classStudent")
const { User } = require("../schema/user")
const { Class } = require("../schema/class")
const { Op } = require("sequelize")
const Sequelize = require("sequelize")
const { param } = require("../routs/class")

async function add(param, param2) {
    let findClass = await Class.findOne({ where: { id: param.classId } }).catch(() => {
        return false;
    })
    if (!findClass) {

        return { error: { status: 400, message: "cant find class " } }
    }


    let check = await User.findAll({
        where: {
            id: {
                [Sequelize.Op.in]: [param.studentId]
            }
        }
    }).catch((err) => { return { error: err } })
    if (!check || (check.error)) {
        return { error: { status: 400, message: "cant find user" } }
    }
    console.log(check)
    let arr = []
    for (let i of param.studentId) {
        arr.push({
            studentId: i,
            classId: param.classId,
            createdby: param2


        })
    }

    let classStudentData = await classStudent.bulkCreate(arr).catch((err) => { return { error: err } })

    if (!classStudentData || (classStudentData && classStudentData.error)) {
        console.log("pooo error")
        return { error: { status: 400, message: classStudentData.error.message || "cant create class student" } }
    }

    return { data: classStudentData }
}

async function getUser(param) {

    let classData = await Class.findOne({ where: { id: param.classId } })

    if (!classData || classData == null) {
        return { error: { status: 400, message: "cant find class" } }
    }

    let studentData = await classStudent.findAll({ where: { classId: param.classId }, raw: true, attributes: ["studentId"] }).catch((err) => { return { error: err } })

    if (!studentData || studentData.error) {
        return { error: { status: 400, message: "cant find all" } }
    }

    return { data: studentData }
}
async function get() {

    let classStudentData = await classStudent.findAll().catch((err) => { return { error: err } })
    if (classStudentData.error || classStudentData === null || !classStudentData) {
        return { error: { status: 400, message: classStudentData.error.message || "cant load data" } }
    }

    return { data: classStudentData }

}

async function update(param1, param2) {
    let find = await classStudent.findOne({ where: { id: param2 } }).catch(() => {
        return false
    })

    if (find === null || !find) {
        return { error: { status: 400, message: "cannot find student" } }
    }

    let classStudentData = await classStudent.update(param1, { where: { id: param2 } }).catch((err) => { return { error: err } })
    if (classStudentData.error || !classStudentData) {
        return { error: { status: 400, message: classStudentData.error.message || "cant update data" } }
    }

    return { data: classStudentData }
}

async function remove(param) {
    let classStudentData = await classStudent.destroy({ where: { id: param } }).catch((err) => { return { error: err } })
    if (classStudentData.error || classStudentData === null || !classStudentData) {
        return { error: { status: 400, message: classStudentData.error.message || "cant delete" } }
    }

    return { data: classStudentData }

}
module.exports = {
    classStudent: {
        add,
        get,
        update,
        remove,
        getUser
    }
}