const classStudent = require("../controller/classStudent")
const express = require("express")
const rout = express.Router()

rout.post("/", classStudent.add)
rout.get("/", classStudent.get)
rout.put("/:id", classStudent.update)
rout.delete("/:id", classStudent.delete)
rout.get("/getUser", classStudent.getUser)

module.exports = rout