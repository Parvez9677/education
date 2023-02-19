const { DataTypes, Model, Sequelize, sequelize } = require("../config/database")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
    //const { Student } = require("../../attendance/model/attendance")
const joi = require("joi")
const validate = require("../helper/joi")
const XLXS = require("xlsx")
const { json } = require("sequelize")
const fs = require("fs")
const { User } = require("../schem  a/user")
const { emailverify } = require("../helper/email")
const otpGenerator = require("otp-generator")




function JsonToExcel(param) {
    const worksheet = XLXS.utils.json_to_sheet(param);
    const workBook = XLXS.utils.book_new();

    XLXS.utils.book_append_sheet(workBook, worksheet, "student")

    XLXS.write(workBook, { bookType: "xlsx", type: "buffer" })
    XLXS.write(workBook, { bookType: "xlsx", type: "binary" })
    XLXS.writeFile(workBook, "user.xlsx")
}
async function add(param) {
    let schema = joi.object({
        Username: joi.string().max(50).min(2).required(),
        password: joi.string().min(2),
        confirmPassword: joi.ref("password"),
        mobileNumber: joi.number(),
        emailId: joi.string()
    })
    let value = validate(param, schema)
    if (value.errMsg) {
        return { error: { status: 400, message: value.errMsg } }
    }
    //console.log(value.errMsg)

    //console.log(param)
    if (param.password !== param.confirmPassword) {
        return { error: { status: 400, message: "password doesnt match" } }
    }
    let salt = await bcrypt.genSalt(12)
    param.password = await bcrypt.hash(param.password, salt)
    param.confirmPassword = await bcrypt.hash(param.confirmPassword, salt)
    let userData = await User.create(param).catch((err) => { return { error: err } })
    if (userData.error || userData === null || !userData) {
        return { error: { status: 400, message: userData.error.message || "registration unsuccesfull" } }
    }

    return { data: userData }
}

async function get() {

    let userData = await User.findAll({ raw: true, limit: 4 }).catch((err) => { return { error: err } })
        //console.log(userData);
    if (userData.error || userData === null || !userData) {
        return { error: { status: 400, message: userData.error.message || "cant load data" } }
    }

    let jsonContent = JSON.stringify(userData)

    fs.writeFileSync("output.json", jsonContent, 'utf8', function(err) {
        if (err) {
            console.log("An error occured while writing JSON Object to File.");
            return { error: { status: 400, message: "error in writing " } }
        }

    });

    //console.log(output.json)
    //let raw = JSON.parse(userData)
    //const excel = JsonToExcel(userData)
    //console.log(jsonContent)
    return { data: "output.json" }

}


async function getExcel() {

    let userData = await User.findAll({ raw: true, limit: 4 }).catch((err) => { return { error: err } })
        //console.log(userData);
    if (userData.error || userData === null || !userData) {
        return { error: { status: 400, message: userData.error.message || "cant load data" } }

    }
    const excel = JsonToExcel(userData)
    return { data: "excel created" }

}

async function update(param1, param2) {
    let userData = await User.update(param1, { where: { id: param2 } }).catch((err) => { return { error: err } })
    if (userData.error || userData === null || !userData) {
        return { error: { status: 400, message: userData.error.message || "cant update data" } }
    }

    return { data: userData }
}

async function remove(param) {
    let userData = await User.destroy({ where: { id: param } }).catch((err) => { return { error: err } })
    if (userData.error || userData === null || !userData) {
        return { error: { status: 400, message: userData.error.message || "cant delete" } }
    }

    return { data: userData }
}

async function login(param) {
    console.log(param)
    let schema = joi.object({
        emailId: joi.string(),
        password: joi.string(),
        confirmPassword: joi.ref("password")
    })

    let joiValid = validate(param, schema)
        //console.log(joiValid);
    if (joiValid.errMsg) {
        return { error: { status: 400, message: joiValid.errMsg } }
    }

    let userData = await User.findOne({ where: { emailId: param.emailId } })
        .catch((err) => { return { error: err } })
    if (!userData || userData === null || userData.error) {
        return { error: { status: 400, message: userData.error.message || "not registered" } }
    }

    let check = await bcrypt.compare(param.password, userData.password)
    if (!check) {
        return { error: { status: 400, message: "invalid email or password" } }
    }

    let token = jwt.sign({ id: userData.id }, "pk")

    return { data: token }
}

async function chnageOtp(param) {
    console.log(param);
    let userData = await User.findOne({ where: { emailId: param.emailId } })
    console.log(userData);
    if (!userData || userData === null) {
        return { error: { status: 400, message: "user not found" } }
    }
    const otp = otpGenerator.generate(6, { alphabets: false, upperCase: false, specialChars: false });
    console.log(param);
    // var now = Date.now();
    // var expires = now + 3.6e6;

    console.log(userData);
    let hasOtp = await bcrypt.hash(otp, 5)
    let otpAdd = await User.update({ otp: hasOtp }, { where: { id: userData.id } }).catch((err) => {
        return { error: err }
    })

    if (!otpAdd || otp.error) {
        return { error: { status: 400, message: otpAdd.error.message || "cant update otp" } }
    }
    let subject = "otp for reset password";
    let mail = emailverify(subject, otp, userData.emailId)

    if (!mail) {
        return { error: { status: 400, message: "cant send mail" } }
    }

    return { data: "email has been sent on your registered email id" }
}

async function otpVerify(param) {
    console.log(param)
    let userData = await User.findOne({ where: { id: param.id } })

    if (!userData || userData === null) {
        return { error: { status: 400, message: userData.error || "cant find user" } }
    }

    let check = await bcrypt.compare(param.otp, userData.otp)
    console.log("2");
    if (!check) {
        return { error: { status: 400, message: "invalid otp" } }
    }


    param.password = await bcrypt.hash(param.password, 10)
    let newPassword = await User.update({ password: param.password, confirmPassword: param.password }, { where: { id: userData.id } }).catch((err) => { return { error: err } })

    if (!newPassword || newPassword.error) {
        return { error: { status: 400, message: newPassword.error.message || "cant update new password" } }
    }

    let updatePassword = await User.update({ otp: null }, { where: { id: userData.id } })

    if (!updatePassword || updatePassword === null) {
        return { error: { status: 400, message: "cant delete " } }
    }

    return { data: "password updated successfully" }

}



module.exports = {
    user: {
        add,
        login,
        get,
        remove,
        update,
        getExcel,
        chnageOtp,
        otpVerify
    },

}