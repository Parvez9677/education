const detail = require("../model/details")

const detailObj = {};

detailObj.add = async(req, res) => {
    let { data, error } = await detail.add(req.body).catch((err) => { return { error: err } })
    if (error) {
        return res.status(error.status).send(error.message)
    }
    return res.staus(200).send(data)
}
detailObj.update = async(req, res) => {
    let { data, error } = await detail.update(req.body, req.params.id).catch((err) => { return { error: err } })
    if (error) {
        return res.status(error.status).send(error.message)
    }
    return res.staus(200).send(data)
}
detailObj.get = async(req, res) => {
    let { data, error } = await detail.get().catch((err) => { return { error: err } })
    if (error) {
        return res.status(error.status).send(error.message)
    }
    return res.staus(200).send(data)
}
detailObj.delete = async(req, res) => {
    let { data, error } = await detail.remove(req.params.id).catch((err) => { return { error: err } })
    if (error) {
        return res.status(error.status).send(error.message)
    }
    return res.staus(200).send(data)
}

module.exports = detailObj