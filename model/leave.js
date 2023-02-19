const { Sequelize, Model, sequelize, DataTypes } = require("../config/database")
const { User } = require("../schema/user")
const { emailverify } = require("../helper/email")
const bcrypt = require("bcrypt")
const leaveObj = require("../controller/leave")
const { Leave } = require("../schema/leave")


//Leave.sync({ force: true })
async function add(param) {

    //authenticate student
    let find = await User.findOne({ where: { id: param.student_id } })
        .catch((err) => { return { error: err } })
    if (!find || find.error) {
        return { error: { status: 400, message: find.error.message } }
    }


    let otp = (Math.random() + 1).toString(36).substring(7);
    let salt = await bcrypt.genSalt(5)
    otp = await bcrypt.hash(otp, salt)
    param.otp = otp


    //creating leave data
    let leaveData = await Leave.create(param).catch((err) => { return { error: err } })
    if (!leaveData || leaveData === leaveData.error) {
        return { error: { status: 400, message: leaveData.error.message } }
    }
    //console.log(leaveData)
    //generating random otp

    let subject = "mail for authentication of leave"



    let sent = await emailverify(subject, otp)


    let otpData = await Leave.update({ otp: otp }, { where: { student_id: leaveData.student_id } })
        .catch((err) => { return { error: err } })
    if (otpData.error || !otpData) {
        return { error: { status: 400, message: otp.error.message } }
    }

    return { data: "leave recorded successfully" }

}

async function authenticate(param) {
    let find = await Leave.findOne({ where: { student_id: param.student_id } })
        .catch((err) => { return { error: err } })
    if (!find || find.error) {
        return { error: { status: 400, message: find.error.message || "cant find student" } }
    }
    let verify = await bcrypt.compare(param.otp, find.otp)
    if (!verify) {
        return { error: { status: 400, message: "wrong otp please type correctone" } }
    }
    let authData = await Leave.update({ isAuthenticate: true }, { where: { student_id: find.student_id } })
        .catch((err) => { return { error: err } })
    if (authData.error || !authData) {
        return { error: { status: 400, message: authData.error.message || "cant update" } }
    }

    return { data: authData }
}
async function get() {

    let leaveData = await Leave.findAll().catch((err) => { return { error: err } })
    if (leaveData.error || leaveData === null || leaveData) {
        return { error: { status: 400, message: leaveData.error.message || "cant load data" } }
    }

    return { data: leaveData }

}

async function update(param1, param2) {
    let leaveData = await Leave.update(param1, { where: { id: param2 } }).catch((err) => { return { error: err } })
    if (leaveData.error || leaveData === null || leaveData) {
        return { error: { status: 400, message: leaveData.error.message || "cant update data" } }
    }

    return { data: leaveData }
}

async function remove(param) {
    let leaveData = await Leave.destroy({ where: { id: param } }).catch((err) => { return { error: err } })
    if (leaveData.error || leaveData === null || leaveData) {
        return { error: { status: 400, message: leaveData.error.message || "cant delete" } }
    }

    return { data: leaveData }

}
module.exports = {
    leave: {
        add,
        authenticate,
        get,
        remove,
        update
    },
    Leave

}