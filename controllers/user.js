import { User } from "../models/user.js";
import bcrypt from "bcrypt";
import { createCookie } from "../utils/token.js";
import ErrorHandler from "../middlewares/error.js";

export const login = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return next(new ErrorHandler("User doesn't exist!!", 404));
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return next(new ErrorHandler("Invalid username or password!", 404));
    }

    createCookie(user, res, `welcome back, ${user.name}`, 201);
  } catch (error) {
    next(error);
  }
};

export const register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    let user = await User.findOne({ email });
    if (user) return next(new ErrorHandler("User already exists!!", 500));

    const hashedPassword = await bcrypt.hash(password, 10);
    user = await User.create({ name, email, password: hashedPassword });

    createCookie(user, res, `User created!!`, 201);
  } catch (error) {
    next(error);
  }
};

export const getMyProfile = async (req, res) => {
  try {
    res.status(200).json({
      success: true,
      user: req.user,
    });
  } catch (error) {
    next(error);
  }
};
export const logout = async (req, res) => {
  try {
    res
      .status(200)
      .cookie("token", "", { 
      expires: new Date(Date.now()),
      sameSite: process.env.NODE_ENV === "Develpoment" ? "lax" : "none",
      secure: process.env.NODE_ENV === "Develpoment" ? false : true, })
      .json({
        success: true,
        message: "Successfully Logged Out !!",
        user: req.user,
        
      });
  } catch (error) {
    next(error);
  }
};
