const joi = require("joi")

function validate(param1, param2) {
    let check = param2.validate(param1, { abotEarly: false })
    if (!check || check.error) {
        let error = []
        for (let err of check.error.details) {
            error.push(err.message);
        }
        return { errMsg: error }
    }
    return true
}

module.exports = validate