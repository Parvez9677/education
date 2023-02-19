const { role } = require("../schema/role")

const { permission } = require("./permission")

const { Permit } = require("./rolePermission")

//role.sync({ force: true })

async function add(param) {
    let roleData = await role.create({ name: param.name }).catch((err) => { return { error: err } })
    if (roleData.error || !roleData) {
        return { error: { status: 400, message: roleData.error.message || "cant create role" } }
    }

    for (let j in param.permissions) {
        let findpermission = await permission.findOne({ where: { id: param.permissions[j] } })
            .catch((err) => { return { error: err } })

        console.log(findpermission)
        if (findpermission === null || findpermission.error || !findpermission) {
            return { error: { status: 400, message: "invalid permission" } }

        }
    }
    let rolePermission = [];

    for (let i in param.permissions) {

        rolePermission.push({
            "role_id": roleData.id,
            "permission": param.permissions[i]
        })
    }

    let permitData = await Permit.bulkCreate(rolePermission)
        .catch((err) => { return { error: err } })
    console.log(permitData)
    if (!permitData || permitData.error || permitData === null) {
        return { status: 400, message: permitData.error || "cant create roledata" }
    }


    return { data: [roleData, permitData] }
}


module.exports = {
    role,
    add,
}