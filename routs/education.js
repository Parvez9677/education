const education = require("../controller/education")

const express = require("express")
const rout = express.Router()


rout.post("/", education.addall)
rout.get("/", education.get)
rout.put("/:id", education.update)
rout.delete("/:id", education.delete)

module.exports = rout