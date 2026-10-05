
const sharp = require("sharp")
const fs = require("fs")
const path = require('path')

const {processedProductImage}  = require("../services/image-service")

exports.uploadImage = async (req, res) => {

    try {



        if(!req.file){
            return res.status(400).json({
                success:false,
                json:"ops an image is required"
            })
        }
        console.log(req.file);

        // res.json({
        //     message: "Image received successfully"
        // })

   const result = await processedProductImage(req.file.buffer, 42)

        return res.status(200).json({
            success:true,
            message:"Image uploaded successfully",
            image:{

                originalName: req.file.originalname,

                    originalFormat: result.originalFormat,

                    originalWidth: result.originalWidth,

                    originalHeight: result.originalHeight,

                    originalSize: req.file.size,

                    processedFormat: result.processedFormat,

                    processedSize: result.processedSize
               
            }
        })


        
    } catch (error) {

        return res.status(500).json({
            success:false,
            message:error.message
        })
        
    }
    
}