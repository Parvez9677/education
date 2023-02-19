const { detail } = require("../schema/details")

async function add(param) {
    let detailData = await detail.create(param).catch((err) => {
        return { error: err }
    })
    if (detailData.error) {
        return { error: { status: 400, message: detailData.error } }
    }

    return { data: detailData }
}


async function get() {

    let detailData = await detail.findAll().catch((err) => { return { error: err } })
    if (detailData.error || detailData === null || detailData) {
        return { error: { status: 400, message: detailData.error.message || "cant load data" } }
    }

    return { data: detailData }

}

async function update(param1, param2) {
    let detailData = await detail.update(param1, { where: { id: param2 } }).catch((err) => { return { error: err } })
    if (detailData.error || detailData === null || detailData) {
        return { error: { status: 400, message: detailData.error.message || "cant update data" } }
    }

    return { data: detailData }
}

async function remove(param) {
    let detailData = await detail.destroy({ where: { id: param } }).catch((err) => { return { error: err } })
    if (detailData.error || fileData === null || detailData) {
        return { error: { status: 400, message: detailData.error.message || "cant delete" } }
    }

    return { data: detailData }

}



module.exports = {
    add,
    get,
    update,
    remove
}