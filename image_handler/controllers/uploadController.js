
const sharp = require("sharp")
const fs = require("fs")
const path = require('path')

const {processedProductImage}  = require("../services/image-service")
const {createProduct} = require("../services/product.service")

exports.uploadImage = async (req, res) => {

    try {



        if(!req.file){
            return res.status(400).json({
                success:false,
                json:"ops an image is required"
            })
        }
      

       const  {name, price} = req.body

      if (!name || !price){
        return res.status(400).json({
            message:"Name and price fields are required"
        })
      }

    const result = await createProduct({
          name,
          price,
          imageBuffer:req.file.buffer
                   

    })

    return res.status(200).json({
        message:"product created successfully",
        data:result

    })



//    const result = await processedProductImage(req.file.buffer, 42)

//         return res.status(200).json({
//             success:true,
//             message:"Image uploaded successfully",
//             image:{

//                 originalName: req.file.originalname,

//                     originalFormat: result.originalFormat,

//                     originalWidth: result.originalWidth,

//                     originalHeight: result.originalHeight,

//                     originalSize: req.file.size,

//                     processedFormat: result.processedFormat,

//                     processedSize: result.processedSize
               
//             }
//         })


        
    } catch (error) {

        return res.status(500).json({
            success:false,
            message:"Failed to created product",
            error:error.message
        })
        
    }
    
}