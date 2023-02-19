const { document } = require("../schema/document")


async function get() {

    let fileData = await document.findAll().catch((err) => { return { error: err } })
    if (fileData.error || fileData === null || fileData) {
        return { error: { status: 400, message: fileData.error.message || "cant load data" } }
    }

    return { data: fileData }

}

async function update(param1, param2) {
    let fileData = await document.update(param1, { where: { id: param2 } }).catch((err) => { return { error: err } })
    if (fileData.error || fileData === null || fileData) {
        return { error: { status: 400, message: fileData.error.message || "cant update data" } }
    }

    return { data: fileData }
}

async function remove(param) {
    let fileData = await document.destroy({ where: { id: param } }).catch((err) => { return { error: err } })
    if (fileData.error || fileData === null || fileData) {
        return { error: { status: 400, message: fileData.error.message || "cant delete" } }
    }

    return { data: fileData }

}



module.exports = {
    doc: {

        get,
        update,
        remove
    },

}