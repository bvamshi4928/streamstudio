import  jwt from "jsonwebtoken";
import User from "../models/User.js";
import cookieParser from "cookie-parser";

// Middleware to parse cookies
export const protectRoute = async (req, res, next) => {

    try{
        const token = req.cookies.jwt;
        if(!token){
            return res.status(401).json({message:"Unauthorized access as no token provided, please login first "});
        }

        const decode = jwt.verify(token, process.env.JWT_SECRET_KEY);
        if(!decode){
            return res.status(401).json({message:"Unauthorized access as token is invalid, please login again "});
        }

        const user = await User.findById(decode.userId).select("-password");

        if(!user){
            return res.status(401).json({message:"Unauthorized access as user not found, please login again "});
        }
        req.user = user;
        next();
    }catch(error){
        console.log("Error in auth middleware:", error);
    }
};