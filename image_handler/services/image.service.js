const sharp = require("sharp")


async function inspectImage(buffer) {


    const metadata = await sharp(buffer).metadata()

    const MAX_WIDTH = 5000
    const MAX_HEIGHT = 5000
    const MAX_PIXELS = 25_000_000


    if(!metadata.width || !metadata.height){
        throw new Error("IValid image size");
        
    }

    if(metadata.height > MAX_HEIGHT && metadata.width > MAX_WIDTH){
        throw new Error("Image dimensions are too large");
        
    }

    const pixels = metadata.height * metadata.width

    if(pixels > MAX_PIXELS){
        throw new Error("Image contain too many pixels");
        
    }

    return metadata
    
}

module.exports = inspectImage