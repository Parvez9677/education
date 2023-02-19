const announce = require("../controller/announce")
const express = require("express")
const rout = express.Router()

rout.post("/", announce.add)
rout.get("/", announce.get)
rout.delete("/:id", announce.delete)
rout.put("/:id", announce.update)

module.exports = rout