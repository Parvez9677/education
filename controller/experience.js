const { exp } = require("../model/experience")

const expObj = {}

expObj.addExp = async(req, res) => {
    let { data, error } = await exp.add(req.body).catch((err) => { return { error: err } })
    if (error) {
        return res.status(400).send(error.message)
    }

    return res.status(200).send(data)
}


expObj.get = async(req, res) => {
    let { data, error } = await exp.get().catch((err) => { return { error: err } })
    if (error) {
        return res.status(400).send(error.message)
    }

    return res.status(200).send(data)
}


expObj.update = async(req, res) => {
    let { data, error } = await exp.update(req.body).catch((err) => { return { error: err } })
    if (error) {
        return res.status(400).send(error.message)
    }

    return res.status(200).send(data)
}


expObj.delete = async(req, res) => {
    let { data, error } = await exp.remove(req.params.id).catch((err) => { return { error: err } })
    if (error) {
        return res.status(400).send(error.message)
    }

    return res.status(200).send(data)
}

module.exports = expObj