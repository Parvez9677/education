const classSub = require("../controller/classSubject")
const express = require("express")
const rout = express.Router()


rout.post("/", classSub.add)
rout.get("/", classSub.get)
rout.put("/:id", classSub.update)
rout.delete("/:id", classSub.delete)

module.exports = rout