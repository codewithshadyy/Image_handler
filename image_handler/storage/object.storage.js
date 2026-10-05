

async function uploadObject({key, buffer, contentTYpe}) {

    console.log("uploading an object.....", {
        key,
        buffer, 
        contentTYpe
    })

    return{
        key
    }


    
}

async function deleteObject(key) {

    console.log("Deleting an object", key)
    
}


module.exports = {
    uploadObject,
    deleteObject
}