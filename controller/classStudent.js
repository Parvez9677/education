const { classStudent } = require("../model/classStudent")


const classStudentObj = {}

classStudentObj.add = async(req, res) => {
    let { data, error } = await classStudent.add(req.body).catch((err) => { return { error: err } })

    if (error) {
        error.status = (error.status) ? error.status : 400
        return res.status(error.status).send(error.message)
    }

    return res.status(200).send(data)
}


classStudentObj.get = async(req, res) => {
    let { data, error } = classStudent.get().catch((err) => { return { error: err } })

    if (error) {
        error.status = (error.status) ? error.status : 400
        return res.status(error.status).send(error.message)
    }

    return res.status(200).send(data)
}


classStudentObj.update = async(req, res) => {
    let { data, error } = await classStudent.update(req.body, req.params.id).catch((err) => { return { error: err } })

    if (error) {
        error.status = (error.status) ? error.status : 400
        return res.status(error.status).send(error.message)
    }

    return res.status(200).send(data)
}


classStudentObj.delete = async(req, res) => {
    let { data, error } = await classStudent.remove(req.params.id).catch((err) => { return { error: err } })

    if (error) {
        error.status = (error.status) ? error.status : 400
        return res.status(error.status).send(error.message)
    }

    return res.status(200).send(data)
}

classStudentObj.getUser = async(req, res) => {
    let { data, error } = await classStudent.getUser(req.body).catch((err) => { return { error: err } })

    if (error) {
        error.status = (error.status) ? error.status : 400
        return res.status(error.status).send(error.message)
    }

    return res.status(200).send(data)
}

module.exports = classStudentObj