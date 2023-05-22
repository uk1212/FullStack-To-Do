import jwt from "jsonwebtoken";
export const createCookie=(user,res,message,statusCode=200)=>{

    const token = jwt.sign({_id:user._id},process.env.JWT_SECRET);

    res.status(statusCode).
    cookie("token",token,{
        maxage: 1000*60*15,
        httpOnly: true,
        sameSite:process.env.NODE_ENV === "Development"? "lax": "none",
        secure: process.env.NODE_ENV === "Development"? false: true,
    }).json({
        success:true,
        message,
    })

}