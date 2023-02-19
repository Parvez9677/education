const role = require("../model/role")

const roleObj = {};


roleObj.addall = async(req, res) => {
    let { data, error } = await role.add(req.body)
    if (error) {
        return res.status(error.status).send(error.message)
    }
    return res.status(200).send(data)
}

module.exports = roleObj