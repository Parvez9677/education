const course = require("../controller/course")
const express = require("express")
const { add } = require("../controller/course")
const rout = express.Router()
const auth = require("../helper/auth")

rout.post("/", course.add)
rout.get("/", auth("getuser"), course.get)
rout.delete("/:id", course.delete)
rout.put("/:id", course.update)


module.exports = rout