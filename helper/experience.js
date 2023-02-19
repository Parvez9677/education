const joi = require("joi")

function valid(param) {
    let schema = joi.object({
        userId: joi.number().required(),
        title: joi.string(),
        EmploymentType: joi.string(),
        companyName: joi.string(),
        Location: joi.string(),
        StartDate: joi.date(),
        EndDate: joi.date(),
        Industry: joi.string(),
        Description: joi.string(),
    })
    let check = schema.validate(param, { abotEarly: false })
    if (!check || check.error) {
        let error = []
        for (let err of check.error.details) {
            error.push(err.message);
        }
        return { errMsg: error }
    }
    return true
}

module.exports = valid