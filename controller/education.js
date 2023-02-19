const education = require("../model/education")

const eduObj = {};

eduObj.addall = async(req, res) => {
    let { data, error } = await education.add(req.body).catch((err) => { return { error: err } })
    if (error) {
        return res.status(error.status).send(error.message)
    }
    return res.status(200).send(data)
}
eduObj.get = async(req, res) => {
    let { data, error } = await education.get().catch((err) => { return { error: err } })
    if (error) {
        return res.status(error.status).send(error.message)
    }

    return res.status(200).send(data)
}


eduObj.update = async(req, res) => {
    let { data, error } = await education.update(req.body, req.params.id).catch((err) => { return { error: err } })
    if (error) {
        return res.status(error.status).send(error.message)
    }

    return res.status(200).send(data)
}


eduObj.delete = async(req, res) => {
    let { data, error } = await education.remove(req.params.id).catch((err) => { return { error: err } })
    if (error) {
        return res.status(error.status).send(error.message)
    }

    return res.status(200).send(data)
}
module.exports = eduObj