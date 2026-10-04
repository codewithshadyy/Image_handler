
const multer = require("multer")

exports.upload = multer({
    storage:multer.memoryStorage(),
    limits:{
        fileSize:5  * 1024 * 1024
    },
     fileFilter:(req,file, cb) => {

        const allowed = [
            "image/jpeg",
            "image/png",
            "image/webp"
        ]

        if (!allowed.includes(file.mimetype)){
             return cb(new Error("Only JPEG, PNG and WebP images are allowed"))

        }
        cb(null, true)
     }
})



