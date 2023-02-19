const { Staff } = require("../model/staff")

const stafObj = {}

stafObj.add = async(req, res) => {
    let { data, error } = await Staff.add(req.body).catch((err) => { return { error: err } })

    if (error) {
        error.status = (error.status) ? error.status : 500
        return res.status(error.status).send(error.message)
    }

    return res.status(200).send(data)

}

stafObj.get = async(req, res) => {
    let { data, error } = await Staff.get().catch((err) => { return { error: err } })
    if (error) {
        return res.status(error.status).send(error.message)
    }
    //let get = await course.get()
    return res.header("token", data).status(200).send(data)
}


stafObj.delete = async(req, res) => {
    let { data, error } = await Staff.remove(req.params.id).catch((err) => { return { error: err } })
    if (error) {
        return res.status(error.status).send(error.message)
    }
    //let get = await course.get()
    return res.header("token", data).status(200).send(data)
}

stafObj.update = async(req, res) => {
    let { data, error } = await Staff.update(req.body, req.params.id).catch((err) => { return { error: err } })
    if (error) {
        return res.status(error.status).send(error.message)
    }
    //let get = await course.get()
    return res.status(200).send(data)
}



module.exports = stafObj