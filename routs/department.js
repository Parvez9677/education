const dept = require("../controller/department")
const express = require("express")
const rout = express.Router()

rout.post("/", dept.addAll)

module.exports = rout