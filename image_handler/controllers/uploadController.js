
const sharp = require("sharp")
const fs = require("fs")
const path = require('path')

exports.uploadImage = async (req, res) => {

    try {


        console.log(req.file);

        res.json({
            message: "Image received successfully"
        })

        const processedImage = await sharp(req.file.buffer)
        .resize(
            {
        width: 1200,
        withoutEnlargement: true
    }
        )
        .webp({
            quality:80
        })
        .toBuffer()


        
    } catch (error) {

        return res.status(500).json({
            success:false,
            message:error.message
        })
        
    }
    
}