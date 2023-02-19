const multer = require("multer")

let upload = function(req, res, filename) {
    let storage = multer.diskStorage({
        destination: "public/uploads",
        filename: (req, file, cb) => {
            const fileName = file.originalname.toLocaleLowerCase()
            cb(null, fileName)

        }
    })

    let uploads = multer({
        storage: storage,
        fileFilter: (req, file, cb) => {
            if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg" || file.mimetype == "image/xlsx") {
                cb(null, true)
            } else {
                cb(null, false);
                return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
            }
        }

    }).single(filename)
    return new Promise((resolve, reject) => {
        uploads(req, res, (err) => {
            if (err) {
                reject(err)
            }
            resolve(req.files)
            console.log(req.files)
        })
    })
}

module.exports = upload