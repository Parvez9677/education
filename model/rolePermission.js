const { Permit } = require("../schema/rolePermission")



//Permit.sync({ force: true })

async function add(param) {
    let rolePermissionData = await Permit.findAll({ where: { role_id: param.role_id } })
        .catch((err) => { return { error: err } })
    if (rolePermissionData == null || rolePermissionData.error) {
        return { error: { status: 400, message: rolePermissionData.error.message || "cant find" } }
    }
    let array = []
    for (let i in param.permission) {
        array.push({
            role_id: param.role_id,
            permission: param.permission[i]
        })
    }

    let create = await Permit.bulkCreate(array).catch((err) => { return { error: err } })
    if (create.error || create === null || !create) {
        return { error: { status: 400, message: create.error.message || "cant update" } }
    }

    return { data: create }

}

async function update(param) {
    let rolePermissionData = await Permit.findAll({ where: { role_id: param.role_id } })
        .catch((err) => { return { error: err } })
    if (rolePermissionData == null || rolePermissionData.error) {
        return { error: { status: 400, message: rolePermissionData.error.message || "cant find" } }
    }
    let remove = await Permit.destroy({ where: { role_id: param.role_id } }).catch((err) => { return { error: err } })

    if (remove === null || remove.error || !remove) {
        return { error: { status: 400, message: remove.error.message || "cant delete" } }
    }

    let array = []
    for (let i in param.permission) {
        array.push({
            role_id: param.role_id,
            permission: param.permission[i]
        })
    }

    let create = await Permit.bulkCreate(array).catch((err) => { return { error: err } })
    if (create.error || create === null || !create) {
        return { error: { status: 400, message: create.error.message || "cant update" } }
    }

    return { data: create }



}
module.exports = {
    permit: {
        add,
        update
    },
    Permit
}