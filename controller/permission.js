const permission = require("../model/permission")

const permitObj = {};


permitObj.addall = async(req, res) => {
    let { data, error } = await permission.add(req.body)
    if (error) {
        return res.status(error.status).send(error.message)
    }
    return res.status(200).send(data)
}

module.exports = permitObj