const jwt = require("jsonwebtoken")

async function auth(req, res, next) {
    console.log(req.headers)
    if (!req.header || req.header.token) {
        return res.status(401).send({ error: "token not found" })
    }

    let check = jwt.verify(req.headers.token, "pk")

    if (!check || check.error) {
        return res.status(401).send({ error: "invalid token " })
    }

    req.body.id = check.id
        //console.log(req.body.id)
        //req.userData = { id: check.id }
    next()
}

module.exports = auth