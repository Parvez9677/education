const excel = require("../controller/excel")
const express = require("express")
const rout = express.Router()


rout.post("/add", excel.file.single("file"), excel.add)

module.exports = rout