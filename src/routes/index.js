import express from "express"
import CategoryRouter from "./CategoryRoutes.js"
import authRouter from "./authRouter.js"
const router = express.Router()

router.use("/auth",authRouter)
router.use("/category",CategoryRouter)
export default router
