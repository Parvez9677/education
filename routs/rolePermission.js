const permit = require("../controller/rolePermission")
const express = require("express")
const rout = express.Router()
const auth = require("../helper/auth")



rout.post("/", permit.addall)
rout.post("/update", permit.update)

module.exports = rout