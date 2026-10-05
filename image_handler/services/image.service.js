const sharp = require("sharp")


async function inspectImage(buffer) {


    const metadata = await sharp(buffer).metadata()

    return metadata
    
}

module.exports = inspectImage