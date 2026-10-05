
const pool = require("../config/db")

const {processedProductImage} = require("./image-service")

const {deleteObject} = require("../storage/object-storage")


exports.createProduct = async ({name, price, imageBuffer}) => {

    let uploadedImageKey = null

    const  client = await pool.connect()

    try {

        await client.query('BEGIN')

        const queryText =  `INSERT INTO products (name, price) VALUES ($1, $2) RETURNING id, name, price`
        const queryValues = [name, price]
        
        const productResult = await client.query(queryText, queryValues)

        const product = productResult.rows[0]

        const image = await processedProductImage(
            imageBuffer,
            product.id
        )

        uploadedImageKey = image.key

       const imageResult = await client.query(
            `
            INSERT INTO product_images
            (
                id,
                product_id,
                object_key,
                content_type,
                file_size,
                width,
                height,
                is_primary
            )
            VALUES
            (
                gen_random_uuid(),
                $1,
                $2,
                $3,
                $4,
                $5,
                $6,
                true
            )
            RETURNING *
            `,
            [
                product.id,
                image.key,
                "image/webp",
                image.size,
                image.width,
                image.height
            ]
        )

         await client.query("COMMIT");

        return {
            product,
            image: imageResult.rows[0]
        }







        
    } catch (error) {



         await client.query("ROLLBACK");


        if (uploadedImageKey) {
            try {
                await deleteObject(uploadedImageKey);
            } catch (cleanupError) {
                console.error(
                    "Failed to cleanup uploaded image:",
                    cleanupError
                );
            }
        }

        throw error;

    } finally {
        client.release();
    }
        
    }


    
