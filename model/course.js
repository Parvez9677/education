const { Course } = require("../schema/course")

async function add(param) {
    let courseData = await Course.create(param).catch((err) => { return { error: err } })
    if (!courseData || (courseData && courseData.error)) {
        return { error: { status: 400, message: courseData.error.message || "cant create course" } }
    }

    return { data: courseData }
}

async function get() {
    let courseData = await Course.findAll({ raw: true }).catch((err) => { return { error: err } })

    if (!courseData || (courseData && courseData.error)) {
        return { error: { status: 400, message: courseData.error.message || "cant create course" } }
    }

    return { data: courseData }
}

async function update(param1, param2) {
    let courseData = await Course.update(param1, { where: { id: param2 } }).catch((err) => { return { error: err } })

    if (!courseData || (courseData && courseData.error)) {
        return { error: { status: 400, message: courseData.error.message || "cant create course" } }
    }
    return { data: "info updated " }
}

async function remove(param) {
    let courseData = await Course.destroy({ where: { id: param } }).catch((err) => { return { error: err } })

    if (!courseData || (courseData && courseData.error)) {
        return { error: { status: 400, message: courseData.error.message || "cant create course" } }
    }
    return { data: "info updated " }
}

module.exports = {
    course: {
        add,
        get,
        update,
        remove
    }
}