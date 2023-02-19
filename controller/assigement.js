const assigemenet = require("../model/assigement")

const assigemenetObj = {}

assigemenetObj.add = async(req, res) => {
    let { data, error } = await assigemenet.add(req.body).catch((err) => { return { error: err } })

    if (error) {
        error.status = (error.status) ? error.status : 500
        return res.status(error.status).send(error.message)
    }
    return res.status(200).send(data)
}


assigemenetObj.get = async(req, res) => {
    let { data, error } = await assigemenet.get().catch((err) => { return { error: err } })

    if (error) {
        error.status = (error.status) ? error.status : 500
        return res.status(error.status).send(error.message)
    }
    return res.status(200).send(data)
}


assigemenetObj.update = async(req, res) => {
    let { data, error } = await assigemenet.update(req.body, req.params.id).catch((err) => { return { error: err } })

    if (error) {
        error.status = (error.status) ? error.status : 500
        return res.status(error.status).send(error.message)
    }
    return res.status(200).send(data)
}


assigemenetObj.delete = async(req, res) => {
    let { data, error } = await assigemenet.remove(req.params.id).catch((err) => { return { error: err } })

    if (error) {
        error.status = (error.status) ? error.status : 500
        return res.status(error.status).send(error.message)
    }
    return res.status(200).send(data)

}

module.exports = assigemenetObj