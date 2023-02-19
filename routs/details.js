const express = require("express")
const rout = express.Router()
const detail = require("../controller/details")

rout.post("/", detail.add)
rout.get("/", detail.get)
rout.delete("/:id", detail.delete)
rout.put("/:id", detail.update)


module.exports = rout