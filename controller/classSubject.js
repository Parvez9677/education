const { classsub } = require("../model/classSubject")

let classSubObj = {}

classSubObj.add = async(req, res) => {
    let { data, error } = await classsub.add(req.body).catch((err) => {
        return { error: { error: err } }
    })
    if (error) {
        error.status = (error.status) ? error.status : 400
        return res.status(error.status).send(error.message)
    }

    return res.status(200).send(data)
}


classSubObj.get = async(req, res) => {
    let { data, error } = await classsub.get().catch((err) => {
        return { error: { error: err } }
    })
    if (error) {
        error.status = (error.status) ? error.status : 400
        return res.status(error.status).send(error.message)
    }

    return res.status(200).send(data)
}


classSubObj.update = async(req, res) => {
    let { data, error } = await classsub.update(req.body, req.params.id).catch((err) => {
        return { error: { error: err } }
    })

    if (error) {
        error.status = (error.status) ? error.status : 400
        return res.status(error.status).send(error.message)
    }
    console.log("bad")
    return res.status(200).send(data)
}


classSubObj.delete = async(req, res) => {
    let { data, error } = await classsub.remove(req.params.id).catch((err) => {
        return { error: { error: err } }
    })
    if (error) {
        error.status = (error.status) ? error.status : 400
        return res.status(error.status).send(error.message)
    }

    return res.status(200).send(data)
}

module.exports = classSubObj