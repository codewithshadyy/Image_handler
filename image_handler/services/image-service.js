const sharp = require("sharp")

const {randomUUID} = require("crypto")
const {uploadObject, deleteObject} = require("../storage/object-storage")




async function processedProductImage(buffer, productId) {


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


    const imageId = randomUUID()
    const key = `products/${productId}/${imageId}.webp`


    await uploadObject({
        key, 
        buffer:processedImage,
        contentTYpe:"image/webp"

    })

    return{

        key,
        format: "webp",
        width: metadata.width,
        height: metadata.height,
        size: processedImage.length
    } 
    
    
}


async function deleteProduct(key) {
    await deleteObject(key)
    
}

module.exports = {processedProductImage, deleteProduct}