const userRole = require("../controller/userRole")
const express = require("express")
const rout = express.Router()
    //const auth = require("../helper/auth")




rout.post("/", userRole.addall)


module.exports = rout