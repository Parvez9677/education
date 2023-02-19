const { classSub } = require("../schema/classSubject")
const { User } = require("../schema/user")
const { Class } = require("../schema/class")


async function add(param) {
    let findUser = await User.findOne({ where: { id: param.teacherId } })
    if (!findUser || findUser === null) {
        return { error: { status: 400, message: "cant find teacher " } }
    }
    let findClass = await Class.findOne({ where: { id: param.classId } })
    if (!findClass || findClass === null) {
        return { error: { status: 400, message: "cant find class" } }
    }
    let classSubData = await classSub.create(param).catch((err) => {
        return { error: err }
    })
    if (!classSubData || (classSubData && classSubData.error)) {
        return { error: { status: 400, message: classSubData.error.message || "cant create" } }
    }
    return { data: classSubData }
}


async function get() {
    let classSubData = await classSub.findAll({ raw: true }).catch((err) => { return { error: err } })
    const sevenDaysAgo = new Date(new Date().setDate(new Date().getDate() + 1));
    console.log(sevenDaysAgo)

    if (!classSubData || (classSubData && classSubData.error)) {
        return { error: { status: 400, message: classSubData.error.message || "cant create course" } }
    }

    return { data: classSubData }
}

async function update(param1, param2) {
    let classSubData = await classSub.update(param1, { where: { id: param2 } }).catch((err) => { return { error: err } })

    if (!classSubData || (classSubData && classSubData.error)) {
        return { error: { status: 400, message: classSubData.error.message || "cant create course" } }
    }
    return { data: "info updated " }
}

async function remove(param) {
    let classSubData = await classSub.destroy({ where: { id: param } }).catch((err) => { return { error: err } })

    if (!classSubData || (classSubData && classSubData.error)) {
        return { error: { status: 400, message: classSubData.error.message || "cant create course" } }
    }
    return { data: "info updated " }
}

module.exports = {
    classsub: {
        add,
        get,
        update,
        remove
    }
}