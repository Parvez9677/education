const joi = require("joi")
const validate = require("../helper/joi")
const { emailverify } = require("../helper/email")
const { User } = require("./user")
const { date } = require("joi")
const { raw } = require("express")
const { Worker } = require("worker_threads")
let worker = new Worker("./worker.js");
const { Class } = require("./class")
const { Op } = require("sequelize")
const { Announce } = require("../schema/announce")



async function add(param) {
    let schema = joi.object({
        title: joi.string().required(),
        description: joi.string().required(),
        userId: joi.number().required(),
        validTill: joi.date(),
        classId: joi.number(),
        emailOption: joi.boolean()

    })

    let value = validate(param, schema)
    if (value.errMsg) {
        return { error: { status: 400, message: value.errMsg } }
    }

    let announceData = await Announce.create(param).catch((err) => { return { error: err } })

    if (!announceData | (announceData && announceData.error)) {
        return { error: { status: 400, message: announceData.error.message || "cant create " } }
    }

    if (param.emailOption == true) {
        let find = await Class.findAll({ where: { courseId: param.classId }, attributes: ["studentId"], raw: true }).catch((err) => { return { error: err } })
        if (!find | (find && find.error)) {
            return { error: { status: 400, message: find.error.message | "cant find" } }
        }

        let datArray = []
            // }).catch((err) => { return { error: err } })
        for (let j of find) {
            let email = await User.findOne({ where: { id: j.studentId }, attributes: ["email_id"], raw: true })
            datArray.push(email.email_id)
        }
        for (let i of datArray) {
            worker.on("message", (i) => {
                console.log("mail sent")
            })
            let sendEmail = emailverify(param.title, param.description, i)

        }


    }


    return { data: announceData }
}

async function get(param = {}) {
    if (param == {}) {
        var announceData = await Announce.findOne({ where: { id: param.id } }).catch((err) => { return { error: err } })
    } else {
        var announceData = await Announce.findAll().catch((err) => { return { error: err } })
    }

    if (!announceData | (announceData && announceData.error)) {
        return { error: { status: 400, message: announceData.error.message | "cant find " } }
    }

    return { data: announceData }
}

async function update(param1, param2) {

    let announceData = await Announce.update(param1, { where: { id: param2 } }).catch((err) => { return { error: err } })

    if (!announceData || (announceData && announceData.error)) {
        return { error: { status: 400, message: announceData.error.message } }
    }

    return { data: announceData }
}

async function remove(param) {
    let announceData = await Announce.destroy({ where: { id: param } }).catch((err) => { return { error: err } })

    if (!announceData || (announceData && announceData.error)) {
        return { error: { status: 400, message: announceData.error.message | "cant delete" } }
    }

    return { data: announceData }
}


module.exports = {
    announce: {
        add,
        get,
        update,
        remove
    }
}