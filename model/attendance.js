const { TIME } = require("sequelize")
const { attendance } = require("../schema/attendance")
    //attendance.sync({ force: true })
async function add(param) {

    let arr = []
    for (let i in param.attendance) {
        arr.push({
            staffId: param.attendance[i].staffId,
            isPresent: true,
            Date: param.Date
        })
    }

    let attData = await attendance.bulkCreate(arr).catch((err) => { return { error: err } })
    if (!attData || attData.error) {
        return { error: { status: 400, message: attData.error.message || "cant create" } }
    }

    return { data: attData }
}


async function get() {

    let attData = await attendance.findAll().catch((err) => { return { error: err } })
    if (attData.error || attData === null || !classData) {
        return { error: { status: 400, message: attData.error.message || "cant load data" } }
    }

    return { data: attData }

}

async function update(param1, param2) {
    let attData = await attendance.update(param1, { where: { id: param2 } }).catch((err) => { return { error: err } })
    if (attData.error || attData === null || !attData) {
        return { error: { status: 400, message: attData.error.message || "cant update data" } }
    }

    return { data: attData }
}

async function remove(param) {
    let attData = await attendance.destroy({ where: { id: param } }).catch((err) => { return { error: err } })
    if (attData.error || attData === null || !attData) {
        return { error: { status: 400, message: attData.error.message || "cant delete" } }
    }

    return { data: attData }

}
module.exports = {
    add,
    get,
    update,
    remove
}