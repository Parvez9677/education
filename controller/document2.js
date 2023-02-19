const { document } = require("../schema/document")
const { doc } = require("../model/document2")

const upload = require("../helper/multer")
const path = require("path")

let docObj = {}


docObj.addFiles = async(req, res, next) => {



    let fieldName = [{
            name: "photo",
            maxCount: 1
        },
        {

            name: "leavingCertificate",
            maxCount: 1
        },
        {
            name: "birthCertificate",
            maxCount: 1

        },
        {
            name: "aadharCard",
            maxCount: 2
        },
        {
            name: "markSheet",
            maxCount: 1
        }
    ]
    let files = await upload(req, res, fieldName).catch((err) => { return { error: err } })

    if (files.error) {
        return { error: { status: 400, message: files.error.message } }
    }

    let addFiles = await document.create({
        userId: req.body.userId,
        photo: files.photo[0].path,
        leavingCertificate: files.leavingCertificate[0].path,
        birthCertificate: files.birthCertificate[0].path,
        aadharCard: files.aadharCard[0].path,
        markSheet: files.markSheet[0].path
    }).catch((err) => { return { error: err } })

    console.log(addFiles)

    if (!addFiles || addFiles.error) {
        return res.status(400).send("cant upload")
    }
    return res.status(200).json({ jsi: files })
}


docObj.get = async(req, res) => {
    let { data, error } = await doc.get()
    if (error) {
        return res.status(error.status).send(error.message)
    }
    return res.status(200).send(data)
}
docObj.update = async(req, res) => {
    let { data, error } = await doc.update(req.body, req.params.id)
    if (error) {
        return res.status(error.status).send(error.message)
    }
    return res.status(200).send(data)
}

docObj.delete = async(req, res) => {
    let { data, error } = await doc.remove(req.params.id)
    if (error) {
        return res.status(error.status).send(error.message)
    }
    return res.status(200).send(data)
}
module.exports = docObj