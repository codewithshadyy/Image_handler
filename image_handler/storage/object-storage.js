
require("dotenv").config()
const {S3Client, PutObjectCommand, DeleteObjectCommand} = require("@aws-sdk/client-s3")

const s3 = new S3Client({

    endpoint: process.env.S3_ENDPOINT,
    region: process.env.S3_REGION,

    credentials: {
        accessKeyId: process.env.S3_ACCESS_KEY,
        secretAccessKey: process.env.S3_SECRET_KEY
    },

    forcePathStyle: true

})


const bucket = process.env.S3_BUCKET


async function uploadObject({key, buffer, contentTYpe}) {

    console.log("uploading an object.....", {
        key,
        buffer, 
        contentTYpe
    })

   await s3.send(
    new PutObjectCommand({
          Bucket: bucket,
          Key: key,
          Body: buffer,
          ContentType: contentType
    })
   )

   return {
    key
   }


    
}

async function deleteObject(key) {

    console.log("Deleting an object", key)

    await s3.send(
        new DeleteObjectCommand({
            Bucket:bucket,
            Key:key
        })
    )
    
}


module.exports = {
    uploadObject,
    deleteObject
}