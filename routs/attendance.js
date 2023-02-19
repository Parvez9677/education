const att = require("../controller/attendance")
const express = require("express")
const rout = express.Router()
const auth = require("../middleware/auth")

rout.post("/", auth, att.add)
rout.get("/", auth, att.get)
rout.put("/:id", auth, att.update)
rout.delete("/:id", auth, att.delete)


module.exports = rout