const sharp = require("sharp")


async function processedProductImage(buffer) {


    const metadata = await sharp(buffer).metadata()

    const MAX_WIDTH = 5000
    const MAX_HEIGHT = 5000
    const MAX_PIXELS = 25_000_000


    if(!metadata.width || !metadata.height){
        throw new Error("IValid image size");
        
    }

    if(metadata.height > MAX_HEIGHT || metadata.width > MAX_WIDTH){
        throw new Error("Image dimensions are too large");
        
    }

    const pixels = metadata.height * metadata.width

    if(pixels > MAX_PIXELS){
        throw new Error("Image contain too many pixels");
        
    }

    const processedImage = await sharp(buffer)
    .resize({
        width:1600,
        height: 1600,
        fit: "inside",
        withoutEnlargement: true
    })
    .webp({
        quality:80
    })
    .toBuffer()

    return{

        buffer:processedImage,
        originalFormat: metadata.format,
        originalWidth: metadata.width,
        originalHeight: metadata.height,
        processedFormat: "webp",
        processedSize: processedImage.length
    } 
    
    
}

module.exports = processedProductImage