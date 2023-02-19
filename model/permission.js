const { permission } = require("../schema/permission")



async function add(param) {
    let permitData = await permission.create(param).catch((err) => { return { error: err } })
    if (permitData.error) {
        return { error: { status: 400, message: permitData.error.message } }
    }
    return { data: permitData }

}

module.exports = {
    permission,
    add,
}