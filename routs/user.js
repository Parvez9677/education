const user = require("../controller/user")
const express = require("express")
const rout = express.Router()
const auth = require("../helper/auth")


rout.post("/", user.addAll)
    //rout.post("/excel", user.addexcel)
rout.post("/login", user.login)
rout.get("/", user.get)
rout.put("/:id", user.update)
rout.delete("/:id", user.delete)
rout.get("/excel", user.excel)
rout.post("/otp", user.changeOtp)
rout.post("/verify", user.verify)


module.exports = rout