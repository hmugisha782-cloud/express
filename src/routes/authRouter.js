import express from "express"
import controller from "../controller/authController.js"
import usereExist from "../middleware/existingUser.js";
const router = express.Router()
import{userValidations,validateUser}from"../middleware/userValidator.js";

router.post("/signup",usereExist, userValidations,validateUser,controller.signup)
router.post("/login",controller.login)

router.get("/users", controller.getAllUsr)

router.get("/users/:id",controller.getUser)

router.patch("/users/:id",controller.updateUser)

router.delete("/users/:id", controller.deleteUser)


export default router