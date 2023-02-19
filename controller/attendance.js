const attendance = require("../model/attendance")

attObj = {}

attObj.add = async(req, res) => {
    let { data, error } = await attendance.add(req.body)
    if (error) {
        error.status = (error.status) ? error.status : 500

        return res.status(error.status).send("data cant read")
    }

    return res.status(200).send(data)
}


attObj.get = async(req, res) => {
    let { data, error } = await attendance.get()
    if (error) {
        error.status = (error.status) ? error.status : 500

        return res.status(error.status).send("data cant read")
    }

    return res.status(200).send(data)
}

attObj.update = async(req, res) => {
    let { data, error } = await attendance.update(req.body, req.params.id)
    if (error) {
        error.status = (error.status) ? error.status : 500

        return res.status(error.status).send("data cant read")
    }

    return res.status(200).send(data)
}

attObj.delete = async(req, res) => {
    let { data, error } = await attendance.remove(req.params.id)
    if (error) {
        error.status = (error.status) ? error.status : 500

        return res.status(error.status).send("data cant read")
    }

    return res.status(200).send(data)
}

module.exports = attObj