import { Request, Response, NextFunction } from "express";
import { hash, compare } from "bcrypt";
import User from "../models/User.js";
import {
  userSignupValidation,
  userLoginValidation,
} from "../utils/validators.js";
import { generateToken } from "../utils/tokenManager.js";

// Get all users
export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const user = await User.find();
    res.status(200).json(user);
  } catch (e) {
    console.log(e.message);
  }
};

// User registration
export const userSignup = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;
    const { error } = userSignupValidation.validate(req.body); // validate user inputs
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(409).json({ message: "User with this email already exists" });
    }

    const hashedPassword = await hash(password, 10);
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    const token = generateToken(newUser._id.toString(), newUser.email);

    return res.status(201).json({
      message: "User Registered",
      name: newUser.name,
      email: newUser.email,
      id: newUser.id,
      jwt_token: token
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Server error" });
  }
};

// User login
export const userLogin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;
    const { error } = userLoginValidation.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const isCorrectPassword = await compare(password, user.password);
    if (!isCorrectPassword) {
      return res.status(401).json({ message: "Wrong Password" });
    }

    // Generate new token
    const token = generateToken(user._id.toString(), user.email);

    res.status(200).json({
      message: "User logged in successfully",
      name: user.name,
      email: user.email,
      id: user.id,
      jwt_token: token,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Server error" });
  }
};

// User delete
export const userDeletion = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const user = await User.findByIdAndDelete(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "User deleted successfully" });
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Server error" });
  }
};
