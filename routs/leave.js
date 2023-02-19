const leave = require("../controller/leave")
const express = require("express")
const rout = express.Router()


rout.post("/", leave.add)
rout.post("/authenticate", leave.auth)
rout.get("/", leave.get)
rout.delete("/:id", leave.delete)
rout.put("/:id", leave.update)

module.exports = rout