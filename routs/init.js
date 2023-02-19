const user = require("./user")
const education = require("./education")
const detail = require("./details")
const express = require("express")
const app = express()

const userRole = require("./userRole")
const role = require("./role")
const permission = require("./permission")
const permit = require("./rolePermission")
const dept = require("./department")
const exp = require("./experience")
const doc = require("./document2")
const att = require("./attendance")
const leave = require("./leave")
const staff = require("./staff")
const excel = require("./excel")
const announce = require("./announce")
const classData = require("./class")
const course = require("./course")
const classStudent = require("./classStudent")
const classSubject = require("./classSubject")
const assigement = require("./assigement")

app.use("/role", role)

app.use("/assigement", assigement)

app.use("/permission", permission)

app.use("/role-permission", permit)

app.use("/userrole", userRole)

app.use("/classStudent", classStudent)

app.use("/classSubject", classSubject)

app.use("/class", classData)

app.use("/user", user)

app.use("/education", education)

app.use("/details", detail)

app.use("/course", course)

app.use("/department", dept)

app.use("/experience", exp)

app.use("/doc", doc)

app.use("/attendance", att)

app.use("/leave", leave)

app.use("/staff", staff)

app.use("/excel", excel)

app.use("/announce", announce)

module.exports = app