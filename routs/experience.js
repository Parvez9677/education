const exp = require("../controller/experience")
const express = require("express")
const rout = express.Router()

rout.post("/", exp.addExp)
rout.get("/", exp.get)
rout.put("/:id", exp.update)
rout.delete("/:id", exp.delete)


module.exports = rout