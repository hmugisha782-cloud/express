import { StatusCodes } from "http-status-codes";
import User from "../models/user.js";
import hashpassword, { comparePassword } from "../utils/passwordUtils.js";
import jwt from "jsonwebtoken";

class controller {
  static signup = async (req, res) => {
    const { fullName, email, phone, password } = req.body;
    try {
      const encryptedPassword = await hashpassword(password);

      console.log("creating user");

      const user = await User.create({
        fullName,
        email,
        phone,
        password: encryptedPassword
      });
      if (!user) {
        return res
          .status(400)
          .json({ status: "error", message: "failed to create account" });
      } else {
        return res.status(201).json({
          status: "OK",
          message: "User created successfully",
          user: {
            id: user._id,
            fullName: user.fullName,
            email: user.email,
            phone: user.phone,
            createdAt: user.createdAt
          }
        });
      }
    } catch (error) {
      console.log(`error is ${error}`);

      return res
        .status(500)
        .json({ status: "error", message: `error is ${error}` });
    }
  };

  static getAllUsr = async (req, res) => {
    try {
      const users = await User.find().select("-password");
      if (!users.length) {
        return res
          .status(400)
          .json({ success: false, message: "no users found" });
      }
      return res
        .status(200)
        .json({ success: true, message: "users found successfully", data: users });
    } catch (error) {
      return res
        .status(500)
        .json({ success: false, message: "failed to get users", error: error.message });
    }
  };

  static getUser = async (req, res) => {
    try {
      const user = await User.findById(req.params.id).select("-password");
      if (!user) {
        return res
          .status(404)
          .json({ success: false, message: "user Not found!" });
      }
      return res
        .status(200)
        .json({ success: true, message: "user found successfully", data: user });
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({ success: false, message: "Failed to get user.", error: error.message });
    }
  };

  static updateUser = async (req, res) => {
    try {
      const { fullName, email, phone, password } = req.body;
      const updateData = {};

      if (fullName !== undefined) updateData.fullName = fullName;
      if (email !== undefined) updateData.email = email;
      if (phone !== undefined) updateData.phone = phone;

      if (password !== undefined) {
        if (typeof password !== "string" || password.length < 8) {
          return res.status(400).json({
            success: false,
            message: "Password must contain at least 8 characters"
          });
        }
        updateData.password = await hashpassword(password);
      }

      if (Object.keys(updateData).length === 0) {
        return res.status(400).json({
          success: false,
          message: "No valid fields provided for update"
        });
      }

      const user = await User.findByIdAndUpdate(
        req.params.id,
        { $set: updateData },
        { new: true, runValidators: true }
      ).select("-password");

      if (!user) {
        return res.status(404).json({
          success: false,
          message: "User not found"
        });
      }

      return res.status(200).json({
        success: true,
        message: "User updated successfully",
        data: user
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Failed to update user",
        error: error.message
      });
    }
  };

  static deleteUser = async (req, res) => {
    try {
      const user = await User.findByIdAndDelete(req.params.id).select("-password");

      if (!user) {
        return res.status(404).json({
          success: false,
          message: "User not found!"
        });
      }

      return res.status(200).json({
        success: true,
        message: "User deleted successfully",
        data: user
      });
    } catch (error) {
      console.log(error);

      return res.status(500).json({
        success: false,
        message: "Login Failed to delete user",
        error: error.message
      });
    }
  };

  static login = async (req, res) => {
    try {
      const user = await User.findOne({ email: req.body.email });
      if (!user) {
        return res.status(StatusCodes.UNAUTHORIZED).json({
          success: false,
          message: "Invalid email or password"
        });
      } else {
        const verfiedPassword = await comparePassword(req.body.password,user.password);
        if (!verfiedPassword) {
          return res.status(StatusCodes.UNAUTHORIZED).json({
            success: false,
            message: "Invalid email or password"
          });
        } else {
          const userInfo = {
            id: user._id,
            role: user.role
          };

          const token = jwt.sign(userInfo, process.env.SCRET_KEY, { expiresIn: "1d" });
          return res.status(StatusCodes.OK).json({
            success: true,
            message: token
          });
        }
      }
    } catch (error) {
      console.log(error);
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: "Failed to login",
        error: error.message
      });
    }
  };
}

export default controller;
