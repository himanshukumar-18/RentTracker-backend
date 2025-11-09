import { v2 as cloudinary } from "cloudinary";
import fs from "fs"

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
})

const uploadFile = async (localPath) => {

    try {

        if (!localPath) {
            return null;
        }

        //upload
        const response = await cloudinary.uploader.upload(localPath,
            {
                resource_type: "auto"
            }
        )

        fs.unlinkSync(localPath);
        return response;

    } catch (error) {

        if (fs.existsSync(localPath)) {
            fs.unlinkSync(localPath)
        }

        console.error("File upload failed:", error.message)
        return null
        
    }

};

export default uploadFile 