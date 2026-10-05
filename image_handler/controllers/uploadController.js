
const sharp = require("sharp")
const fs = require("fs")
const path = require('path')

const inspectImage  = require("../services/image.service")

exports.uploadImage = async (req, res) => {

    try {


        console.log(req.file);

        // res.json({
        //     message: "Image received successfully"
        // })

   const metadata = await inspectImage(req.file.buffer)

        return res.status(200).json({
            success:true,
            image:{
                filename:req.file.originalname,
                 mimeType: req.file.mimetype,
                size: req.file.size,

                format: metadata.format,
                width: metadata.width,
                height: metadata.height
            }
        })


        
    } catch (error) {

        return res.status(500).json({
            success:false,
            message:error.message
        })
        
    }
    
}