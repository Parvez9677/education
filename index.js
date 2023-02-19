const express = require("express")
const init = require("./routs/init")
const app = express()
const cors = require("cors")

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use("/", init)

app.listen(3000, () => console.log("server connected"))