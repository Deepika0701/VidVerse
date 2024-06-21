import {v2 as cloudinary} from "cloudinary"
import { response } from "express";
import fs from "fs"

    // Configuration
    cloudinary.config({ 
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
        api_key: process.env.CLOUDINARY_API_KEY, 
        api_secret: process.env.CLOUDINARY_API_SECRET // Click 'View Credentials' below to copy your API secret
    });



    const uploadOnCloudinary=async(localFilePath)=>{
        try{
          if(!localFilePath) return null;
         
          //upload the file on cloudinary
          cloudinary.uploader.upload(localFilePath,{
            resource_type:"auto"
          })

          //file has been uploaded successfully
          console.log("file is uploaded on cloudinary",
            response.url
          );
          return response;
          
        }
        catch(err){
            fs.unlinkSync(localFilePath)//remove the locally saved temporary file as the upload operation got failed
            return null;
        }
    }
    
    export {uploadOnCloudinary}

 
//  console.log(uploadResult);
//     CLOUDINARY_URL=cloudinary://241366548335537:BdSAIZM0e66ZnLIW2inIf5Uf2H4@dvoguha1k