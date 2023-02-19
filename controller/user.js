const { user } = require("../model/user")
const { excel } = require("../model/excel")
const express = require("express")
    //const folderpath = __dirname
const fs = require("fs")


let userObj = {}

userObj.addAll = async(req, res) => {
        let { data, error } = await user.add(req.body).catch((err) => { return { error: err } })
        if (error) {
            return res.status(error.status).send(error.message)
        }
        return res.status(200).send(data)
    }
    // userObj.addexcel = async(req, res) => {
    //     let iop = req.file

//     let { data, error } = await excel.add(req.file).catch((err) => { return { error: err } })
//     if (error) {
//         return res.status(400).send(error.message)
//     }
//     return res.status(200).send(data)
// }

userObj.login = async(req, res) => {
    let { data, error } = await user.login(req.body).catch((err) => { return { error: err } })
    if (error) {
        return res.status(error.status).send(error.message)
    }
    //let get = await course.get()
    return res.header("token", data).status(200).json(data)
}

// const abbc = require("../output.json")

userObj.get = async(req, res) => {
    let { data, error } = await user.get().catch((err) => { return { error: err } })
    if (error) {
        return res.status(400).send(error.message)
    }

    const path = `/verticle/${data}`
        //let get = await course.get()
    return res.download(path, function(err) {
        if (err) {
            console.log(err);
            return res.status(400).send(err)
        }


        fs.unlinkSync(path, function(err) {
            if (err) {
                console.error(err);
                console.log('File not found');
            } else {
                console.log('File Delete Successfuly');
            }
        });


    })
}

userObj.excel = async(req, res) => {
    let { data, error } = await user.getExcel().catch((err) => { return { error: err } })
    if (error) {
        return res.status(error.status).send(error.message)
    }
    //let get = await course.get()
    return res.status(200).send(data)
}

userObj.update = async(req, res) => {
    let { data, error } = await user.update(req.body, req.params.id).catch((err) => { return { error: err } })
    if (error) {
        return res.status(error.status).send(error.message)
    }
    //let get = await course.get()
    return res.status(200).send(data)
}


userObj.delete = async(req, res) => {
    let { data, error } = await user.remove(req.params.id).catch((err) => { return { error: err } })
    if (error) {
        return res.status(error.status).send(error.message)
    }
    //let get = await course.get()
    return res.status(200).send(data)
}

userObj.changeOtp = async(req, res) => {
    let { data, error } = await user.chnageOtp(req.body).catch((err) => { return { error: err } })
    if (error) {
        return res.status(400).send(error.message)
    }
    return res.status(200).json(data)
}

userObj.verify = async(req, res) => {
    console.log(req.header);
    let { data, error } = await user.otpVerify(req.body).catch((err) => { return { error: err } })
    if (error) {
        return res.status(500).send(error.message)
    }
    return res.status(200).send(data)

}

module.exports = userObj