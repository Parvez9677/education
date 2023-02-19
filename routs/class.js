const classData = require("../controller/class")
const express = require("express")
const rout = express.Router()


rout.post("/", classData.add)
rout.get("/", classData.get)
rout.put("/:id", classData.update)
rout.delete("/:id", classData.delete)


module.exports = rout