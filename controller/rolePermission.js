const { permit } = require("../model/rolePermission")

const Obj = {};


Obj.addall = async(req, res) => {
    let { data, error } = await permit.add(req.body)
    if (error) {
        return res.status(error.status).send(error.message)
    }
    return res.status(200).send(data)
}



Obj.update = async(req, res) => {
    let { data, error } = await permit.update(req.body)
    if (error) {
        return res.status(error.status).send(error.message)
    }
    return res.status(200).send(data)
}

module.exports = Obj