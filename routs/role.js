const role = require("../controller/role")
const express = require("express")
const rout = express.Router()
const auth = require("../helper/auth")


rout.post("/", role.addall)


module.exports = rout