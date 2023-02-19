const assigement = require("../controller/assigement")
const express = require("express")
const rout = express.Router()


rout.post("/", assigement.add)
rout.get("/", assigement.get)
rout.put("/:id", assigement.update)
rout.delete("/:id", assigement.delete)


module.exports = rout