const uRole = require("../model/userRole")

const uRoleObj = {};


uRoleObj.addall = async(req, res) => {
    let { data, error } = await uRole.add(req.body)
    if (error) {
        return res.status(error.status).send(error.message)
    }
    return res.status(200).send(data)
}

module.exports = uRoleObj