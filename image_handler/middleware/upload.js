
const { error } = require("console")
const express = require("express")
const multer = require("multer")

const path = require("path")


const app = express()

const storage = multer.diskStorage({
    destination:(req, file, cb) => {
        cb(null, "uploads/tmp/")
    },
    filename:(req, file, cb) => {
        const uniqueSuffix = Date.now() +  '-' + Math.round(Math.random() * 1e9)
        cb(null, uniqueSuffix + path.extname(file.originalname))
    }
}
)

const fileFilter = (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|webp/
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase())
    const mimeType = allowedTypes.test(file.mimeType)


    if(extname && mimeType){
        return cb(null, true)
    }else{
        return cb(new Error("Only JPEG, JPG, PNG, and WEBP images are allowed!"))
    }

}

const upload = {
    storage:storage,
    limits:{fileSize:5 * 1024 * 1024},
    fileFilter:fileFilter

}

module.exports = upload
