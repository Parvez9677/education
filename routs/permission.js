const permission = require("../controller/permission")
const express = require("express")
const rout = express.Router()
const auth = require("../helper/auth")



rout.post("/", permission.addall)


module.exports = rout