const doc = require("../controller/document2")
const express = require("express")
const rout = express.Router()


rout.post("/", doc.addFiles)
rout.get("/", doc.get)
rout.delete("/:id", doc.delete)
rout.put("/:id", doc.update)

module.exports = rout