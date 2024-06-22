import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import {uploadOnCloudinary} from "../utils/cloudinary.js"
import { ApiResponse } from "../utils/ApiResponse.js";


const registerUser = asyncHandler(async (req, res) => {
  //get userdetails from frontend
  //validation-not empty
  //check if user already exists:username,email
  //check for images, check for avatar
  //upload them to cloudinary,avatar
  //create user object-create entry in db
  //remove password and refresh token field from repsonse
  //check for user creation
  //return res

  const { fullName, email, username, password } = req.body;

  if (
    [fullName, email, username, password].some((field) => field?.trim() === "")
  ) {
    throw new ApiError(400, "All fields are required");
  }

  const existedUser = await User.findOne({
    $or: [{ username }, { email }],
  });
  if (existedUser) {
    throw new ApiError(409, "User with email or username already exists");
  }

  const avatarLocalPath=req.files?.avatar[0]?.path ;

  // const coverImageLocalPath=req.files?.coverImage[0]?.path ;

  let coverImageLocalPath;
  if(req.files && Array.isArray(req.files.coverImage) 
  && req.files.coverImage.length>0){
  coverImageLocalPath=req.files.coverImage[0].path
}

  if(!avatarLocalPath){
    throw new ApiError(400,"Avatar field is required")
  }
  
  console.log("Avatar Local Path:", avatarLocalPath);


  const avatar= await uploadOnCloudinary(avatarLocalPath);
  console.log("Avatar Cloudinary Response:", avatar);

  
  if(!avatar || !avatar.url){
    throw new ApiError(400,"Failed to upload avatar on cloudinary")
  }
  const coverImage= await uploadOnCloudinary(coverImageLocalPath)
  console.log("Cover Image Cloudinary Response:", coverImage);

  const user=await User.create({
    fullName,
    avatar:avatar.url,
    coverImage:coverImage?.url|| "",
    email,
    password,
    username:username.toLowerCase()
  })

  const createdUser= await User.findById(user._id).select(
    "-password -refreshToken"
  )

  if(!createdUser){
    throw new ApiError(500,"Something went wrong while registering the user")
  }
  return res.status(201).json(
    new ApiResponse(200,createdUser,"user registered successfully")
  )

});

export { registerUser };
