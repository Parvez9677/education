const { func } = require("joi")
const jwt = require("jsonwebtoken")
const { QueryTypes } = require("sequelize")
const { sequelize } = require("../config/database")

function auth(permission) {
    return async function(req, res, next) {

        if (!req.header || req.header.token) {
            return res.status(401).send({ error: "token not found" })
        }

        let check = jwt.verify(req.headers.token, "pk")

        if (!check || check.error) {
            return res.status(401).send({ error: "invalid token " })
        }
        let user = await sequelize.query(`select student.id,student.Username,userrole.role_id,rolepermission.permission , permission.name as permission
    from student
    LEFT JOIN userrole
    ON student.id = userrole.user_id
   LEFT JOIN rolepermission
    ON userrole.role_id = rolepermission.role_id
    LEFT JOIN permission
    ON permission.id = rolepermission.permission where student.id =${check.id}`, {
            type: QueryTypes.SELECT,
            replacements: { key: check.id }
        }).catch((err) => { return { error: err } })
        console.log(user);
        if (!user || (user && user.error)) {
            return res.status(401).send({ error: "user not find" })
        }
        let userpermission = {};
        for (let data of user) {
            userpermission[data.permission] = 1
        }
        console.log(userpermission)

        if (permission && !userpermission[permission]) {
            return res.status(401).send("access denied")
        }

        req.userData = { id: check.id, name: user[0].name, permission: userpermission }

        next()
    }


}

module.exports = auth