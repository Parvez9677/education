const staff = require("../controller/staff")
const express = require("express")
const rout = express.Router()

rout.post("/", staff.add)
rout.get("/", staff.get)
rout.put("/:id", staff.update)
rout.delete("/:id", staff.delete)

module.exports = rout