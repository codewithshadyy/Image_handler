
const sharp = require("sharp")
const fs = require("fs")

exports.uploadImage = async (req, res) => {

    try {


        if(!req.file){
             return res.status(400).json({ error: 'Please upload an image.' })
        }

        const inputPath = req.file.path
        const outPutPath = `uploads/processed/${req.file.filename.split(".")[0]}.webp`

        await sharp(inputPath)
        .resize(800, 600, {
            fit:'cover',
            position:'center'
        })
        .toFormat('webp')
        .webp({quality:80})
        .toFile(outPutPath)


        fs.unlinkSync(inputPath)


        return res.status(200).status({
            success:true,
              message: 'Image uploaded and processed successfully!',
      imagePath: outputPath
        }
        )


        
    } catch (error) {

        return res.status(500).json({
            success:false,
            message:error.message
        })
        
    }
    
}