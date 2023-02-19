const { leave } = require("../model/leave")


const leaveObj = {}

leaveObj.add = async(req, res) => {
    let { data, error } = await leave.add(req.body)
    if (error) {
        return res.status(error.status).send(error.message)
    }

    return res.status(200).send(data)
}
leaveObj.auth = async(req, res) => {
    let { data, error } = await leave.authenticate(req.body)
    if (error) {
        return res.status(error.status).send(error.message)
    }
    return res.status(200).send(data)
}

leaveObj.get = async(req, res) => {
    let { data, error } = await leave.get()
    if (error) {
        return res.status(error.status).send(error.message)
    }
    return res.status(200).send(data)
}
leaveObj.update = async(req, res) => {
    let { data, error } = await leave.update(req.body, req.params.id)
    if (error) {
        return res.status(error.status).send(error.message)
    }
    return res.status(200).send(data)
}

leaveObj.delete = async(req, res) => {
    let { data, error } = await leave.remove(req.params.id)
    if (error) {
        return res.status(error.status).send(error.message)
    }
    return res.status(200).send(data)
}
module.exports = leaveObj