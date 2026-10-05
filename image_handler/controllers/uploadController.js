
const sharp = require("sharp")
const fs = require("fs")
const path = require('path')

exports.uploadImage = async (req, res) => {

    try {


        console.log(req.file);

        // res.json({
        //     message: "Image received successfully"
        // })

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

        return res.status(200).json({
            success:true,
            image:{
                filename:req.file.originalname,
                 mimeType: req.file.mimetype,
                size: req.file.size
            }
        })


        
    } catch (error) {

        return res.status(500).json({
            success:false,
            message:error.message
        })
        
    }
    
}