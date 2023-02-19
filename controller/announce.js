const { announce } = require("../model/announce")


const announceObj = {}

announceObj.add = async(req, res) => {
    let { data, error } = await announce.add(req.body).catch((err) => { return { error: err } })

    if (error) {
        error.status = (error.status) ? error.status : 400
        return res.status(error.status).send(error.message)
    }

    return res.status(200).send(data)
}

announceObj.get = async(req, res) => {
    let { data, error } = await announce.get(req.body).catch((err) => { return { error: err } })

    if (error) {
        error.status = (error.status) ? error.status : 400
        return res.status(error.status).send(error.message)
    }

    return res.status(200).send(data)
}

announceObj.update = async(req, res) => {
    let { data, error } = await announce.update(req.body, req.params.id).catch((err) => { return { error: err } })

    if (error) {
        error.status = (error.status) ? error.status : 400
        return res.status(error.status).send(error.message)
    }

    return res.status(200).send("updated")

}

announceObj.delete = async(req, res) => {

    let { data, error } = await announce.remove(req.body).catch((err) => { return { error: err } })

    if (error) {
        error.status = (error.status) ? error.status : 400
        return res.status(error.status).send(error.message)
    }

    return res.status(200).send(data)
}

module.exports = announceObj