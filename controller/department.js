const Department = require("../model/department")

deptObj = {}

deptObj.addAll = async(req, res) => {
    let { data, error } = await Department.obj.add(req.body).catch((err) => { return { error: err } })
    if (error) {
        return res.status(error.status).send(error.message)
    }
    return res.status(200).send(data)
}

module.exports = deptObj