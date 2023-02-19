const multer = require("multer")
const { excel } = require("../model/excel")
const XLSX = require("xlsx")
const upload = require("../helper/multer")

const excelObj = {}

excelObj.add = async(req, res, next) => {

    let path = req.file.path;
    var workBook = XLSX.readFile(path)
    var sheetName = workBook.SheetNames;
    let jsonData = XLSX.utils.sheet_to_json(
        workBook.Sheets[sheetName[0]]
    );
    if (jsonData.length === 0) {
        return res.status(400).send("xml sheets hasnt any data")
    }
    let arr = [];
    for (let i of jsonData) {
        arr.push({
            Username: i.Username,
            Password: i.Password,
            Confirm_password: i.Confirm_password,
            email_id: i.email_id
        })
    }

    let saveData = await excel.bulkCreate(arr).catch((err) => { return { error: err } })
    if (!saveData || (saveData && saveData.error)) {
        return res.status(400).send(saveData.error.message || "cant create")
    }
    return res.status(200).send(saveData)

}

var storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, "public/uploads");
    },
    filename: function(req, file, cb) {
        cb(null, Date.now() + "-" + file.originalname);
    },
});

excelObj.file = multer({ storage: storage })

module.exports = excelObj